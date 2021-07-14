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

  import { icons,COLORS, SIZES, FONTS } from '../constants'
  import APIKit, {setClientToken} from '../shared/APIKit';
  import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
  import Icon from 'react-native-vector-icons/FontAwesome';
  import { faPlus } from '@fortawesome/free-solid-svg-icons'
  import BusinessModel from '../models/Business';


const numColumns = 2;
const size = Dimensions.get('window').width / numColumns;
const stylesflat = StyleSheet.create({
  itemContainer: {
    width: size - 20,
    marginRight: SIZES.padding,
    marginLeft:  SIZES.padding,
    marginVertical: SIZES.radius,
    borderRadius: 16,
    backgroundColor: COLORS.white,
    elevation: 5
  }
});

export default class Business extends React.Component { 

  
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
      negocio:[
        {name:'TEST',color:'#FC6D3F',icon:'archive',code:'YUMMY'},

        
      ]
		}
	}
  async get_businnesses(){

    
    setClientToken(AsyncStorage.getItem('token'));

    await APIKit.get('/auth/me')
            .then((res) => {
              this.setState({id: res.data.user.id})
              const options = {
                columns: 'id, name, categoria, code, user_id, icon, color',
                where: {
                  user_id: this.state.id
                },
                order: 'id ASC'
              }
      this.setState({negocio: BusinessModel.query(options)}) 
  
      console.log(this.state.negocio);

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
        padding: SIZES.padding * 0.5,
    }}>
        
                 <Text style={{ color: COLORS.black, ...FONTS.h2 }}>Negocios</Text>

      <FlatList
      data={this.state.negocio}
      renderItem={({item}) => (
        <View style={stylesflat.itemContainer}>
          {/* Title */}
          <View style={{ flexDirection: 'row', padding: SIZES.padding, alignItems: 'center' }}>
              <View
                  style={{
                      height: 70,
                      width: 70,
                      borderRadius: 25,
                      backgroundColor: COLORS.white,
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginRight: SIZES.base
                  }}
              >
                  <Icon size={60} name={item.icon}
                                  style={{
                                      color: item.color,
                                  }}/>
              </View>

                                <Text style={{ ...FONTS.h3, color: item.color, }}>{item.name}</Text>
          </View>

          {/* Expense Description */}
          <View style={{ paddingHorizontal: SIZES.padding }}>
              {/* Title and description */}
              <Text style={{ ...FONTS.h2, }}>{item.name}</Text>
              <Text style={{ ...FONTS.body3, flexWrap: 'wrap', color: COLORS.darkgray }}>
                  CODIGO:{item.code}
              </Text>


          </View>

          {/* Price */}
          <View
              style={{
                  height: 50,
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderBottomStartRadius: 16,
                  borderBottomEndRadius: 16,
                  backgroundColor: item.color,
              }}
          >
              <Text style={{ color: COLORS.white, ...FONTS.body3 }}>CONFIRM 100 USD</Text>
          </View>
      </View>


  //       <View style={stylesflat.itemContainer}>
         
  //                        <Icon size={60} name={item.icon}
  //  style={{
  //      color: item.color,
  //  }}/>
  //       </View>
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
