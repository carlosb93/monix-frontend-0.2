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

export default class ColorPicker extends React.Component {

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


  <View style={{flex: 1,flexDirection: 'row', alignItems: 'center',
                            justifyContent: 'center',padding: 30}}>
                    
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
                                width: SIZES.width * 0.1,
                                height: SIZES.width * 0.1,
                                padding: SIZES.padding,
                                backgroundColor: this.state.selectedBlue == 5 ? COLORS.softgray : COLORS.primary,
                                alignItems: 'center',
                                justifyContent: 'center',
                                borderRadius: SIZES.radius,
                                elevation: this.state.selectedBlue,
                            }}
                            onPress = {() => {this.toggleColor(COLORS.primary)}}
                        >
                            <FontAwesomeIcon size={35} icon={ faCircle }
                        style={{
                            color: COLORS.primary,
                        }}/>
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
                                width: SIZES.width * 0.1,
                                height: SIZES.width * 0.1,
                                padding: SIZES.padding,
                                backgroundColor: this.state.selectedGreen == 5 ? COLORS.softgray : COLORS.green,
                                alignItems: 'center',
                                justifyContent: 'center',
                                borderRadius: SIZES.radius,
                                elevation: this.state.selectedGreen,
                            }}
                            onPress = {() => {this.toggleColor(COLORS.green)}}
                        >
                            <FontAwesomeIcon size={35} icon={ faCircle }
                        style={{
                            color: COLORS.green,
                        }}/>
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
                                width: SIZES.width * 0.1,
                                height: SIZES.width * 0.1,
                                padding: SIZES.padding,
                                backgroundColor: this.state.selectedyellow == 5 ? COLORS.softgray : COLORS.yellow,
                                alignItems: 'center',
                                justifyContent: 'center',
                                borderRadius: SIZES.radius,
                                elevation: this.state.selectedyellow,
                            }}
                            onPress = {() => {this.toggleColor(COLORS.yellow)}}
                        >
                            <FontAwesomeIcon size={35} icon={ faCircle }
                        style={{
                            color: COLORS.yellow,
                        }}/>
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
                                width: SIZES.width * 0.1,
                                height: SIZES.width * 0.1,
                                padding: SIZES.padding,
                                backgroundColor:  this.state.selectedPeach == 5 ? COLORS.softgray : COLORS.peach,
                                alignItems: 'center',
                                justifyContent: 'center',
                                borderRadius: SIZES.radius,
                                elevation: this.state.selectedPeach,
                            }}
                            onPress = {() => {this.toggleColor(COLORS.peach)}}
                        >
                            <FontAwesomeIcon size={35} icon={ faCircle }
                        style={{
                            color: COLORS.peach,
                        }}/>
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
                                width: SIZES.width * 0.1,
                                height: SIZES.width * 0.1,
                                padding: SIZES.padding,
                                backgroundColor: this.state.selectedPurple == 5 ? COLORS.softgray : COLORS.purple,
                                alignItems: 'center',
                                justifyContent: 'center',
                                borderRadius: SIZES.radius,
                                elevation: this.state.selectedPurple,
                            }}
                            onPress = {() => {this.toggleColor(COLORS.purple)}}
                        >
                            <FontAwesomeIcon size={35} icon={ faCircle }
                        style={{
                            color: COLORS.purple,
                        }}/>
                        </TouchableOpacity>
                    </View>

                    </View>
    )
}
}