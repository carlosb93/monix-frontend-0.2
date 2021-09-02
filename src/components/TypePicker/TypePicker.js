import React from 'react'
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Modal,
  Image,
  ScrollView,
  FlatList,
  Dimensions,
  TouchableHighlight
} from 'react-native'
import BaseIcon from './Icon'
import {
  FontAwesomeIcon
} from '@fortawesome/react-native-fontawesome'
import {
  faUser,
  faEyeDropper,
  faArchive,
  faCircle
} from '@fortawesome/free-solid-svg-icons'
import Icon from 'react-native-vector-icons/FontAwesome';
import {
  COLORS,
  SIZES,
  FONTS,
  iconData
} from '../../constants'

import { Colors } from 'react-native/Libraries/NewAppScreen';




const numColumns = 3;
const size = Dimensions.get('window').width / numColumns;
const stylesflat = StyleSheet.create({
  itemContainer: {
    width: size,
    height: size,
    margin: 1,
  }
});

export default class TypePicker extends React.Component {

constructor(props) {
    super(props);
    this.state = {
        low:5,
        mid: 0,
        high: 0,
        priority: 1,
    }
}

togglePriority(priority) {

if(priority == 1){
  this.setState({low:5})
  this.setState({mid:0})
  this.setState({high:0})
  this.props.parentCallback(priority);

}
if(priority == 2){
  this.setState({low:0})
  this.setState({mid:5})
  this.setState({high:0})
  this.props.parentCallback(priority);

}
if(priority == 3){
  this.setState({low:0})
  this.setState({mid:0})
  this.setState({high:5})
  this.props.parentCallback(priority);

}

}




render() { 
 return (
  <View style={{flex: 1,flexDirection: 'column', paddingBottom: 30}}>
  <View style={{flex: 1,flexDirection: 'row', alignItems: 'center',
                            justifyContent: 'center',paddingBottom: 30}}>
                    
                    <View
                        style={{
                            alignItems: 'center',
                            justifyContent: 'center',
                            height: 50,
                            margin:5
                        }}
                    >
                        <TouchableOpacity
                            style={{
                                width: SIZES.width * 0.23,
                                height: SIZES.width * 0.1,
                                padding: SIZES.padding,
                                backgroundColor: COLORS.green,
                                alignItems: 'center',
                                justifyContent: 'center',
                                borderRadius: SIZES.radius,
                                borderColor:this.state.low == 5 ? COLORS.softGray : COLORS.green,
                                borderWidth: this.state.low == 5 ? 3 : 0,
                                elevation: this.state.low,
                            }}
                            onPress = {() => {this.togglePriority(1)}}
                        >
                            <View style={{flexDirection: 'row', alignItems: 'center',
                            justifyContent: 'center'}}>
                            {/* <Icon size={12} name={ this.state.low == 5 ? 'circle' : 'circle-o'} style={{color: COLORS.softgray}}/> */}
                            <BaseIcon containerStyle={{ backgroundColor: COLORS.green }} icon={{ type: 'ionicon', name: 'md-information-circle' }}/>
                            <Text style={{fontSize: 15,marginVertical: 20,color: COLORS.white}}> Low</Text>
                            </View>
                        </TouchableOpacity>
                        </View>

                    <View style={{
                           alignItems: 'center',
                            justifyContent: 'center',
                            height: 50,
                            margin:5
                        }}
                    >
                        <TouchableOpacity
                            style={{
                                width: SIZES.width * 0.3,
                                height: SIZES.width * 0.1,
                                padding: SIZES.padding,
                                backgroundColor: COLORS.yellow,
                                alignItems: 'center',
                                justifyContent: 'center',
                                borderRadius: SIZES.radius,
                                borderColor:this.state.mid == 5 ? COLORS.softGray : COLORS.yellow,
                                borderWidth: this.state.mid == 5 ? 3 : 0,
                                elevation: this.state.mid,
                            }}
                            onPress = {() => {this.togglePriority(2)}}
                        >
                             <View style={{flexDirection: 'row', alignItems: 'center',
                            justifyContent: 'center'}}>
                             {/* <Icon size={12} name={ this.state.mid == 5 ? 'circle' : 'circle-o'} style={{color: COLORS.softgray}}/> */}
                             <BaseIcon containerStyle={{ backgroundColor: COLORS.yellow }} icon={{ type: 'ionicon', name: 'md-warning' }}/>
                            <Text style={{fontSize: 15,marginVertical: 20,color: COLORS.white}}> Medium</Text>
                            </View>
                        </TouchableOpacity>
                        </View>
                    <View
                        style={{
                           alignItems: 'center',
                            justifyContent: 'center',
                            height: 50,
                            margin:5
                        }}
                    >
                        <TouchableOpacity
                            style={{
                                width: SIZES.width * 0.23,
                                height: SIZES.width * 0.1,
                                padding: SIZES.padding,
                                backgroundColor:  COLORS.peach,
                                alignItems: 'center',
                                justifyContent: 'center',
                                borderRadius: SIZES.radius,
                                borderColor:this.state.high == 5 ? COLORS.softGray : COLORS.peach,
                                borderWidth: this.state.high == 5 ? 3 : 0,
                                elevation: this.state.high,
                            }}
                            onPress = {() => {this.togglePriority(3)}}
                        >
                             <View style={{flexDirection: 'row', alignItems: 'center',
                            justifyContent: 'center'}}>
                              {/* <Icon size={12} name={ this.state.high == 5 ? 'circle' : 'circle-o'} style={{color: COLORS.softgray}}/> */}
                              <BaseIcon containerStyle={{ backgroundColor: COLORS.peach }} icon={{ type: 'ionicon', name: 'md-flame' }}/>
                            <Text style={{fontSize: 15,marginVertical: 20,color: COLORS.white}}> High</Text>
                            </View>
                        </TouchableOpacity>
                        </View>

                        </View>
                        
                    </View>
    )
}
}