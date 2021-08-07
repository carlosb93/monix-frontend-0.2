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


const numColumns = 1;
const size = Dimensions.get('window').width / numColumns;
const stylesflat = StyleSheet.create({
  itemContainer: {
    width: size - 20,
    marginRight: SIZES.padding,
    marginLeft:  SIZES.padding,
    marginVertical: SIZES.radius,
    borderRadius: 16,
    backgroundColor:COLORS.lightGray4,
    elevation: 5
  }
});

export default class BusinessInv extends React.Component { 

  
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
      inventaryes:[]
		}
	}
  async get_inventary(){

    var inventary = [];
    inventary = await InventaryModel.query({business_id: this.state.negocioId });

    this.setState({inventaryes: inventary}) 

           
   
  }

  componentDidMount() {
		this._focusListener = this.props.navigation.addListener('focus', () => {
    this.get_inventary();
		
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
                  <Text style={{ color: COLORS.white, ...FONTS.h2 }}>   Inventario</Text>
                  <TouchableOpacity
     onPress={() => {}}
  >
                  <Icon size={30} name='edit'
                                  style={{
                                    margin:8,
                                    color: COLORS.transparent,
                                  }}/>
</TouchableOpacity>
              </View>
              </View>
      <FlatList
      data={this.state.inventaryes}
      renderItem={({item}) => (
        <TouchableOpacity
     onPress={() => {navigation.navigate('InventaryEdit', {
      itemId: item.id,
      otherParam: item,
    }); }}
  >
        <View style={stylesflat.itemContainer}>
          {/* Title */}
          <View style={{ flexDirection: 'row', padding: SIZES.padding, alignItems: 'center',justifyContent: 'space-between' }}>
          <Text style={{ ...FONTS.h2, color:item.color }}>{item.name}</Text> 
          <Text style={{ ...FONTS.body4,  }}>$ {item.cost} CUP</Text> 

                             
          </View>

          {/* Expense Description */}
          <View style={{ paddingHorizontal: SIZES.padding }}>
              {/* Title and description */}
              
          <View style={{ flexDirection: 'row', padding: SIZES.padding, alignItems: 'center',justifyContent: 'space-between'  }}>
              {/* Title and description */}
              <View style={{ flexDirection: 'row', alignItems: 'center'}}>
              <Text style={{ ...FONTS.body5, color:COLORS.darkgray }}>Cantidad:</Text>
              <Text style={{ ...FONTS.h2, flexWrap: 'wrap', color: COLORS.primary }}> {item.stock}</Text>
              </View>
              <View style={{ flexDirection: 'row', alignItems: 'center'}}>
              <Text style={{ ...FONTS.body5, color:COLORS.darkgray }}>Vendido:</Text>
              <Text style={{ ...FONTS.h2, flexWrap: 'wrap', color: COLORS.primary }}> 0</Text>
              </View>
              <View style={{ flexDirection: 'row', alignItems: 'center'}}>
              <Text style={{ ...FONTS.body5, color:COLORS.darkgray }}>Precio de venta:</Text>
              <Text style={{ ...FONTS.h2, flexWrap: 'wrap', color: COLORS.primary }}> {item.price}</Text>
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
     onPress={() => {navigation.navigate('InventaryNew', {
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
