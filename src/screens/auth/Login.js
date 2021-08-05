import React from 'react'
import { StyleSheet,
         View,
         TextInput,
         Text,
         TouchableOpacity,
         Image } from 'react-native'
import { icons, COLORS, SIZES, FONTS } from '../../constants'
import AsyncStorage from '@react-native-async-storage/async-storage';
import APIKit, {setClientToken} from '../../shared/APIKit';

export default class Login extends React.Component {

  constructor(props) {
		super(props);
		this.emailRef = React.createRef();
		this.passwordRef = React.createRef();
		this.state = {
      isAuth: true,
      id: 0,
      name: '',
      role: '',
      email: '',
      token:'',
      isActive: '',
      business_id: 0,
			userEmail: '',
			userPassword: '',
			userName: '',
			errorText: 'Error in Value',
			actualEmail: '',
			actualPassword: '',
			navigation: this.props.navigation
		}
	}
  
  dataValidation = async() => {
		
		let passwordRegex = /^(?=.*?[0-9]).{8,}$/;
		// let passwordRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
		let emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

		if (emailRegex.test(this.state.userEmail)) {
			if (passwordRegex.test(this.state.userPassword)) {

        var bodyFormData = new FormData();
        bodyFormData.append('email', this.state.userEmail);
        bodyFormData.append('password', this.state.userPassword); 
        


const onSuccess = async({data}) => {
 
          // Set JSON Web Token on success 
     
      setClientToken(data.token);
      this.setState({ token: data.token});
      this.setState({ isAuth: true});

      await AsyncStorage.setItem('isAuth', JSON.stringify(true))
      await AsyncStorage.setItem('token', this.state.token)

      return this.state.navigation.replace('Home');
        
        };

    const onFailure = error => {
          console.log(error && error.response);
          this.setState({ userEmail: '', userPassword: '', errorText: 'Email o Contraseña incorrectos' });
					return alert(this.state.errorText);
        };

       

        this.setState({isLoading: true});




        await APIKit.post('/auth/login', bodyFormData,{header:{
          "Content-Type": "multipart/form-data",
        }})
          .then(onSuccess)
          .catch(onFailure);


				
			} else {
				this.setState({ userEmail: '', userPassword: '', errorText: 'Contraseña incorrecta' });
				return alert(this.state.errorText);
			}
		} else {
			this.setState({ userEmail: '', userPassword: '', errorText: 'Email incorrecto' });
			return alert(this.state.errorText);
		}

 	}

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
            borderRadius: SIZES.radius,
            borderColor: COLORS.primary,
            borderWidth: SIZES.input,
            elevation: 5,
            backgroundColor: COLORS.white
        }}
            name='userEmail'
            value={this.state.userEmail}
            placeholder='Ingrese email'
            autoCapitalize='none'
            onChangeText={(userEmail) => this.setState({ userEmail })}
            onSubmitEditing={() => this.passwordRef.current.focus()}
          />
        </View>
        <View style={{ margin: 10 }}>
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
            name='userPassword'
            ref={this.passwordRef}
						value={this.state.userPassword}
            placeholder='Enter userPassword'
            secureTextEntry
            onChangeText={ (userPassword) => this.setState({ userPassword })}
            
          />
        </View>
        {/*Login Button */}
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
                            onPress={this.dataValidation}
                        >
                            <Text style={{ color: COLORS.white, ...FONTS.h2 }}>Entrar</Text>
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
                              this.state.navigation.navigate('Signup');
                            }}
                        >
                            <Text style={{ color: COLORS.white, ...FONTS.h2 }}>Registrarse</Text>
                        </TouchableOpacity>
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
    justifyContent: 'center'
  }
})
