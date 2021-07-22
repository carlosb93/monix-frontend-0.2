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
      isAuth: true,
      id: 0,
      name: '',
      role: '',
      email: '',
      token:'',
      isActive: '',
      business_id: 0,
      navigation: props.navigation,
      userEmail: null,
		}
  }
  
  
  componentDidMount() {
		  this._focusListener = this.props.navigation.addListener('focus', () => {
			this.verifysession();

		});
  }

  componentWillUnmount() {
		this._focusListener();
  }

  async logOut () {

    await AsyncStorage.setItem('isAuth', JSON.stringify(false))
    await AsyncStorage.setItem('token', '')
    await AsyncStorage.setItem('id', JSON.stringify(0))
    this.state.navigation.replace('Login')
  }

  async verifysession() {


 
    const token = await AsyncStorage.getItem('token')
    this.setState({token: await AsyncStorage.getItem('token')})
    await setClientToken(token);
    console.log('///////////////////////////// token /////////////////////////////////////////')
    console.log(token)

    await APIKit.get('/auth/me').then((res) => {
        

    if(res.data.user.isActive == 0 ){

           this.logOut()

    }else{
        
        this.setState({ isAuth: true})
        this.setState({ id: res.data.user.id})
        this.setState({ name: res.data.user.name})
        this.setState({ role: res.data.role.name})
        this.setState({ email: res.data.user.email})
        this.setState({ isActive: res.data.user.isActive})
        this.setState({ business_id: res.data.branch_data[0].business_id})

      if(this.state.isAuth){
        this.filluser();
      }
    }
    }).catch((error) => {  
        this.setState({ isAuth: false});
        // this.state.navigation.replace('Login');
       });



  }
  async filluser(){
    
    const usuario = await UserModel.query({id: this.state.id})

    if(usuario.length > 0){

      this.setState({ isAuth: true});

        await AsyncStorage.setItem('isAuth', JSON.stringify(true))
        await AsyncStorage.setItem('id', JSON.stringify(this.state.id))
        await AsyncStorage.setItem('token', this.state.token)
        

        const user_id = this.state.id
         const user = await UserModel.find(user_id)
     
         if(user){
     

           user.name = this.state.name,
           user.email = this.state.email,
           user.rol = this.state.role,
           user.isActive = this.state.isActive,
           user.token = this.state.token,
           user.isAuth = true,
           user.save()

          }else{
            console.log('query error')

          }
    
     }else{
      await AsyncStorage.setItem('isAuth', JSON.stringify(true))
      await AsyncStorage.setItem('id', JSON.stringify(this.state.id))
      await AsyncStorage.setItem('token', this.state.token)

      const props = {
        user_id: this.state.id,
        name: this.state.name,
        email: this.state.email,
        rol: this.state.role,
        token: this.state.token,
        isActive: this.state.isActive,
        isAuth: true
       }

      
      const newuser = new UserModel(props)
      newuser.save()
      
    }


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
      <Text>{this.state.email}</Text>
    
   
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
        onPress={() => {
                 this.logOut();
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
