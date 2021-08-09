import React from 'react'
import { StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Image,
  Dimensions,
  FlatList,
  ColorPropType} from 'react-native'
  
  import AsyncStorage from '@react-native-async-storage/async-storage';

  import { icons,COLORS, SIZES, FONTS } from '../../constants'
  import APIKit, {setClientToken} from '../../shared/APIKit';
  import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
  import Icon from 'react-native-vector-icons/FontAwesome';
  import { faPlus } from '@fortawesome/free-solid-svg-icons'
  import BusinessModel from '../../models/Business';
  import InventaryModel from '../../models/Inventary';
  import ExpensesModel from '../../models/Expenses';


const numColumns = 1;
const size = Dimensions.get('window').width / numColumns;
const stylesflat = StyleSheet.create({
  itemContainer: {
    width: size - 20,
    marginRight: SIZES.padding,
    marginLeft:  SIZES.padding,
    marginVertical: SIZES.padding,
    borderRadius: 16,
    backgroundColor:COLORS.lightGray4,
    elevation: 5
  }
});

export default class BusinessExpense extends React.Component { 

  
  constructor(props){
		super(props);
		this.codeRef = React.createRef();
		this.nameRef = React.createRef();
		this.emailRef = React.createRef();
		this.passwordRef = React.createRef();
		this.confirmPasswordRef = React.createRef();
    this.state = {
      id:null,
      name:'',
			email: '',
			password: '',
			confirmPassword: '',
			code: '',
			error: '',
			emailError: false,
			codeError: false,
			nameError: false,
			passwordError: false,
			confirmPasswordError: false,
      navigation: this.props.navigation,
      negocioId: this.props.route.params.itemId,
      otherParam: this.props.route.params.otherParam,
      expenses:[]
		}
	}
  async get_expenses(){

    var expenses = [];
    expenses = await ExpensesModel.getJoinExpCat(this.state.negocioId);

    this.setState({expenses: expenses}) 

  }

  componentDidMount() {
		this._focusListener = this.props.navigation.addListener('focus', () => {
    this.get_expenses();
		});
  }

  componentWillUnmount() {
    this._focusListener();
  }
  
  
  render() {

  const { navigation } = this.state;

  return (
    

      <View  style={{
        flex: 1,
        alignItems: 'center',
        backgroundColor:COLORS.transparent,
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
     onPress={() => {navigation.navigate('BusinessServices', {
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
                  <Text style={{ color: COLORS.white, ...FONTS.h2 }}>   Gastos</Text>
                  <TouchableOpacity
     onPress={() => {navigation.navigate('ExpenseEdit', {
      itemId: this.state.otherParam.id,
      otherParam: this.state.otherParam,
    }); }}
  >
                  <Icon size={30} name='bar-chart'
                                  style={{
                                    margin:8,
                                    color: COLORS.white,
                                  }}/>
</TouchableOpacity>
              </View>
              </View>
      <FlatList
      data={this.state.expenses}
      renderItem={({item}) => (
        <TouchableOpacity
        
     onPress={() => {navigation.navigate('ExpenseEdit', {
      itemId: item.id,
      otherParam: item,
    }); }}
  >
        <View style={stylesflat.itemContainer}>
          {/* Expense Description */}
          <View style={{ paddingHorizontal: SIZES.padding }}>
              {/* Title and description */}
              
          <View style={{ flexDirection: 'row', padding: SIZES.padding, alignItems: 'center',justifyContent: 'space-between'  }}>
              {/* Title and description */}
                <View style={{ flexDirection: 'row',justifyContent: 'flex-start' }}>
              <TouchableOpacity>
                  <Icon size={30} name={item.icon}
                                  style={{
                                    margin:8,
                                    color: item.color,
                                  }}/>
        </TouchableOpacity>
        <View style={{ flexDirection: 'column',justifyContent: 'flex-start' }}>
              <Text style={{ ...FONTS.body5, color:COLORS.darkgray }}>Categoria:</Text>
              <Text style={{ ...FONTS.body3, flexWrap: 'wrap', color: COLORS.darkgray }}> {item.name}</Text>
              </View>
              </View>
              <View style={{ flexDirection: 'column',justifyContent: 'flex-start'}}>
              <Text style={{ ...FONTS.body5, color:COLORS.darkgray }}></Text>
              <Text style={{ ...FONTS.h4, flexWrap: 'wrap', color: COLORS.primary }}> </Text>
              </View>
              <View style={{ flexDirection: 'column',justifyContent: 'flex-start'}}>
              <Text style={{ ...FONTS.body5, color:COLORS.darkgray }}>Importe:</Text>
              <Text style={{ ...FONTS.h4, flexWrap: 'wrap', color: COLORS.primary }}> {item.price}</Text>
              </View>
          </View>
         
      </View>
      </View>
      </TouchableOpacity>


      )}
      keyExtractor={item => item.id}
      numColumns={numColumns} />



                 
        
        <View>
    <TouchableOpacity
    style={{
      
      borderColor: 'rgba(0,0,0,0.2)',
    width: 60,
    position: 'absolute',
    bottom: 60,
    right: -170,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 999,
    height: 60,
    elevation: 6,
    backgroundColor: '#fff',
    borderRadius: 100,
    }}
     onPress={() => {navigation.navigate('ExpenseNew', {
      itemId: this.state.negocioId,
      otherParam: this.state.otherParam,
    });}}
  >
     <FontAwesomeIcon size={25} icon={ faPlus  } 
                        style={{
                            color: COLORS.primary,
                        }}/>
                        
  </TouchableOpacity>               
     </View>
      </View>
      
        // <Button title='Go to Login' onPress={this.goToLogin} />
      
        )
      }
      }
