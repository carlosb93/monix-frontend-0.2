import React, { Component } from 'react'
import { ScrollView, Switch, StyleSheet, Text, View } from 'react-native'
import { Avatar, ListItem } from 'react-native-elements'
import PropTypes from 'prop-types'
import {
  COLORS,
  SIZES,
  FONTS,
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
    email: '',
    token:'',
    isActive: '',
    business_id: 0,
    navigation: this.props.navigation,
    userEmail: null,
  }


  componentDidMount() {
    this._focusListener = this.props.navigation.addListener('focus', () => {
    this.filluser();

  });
}

componentWillUnmount() {
  this._focusListener();
}
  onPressSetting = () => {
    this.props.navigation.navigate('Options')
  }

  onChangePushNotifications = () => {
    this.setState(state => ({
      pushNotifications: !state.pushNotifications,
    }))
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
      this.setState({ email: usuario[0].email})
      this.setState({ isActive: usuario[0].isActive})
      this.setState({ business_id: usuario[0].business_id})
      
    }


  }
  render() {
    const { emails: [firstEmail] } = this.props
    return (
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
      <ListItem onPress={() => this.onPressSetting()} containerStyle={styles.listItemContainer}>
        <ListItem.Content >
          <View style={{flex:1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',}}>
            <BaseIcon containerStyle={{ backgroundColor: '#57DCE7'}} icon={{ type: 'font-awesome', name: 'credit-card', }}/>
            <ListItem.Title> Cuentas Activas </ListItem.Title>
          </View>
        </ListItem.Content>
        <ListItem.Content right>
        
        <Chevron/>
      
        </ListItem.Content>
      </ListItem>
      <ListItem onPress={() => this.onPressSetting()} containerStyle={styles.listItemContainer}>
        <ListItem.Content >
          <View style={{flex:1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',}}>
            <BaseIcon containerStyle={{ backgroundColor: '#FAD291'}} icon={{ type: 'font-awesome', name: 'money', }}/>
            <ListItem.Title> Moneda </ListItem.Title>
          </View>
        </ListItem.Content>
        <ListItem.Content right>
        <View style={{flex:1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',}}>
        <ListItem.Title style={{fontSize: 15, margin:8, color:COLORS.gray}}> USD  </ListItem.Title>
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
    )
  }
}

export default ProfilesScreen
