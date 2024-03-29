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
  faArchive
} from '@fortawesome/free-solid-svg-icons'
import Icon from 'react-native-vector-icons/FontAwesome';

import SelectDropdown from 'react-native-select-dropdown'
import HsvColorPicker from 'react-native-hsv-color-picker';

import AsyncStorage from '@react-native-async-storage/async-storage';

import {
  COLORS,
  SIZES,
  FONTS,
  icons,
  iconData
} from '../../constants'
import APIKit, {
  setClientToken
} from '../../shared/APIKit';

import CategoryModel from '../../models/Category';
import BusinessModel from '../../models/Business';

const options = ["Productos", "Servicios", "Restauración"]


const numColumns = 3;
const size = Dimensions.get('window').width / numColumns;
const stylesflat = StyleSheet.create({
  itemContainer: {
    width: size,
    height: size,
    margin: 1,
  }
});

export default class BussinessEdit extends React.Component {


  toggleModal(visible) {
    this.setState({
      modalVisible: visible
    });
  }
  toggleModal2(visible) {
    this.setState({
      modal2Visible: visible
    });
  }
  constructor(props) {
    super(props);
    this.codeRef = React.createRef();
    this.nameRef = React.createRef();
    this.typeRef = React.createRef();
    this.colorRef = React.createRef();
    this.iconPasswordRef = React.createRef();
    this.onSatValPickerChange = this.onSatValPickerChange.bind(this);
    this.onHuePickerChange = this.onHuePickerChange.bind(this);
    this.hsvColorPicker = React.createRef();
    this.state = {
      name: this.props.route.params.otherParam.name,
      type: this.props.route.params.otherParam.categoria,
      color: this.props.route.params.otherParam.color,
      icon: this.props.route.params.otherParam.icon,
      code: this.props.route.params.otherParam.code,
      user_id: this.props.route.params.otherParam.user_id,
      id: this.props.route.params.otherParam.id,
      error: '',
      nameError: false,
      navigation: this.props.navigation,
      hue: 0,
      sat: 0,
      val: 1,
      modalVisible: false,
      modal2Visible: false,
      ColorPicker:  this.props.route.params.otherParam.color,
      IconSelection: this.props.route.params.otherParam.icon,
      otherParam: this.props.route.params.otherParam,
      itemId: this.props.route.params.itemId
      

    }

  }
  onSatValPickerChange({
    saturation,
    value
  }) {
    this.setState({
      sat: saturation,
      val: value,
    });
  }

  onHuePickerChange({
    hue
  }) {
    this.setState({
      hue,
    });
  }
  getColor() {
    this.setState({
      ColorPicker: this.hsvColorPicker.current.getCurrentColor(),
    });
  }
  getIcon(name) {
    this.setState({
      IconSelection: name,
    });
  }



  componentDidMount() {
    this._focusListener = this.props.navigation.addListener('focus', () => {

    });
  }

  componentWillUnmount() {
    this._focusListener();
  }

  showData = async () => {

    
const id = this.state.id;
const negocio = await BusinessModel.find(id)
negocio.name = this.state.name
negocio.categoria = this.state.type
negocio.code = this.state.code
negocio.icon = this.state.IconSelection
negocio.color = this.state.ColorPicker
negocio.save()

this.state.navigation.navigate('Home')
  }

