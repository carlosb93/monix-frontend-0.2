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
  import SalesModel from '../../models/Sales';


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

export default class BusinessSales extends React.Component { 

  
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
      sales:[]
		}
	}
  async get_sales(){

    var sales = [];
    sales = await SalesModel.getJoinSaleInv(this.state.negocioId);
    this.setState({sales: sales}) 

  }

  componentDidMount() {
		this._focusListener = this.props.navigation.addListener('focus', () => {
    this.get_sales();
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
     onPress={() => {navigation.navigate('BusinessServices')}}
  >
     <Image
                            source={icons.back_arrow}
                            resizeMode="contain"
                            style={{
                                width: 25,
                                height: 25,
                                margin:6,
                                tintColor: COLORS.white,
                            }}
                        />
                </TouchableOpacity>
                  <Text style={{ color: COLORS.white, ...FONTS.h2 }}>   Ventas</Text>
                  <TouchableOpacity
     onPress={() => {navigation.navigate('SalesEdit', {
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
      data={this.state.sales}
      renderItem={({item}) => (
        <TouchableOpacity
     onPress={() => {navigation.navigate('SalesEdit', {
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
              <View style={{ flexDirection: 'row', alignItems: 'center'}}>
              <Text style={{ ...FONTS.body5, color:COLORS.darkgray }}>Producto:</Text>
              <Text style={{ ...FONTS.h4, flexWrap: 'wrap', color: COLORS.primary }}> {item.name}</Text>
              </View>
              <View style={{ flexDirection: 'row', alignItems: 'center'}}>
              <Text style={{ ...FONTS.body5, color:COLORS.darkgray }}>Cantidad:</Text>
              <Text style={{ ...FONTS.h4, flexWrap: 'wrap', color: COLORS.primary }}> {item.amount}</Text>
              </View>
              <View style={{ flexDirection: 'row', alignItems: 'center'}}>
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
      alignItems: 'center',
      justifyContent: 'center',
      width: 60,
      bottom: 30,
      right: -150,
      height: 60,
      elevation: 6,
      backgroundColor: '#fff',
      borderRadius: 100,
    }}
     onPress={() => {navigation.navigate('SalesNew', {
      itemId: this.state.negocioId,
      otherParam: {},
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
