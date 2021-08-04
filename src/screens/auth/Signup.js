import React from 'react'
import { StyleSheet,
  View,
  TextInput,
  Text,
  TouchableOpacity,
  Image } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import APIKit, {setClientToken} from '../../shared/APIKit';

import { icons, COLORS, SIZES, FONTS } from '../../constants'
  

export default class Signup extends React.Component {
 
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
  


  goToLogin = () => this.props.navigation.navigate('Login')

  render() {
    return (
      <View style={styles.container}>
        
        <View
                        style={{
                            height: 110,
                            width: 110,
                            borderRadius: 55,
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: COLORS.primary
                        }}
                    >
                        <Image
                            source={icons.logo}
                            style={{
                                width: 100,
                                height: 100,
                                tintColor: COLORS.white
                            }}
                        />
                    
          </View>
        <View style={{ margin: 10 }}>
          <TextInput
          style={{
            width: SIZES.width * 0.8,
            height: SIZES.width * 0.1,
            padding: SIZES.padding,
            alignItems: 'center',
            justifyContent: 'center',
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
            height: SIZES.width * 0.1,
            justifyContent: 'center',
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
            height: SIZES.width * 0.1,
            justifyContent: 'center',
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
        <View style={{ margin: 10 }}>
       
          <TextInput
          style={{
            width: SIZES.width * 0.8,
            height: SIZES.width * 0.1,
            justifyContent: 'center',
            padding: SIZES.padding,
            alignItems: 'center',
            borderRadius: SIZES.radius,
            borderColor: COLORS.primary,
            borderWidth: SIZES.input,
            elevation: 5,
            backgroundColor: COLORS.white
            
        }}
            name='password'
            error={this.state.confirmPasswordError}
            ref={this.confirmPasswordRef}
            value={this.state.confirmPassword}
            onChangeText={ (confirmPassword) => this.setState({ confirmPassword })} 
            onSubmitEditing={() => this.codeRef.current.focus()}
            placeholder='Confirm password'
            secureTextEntry
            
          /> 
        </View>
        <View style={{ margin: 10 }}>
          <TextInput
          style={{
            width: SIZES.width * 0.8,
            height: SIZES.width * 0.1,
            justifyContent: 'center',
            padding: SIZES.padding,
            alignItems: 'center',
            borderRadius: SIZES.radius,
            borderColor: COLORS.primary,
            borderWidth: SIZES.input,
            elevation: 5,
            backgroundColor: COLORS.white
            
        }}
            name='code'
            ref={this.codeRef}
						value={this.state.code}
						onChangeText={ (code) => this.setState({ code })}
            placeholder='Código de Invitación'            
            autoCapitalize='characters'
            
            
            
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
                                height: SIZES.width * 0.1,
                                justifyContent: 'center',
                                padding: SIZES.padding,
                                backgroundColor: COLORS.primary,
                                alignItems: 'center',
                                borderRadius: SIZES.radius,
                                elevation: 5,
                            }}
                            onPress={() => this.showData()}
                        >
                            <Text style={{ color: COLORS.white, ...FONTS.h2 }}>Registrarse</Text>
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
                                height: SIZES.width * 0.1,
                                justifyContent: 'center',
                                padding: SIZES.padding,
                                backgroundColor: COLORS.secondary,
                                alignItems: 'center',
                                borderRadius: SIZES.radius,
                                elevation: 5,
                            }}
                            onPress={() => {
                              this.setState({ userEmail: '', userPassword: '', errorText: '' });
                              this.state.navigation.navigate('Login');
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
})