  Delete = async () => {

    
const id = this.state.id;
const negocio = await BusinessModel.destroy(id)

this.state.navigation.navigate('Home')
  }



render() { 
  
  // const { hue, sat, val } = this.state;
  const { navigation, hue, sat, val  } = this.state;


  return (
      <View  style={{
        alignItems: 'center',
        justifyContent: 'center'
    }}>
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
     onPress={() => {navigation.navigate('Home')}}
  >
     <Image
                            source={icons.left_arrow}
                            resizeMode="contain"
                            style={{
                                width: 25,
                                height: 25,
                                margin:6,
                                tintColor: COLORS.white
                            }}
                        />

                </TouchableOpacity>
                  <Text style={{ color: COLORS.white, ...FONTS.h2 }}>   Editar Negocio </Text>
                  <TouchableOpacity
      onPress={() => this.Delete()}
  >
                  <Icon size={30} name='trash-o'
                                  style={{
                                    margin:8,
                                    color: COLORS.white,
                                  }}/>
</TouchableOpacity>
              </View>
              </View>
        
        
        <View style={{ margin: 10 }}>
          <TextInput
          style={{
            width: SIZES.width * 0.8,
            height: SIZES.width * 0.1,
            padding: SIZES.padding,
            alignItems: 'center',
            borderRadius: SIZES.radius,
            borderColor: COLORS.primary,
            borderWidth: SIZES.input,
            elevation: 5,
            backgroundColor: COLORS.white
        }}
            name='name'
            placeholder='Nombre del negocio'
            autoCapitalize='none'
            error={this.state.nameError}
						ref={this.nameRef}
						value={this.state.name}
						onChangeText={ (name) => this.setState({ name })} 
						onSubmitEditing={() => this.codeRef.current.focus()}
          />
        </View>
        <View style={{ margin: 10 }}>
          <TextInput
          style={{
            width: SIZES.width * 0.8,
            height: SIZES.width * 0.1,
            padding: SIZES.padding,
            alignItems: 'center',
            borderRadius: SIZES.radius,
            borderColor: COLORS.primary,
            borderWidth: SIZES.input,
            elevation: 5,
            backgroundColor: COLORS.white
        }}
            name='code'
            placeholder='Codigo de invitación'
            autoCapitalize='characters'
            error={this.state.codeError}
			ref={this.codeRef}
			value={this.state.code}
			onChangeText={ (code) => this.setState({ code })} 
          />
        </View>
        <View style={{ margin: 10 }}>
        
        <SelectDropdown
        defaultButtonText={this.state.type}
        buttonTextStyle={{...FONTS.body4, color:COLORS.darkgray, }}
        buttonStyle={{ 
          width: SIZES.width * 0.8,
          height: SIZES.width * 0.1,
          borderRadius: SIZES.radius,
          borderColor: COLORS.primary,
          borderWidth: SIZES.input,
          elevation: 5,
          backgroundColor: COLORS.white}}
        
	data={options}
	onSelect={(selectedItem, index) => {
    this.setState({ type: selectedItem })
		
	}}
	buttonTextAfterSelection={(selectedItem, index) => {
		// text represented after item is selected
		// if data array is an array of objects then return selectedItem.property to render after item is selected
		return selectedItem
	}}
	rowTextForSelection={(item, index) => {
		// text represented for each item in dropdown
		// if data array is an array of objects then return item.property to represent item in dropdown
		return item
	}}
/>
        </View>
        
     
       
  
       
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
      padding: 100,
      backgroundColor:COLORS.transparent}}>

      <Text  style={{ color: COLORS.black, ...FONTS.h2 }}>Selecciona un color!</Text>

