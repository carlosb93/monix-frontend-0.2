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
import ExpensesModel from '../../models/Expenses';
import AccountModel from '../../models/Account';
import BalanceModel from '../../models/Balance';



const numColumns = 3;
const size = Dimensions.get('window').width / numColumns;
const stylesflat = StyleSheet.create({
  itemContainer: {
    width: size,
    height: size,
    margin: 1,
  }
});

export default class ExpenseEdit extends React.Component {


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
    this.costRef = React.createRef();
    this.priceRef = React.createRef();
    this.state = {
      name: this.props.route.params.otherParam.name,
      cost: 0,
      product_id: 0,
      error: '',
      fechaError: false,
      accountError: false,
      costError: false,
      priceError: false,
      navigation: this.props.navigation,
      expend_id: this.props.route.params.itemId,
      otherParam: this.props.route.params.otherParam,
      expense_id: this.props.route.params.otherParam.id,
      negocioId: this.props.route.params.otherParam.business_id,
      category_id: this.props.route.params.otherParam.category_id,
      categories: [],
      accounts: [],
      fecha: new Date(),
      fecha_mod: toDatetime(this.props.route.params.otherParam.date),
      price: ''+this.props.route.params.otherParam.price,
      account: this.props.route.params.otherParam.account_id,// opcional
      description: this.props.route.params.otherParam.description,// opcional
      date: this.props.route.params.otherParam.date,// opcional
      iconview: <Text style={{ color: COLORS.darkgray, ...FONTS.body4 }}> <Icon size={20} name={this.props.route.params.otherParam.icon} style={{color:this.props.route.params.otherParam.color, margin:8}}/>  {this.props.route.params.otherParam.name}</Text>,
      account_name:[],
      negocio:[],
      isDatePickerVisible: false,
      day:new Date().getDate(),
      month:new Date().getMonth() + 1,
      year:new Date().getFullYear(),

    }

  }
 
  componentDidMount() {
    this._focusListener = this.props.navigation.addListener('focus', () => {
    this.get_business()
    this.get_categories()
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
  
}

  async get_categories(){
     

    let categories = [];
    let categoriesicon = [];
    categories = await CategoryModel.query();

    for (let index = 0; index < categories.length; index++) {
      
      const element = categories[index]
      element.iconview = <Text style={{ color: COLORS.darkgray, ...FONTS.body4 }}> <Icon size={20} name={element.icon} style={{color:element.color, margin:8}}/>  {element.name}</Text>
      
      
      
      categoriesicon.push(element)
    }
    this.setState({categories: categoriesicon}) 
     

           
   
  
}
Delete = async () => {

  const id = this.state.expend_id;
  const expense = await ExpensesModel.findBy({id_eq: id})
  const balance = await BalanceModel.findBy({expense_id_eq: id})
  
  const balancedelete = await BalanceModel.destroy(balance.id)
  const account = await AccountModel.findBy({id_eq: expense.account_id})
  account.monto = account.monto + expense.price
  account.save()
console.log(expense)
  const expensedelete = await ExpensesModel.destroy(id)
  
  this.state.navigation.navigate('BusinessExpense', {
    itemId: this.state.negocioId,
    otherParam: this.state.otherParam,
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

  get_business = async () =>{

    const negocio = await BusinessModel.query({id: this.state.negocioId});
    this.setState({negocio: negocio})
  
  }

  showData = async () => {
    const id = this.state.expend_id;
    var datum = toTimestamp(this.state.fecha)
    const expense = await ExpensesModel.find(id)
    expense.category_id = parseInt(this.state.category_id)
    expense.business_id = parseInt(this.state.negocioId)
    expense.price = parseFloat(this.state.price)
    expense.account_id = this.state.account
    expense.date = datum
    expense.description = this.state.description
    expense.save()

    await this.set_change()
    
    
    this.state.navigation.navigate('BusinessExpense', {
      itemId: this.state.negocioId,
      otherParam: this.state.negocio,
    });
      }


      async set_change(){
  
        const account = await AccountModel.findBy({id_eq: this.state.account})
      
        const balance = await BalanceModel.findBy({expense_id_eq: parseInt(this.state.expense_id)})
        
        
          if(balance.account_id != parseInt(account.id)){
            const account1 = await AccountModel.findBy({id_eq: this.state.account})
            account1.monto = account.monto - parseFloat(this.state.price)
            account1.save()
      
            const account3 = await AccountModel.findBy({id_eq: balance.account_id})
            account3.monto = account3.monto + balance.monto
            account3.save()
      
          }else{
      
            const calculo = account.monto + balance.monto - parseFloat(this.state.price)
      
            const account2 = await AccountModel.findBy({id_eq: this.state.account})
            account2.monto = parseFloat(calculo)
            account2.save()
      
          }
      
      
          const balance1 = await BalanceModel.findBy({expense_id_eq: parseInt(this.state.expense_id)})    
       
          balance1.monto = parseFloat(this.state.price)
          balance1.account_id = this.state.account
          balance1.categoria_id = parseInt(this.state.category_id)
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
     onPress={() => {navigation.navigate('BusinessExpense', {
      itemId: this.state.negocioId,
      otherParam: this.state.otherParam,
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
                  <Text style={{ color: COLORS.white, ...FONTS.h2 }}>   Editar Gasto</Text>
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
        <View style={{flexDirection: 'row', margin: 10, height:60,justifyContent:'space-between',alignItems: 'center' }}>
        <TouchableOpacity>
                  <Icon size={30} name='tag'
                                  style={{
                                    margin:8,
                                    color: COLORS.primary,
                                  }}/>
        </TouchableOpacity>
        
        <SelectDropdown
        defaultButtonText={this.state.iconview}
        buttonTextStyle={{...FONTS.body4, color:COLORS.darkgray, }}
        dropdownStyle={{height: SIZES.width* 0.8}}
        buttonStyle={{ 
          width: SIZES.width * 0.7,
            height: SIZES.width * 0.1,
            padding: SIZES.padding,
            alignItems: 'center',
            borderRadius: SIZES.radius,
            borderColor: COLORS.primary,
            borderWidth: SIZES.input,
            elevation: 5,
            backgroundColor: COLORS.white}}
        
	data={this.state.categories}
	onSelect={(selectedItem, index) => {
    this.setState({ category_id: selectedItem.id })
		
	}}
	buttonTextAfterSelection={(selectedItem, index) => {
		return selectedItem.iconview
	}}
	rowTextForSelection={(item, index) => {
		return item.iconview
	}}
/>
<TouchableOpacity style={{elevation:8}}>
                  <Icon size={30} name='plus'
                                  style={{
                                    margin:8,
                                    color: COLORS.darkgray,
                                  }}/>
        </TouchableOpacity>
        
        </View> 
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
        
        <View style={{ flexDirection: 'row', margin: 10, height:60,justifyContent:'space-between',alignItems: 'center'}}>
        <TouchableOpacity>
                  <Icon size={30} name='usd'
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
                            <Text style={{ color: COLORS.white, ...FONTS.h2 }}>Aceptar</Text>
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
                              
                              navigation.navigate('BusinessExpense', {
                                itemId: this.state.negocioId,
                                otherParam: this.state.otherParam,
                              });
                            }}
                        >
                            <Text style={{ color: COLORS.white, ...FONTS.h2 }}>Cancelar</Text>
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
