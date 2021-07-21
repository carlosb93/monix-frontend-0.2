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
  import { faArchive, faPlus } from '@fortawesome/free-solid-svg-icons'
  import BusinessModel from '../../models/Business';


const numColumns = 2;
const size = Dimensions.get('window').width / numColumns;
const stylesflat = StyleSheet.create({
  itemContainer: {
    width: size - 20,
    marginRight: SIZES.padding,
    marginLeft:  SIZES.padding,
    marginVertical: SIZES.radius,
    borderRadius: 8,
    backgroundColor: COLORS.white,
    elevation: 5
  }
});

export default class BusinessServices extends React.Component { 

  
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
      negocio:[ ],
      options:[ 
        {id:1,
        icon: 'archive',
        texto: 'Inventario'},
        {id:2,
        icon: 'money',
        texto: 'Gastos'},
        {id:3,
        icon: 'shopping-basket',
        texto: 'Ventas'},
        {id:4,
        icon: 'users',
        texto: 'Mis Trabajadores'}
    ]
		}
	}
  async get_businnesses(){

    var negocios = [];
    negocios = await BusinessModel.find( this.state.negocioId);
   console.log(negocios)

    setClientToken(await AsyncStorage.getItem('token'));

    await APIKit.get('/auth/me')
            .then((res) => {
              this.setState({id: res.data.user.id})
              const options = {
                where: {
                  user_id: 1
                }
              }

      this.setState({negocio: negocios}) 

            }).catch((error) => {
              console.log(error);
            })
   
  }

  componentDidMount() {
		this._focusListener = this.props.navigation.addListener('focus', () => {
    this.get_businnesses();
		
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
     onPress={() => {navigation.navigate('Home')}}
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
                  <Text style={{ color: COLORS.white, ...FONTS.h2 }}>    {this.state.otherParam.name}</Text>
                  <TouchableOpacity
     onPress={() => {navigation.navigate('BusinessEdit', {
      itemId: this.state.otherParam.id,
      otherParam: this.state.otherParam,
    }); }}
  >
                  <Icon size={30} name='edit'
                                  style={{
                                    margin:8,
                                    color: COLORS.white,
                                  }}/>
</TouchableOpacity>
              </View>
              </View>
      <FlatList
      data={this.state.options}
      renderItem={({item}) => (
        <TouchableOpacity
     onPress={() => {
       if(item.id === 1){
        navigation.navigate('BusinessInv', {
          itemId: item.id,
          otherParam: this.state.otherParam,
        });
     }else if(item.id === 2){
      navigation.navigate('BusinessInv', {
        itemId: item.id,
        otherParam: this.state.otherParam,
      });
     
     }else if(item.id === 3){
      navigation.navigate('BusinessInv', {
        itemId: item.id,
        otherParam: this.state.otherParam,
      });
     
     }else {
      navigation.navigate('BusinessInv', {
        itemId: item.id,
        otherParam: this.state.otherParam,
      });
     }
      }}
  >
        <View style={stylesflat.itemContainer}>
          {/* Title */}
          <View style={{ flexDirection: 'row', padding: SIZES.padding, alignItems: 'center',justifyContent: 'center' }}>
              
                  <Icon size={70} name={item.icon}
                                  style={{
                                      color: COLORS.primary,
                                  }}/>
              

                               
          </View>

          {/* Expense Description */}
          <View style={{ paddingHorizontal: SIZES.padding, justifyContent: 'center',alignItems: 'center'  }}>
              {/* Title and description */}
              

          </View>

          {/* Price */}
          <View
              style={{
                  height: 20,
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderBottomStartRadius: 8,
                  borderBottomEndRadius: 8,
                  backgroundColor: COLORS.primary,
              }}
          >
            <Text style={{ ...FONTS.body4,color: COLORS.white, }}>{item.texto}</Text>

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
      bottom: 60,
      right: -150,
      height: 60,
      elevation: 6,
      backgroundColor: '#fff',
      borderRadius: 100,
    }}
     onPress={() => {navigation.navigate('BusinessForm', {
      itemId: this.state.id,
      otherParam: 'New',
    }); }}
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