         <HsvColorPicker
          ref={this.hsvColorPicker}
          huePickerHue={hue}
          onHuePickerDragMove={this.onHuePickerChange}
          onHuePickerPress={this.onHuePickerChange}
          satValPickerHue={hue}
          satValPickerSaturation={sat}
          satValPickerValue={val}
          onSatValPickerDragMove={this.onSatValPickerChange}
          onSatValPickerPress={this.onSatValPickerChange}
        />

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
                                backgroundColor: COLORS.primary,
                                alignItems: 'center',
                                justifyContent: 'center',
                                borderRadius: SIZES.radius,
                                elevation: 5,
                            }} onPress = {() => {
                              this.getColor()
                              this.toggleModal(!this.state.modalVisible)
                              }}>
                     
                     <Text style={{ color: COLORS.white, ...FONTS.h2 }}>Aceptar</Text>
                  </TouchableHighlight>
                  </View>
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





            <View
                        style={{
                            padding: SIZES.padding * 0.5,
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}
                    >
                         <Modal animationType = {"slide"} transparent = {false}
               visible = {this.state.modal2Visible}
               onRequestClose = {() => { console.log("Modal has been closed.") } }>
               
               <View style = {{flex: 1,
      alignItems: 'center',
      padding: 13,
      backgroundColor:COLORS.transparent}}>

      <Text  style={{ color: COLORS.black, ...FONTS.h2 }}>Selecciona un icono!</Text>
      <FlatList
      data={iconData}
      renderItem={({item}) => (
        <View style={stylesflat.itemContainer}>
         <TouchableOpacity
       style={{
           width: SIZES.width * 0.25,
           height: SIZES.width * 0.25,
           backgroundColor: COLORS.white,
           alignItems: 'center',
           justifyContent: 'center',
           borderRadius: 8,
           elevation: 5,
       }}
       onPress = {() => {
         this.getIcon(item.name)
        this.toggleModal2(!this.state.modal2Visible)
      }}>
                         <Icon size={60} name={item.name}
   style={{
       color: COLORS.primary,
   }}/></TouchableOpacity>
        </View>
      )}
      keyExtractor={item => item.id}
      numColumns={numColumns} />

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
                              this.toggleModal2(!this.state.modal2Visible)
                              }}>
                     
                     <Text style={{ color: COLORS.white, ...FONTS.h2 }}>Cancelar</Text>
                  </TouchableHighlight>
               </View>
            </Modal>
            </View>
                    

                    <View style={{flex: 1, flexDirection: 'row', height: 100, padding:60}}>
                    <View
                        style={{
                            padding: SIZES.padding * 0.5,
                            alignItems: 'center',
                            justifyContent: 'center',
                            height: 50,
                            width: 150
                        }}
                    >
                        <TouchableOpacity
                            style={{
                                width: SIZES.width * 0.1,
                                height: SIZES.width * 0.1,
                                padding: SIZES.padding,
                                backgroundColor: COLORS.secondary,
                                alignItems: 'center',
                                justifyContent: 'center',
                                borderRadius: SIZES.radius,
                                elevation: 5,
                            }}
                            onPress = {() => {this.toggleModal(true)}}
                        >
                            <FontAwesomeIcon size={20} icon={ faEyeDropper }
                        style={{
                            color: this.state.ColorPicker,
                        }}/>
                        </TouchableOpacity>
                    </View>
                    <View
                        style={{
                            padding: SIZES.padding * 0.5,
                            alignItems: 'center',
                            justifyContent: 'center',
                            height: 50,
                            width: 150,
                        }}
                    >
                        <TouchableOpacity
                            style={{
                                width: SIZES.width * 0.1,
                                height: SIZES.width * 0.1,
                                padding: SIZES.padding,
                                backgroundColor: COLORS.secondary,
                                alignItems: 'center',
                                justifyContent: 'center',
                                borderRadius: SIZES.radius,
                                elevation: 5,
                            }}
                            onPress = {() => {this.toggleModal2(true)}}
                        >
                            <Icon size={20} name={this.state.IconSelection}
   style={{
       color: this.state.ColorPicker,
   }}/>
                        </TouchableOpacity>
                    </View>
                    </View>
                    
          {/*Signup Button */}
          <View
                        style={{
                            
                            alignItems: 'center',
                            justifyContent: 'center',
                            height: 60,
                            width: 30,
                            margin:20,
                        }}
                    >

                        <TouchableOpacity
                            style={{
                                width: SIZES.width * 0.8,
                                height: SIZES.width * 0.1,
                                padding: SIZES.padding,
                                backgroundColor: COLORS.primary,
                                alignItems: 'center',
                                justifyContent: 'center',
                                borderRadius: SIZES.radius,
                                elevation: 5,
                            }}
                            onPress={() => this.showData()}
                        >
                            <Text style={{ color: COLORS.white, ...FONTS.h2 }}>Aceptar</Text>
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
                justifyContent: 'center',
              },
            });
