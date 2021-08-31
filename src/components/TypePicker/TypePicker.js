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
        selectedBlue:5,
        selectedGreen: 0,
        selectedyellow: 0,
        selectedPeach: 0,
        selectedPurple: 0,
        ColorPicker:COLORS.primary,
    }
}

sendData = (color) => {
    this.props.parentCallback(color);
}

toggleColor(color) {
if(color == COLORS.primary){
  this.setState({selectedBlue:5})
  this.setState({selectedGreen:0})
  this.setState({selectedyellow:0})
  this.setState({selectedPeach:0})
  this.setState({selectedPurple:0})

}
if(color == COLORS.green){
  this.setState({selectedBlue:0})
  this.setState({selectedGreen:5})
  this.setState({selectedyellow:0})
  this.setState({selectedPeach:0})
  this.setState({selectedPurple:0})

}
if(color == COLORS.yellow){
  this.setState({selectedBlue:0})
  this.setState({selectedGreen:0})
  this.setState({selectedyellow:5})
  this.setState({selectedPeach:0})
  this.setState({selectedPurple:0})

}
if(color == COLORS.peach){
  this.setState({selectedBlue:0})
  this.setState({selectedGreen:0})
  this.setState({selectedyellow:0})
  this.setState({selectedPeach:5})
  this.setState({selectedPurple:0})

}
if(color == COLORS.purple){
  this.setState({selectedBlue:0})
  this.setState({selectedGreen:0})
  this.setState({selectedyellow:0})
  this.setState({selectedPeach:0})
  this.setState({selectedPurple:5})

}

this.setState({
  ColorPicker: color
});

this.sendData(color)
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
                            margin:10
                        }}
                    >
                        <TouchableOpacity
                            style={{
                                width: SIZES.width * 0.3,
                                height: SIZES.width * 0.05,
                                padding: SIZES.padding,
                                backgroundColor: COLORS.white,
                                alignItems: 'center',
                                justifyContent: 'center',
                                borderRadius: SIZES.radius,
                                elevation: this.state.selectedBlue,
                            }}
                            onPress = {() => {this.toggleColor(COLORS.primary)}}
                        >
                            <View style={{flexDirection: 'row', alignItems: 'center',
                            justifyContent: 'center'}}>
                            <Icon size={12} name={ this.state.selectedBlue == 5 ? 'circle' : 'circle-o'} style={{color: COLORS.softgray}}/>
                            <Text style={{fontSize: 13,marginVertical: 20,color: COLORS.softgray}}> Recordatorio</Text>
                            </View>
                        </TouchableOpacity>
                        </View>

                    <View style={{
                           alignItems: 'center',
                            justifyContent: 'center',
                            height: 50,
                            margin:10
                        }}
                    >
                        <TouchableOpacity
                            style={{
                                width: SIZES.width * 0.2,
                                height: SIZES.width * 0.05,
                                padding: SIZES.padding,
                                backgroundColor: COLORS.white,
                                alignItems: 'center',
                                justifyContent: 'center',
                                borderRadius: SIZES.radius,
                                elevation: this.state.selectedGreen,
                            }}
                            onPress = {() => {this.toggleColor(COLORS.green)}}
                        >
                             <View style={{flexDirection: 'row', alignItems: 'center',
                            justifyContent: 'center'}}>
                             <Icon size={12} name={ this.state.selectedGreen == 5 ? 'circle' : 'circle-o'} style={{color: COLORS.softgray}}/>
                            <Text style={{fontSize: 13,marginVertical: 20,color: COLORS.softgray}}> Nota</Text>
                            </View>
                        </TouchableOpacity>
                        </View>
                    <View
                        style={{
                           alignItems: 'center',
                            justifyContent: 'center',
                            height: 50,
                            margin:10
                        }}
                    >
                        <TouchableOpacity
                            style={{
                                width: SIZES.width * 0.2,
                                height: SIZES.width * 0.05,
                                padding: SIZES.padding,
                                backgroundColor:  COLORS.white,
                                alignItems: 'center',
                                justifyContent: 'center',
                                borderRadius: SIZES.radius,
                                elevation: this.state.selectedyellow,
                            }}
                            onPress = {() => {this.toggleColor(COLORS.yellow)}}
                        >
                             <View style={{flexDirection: 'row', alignItems: 'center',
                            justifyContent: 'center'}}>
                              <Icon size={12} name={ this.state.selectedyellow == 5 ? 'circle' : 'circle-o'} style={{color: COLORS.softgray}}/>
                            <Text style={{fontSize: 13,marginVertical: 20,color: COLORS.softgray}}> Tarea</Text>
                            </View>
                        </TouchableOpacity>
                        </View>

                        </View>
                        <View style={{flex: 1,flexDirection: 'row', alignItems: 'center',
                        justifyContent: 'center',paddingBottom: 30}}>
                    <View
                        style={{
                            alignItems: 'center',
                            justifyContent: 'center',
                            height: 50,
                            margin:10
                        }}
                    >
                        <TouchableOpacity
                            style={{
                                width: SIZES.width * 0.2,
                                height: SIZES.width * 0.05,
                                padding: SIZES.padding,
                                backgroundColor:  COLORS.white,
                                alignItems: 'center',
                                justifyContent: 'center',
                                borderRadius: SIZES.radius,
                                elevation: this.state.selectedPeach,
                            }}
                            onPress = {() => {this.toggleColor(COLORS.peach)}}
                        >
                             <View style={{flexDirection: 'row', alignItems: 'center',
                            justifyContent: 'center'}}>
                              <Icon size={12} name={ this.state.selectedPeach == 5 ? 'circle' : 'circle-o'} style={{color: COLORS.softgray}}/>
                            <Text style={{fontSize: 13,marginVertical: 20,color: COLORS.softgray}}> Reserva</Text>
                            </View>
                        </TouchableOpacity>
                        </View>

                    <View
                        style={{
                           alignItems: 'center',
                            justifyContent: 'center',
                            height: 50,
                            margin:10
                        }}
                    >
                        <TouchableOpacity
                            style={{
                                width: SIZES.width * 0.2,
                                height: SIZES.width * 0.05,
                                padding: SIZES.padding,
                                backgroundColor: COLORS.white,
                                alignItems: 'center',
                                justifyContent: 'center',
                                borderRadius: SIZES.radius,
                                elevation: this.state.selectedPurple,
                            }}
                            onPress = {() => {this.toggleColor(COLORS.purple)}}
                        >
                            <View style={{flexDirection: 'row', alignItems: 'center',
                            justifyContent: 'center'}}>
                              <Icon size={12} name={ this.state.selectedPurple == 5 ? 'circle' : 'circle-o'} style={{color: COLORS.softgray}}/>
                            <Text style={{fontSize: 13,marginVertical: 20,color: COLORS.softgray}}> Reserva</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    </View>
                    </View>
    )
}
}