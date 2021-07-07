import React from 'react'
import { StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Image,
  ColorPropType} from 'react-native'

  import AsyncStorage from '@react-native-async-storage/async-storage';

  import { icons,COLORS, SIZES, FONTS } from '../constants'
  import APIKit, {setClientToken} from '../shared/APIKit';
  import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
  import { faPlus } from '@fortawesome/free-solid-svg-icons'
  
export default class Business extends React.Component { 

  
  constructor(props){
		super(props);
		this.codeRef = React.createRef();
		this.nameRef = React.createRef();
		this.emailRef = React.createRef();
		this.passwordRef = React.createRef();
		this.confirmPasswordRef = React.createRef();
    this.state = {
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
			navigation: this.props.navigation
		}
	}
  
  componentDidMount() {
		this._focusListener = this.props.navigation.addListener('focus', () => {
		
		});
  }

  componentWillUnmount() {
		this._focusListener();
  }
  


	showData = async() => {
		let { code, email,name, password, confirmPassword } = this.state;

		let emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
		let passwordRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;

		if (emailRegex.test(email)) {
				if (passwordRegex.test(password)) {
					this.setState({ passwordError: true })
					if (password === confirmPassword) {
						this.setState({ passwordError: false, confirmPasswordError: false })
            
            
            const payload ={
              'code':code,
              'password':password,
              'username':name,
              'password_confirmation':confirmPassword,
              'email':email,
            }

            const onSuccess = ({data}) => {
              // Set JSON Web Token on success 
            setClientToken(data.token);
              
    
            AsyncStorage.setItem('userCode', code)
						AsyncStorage.setItem('userName', name)
						AsyncStorage.setItem('userEmail', email)
						AsyncStorage.setItem('userPassword', password)
						AsyncStorage.setItem('isAuth', 'true')
						
						return this.state.navigation.replace('Home');
            
            };
    
            const onFailure = error => {
              console.log(error && error.response);
              this.setState({ errorText: 'Email o Contraseña incorrectos' });
              return alert(this.state.errorText);
            };
            
            APIKit.post('/auth/register', payload,{header:{ 
              "Content-Type": "multipart/form-data",
              "Access-Control-Allow-Origin": "*"
            }})
              .then(onSuccess)
              .catch(onFailure);


						
					}
				}
				this.setState({ password: '', confirmPassword: '', passwordError: true, confirmPasswordError: true })
				return alert('Password Not Matching');
		}

		this.setState({ emailError: true })

		return alert('Email Incorrect');
  }
  
  
  render() {

  const { navigation } = this.state;

  return (
    

      <View  style={{
        padding: SIZES.padding * 0.5,
    }}>
        <View style={{height: 480}}>
                 <Text style={{ color: COLORS.black, ...FONTS.h2 }}>Negocios</Text>
                 <View style={{
                width: 200,
                marginRight: SIZES.padding,
                marginLeft:  SIZES.padding,
                marginVertical: SIZES.radius,
                borderRadius: 16,
                backgroundColor: COLORS.white,
                elevation: 5
            }}>
                {/* Title */}
                <View style={{ flexDirection: 'row', padding: SIZES.padding, alignItems: 'center' }}>
                    <View
                        style={{
                            height: 50,
                            width: 50,
                            borderRadius: 25,
                            backgroundColor: COLORS.lightGray,
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginRight: SIZES.base
                        }}
                    >
                        <Image
                            source={icons.cloth_icon }
                            style={{
                                width: 30,
                                height: 30,
                                tintColor: COLORS.red
                            }}
                        />
                    </View>

                    <Text style={{ ...FONTS.h3, color: COLORS.red, }}>name</Text>
                </View>

                {/* Expense Description */}
                <View style={{ paddingHorizontal: SIZES.padding }}>
                    {/* Title and description */}
                    <Text style={{ ...FONTS.h2, }}>title</Text>
                    <Text style={{ ...FONTS.body3, flexWrap: 'wrap', color: COLORS.darkgray }}>
                        descripcion
                    </Text>

                    {/* Location */}
                    <Text style={{ marginTop: SIZES.padding, ...FONTS.h4, }}>Location</Text>
                    <View style={{ flexDirection: 'row' }}>
                        <Image
                            source={icons.pin}
                            style={{
                                width: 20,
                                height: 20,
                                tintColor: COLORS.darkgray,
                                marginRight: 5
                            }}
                        />
                        <Text style={{ marginBottom: SIZES.base, color: COLORS.darkgray, ...FONTS.body4 }}>location</Text>
                    </View>
                </View>

                {/* Price */}
                <View
                    style={{
                        height: 50,
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderBottomStartRadius: 16,
                        borderBottomEndRadius: 16,
                        backgroundColor: COLORS.red,
                    }}
                >
                    <Text style={{ color: COLORS.white, ...FONTS.body3 }}>CONFIRM 100 USD</Text>
                </View>
            </View>
        </View>
        <View>
    <TouchableOpacity
    style={{
      
      borderColor: 'rgba(0,0,0,0.2)',
      alignItems: 'center',
      justifyContent: 'center',
      width: 60,
      bottom: -200,
      right: -300,
      height: 60,
      elevation: 5,
      backgroundColor: '#fff',
      borderRadius: 100,
    }}
     onPress={() => {navigation.navigate('NewBusiness'); }}
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
