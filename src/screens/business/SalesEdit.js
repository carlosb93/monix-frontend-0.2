import React from 'react'
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Modal,
  Image,
  ScrollView,
  FlatList,
  Button,
  Dimensions,
  TouchableHighlight
} from 'react-native'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import Icon from 'react-native-vector-icons/FontAwesome';
import SelectDropdown from 'react-native-select-dropdown'
import AsyncStorage from '@react-native-async-storage/async-storage';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import {
  COLORS,
  SIZES,
  FONTS,
  iconData,
  icons
} from '../../constants'
import APIKit, {setClientToken} from '../../shared/APIKit';
import {toTimestamp, toDatetime } from '../../shared/tools';
import CategoryModel from '../../models/Category';
import BusinessModel from '../../models/Business';
import InventaryModel from '../../models/Inventary';
import SalesModel from '../../models/Sales';
import BalanceModel from '../../models/Balance';
import AccountModel from '../../models/Account';




const numColumns = 3;
const size = Dimensions.get('window').width / numColumns;
const stylesflat = StyleSheet.create({
  itemContainer: {
    width: size,
    height: size,
    margin: 1,
  }
});


 


export default class SalesEdit extends React.Component {


  toggleModal(visible) {
    this.setState({
      modalVisible: visible
    });
  }
  toggleModal2(visible) {
    this.setState({
      modal2Visible: visible
    });
  }
  constructor(props) {
    super(props);
    this.fechaRef = React.createRef();
    this.accountRef = React.createRef();
    this.amountRef = React.createRef();
    this.costRef = React.createRef();
    this.priceRef = React.createRef();
    this.state = {
      name: this.props.route.params.otherParam.name,
      cost: 0,
      product_id: 0,
      error: '',
      fechaError: false,
      accountError: false,
      amountError: false,
      costError: false,
      priceError: false,
      navigation: this.props.navigation,
      sale_id: this.props.route.params.itemId,
      otherParam: this.props.route.params.otherParam,
      negocioId: this.props.route.params.otherParam.business_id,
      inventory_id: this.props.route.params.otherParam.inventory_id,
      products: [],
      accounts: [],
      account_name: [],
      negocio: [],
      fecha: new Date(),
      fecha_mod: toDatetime(this.props.route.params.otherParam.date),
      price: ''+this.props.route.params.otherParam.price,
      amount: ''+this.props.route.params.otherParam.amount,
      account: this.props.route.params.otherParam.account_id,// opcional
      description: this.props.route.params.otherParam.description,// opcional
      date: this.props.route.params.otherParam.date,// opcional
      isDatePickerVisible: false,
      day:new Date().getDate(),
      month:new Date().getMonth() + 1,
      year:new Date().getFullYear(),

    }

  }
 
  componentDidMount() {
    this._focusListener = this.props.navigation.addListener('focus', () => {
    this.get_products()
    this.get_business()
    this.get_accounts()
    });
  }

  componentWillUnmount() {
    this._focusListener();
  }

  async get_accounts() {
    const user_id = await AsyncStorage.getItem('id')

    var accounts = [];
    var account_name = [];
    try{
        accounts = await AccountModel.query({user_id: user_id});
        
        account_name = await AccountModel.findBy({id_eq: this.state.account});
        
    }catch{
     console.log('query accounts error')
    }

    this.setState({accounts: accounts}) 
    this.setState({account_name: account_name}) 
    console.log(this.state.accounts)
    console.log(this.state.account_name)
  
}

  get_business = async () =>{

    const negocio = await BusinessModel.query({id: this.state.negocioId});
    this.setState({negocio: negocio})
  
  }

  async get_products(){
     

      var prod = [];
      prod = await InventaryModel.query({business_id: this.state.negocioId });  
      this.setState({products: prod}) 
  }
  Delete = async () => {

    const id = this.state.sale_id;
    const sale = await SalesModel.findBy({id_eq: id})
  
    const balance = await BalanceModel.findBy({sale_id_eq: id})
  
    const balancedelete = await BalanceModel.destroy(balance.id)
    const account = await AccountModel.findBy({sale_id_eq: sale.account_id})
    account.monto = account.monto - sale.price
    account.save()
    
    const saledelete = await SalesModel.destroy(id)
    
    this.state.navigation.navigate('BusinessSales', {
      itemId: this.state.negocioId,
      otherParam: this.state.negocio,
    });
      }
  
