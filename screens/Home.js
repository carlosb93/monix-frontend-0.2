import React from 'react'
import { StyleSheet,
  View,
  Text,
  TouchableOpacity} from 'react-native'

  import AsyncStorage from '@react-native-async-storage/async-storage';
  import APIKit, {setClientToken} from '../shared/APIKit';
  import { COLORS, SIZES, FONTS } from '../constants'
  import UserModel from '../models/User';

export default class Home extends React.Component { 

  
  constructor(props) {
    super(props);
		this.state = {
      navigation: props.navigation,
      userEmail: null,
		}
  }
  
  
  componentDidMount() {
		this._focusListener = this.props.navigation.addListener('focus', () => {
			this.verifysession();
			this.getData();

		});
  }

  componentWillUnmount() {
		this._focusListener();
  }

  async getData () {
		await AsyncStorage.getItem('userEmail')
			.then((value) => this.setState({ userEmail: value }));

  }
  async verifysession () {
    setClientToken(AsyncStorage.getItem('token'));

		APIKit.get('/auth/me' )
      .then((res) => {
        
        if(res.data.user.isActive == 0 ){
          APIKit.get('/auth/logout' ,{header:{ 
            "Content-Type": "multipart/form-data",
            "Access-Control-Allow-Origin": "*"
          }})
      .then(res => {
        const user = UserModel.find(res.data.user.id)
        user.isAuth = false
        user.save()

        AsyncStorage.removeItem('token')
        AsyncStorage.removeItem('id')
        AsyncStorage.removeItem('status')
        AsyncStorage.removeItem('role')
        AsyncStorage.removeItem('email')
        AsyncStorage.removeItem('isActive')
        AsyncStorage.removeItem('business_id')
        AsyncStorage.setItem('isAuth', 'false')
        this.state.navigation.replace('Login')

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
        AsyncStorage.setItem('id', toString(res.data.user.id))
        AsyncStorage.setItem('status', 'true')
        AsyncStorage.setItem('role', res.data.role.name)
        AsyncStorage.setItem('email', res.data.user.email)
        AsyncStorage.setItem('isActive', res.data.user.isActive)
        AsyncStorage.setItem('business_id', '1')
        AsyncStorage.setItem('isAuth', 'true')

        }else{

        AsyncStorage.removeItem('status')
        AsyncStorage.setItem('id', toString(res.data.user.id))
        AsyncStorage.setItem('status', 'false')
        AsyncStorage.setItem('role', res.data.role.name)
        AsyncStorage.setItem('email', res.data.user.email)
        AsyncStorage.setItem('isActive', res.data.user.isActive)
        AsyncStorage.setItem('business_id', '1')
        AsyncStorage.setItem('isAuth', 'true')
        }}
        }
      })
      .catch((error) => {
        console.log(error);
        AsyncStorage.setItem('status', 'false');
        AsyncStorage.setItem('isAuth', 'false');
        this.state.navigation.replace('Login')
       });

  }
  
  render() {

  const { navigation } = this.state;

  return (
    <View
    style={{
        padding: SIZES.padding * 0.5,
        alignItems: 'center',
        justifyContent: 'center'
    }}
>
      <Text>Home</Text>
      <Text>{this.state.userEmail}</Text>
    
   
    <TouchableOpacity
        style={{
            width: SIZES.width * 0.8,
            padding: SIZES.padding,
            backgroundColor: COLORS.primary,
            alignItems: 'center',
            borderRadius: SIZES.radius,
            elevation: 5,
        }}
        onPress={() => {
                  const user = UserModel.find(AsyncStorage.getItem('id'))
                  user.isAuth = false,
                  user.save()
                  AsyncStorage.setItem('isAuth', 'false')
                  navigation.replace('Login')
            
        }
        }
    >
        <Text style={{ color: COLORS.white, ...FONTS.h2 }}>Salir</Text>
    </TouchableOpacity>
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
