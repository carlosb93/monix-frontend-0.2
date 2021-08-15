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
import APIKit, {
  setClientToken
} from '../../shared/APIKit';
import {toTimestamp, toDatetime } from '../../shared/tools';

import CategoryModel from '../../models/Category';
import BusinessModel from '../../models/Business';
import InventaryModel from '../../models/Inventary';
import IncomeModel from '../../models/Income';
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




export default class Transaction extends React.Component {


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
      name: '',
      cost: 0,
      negocioId: this.props.route.params.itemId,
      transactiontype: this.props.route.params.itemId,
      product_id: 0,
      error: '',
      fechaError: false,
      accountError: false,
      amountError: false,
      costError: false,
      priceError: false,
      navigation: this.props.navigation,
      otherParam: this.props.route.params.otherParam,
      categories: [],
      accounts: [],
      fecha: new Date(),
      fecha_mod: 'MM/DD/YYYY',
      amount: '',
      price: '',
      account: 0,// opcional
      description: '',// opcional
      category_id: 0,// opcional
      isDatePickerVisible: false,
      day:new Date().getDate(),
      month:new Date().getMonth() + 1,
      year:new Date().getFullYear(),

    }

  }

  componentDidMount() {
    this._focusListener = this.props.navigation.addListener('focus', () => {
    this.get_categories()
    this.get_accounts()
    if(this.state.month < 10){
      this.setState({fecha_mod: '0'+ this.state.month +'/'+ this.state.day +'/'+ this.state.year})
    }else{
      this.setState({fecha_mod: this.state.month +'/'+ this.state.day +'/'+ this.state.year})
    }
    });
  }

  componentWillUnmount() {
    this._focusListener();
  }

  async get_accounts() {
    const user_id = await AsyncStorage.getItem('id')

    var accounts = [];
    try{
        accounts = await AccountModel.query({user_id: user_id});
        console.log(accounts)
    }catch{
     console.log('query accounts error')
    }

    this.setState({accounts: accounts}) 
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
    const user_id = await AsyncStorage.getItem('id')
    var datum = toTimestamp(this.state.fecha)

    const props = {
        category_id: this.state.category_id,
        business_id: 1,
        date: datum,
        price: parseFloat(this.state.price),
        account_id: this.state.account,
        description: this.state.description,
       }

      if(this.state.transactiontype === 1){
        //income
        try {
          var incomes =[];
          incomes = new IncomeModel(props)
          incomes.save()
        
          var account = [];
          try{
              account = await AccountModel.findBy({id_eq: this.state.account});
              account.monto = account.monto + parseFloat(this.state.price)
              account.save()
              
          }catch{
              console.log('query account error')
          }
        
          var income = [];
            try{
              const options = {
                where: {
                  business_id_eq: 1
                },
                order: 'id DESC'
              }
                income = await IncomeModel.query(options);
            }catch{
             console.log('query income error')
            }
        
              const propsBalance = {
                user_id: user_id,
                account_id: this.state.account,
                categoria_id: this.state.category_id,
                business_id: 1,
                income_id: income[0].id,
                isPositive: true,
                monto: parseFloat(this.state.price),
              }
              var balance =[];
              balance = new BalanceModel(propsBalance)
              balance.save()
              console.log(balance)

                } catch (error) {
                      
                console.log(error)
            }

      } else{
        //expense
        try {
          var expenses =[];
          expenses = new ExpensesModel(props)
          expenses.save()
        
          var account = [];
          try{
              account = await AccountModel.findBy({id_eq: this.state.account});
              account.monto = account.monto - parseFloat(this.state.price)
              account.save()
              
          }catch{
              console.log('query account error')
          }
        
          var expense = [];
            try{
              const options = {
                where: {
                  business_id_eq: 1
                },
                order: 'id DESC'
              }
                expense = await ExpensesModel.query(options);
            }catch{
             console.log('query expense error')
            }
        
              const propsBalance = {
                user_id: user_id,
                account_id: this.state.account,
                categoria_id: this.state.category_id,
                business_id: 1,
                expense_id: expense[0].id,
                isPositive: false,
                monto: parseFloat(this.state.price),
              }
              var balance =[];
              balance = new BalanceModel(propsBalance)
              balance.save()
              console.log(balance)

                } catch (error) {
                      
                console.log(error)
            }
      }

    
 this.state.navigation.navigate('Home');

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
     onPress={() => {navigation.navigate('Home');}}
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
                  <Text style={{ color: COLORS.white, ...FONTS.h2 }}>   Nueva Transacción</Text>
                  <TouchableOpacity>
                  <Icon size={30} name='trash'
                                  style={{
                                    margin:8,
                                    color: COLORS.transparent,
                                  }}/>
</TouchableOpacity>
              </View>
              </View>
      
        <View>
        <View style={{flexDirection: 'row', margin: 10, height:60,justifyContent:'space-between',alignItems: 'center', }}>
        <TouchableOpacity>
                  <Icon size={30} name='tag'
                                  style={{
                                    margin:8,
                                    color: COLORS.primary,
                                  }}/>
        </TouchableOpacity>
        
        <SelectDropdown
        defaultButtonText='Seleccione una categoría'
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
            placeholder='Monto'
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
        defaultButtonText='Seleccione una Cuenta'
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
                              
                              navigation.navigate('Home');
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
