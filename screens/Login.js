import React from 'react'
import { StyleSheet,
         View,
         TextInput,
         Text,
         TouchableOpacity,
         Image } from 'react-native'

import { icons, COLORS, SIZES, FONTS } from '../constants'
import AsyncStorage from '@react-native-async-storage/async-storage';

import APIKit, {setClientToken} from '../shared/APIKit';

export default class Login extends React.Component {

  constructor(props) {
		super(props);
		this.emailRef = React.createRef();
		this.passwordRef = React.createRef();
		this.state = {
			userEmail: '',
			userPassword: '',
			userName: '',
			errorText: 'Error in Value',
			actualEmail: '',
			actualPassword: '',
			navigation: this.props.navigation
		}
	}

  componentDidMount = async() => {
		await AsyncStorage.getItem('userEmail')
			.then((value) => this.setState({ actualEmail: value }));
		await AsyncStorage.getItem('userPassword')
			.then((value) => this.setState({ actualPassword: value }));
		
		// alert(this.state.actualEmail + ", " + this.state.actualPassword)
  }
  
  dataValidation = () => {
		
		let passwordRegex = /^(?=.*?[0-9]).{8,}$/;
		// let passwordRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
		let emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

		if (emailRegex.test(this.state.userEmail)) {
			if (passwordRegex.test(this.state.userPassword)) {

        var bodyFormData = new FormData();
        bodyFormData.append('email', this.state.userEmail);
        bodyFormData.append('password', this.state.userPassword); 

        const onSuccess = ({data}) => {
          // Set JSON Web Token on success 
       
        setClientToken(data.token);
        AsyncStorage.setItem('token', data.token)
        this.setState({ actualPassword: this.state.userPassword});
        this.setState({ userName: 'Carlos'});
        this.setState({ actualPassword: '93050807702'});
        AsyncStorage.setItem('isAuth', 'true')   

        if (this.state.actualEmail === this.state.userEmail && this.state.actualPassword === this.state.userPassword ) {

          APIKit.get('/auth/me' ,{header:{ 
            "Content-Type": "multipart/form-data",
            "Access-Control-Allow-Origin": "*"
          }})
            .then((res) => {
              if(res.data.user.isActive == 0 ){
                APIKit.get('/auth/logout' ,{header:{ 
                  "Content-Type": "multipart/form-data",
                  "Access-Control-Allow-Origin": "*"
                }})
            .then(res => {
              
              AsyncStorage.removeItem('token')
              AsyncStorage.removeItem('status')
              AsyncStorage.removeItem('role')
              AsyncStorage.removeItem('email')
              AsyncStorage.removeItem('isActive')
              AsyncStorage.removeItem('business_id')
              AsyncStorage.setItem('isAuth', 'false')
              navigation.replace('Login')
    
            // this.$notify({
            //   message: 'Su usuario esta inactivo',
            //   title: this.name_app,
            //   component: NotificationTemplate,
            //   icon: "tim-icons icon-bell-55",
            //   type: 'warning',
            //   timeout: 2000
            // });
            }).catch(res => {
              if(res.status_code === 422) {
                this.res = res;
              }
              this.res = res;
              alert(this.res);
            });
    
              }else{
            
                
      if(res.data.role != null){
        
     if(res.data.role.name == 'Admin_negocio' || res.data.role.name == 'Administrator'){

      

              AsyncStorage.removeItem('status')
              AsyncStorage.setItem('status', 'true')
              AsyncStorage.setItem('role', res.data.role.name)
              AsyncStorage.setItem('email', res.data.user.email)
              AsyncStorage.setItem('isActive', res.data.user.isActive)
              AsyncStorage.setItem('business_id', res.data.branch_data[0].business_id)
              AsyncStorage.setItem('isAuth', 'true')

              }else{
              AsyncStorage.removeItem('status')
              AsyncStorage.setItem('status', 'false')
              AsyncStorage.setItem('role', res.data.role.name)
              AsyncStorage.setItem('email', res.data.user.email)
              AsyncStorage.setItem('isActive', res.data.user.isActive)
              AsyncStorage.setItem('business_id', res.data.branch_data[0].business_id)
              AsyncStorage.setItem('isAuth', 'true')
              }}
              }
            })
            .catch((error) => {
              AsyncStorage.setItem('status', 'false');
             });


					return this.state.navigation.replace('Home');
        }
        
        };

        const onFailure = error => {
          console.log(error && error.response);
          this.setState({ userEmail: '', userPassword: '', errorText: 'Email o Contraseña incorrectos' });
					return alert(this.state.errorText);
        };

        this.setState({isLoading: true});

        APIKit.post('/auth/login', bodyFormData,{header:{ 
          "Access-Control-Allow-Origin": "*",
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
            placeholder='Enter email'
            autoCapitalize='none'
            onChangeText={(userEmail) => this.setState({ userEmail })}
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
