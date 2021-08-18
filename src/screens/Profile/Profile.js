import React, { Component } from 'react'
import { ScrollView, Switch, TouchableOpacity, Dimensions, StyleSheet, FlatList, Text, View,  Modal, TouchableHighlight } from 'react-native'
import { Avatar, ListItem } from 'react-native-elements'
import PropTypes from 'prop-types'
import {
  COLORS,
  SIZES,
  FONTS,
  currencyData,
  iconData,
  icons
} from '../../constants'
import { Nav } from '../../components'
import BaseIcon from './Icon'
import Chevron from './Chevron'
import InfoText from './InfoText'
import AsyncStorage from '@react-native-async-storage/async-storage';
import APIKit, {setClientToken} from '../../shared/APIKit';
import UserModel from '../../models/User';
import AccountModel from '../../models/Account';

const numColumns = 1;
const size = Dimensions.get('window').width / numColumns;
const stylesflat = StyleSheet.create({
  itemContainer: {
    width: size,
    height: size *0.30,
    margin: 5,
    alignItems: 'center',
    justifyContent: 'center',
  }
});

const styles = StyleSheet.create({
  scroll: {
    
    backgroundColor: '#F4F5F4'
  },
  userRow: {
    alignItems: 'center',
    backgroundColor: 'white',
    flexDirection: 'row',
    paddingBottom: 8,
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 6,
  },
  userImage: {
    marginRight: 12,
  },
  listItemContainer: {
    height: 55,
    borderWidth: 0.5,
    borderColor: '#ECECEC',
  },
})

class ProfilesScreen extends Component {

  state = {
    pushNotifications: true,
    avatar:require('../../assets/images/avatar-5.jpg'),
    isAuth: true,
    id: 0,
    name: '',
    role: '',
    currency: '',
    accounts: [],
    email: '',
    token:'',
    isActive: '',
    business_id: 0,
    navigation: this.props.navigation,
    userEmail: null,
    modalVisible: false,
  }


  componentDidMount() {
    this._focusListener = this.props.navigation.addListener('focus', () => {
    this.filluser();
    this.get_accounts();

  });
}

componentWillUnmount() {
  this._focusListener();
}

toggleModal(visible) {
  console.log(currencyData)
  this.setState({
    modalVisible: visible
  });
}

  onPressSetting = ({option}) => {
    if(option = 'account'){
      this.props.navigation.navigate('Accounts', {
        itemId: this.state.id,
        otherParam: '',
      })

    }else if(option = 'other'){
      this.props.navigation.navigate('Options', {
        itemId: this.state.id,
        otherParam: {option},
      })
    }
    
  }

  onChangePushNotifications = () => {
    this.setState(state => ({
      pushNotifications: !state.pushNotifications,
    }))
  }
  onPressCrypto = () => {
    this.props.navigation.navigate('Cryptocurrency')
  }
  setCurrency = async (currency) => {
    this.setState({currency: currency} )
    const user_id = this.state.id
    const user = await UserModel.find(user_id)
     
         if(user){
           user.currency = currency,
           user.save()
          }else{
            console.log('query error')

          }
          const payload ={
            'currency':currency,
          }



          const token = await AsyncStorage.getItem('token')
          await setClientToken(token);

          APIKit.put('/user/'+ user_id, payload,{header:{ 
            "Content-Type": "multipart/form-data",
            "Access-Control-Allow-Origin": "*"
          }})
            .then(onSuccess)
            .catch(onFailure);


            const onSuccess = async({data}) => {
              // Set JSON Web Token on success 
           console.log('success')
            
            };

            const onFailure = error => {
              console.log(error && error.response);
              // Set JSON Web Token on success 
              console.log('fail')
            
            };
  }

  async logOut () {

    await AsyncStorage.setItem('isAuth', JSON.stringify(false))
    await AsyncStorage.setItem('token', '')
    await AsyncStorage.setItem('id', JSON.stringify(0))
    this.state.navigation.replace('Login')
  }

