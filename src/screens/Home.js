import React from 'react'
import { StyleSheet,
  View,
  Text,
  TouchableOpacity,
  } from 'react-native'
  import Icon from 'react-native-vector-icons/FontAwesome';
  import AsyncStorage from '@react-native-async-storage/async-storage';
  import APIKit, {setClientToken} from '../shared/APIKit';
  import { COLORS, SIZES, FONTS, icons } from '../constants'
  import UserModel from '../models/User';
  import BusinessModel from '../models/Business';
  import {Calendar, CalendarList, Agenda} from 'react-native-calendars';
  import {toTimestamp, toDatetime } from '../shared/tools';

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
			this.mainbusiness();

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
    // var date = new Date();
    // var last_day = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0)
    // console.log(Date.now())
    // console.log(toTimestamp(new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0)))
    // console.log(last_day)
    // console.log(last_day.getDate())
    // console.log(last_day.getMonth() + 1)

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
        // this.setState({ isAuth: false});
        // this.state.navigation.replace('Login');
        this.loginoutsideloop();
       

       });



  }
  async loginoutsideloop(){
    
    const id = await AsyncStorage.getItem('id')
    const usuario = await UserModel.query({id: id})
    if(usuario.length > 0){
      this.setState({ isAuth: true})
      this.setState({ id: usuario[0].id})
      this.setState({ name: usuario[0].name})
      this.setState({ role: usuario[0].rol})
      this.setState({ currency: usuario[0].currency})
      this.setState({ email: usuario[0].email})
      this.setState({ isActive: usuario[0].isActive})
      this.setState({ business_id: usuario[0].business_id})
  
    }

  }
  async mainbusiness(){
    const id = await AsyncStorage.getItem('id')
    const business = [
      {
          name: 'Personal',
          code: 'HOME',
          categoria: 'Personal',
          user_id: id,
          icon: 'credit-card-alt',
          color: COLORS.primary,
      } 
  ]
    const negocio = await BusinessModel.query()

    if (negocio.length == 0) {

        var i;
        for (i = 0; i < business.length; i++) {
            const n = new BusinessModel(business[i])
            n.save()
        }
        console.log('Table negocio filled successfully')

    
  
    }

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
        justifyContent: 'center',
        
    }}
>
      <Text>Home</Text>
      <Text>{this.state.email}</Text>
    
   

    <TouchableOpacity
        style={{
            width: SIZES.width * 0.5,
            height: SIZES.width * 0.14,
            justifyContent: 'center',
            padding: SIZES.padding,
            backgroundColor: COLORS.primary,
            alignItems: 'center',
            borderRadius: SIZES.radius,
            elevation: 5,
            margin:5
        }}
        onPress={() => {this.state.navigation.replace('CalendarScreen')}
        }
    >
      <View style={{flexDirection:'row'}}> 
      <Icon size={20} name='calendar'
                                  style={{
                                      color: COLORS.white,
                                      margin:5
                                  }}/>
      <Text style={{ color: COLORS.white, ...FONTS.h2 }}>CALENDAR</Text>
      </View>
     
    </TouchableOpacity>
    <TouchableOpacity
        style={{
            width: SIZES.width * 0.5,
            height: SIZES.width * 0.14,
            justifyContent: 'center',
            padding: SIZES.padding,
            backgroundColor: COLORS.primary,
            alignItems: 'center',
            borderRadius: SIZES.radius,
            elevation: 5,
            margin:5
        }}
        onPress={() => {this.state.navigation.replace('Finance')}
        }
    >
        <View style={{flexDirection:'row'}}> 
      <Icon size={20} name='money'
                                  style={{
                                      color: COLORS.white,
                                      margin:5
                                  }}/>
      <Text style={{ color: COLORS.white, ...FONTS.h2 }}>FINANCE</Text>
      </View>
    </TouchableOpacity>
   
    <TouchableOpacity
        style={{
            width: SIZES.width * 0.5,
            height: SIZES.width * 0.14,
            justifyContent: 'center',
            padding: SIZES.padding,
            backgroundColor: COLORS.primary,
            alignItems: 'center',
            borderRadius: SIZES.radius,
            elevation: 5,
            margin:5
        }}
        onPress={() => {this.state.navigation.navigate('Transaction', {
          itemId: 1,
          otherParam: this.state.id,
        });}
        }
    >
        <View style={{flexDirection:'row'}}> 
      <Icon size={20} name='inbox'
                                  style={{
                                      color: COLORS.white,
                                      margin:5
                                  }}/>
      <Text style={{ color: COLORS.white, ...FONTS.h2 }}>INGRESO</Text>
      </View>
    </TouchableOpacity>
    <TouchableOpacity
        style={{
            width: SIZES.width * 0.5,
            height: SIZES.width * 0.14,
            justifyContent: 'center',
            padding: SIZES.padding,
            backgroundColor: COLORS.primary,
            alignItems: 'center',
            borderRadius: SIZES.radius,
            elevation: 5,
            margin:5
        }}
        onPress={() => {this.state.navigation.navigate('Transaction', {
          itemId: 2,
          otherParam: this.state.id,
        });}
        }
    >
        <View style={{flexDirection:'row'}}> 
      <Icon size={20} name='money'
                                  style={{
                                      color: COLORS.white,
                                      margin:5
                                  }}/>
      <Text style={{ color: COLORS.white, ...FONTS.h2 }}>GASTO</Text>
      </View>
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
