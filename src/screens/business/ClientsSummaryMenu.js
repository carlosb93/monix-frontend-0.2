import React, { Component } from 'react'
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    TextInput,
    Modal,
    Image,
    ScrollView,
    Switch,
    FlatList,
    Button,
    Dimensions,
    TouchableHighlight
  } from 'react-native'

import { Avatar, ListItem } from 'react-native-elements'
import PropTypes from 'prop-types'
import {
    COLORS,
    SIZES,
    FONTS,
    iconData,
    icons
  } from '../../constants'
import BaseIcon from '../Profile/Icon'
import Chevron from '../Profile/Chevron'
import InfoText from '../Profile/InfoText'
import AsyncStorage from '@react-native-async-storage/async-storage';
import APIKit, {setClientToken} from '../../shared/APIKit';
import UserModel from '../../models/User';
import Icon from 'react-native-vector-icons/FontAwesome';


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
      margin:10,
      height: 80,
      borderRadius:10,
      elevation:5,
      backgroundColor:COLORS.white,
    },
  })
  


export default class ClientsSummaryMenu extends React.Component {

    
  constructor(props) {
    super(props);
    this.state = {
    pushNotifications: true,
    navigation: this.props.navigation,
    negocioId: this.props.route.params.itemId,
    otherParam: this.props.route.params.otherParam,

    }

  }
 
  componentDidMount() {
    this._focusListener = this.props.navigation.addListener('focus', () => {
  })
}

  componentWillUnmount() {
    this._focusListener();
  }

  onChangePushNotifications = () => {
    this.setState(state => ({
      pushNotifications: !state.pushNotifications,
    }))
  }
  
  onPressSetting = () => {
    this.state.navigation.navigate('GraphKidsVsPregnant', {
      itemId: this.state.negocioId,
      otherParam: this.state.otherParam,
    }); 
  }
  onPressSetting2 = () => {
    this.state.navigation.navigate('GraphKidsByAge', {
      itemId: this.state.negocioId,
      otherParam: this.state.otherParam,
    }); 
  }
  onPressSetting3 = () => {
    this.state.navigation.navigate('GraphOutdoorsVsIndoors', {
      itemId: this.state.negocioId,
      otherParam: this.state.otherParam,
    }); 
  }
  
  render() { 
    const { navigation  } = this.state;
  
  
    return (
        <View >
           <View  style={{
        backgroundColor:COLORS.transparent,
        height: 35,
        width: Dimensions.get('window').width,
    }}>
                 
                 <View
                  style={{
                    flex:1,
                    flexDirection: 'row',
                    
                      height:30,
                      width: Dimensions.get('window').width,
                      backgroundColor: COLORS.primary,
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      marginRight: SIZES.base
                  }}
              >
                 <TouchableOpacity
     onPress={() => {navigation.navigate('BusinessClients',{
      itemId: this.state.negocioId,
      otherParam: this.state.otherParam,
    }); }}
  >
     <Image
                            source={icons.left_arrow}
                            resizeMode="contain"
                            style={{
                                width: 25,
                                height: 25,
                                margin:6,
                                tintColor: COLORS.white,
                            }}
                        />
                </TouchableOpacity>

                  <Text style={{ color: COLORS.white, ...FONTS.h2 }}>Menu</Text>

                  <TouchableOpacity>
                  <Icon size={30} name='trash-o'
                                  style={{
                                    margin:8,
                                    color: COLORS.transparent,
                                  }}/>
</TouchableOpacity>
              </View>
              </View>
              
              <ScrollView style={styles.scroll}>
              <View >
      <ListItem onPress={() => this.onPressSetting()} containerStyle={styles.listItemContainer}>
        <ListItem.Content>
          <View style={{flex:1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',}}>
            <BaseIcon containerStyle={{ backgroundColor: COLORS.primary}} icon={{ type: 'font-awesome', name: 'pie-chart', }}/>
            <ListItem.Title style={{color: COLORS.black }}> Niños vs Embarazadas </ListItem.Title>
          </View>
        </ListItem.Content>
        <ListItem.Content right>
        <Chevron/>
        </ListItem.Content>
      </ListItem>
      <ListItem onPress={() => this.onPressSetting2()} containerStyle={styles.listItemContainer}>
        <ListItem.Content>
          <View style={{flex:1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',}}>
            <BaseIcon containerStyle={{ backgroundColor: COLORS.primary}} icon={{ type: 'font-awesome', name: 'bar-chart', }}/>
            <ListItem.Title style={{color: COLORS.black }}> Niños por Edades </ListItem.Title>
          </View>
        </ListItem.Content>
        <ListItem.Content right>
        <Chevron/>
        </ListItem.Content>
      </ListItem>
      <ListItem onPress={() => this.onPressSetting3()} containerStyle={styles.listItemContainer}>
        <ListItem.Content>
          <View style={{flex:1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',}}>
            <BaseIcon containerStyle={{ backgroundColor: COLORS.primary}} icon={{ type: 'font-awesome', name: 'building', }}/>
            <ListItem.Title style={{color: COLORS.black }}> Exteriores vs Estudio </ListItem.Title>
          </View>
        </ListItem.Content>
        <ListItem.Content right>
        <Chevron/>
        </ListItem.Content>
      </ListItem>
</View>
            </ScrollView>


              </View>



          
    )}

}