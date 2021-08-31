import React from 'react'
import { StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Image} from 'react-native'

  import AsyncStorage from '@react-native-async-storage/async-storage';

  import { icons,COLORS, SIZES, FONTS } from '../../constants'
  import APIKit, {setClientToken} from '../../shared/APIKit';
  
export default class Profile extends React.Component { 

  
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

            const onSuccess = async({data}) => {
              // Set JSON Web Token on success 
            setClientToken(data.token);
              
    
            await AsyncStorage.setItem('userCode', code)
						await AsyncStorage.setItem('userName', name)
						await AsyncStorage.setItem('userEmail', email)
						await AsyncStorage.setItem('userPassword', password)
						await AsyncStorage.setItem('isAuth', JSON.stringify(true))
						
						return this.state.navigation.replace('Home');
            
            };
    
            const onFailure = error => {
              console.log(error && error.response);
              this.setState({ errorText: 'Email o Contraseña incorrectos' });
              return alert(this.state.errorText);
            };
            
            APIKit.post('/users', payload,{header:{ 
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
        alignItems: 'center',
        justifyContent: 'center'
    }}>
        <Text>Editar Perfil</Text>
        <View
                        style={{
                            height: 110,
                            width: 110,
                            borderRadius: 55,
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: COLORS.black
                        }}
                    >
                        <Image
                            source={icons.user}
                            style={{
                                width: 100,
                                height: 100,
                                tintColor: COLORS.lightGray
                            }}
                        />
                    
          </View>
        <View style={{ margin: 10 }}>
          <TextInput
          style={{
            width: SIZES.width * 0.8,
            padding: SIZES.padding,
            alignItems: 'center',
            borderRadius: SIZES.radius,
            borderColor: COLORS.primary,
            borderWidth: SIZES.input,
            elevation: 5,
            backgroundColor: COLORS.white
        }}
            name='name'
            placeholder='Enter name'
            autoCapitalize='none'
            error={this.state.nameError}
						ref={this.nameRef}
						value={this.state.name}
						onChangeText={ (name) => this.setState({ name })} 
						onSubmitEditing={() => this.emailRef.current.focus()}
          />
        </View>
        <View style={{ margin: 10 }}>
          <TextInput
          style={{
            width: SIZES.width * 0.8,
            padding: SIZES.padding,
            alignItems: 'center',
            borderRadius: SIZES.radius,
            borderColor: COLORS.primary,
            borderWidth: SIZES.input,
            elevation: 5,
            backgroundColor: COLORS.white
        }}
            name='email'
            placeholder='Enter email'
            autoCapitalize='none'
            error={this.state.emailError}
						ref={this.emailRef}
						value={this.state.email}
						onChangeText={ (email) => this.setState({ email })} 
						onSubmitEditing={() => this.passwordRef.current.focus()}
          />
        </View>
        <View style={{ margin: 10 }}>
       
          <TextInput
          style={{
            width: SIZES.width * 0.8,
            padding: SIZES.padding,
            alignItems: 'center',
            borderRadius: SIZES.radius,
            borderColor: COLORS.primary,
            borderWidth: SIZES.input,
            elevation: 5,
            backgroundColor: COLORS.white
            
        }}
            name='password'
            error={this.state.passwordError}
						ref={this.passwordRef}
						value={this.state.password}
						onChangeText={ (password) => this.setState({ password })} 
						onSubmitEditing={() => this.confirmPasswordRef.current.focus()}
            placeholder='Enter password'
            secureTextEntry
            
          /> 
        </View>
     
       
        {/*Signup Button */}
        <View
                        style={{
                            padding: SIZES.padding * 0.5,
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}
                    >
                        <TouchableOpacity
                            style={{
                                width: SIZES.width * 0.8,
                                padding: SIZES.padding,
                                backgroundColor: COLORS.primary,
                                alignItems: 'center',
                                borderRadius: SIZES.radius,
                                elevation: 5,
                            }}
                            onPress={() => this.showData()}
                        >
                            <Text style={{ color: COLORS.white, ...FONTS.h2 }}>Guardar</Text>
                        </TouchableOpacity>
                    </View>
          {/*Signup Button */}
        <View
                        style={{
                            padding: SIZES.padding * 0.5,
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}
                    >
                        <TouchableOpacity
                            style={{
                                width: SIZES.width * 0.8,
                                padding: SIZES.padding,
                                backgroundColor: COLORS.secondary,
                                alignItems: 'center',
                                borderRadius: SIZES.radius,
                                elevation: 5,
                            }}
                            onPress={() => {
                              
                              navigation.navigate('Home');
                            }}
                        >
                            <Text style={{ color: COLORS.white, ...FONTS.h2 }}>Atras</Text>
                        </TouchableOpacity>
                    </View>

       
      </View>
        // <Button title='Go to Login' onPress={this.goToLogin} />
      
        )
      }
      }