   showDatePicker = () => {
    this.setState({isDatePickerVisible: true});
  };

   hideDatePicker = () => {
    this.setState({isDatePickerVisible: false});
  };

   handleConfirm = (date) => {
    this.setState({fecha: date})

    this.setState({day:this.state.fecha.getDate()})
    this.setState({month:this.state.fecha.getMonth() + 1})
    this.setState({year:this.state.fecha.getFullYear()})

    if(this.state.month < 10){
      this.setState({fecha_mod: '0'+ this.state.month +'/'+ this.state.day +'/'+ this.state.year})
    }else{
      this.setState({fecha_mod: this.state.month +'/'+ this.state.day +'/'+ this.state.year})
    }

    this.hideDatePicker();
  };
  showData = async () => {

    const id = this.state.sale_id;
    const sales = await SalesModel.find(id)
    sales.inventory_id = parseInt(this.state.inventory_id)
    sales.business_id = parseInt(this.state.negocioId)
    sales.amount = parseInt(this.state.amount)
    sales.price = parseFloat(this.state.price)
    sales.account_id = this.state.account
    sales.description = this.state.description
    sales.save()
    
    await this.set_change()
      
      console.log('error')
      this.state.navigation.navigate('BusinessSales', {
        itemId: this.state.negocioId,
        otherParam: this.state.negocio,
      });
      }
async set_change(){
  
  const account = await AccountModel.findBy({id_eq: this.state.account})

  const balance = await BalanceModel.findBy({sale_id_eq: parseInt(this.state.sale_id)})
  
  
    if(balance.account_id != parseInt(account.id)){
      const account1 = await AccountModel.findBy({id_eq: this.state.account})
      account1.monto = account.monto + parseFloat(this.state.price)
      account1.save()

      const account3 = await AccountModel.findBy({id_eq: balance.account_id})
      account3.monto = account3.monto - balance.monto
      account3.save()

    }else{

      const calculo = account.monto - balance.monto + parseFloat(this.state.price)

      const account2 = await AccountModel.findBy({id_eq: this.state.account})
      account2.monto = parseFloat(calculo)
      account2.save()

    }


    const balance1 = await BalanceModel.findBy({sale_id_eq: parseInt(this.state.sale_id)})    
 
    balance1.monto = parseFloat(this.state.price)
    balance1.account_id = this.state.account
    balance1.categoria_id = 8
    balance1.save()

}

render() { 
  const { navigation  } = this.state;


  return (
      <View  style={{
        alignItems: 'center',
        justifyContent: 'center'
    }}>
      <View  style={{
        backgroundColor:COLORS.transparent,
        height: 35,
        width: Dimensions.get('window').width,
    }}>
                 
                 <View
                  style={{
                    flex:1,
                    flexDirection: 'row',
                    
                      height:30,
                      width: Dimensions.get('window').width,
                      backgroundColor: COLORS.primary,
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      marginRight: SIZES.base
                  }}
              >
                 <TouchableOpacity
     onPress={() => {navigation.navigate('BusinessSales', {
      itemId: this.state.negocioId,
      otherParam: this.state.negocio,
    });}}
  >
     <Image
                            source={icons.left_arrow}
                            resizeMode="contain"
                            style={{
                                width: 25,
                                height: 25,
                                margin:6,
                                tintColor: COLORS.white,
                            }}
                        />
                </TouchableOpacity>
                  <Text style={{ color: COLORS.white, ...FONTS.h2 }}>   Editar Venta</Text>
                  <TouchableOpacity
     onPress={() => {this.Delete() }}
  >
                  <Icon size={30} name='trash-o'
                                  style={{
                                    margin:8,
                                    color: COLORS.white,
                                  }}/>
</TouchableOpacity>
              </View>
              </View>
      
        <View>
        <View style={{ flexDirection: 'row', margin: 10, height:60,justifyContent:'space-between',alignItems: 'center'}}>

        <TouchableOpacity onPress={this.showDatePicker}>
                  <Icon size={30} name='calendar'
                                  style={{
                                    margin:8,
                                    color: COLORS.primary,
                                  }}/>
        </TouchableOpacity>
        <TouchableOpacity
                            style={{
                                width: SIZES.width * 0.8,
                                height: SIZES.width * 0.1,
                                padding: SIZES.padding,
                                backgroundColor: COLORS.white,
                                borderRadius: SIZES.radius,
                                borderColor: COLORS.primary,
                                borderWidth: SIZES.input,
                                alignItems: 'center',
                                justifyContent: 'center',
                                borderRadius: SIZES.radius,
                                elevation: 5,
                            }}
                            onPress={this.showDatePicker}
                        >
                            <Text style={{ color: COLORS.darkgray, ...FONTS.body4 }}>{this.state.fecha_mod}</Text>
                        </TouchableOpacity>
      <DateTimePickerModal
        isVisible={this.state.isDatePickerVisible}
        mode="date"
        onConfirm={this.handleConfirm}
        onCancel={this.hideDatePicker}
      />
        </View> 
        
        <View style={{flexDirection: 'row', margin: 10, height:60,justifyContent:'space-between',alignItems: 'center' }}>
        <TouchableOpacity>
                  <Icon size={30} name='shopping-basket'
                                  style={{
                                    margin:8,
                                    color: COLORS.primary,
                                  }}/>
        </TouchableOpacity>
        
        <SelectDropdown
        defaultButtonText={this.state.name}
        buttonTextStyle={{...FONTS.body4, color:COLORS.darkgray, }}
        buttonStyle={{ 
          width: SIZES.width * 0.8,
            height: SIZES.width * 0.1,
            padding: SIZES.padding,
            alignItems: 'center',
            borderRadius: SIZES.radius,
            borderColor: COLORS.primary,
            borderWidth: SIZES.input,
            elevation: 5,
            backgroundColor: COLORS.white}}
        
	data={this.state.products}
	onSelect={(selectedItem, index) => {
    this.setState({ product_id: selectedItem.id })
		
	}}
	buttonTextAfterSelection={(selectedItem, index) => {
		// text represented after item is selected
		// if data array is an array of objects then return selectedItem.property to render after item is selected
		return selectedItem.name
	}}
	rowTextForSelection={(item, index) => {
		// text represented for each item in dropdown
		// if data array is an array of objects then return item.property to represent item in dropdown
		return item.name
	}}
/>
        
        </View>
        <View style={{flexDirection: 'row', margin: 10, height:60,justifyContent:'space-between',alignItems: 'center' }}>
        <TouchableOpacity>
                  <Icon size={30} name='clone'
                                  style={{
                                    margin:8,
                                    color: COLORS.primary,
                                  }}/>
        </TouchableOpacity>
        <TextInput
          style={{
            width: SIZES.width * 0.8,
            height: SIZES.width * 0.1,
            padding: SIZES.padding,
            alignItems: 'center',
            borderRadius: SIZES.radius,
            borderColor: COLORS.primary,
            borderWidth: SIZES.input,
            elevation: 5,
            textDecorationColor: COLORS.darkgray,
            backgroundColor: COLORS.white
        }}
            name='amount'
            placeholder='Cantidad de Unidades'
            error={this.state.amountError}
			ref={this.amountRef}
			value={this.state.amount}
			onChangeText={ (amount) => this.setState({ amount })} 
            onSubmitEditing={() => this.priceRef.current.focus()}
          />
        </View>
        
        <View style={{ flexDirection: 'row', margin: 10, height:60,justifyContent:'space-between',alignItems: 'center'}}>
        <TouchableOpacity>
                  <Icon size={30} name='money'
                                  style={{
                                    margin:8,
                                    color: COLORS.primary,
                                  }}/>
        </TouchableOpacity>
        <TextInput
          style={{
            width: SIZES.width * 0.8,
            height: SIZES.width * 0.1,
            padding: SIZES.padding,
            alignItems: 'center',
            borderRadius: SIZES.radius,
            borderColor: COLORS.primary,
            borderWidth: SIZES.input,
            elevation: 5,
            backgroundColor: COLORS.white
        }}
            name='price'
            placeholder='Precio de venta'
            autoCapitalize='none'
            error={this.state.priceError}
						ref={this.priceRef}
						value={this.state.price}
						onChangeText={ (price) => this.setState({ price })} 
          />
        </View>
        <View style={{flexDirection: 'row', margin: 10, height:60,justifyContent:'space-between',alignItems: 'center' }}>
        <TouchableOpacity>
                  <Icon size={30} name='credit-card'
                                  style={{
                                    margin:8,
                                    color: COLORS.primary,
                                  }}/>
        </TouchableOpacity>
        
        <SelectDropdown
        defaultButtonText={this.state.account_name.name}
        buttonTextStyle={{...FONTS.body4, color:COLORS.darkgray, }}
        buttonStyle={{ 
          width: SIZES.width * 0.8,
          height: SIZES.width * 0.1,
          borderRadius: SIZES.radius,
          borderColor: COLORS.primary,
          borderWidth: SIZES.input,
          elevation: 5,
          backgroundColor: COLORS.white}}
        
	data={this.state.accounts}
	onSelect={(selectedItem, index) => {
    this.setState({ account: selectedItem.id})
		
	}}
	buttonTextAfterSelection={(selectedItem, index) => {
		// text represented after item is selected
		// if data array is an array of objects then return selectedItem.property to render after item is selected
		return selectedItem.name
	}}
	rowTextForSelection={(item, index) => {
		// text represented for each item in dropdown
		// if data array is an array of objects then return item.property to represent item in dropdown
		return item.name
	}}
/>
        
        </View>
        <View style={{ flexDirection: 'row', margin: 10, height:60,justifyContent:'space-between',alignItems: 'center'}}>
        <TouchableOpacity>
                  <Icon size={30} name='font'
                                  style={{
                                    margin:8,
                                    color: COLORS.primary,
                                  }}/>
        </TouchableOpacity>
        <TextInput
          style={{
            width: SIZES.width * 0.8,
            height: SIZES.width * 0.1,
            padding: SIZES.padding,
            alignItems: 'center',
            borderRadius: SIZES.radius,
            borderColor: COLORS.primary,
            borderWidth: SIZES.input,
            elevation: 5,
            backgroundColor: COLORS.white
        }}
            name='description'
            placeholder='Descripcion'
            autoCapitalize='none'
            error={this.state.descriptionError}
						ref={this.descriptionRef}
						value={this.state.description}
						onChangeText={ (description) => this.setState({ description })} 
          />
        </View>
     
                    <View style={{
                                  flexDirection:'column',
                                  alignItems: 'center',
                                  marginLeft:50,
                                  justifyContent: 'center',
                                  padding: SIZES.padding* 2}}>
  <View
                        style={{
                            
                            alignItems: 'center',
                            justifyContent: 'center',
                            height: 60,
                            width: 30,
                            
                        }}
                    >
                        <TouchableOpacity
                            style={{
                                width: SIZES.width * 0.8,
                                height: SIZES.width * 0.1,
                                padding: SIZES.padding,
                                backgroundColor: COLORS.primary,
                                alignItems: 'center',
                                justifyContent: 'center',
                                borderRadius: SIZES.radius,
                                elevation: 5,
                            }}
                            onPress={() => this.showData()}
                        >
                            <Text style={{ color: COLORS.white, ...FONTS.h2 }}>Actualizar</Text>
                        </TouchableOpacity>
                    </View>
        <View
                        style={{
                            alignItems: 'center',
                            justifyContent: 'center',
                            height: 60,
                            width: 30,
                        }}
                    >
                        <TouchableOpacity
                            style={{
                                width: SIZES.width * 0.8,
                                height: SIZES.width * 0.1,
                                padding: SIZES.padding,
                                backgroundColor: COLORS.secondary,
                                alignItems: 'center',
                                justifyContent: 'center',
                                borderRadius: SIZES.radius,
                                elevation: 5,
                            }}
                            onPress={() => {
                              
                              navigation.navigate('BusinessSales', {
                                itemId: this.state.negocioId,
                                otherParam: this.state.negocio,
                              });
                            }}
                        >
                            <Text style={{ color: COLORS.white, ...FONTS.h2 }}>Atras</Text>
                        </TouchableOpacity>
                    </View>

                </View>
  
        

            </View>  
               
      </View>
      
        )

        
      }
    }
            const styles = StyleSheet.create({
              container: {
                flex: 1,
                backgroundColor: '#fff',
                alignItems: 'center',
                justifyContent: 'center',
              },
            });