  async filluser(){
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
  async get_accounts() {
 

    var accounts = [];
    try{
        accounts = await AccountModel.query({user_id: this.state.id});
    }catch{
     console.log('query accounts error')
    }

    this.setState({accounts: accounts}) 
  
}
  render() {
    const { emails: [firstEmail] } = this.props
    return (
      <View>
      <ScrollView style={styles.scroll}>
        <View style={styles.userRow}>
          <View style={styles.userImage}>
            <Avatar
              rounded
              size="large"
              source={this.state.avatar}
            />
          </View>
          <View>
            <Text style={{ fontSize: 16 }}>{this.state.name}</Text>
            <Text
              style={{
                color: 'gray',
                fontSize: 16,
              }}
            >
              {this.state.email}
            </Text>
          </View>
        </View>
        <InfoText text="Account" />
        <View>
      <ListItem containerStyle={styles.listItemContainer}>
        <ListItem.Content>
          <View style={{flex:1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',}}>
            <BaseIcon containerStyle={{ backgroundColor: '#FFADF2'}} icon={{ type: 'material', name: 'notifications', }}/>
            <ListItem.Title> Notificaciones </ListItem.Title>
          </View>
        </ListItem.Content>
        <ListItem.Content right>
          <Switch onValueChange={this.onChangePushNotifications} value={this.state.pushNotifications}/>
        </ListItem.Content>
      </ListItem>
      <ListItem onPress={() => this.onPressCrypto()} containerStyle={styles.listItemContainer}>
        <ListItem.Content>
          <View style={{flex:1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',}}>
            <BaseIcon containerStyle={{ backgroundColor: COLORS.softgray}} icon={{ type: 'font-awesome', name: 'bitcoin', }}/>
            <ListItem.Title> Crypto Tracker </ListItem.Title>
          </View>
        </ListItem.Content>
        <ListItem.Content right>
        <View style={{flex:1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',}}>
          <Chevron/>
          </View>
        </ListItem.Content>
      </ListItem>
      <ListItem onPress={() => this.onPressSetting('account')} containerStyle={styles.listItemContainer}>
        <ListItem.Content >
          <View style={{flex:1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',}}>
            <BaseIcon containerStyle={{ backgroundColor: '#57DCE7'}} icon={{ type: 'font-awesome', name: 'credit-card', }}/>
            <ListItem.Title> Cuentas Activas </ListItem.Title>
          </View>
        </ListItem.Content>
        <ListItem.Content right>
        <View style={{flex:1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',}}>

        <Text style={{ color: COLORS.primary, ...FONTS.h2 }}>{this.state.accounts.length     }     </Text>

        <Chevron/>
      </View>
        </ListItem.Content>
      </ListItem>
      <ListItem onPress={() => this.toggleModal(true)} containerStyle={styles.listItemContainer}>
        <ListItem.Content >
          <View style={{flex:1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',}}>
            <BaseIcon containerStyle={{ backgroundColor: '#FAD291'}} icon={{ type: 'font-awesome', name: 'money', }}/>
            <ListItem.Title> Moneda </ListItem.Title>
          </View>
        </ListItem.Content>
        <ListItem.Content right>
        <View style={{flex:1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',}}>
        <ListItem.Title style={{fontSize: 15, margin:8, color:COLORS.gray}}> {this.state.currency}  </ListItem.Title>
        <Chevron/>
        </View>
        </ListItem.Content>
      </ListItem>

      

      <ListItem onPress={() => this.onPressSetting()} containerStyle={styles.listItemContainer}>
        <ListItem.Content >
          <View style={{flex:1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',}}>
            <BaseIcon containerStyle={{ backgroundColor: '#FEA8A1'}} icon={{ type: 'material', name: 'language', }}/>
            <ListItem.Title> Idioma </ListItem.Title>
          </View>
        </ListItem.Content>
        <ListItem.Content right>
        <View style={{flex:1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',}}>
        <ListItem.Title style={{fontSize: 15, margin:8, color:COLORS.gray}}> Español  </ListItem.Title>
        <Chevron/>
        </View>
        </ListItem.Content>
      </ListItem>

        </View>
        <InfoText text="More" />
        <View>

        <ListItem onPress={() => this.onPressSetting()} containerStyle={styles.listItemContainer}>
        <ListItem.Content >
          <View style={{flex:1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',}}>
            <BaseIcon containerStyle={{ backgroundColor: '#A4C8F0'}} icon={{ type: 'ionicon', name: 'md-information-circle', }}/>
            <ListItem.Title> Sobre Nosotros </ListItem.Title>
          </View>
        </ListItem.Content>
        <ListItem.Content right>
       
        <Chevron/>
        
        </ListItem.Content>
      </ListItem>
        <ListItem onPress={() => this.onPressSetting()} containerStyle={styles.listItemContainer}>
        <ListItem.Content >
          <View style={{flex:1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',}}>
            <BaseIcon containerStyle={{ backgroundColor: '#C6C7C6'}} icon={{ type: 'entypo', name: 'light-bulb', }}/>
            <ListItem.Title> Términos y Condiciones </ListItem.Title>
          </View>
        </ListItem.Content>
        <ListItem.Content right>
       
        <Chevron/>
        
        </ListItem.Content>
      </ListItem>
        <ListItem onPress={() => this.onPressSetting()} containerStyle={styles.listItemContainer}>
        <ListItem.Content >
          <View style={{flex:1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',}}>
            <BaseIcon containerStyle={{ backgroundColor: '#C47EFF'}} icon={{ type: 'entypo', name: 'share', }}/>
            <ListItem.Title> Compartir App </ListItem.Title>
          </View>
        </ListItem.Content>
        <ListItem.Content right>
       
        <Chevron/>
        
        </ListItem.Content>
      </ListItem>
        {/* <ListItem onPress={() => this.onPressSetting()} containerStyle={styles.listItemContainer}>
        <ListItem.Content >
          <View style={{flex:1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',}}>
            <BaseIcon containerStyle={{ backgroundColor: '#FECE44'}} icon={{ type: 'entypo', name: 'star', }}/>
            <ListItem.Title> Rate Us </ListItem.Title>
          </View>
        </ListItem.Content>
        <ListItem.Content right>
       
        <Chevron/>
        
        </ListItem.Content>
      </ListItem > */}
        {/* <ListItem onPress={() => this.onPressSetting()} containerStyle={styles.listItemContainer} >
        <ListItem.Content >
          <View style={{flex:1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',}}>
            <BaseIcon containerStyle={{ backgroundColor: '#00C001'}} icon={{ type: 'materialicon', name: 'feedback', }}/>
            <ListItem.Title> Send FeedBack </ListItem.Title>
          </View>
        </ListItem.Content>
        <ListItem.Content right>
        <View style={{flex:1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',}}>
           
            <Chevron/>
          </View>
       
        
        </ListItem.Content>
      </ListItem> */}
        <ListItem onPress={() => this.logOut()} containerStyle={styles.listItemContainer} >
        <ListItem.Content >
          <View style={{flex:1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',}}>
            <BaseIcon containerStyle={{ backgroundColor: '#FEA8A1'}} icon={{ type: 'materialicon', name: 'logout', }}/>
            <ListItem.Title> Salir </ListItem.Title>
          </View>
        </ListItem.Content>
        <ListItem.Content right>
        <View style={{flex:1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',}}>
           
            <Chevron/>
          </View>
       
        
        </ListItem.Content>
      </ListItem>

          
        </View>
        
      </ScrollView>

      <View
      style={{
          padding: SIZES.padding * 0.5,
          alignItems: 'center',
          justifyContent: 'center'
      }}
  >
       <Modal animationType = {"slide"} transparent = {false}
        visible = {this.state.modalVisible}
onRequestClose = {() => { console.log("Modal has been closed.") } }>

<View style = {{flex: 1,
alignItems: 'center',

backgroundColor:COLORS.transparent}}>

<Text  style={{ color: COLORS.black,paddingBottom:50, ...FONTS.h2 }}>Selecciona una Moneda!</Text>
<FlatList
      data={currencyData}
      renderItem={({item}) => (
        <View style={stylesflat.itemContainer}>
         <TouchableOpacity
       style={{
           width: SIZES.width * 0.8,
           height: SIZES.width * 0.25,
           backgroundColor: this.state.currency == item.name ? COLORS.primary : COLORS.white,
           alignItems: 'center',
           justifyContent: 'center',
           borderRadius: 8,
           elevation: 5,
       }}
       onPress = {() => {
         this.setCurrency(item.name)
        this.toggleModal(!this.state.modalVisible)
      }}>
             <Text style={{color: COLORS.black, ...FONTS.h2 }}>{item.name}</Text>
   </TouchableOpacity>
        </View>
      )}
      keyExtractor={item => item.id}
      numColumns={numColumns} />

<View
      style={{
          
          alignItems: 'center',
          justifyContent: 'center',
          height: 60,
          width: 30,
      }}
  >
<TouchableHighlight style={{
              width: SIZES.width * 0.8,
              height: SIZES.width * 0.1,
              padding: SIZES.padding,
              backgroundColor: COLORS.secondary,
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: SIZES.radius,
              elevation: 5,
          }} onPress = {() => {
            this.toggleModal(!this.state.modalVisible)
            }}>
   
   <Text style={{ color: COLORS.white, ...FONTS.h2 }}>Cancelar</Text>
</TouchableHighlight>
</View>
</View>


</Modal>
</View>
</View>
    )
  }
}

export default ProfilesScreen
