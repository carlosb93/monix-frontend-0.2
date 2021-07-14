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
  iconData
} from '../constants'
import APIKit, {
  setClientToken
} from '../shared/APIKit';

import CategoryModel from '../models/Category';
import BusinessModel from '../models/Business';

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

export default class BusinessForm extends React.Component {


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
      name: '',
      type: '',
      color: '',
      icon: '',
      code: '',
      error: '',
      nameError: false,
      navigation: this.props.navigation,
      hue: 0,
      sat: 0,
      val: 1,
      modalVisible: false,
      modal2Visible: false,
      ColorPicker: COLORS.primary,
      IconSelection: 'archive',
      

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

    props = {
      name: this.state.name,
      categoria: this.state.type,
      code: this.state.code,
      user_id: 1,
      icon: this.state.IconSelection,
      color: this.state.ColorPicker,
      
     }
const negocio = new BusinessModel(props)
negocio.save()

this.state.navigation.navigate('Home')
  }



render() { 
  
  // const { hue, sat, val } = this.state;
  const { navigation, hue, sat, val  } = this.state;


  return (
      <View  style={{
        padding: SIZES.padding * 0.5,
        alignItems: 'center',
        justifyContent: 'center'
    }}>
        <Text>Nuevo Negocio</Text>
        
        <View style={{ margin: 10 }}>
          <TextInput
          style={{
            width: SIZES.width * 0.8,
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
            autoCapitalize='words'
            error={this.state.codeError}
			ref={this.codeRef}
			value={this.state.code}
			onChangeText={ (code) => this.setState({ code })} 
          />
        </View>
        <View style={{ margin: 10 }}>
        
        <SelectDropdown
        defaultButtonText='Seleccione una Categoría'
        buttonTextStyle={{...FONTS.body4, color:COLORS.darkgray, }}
        buttonStyle={{ 
          width: SIZES.width * 0.8,
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

                  <TouchableHighlight style={{
                                width: SIZES.width * 0.8,
                                padding: SIZES.padding,
                                backgroundColor: COLORS.secondary,
                                alignItems: 'center',
                                borderRadius: SIZES.radius,
                                elevation: 5,
                            }} onPress = {() => {
                              this.getColor()
                              this.toggleModal(!this.state.modalVisible)
                              }}>
                     
                     <Text style={{ color: COLORS.white, ...FONTS.h2 }}>Confirmar</Text>
                  </TouchableHighlight>
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
                                padding: SIZES.padding,
                                backgroundColor: COLORS.secondary,
                                alignItems: 'center',
                                borderRadius: SIZES.radius,
                                elevation: 5,
                            }} onPress = {() => {
                              this.toggleModal2(!this.state.modal2Visible)
                              }}>
                     
                     <Text style={{ color: COLORS.white, ...FONTS.h2 }}>Atras</Text>
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
                                width: SIZES.width * 0.15,
                                height: SIZES.width * 0.15,
                                padding: SIZES.padding,
                                backgroundColor: COLORS.secondary,
                                alignItems: 'center',
                                justifyContent: 'center',
                                borderRadius: SIZES.radius,
                                elevation: 5,
                            }}
                            onPress = {() => {this.toggleModal(true)}}
                        >
                            <FontAwesomeIcon size={30} icon={ faEyeDropper }
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
                                width: SIZES.width * 0.15,
                                height: SIZES.width * 0.15,
                                padding: SIZES.padding,
                                backgroundColor: COLORS.secondary,
                                alignItems: 'center',
                                justifyContent: 'center',
                                borderRadius: SIZES.radius,
                                elevation: 5,
                            }}
                            onPress = {() => {this.toggleModal2(true)}}
                        >
                            <Icon size={30} name={this.state.IconSelection}
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
                        }}
                    >
                        <TouchableOpacity
                            style={{
                                width: SIZES.width * 0.8,
                                padding: SIZES.padding,
                                backgroundColor: COLORS.primary,
                                alignItems: 'center',
                                borderRadius: SIZES.radius,
                                elevation: 5,
                            }}
                            onPress={() => this.showData()}
                        >
                            <Text style={{ color: COLORS.white, ...FONTS.h2 }}>Crear</Text>
                        </TouchableOpacity>
                    </View>
        <View
                        style={{
                            
                            alignItems: 'center',
                            justifyContent: 'center',
                            height: 60,
                            width: 30,
                        }}
                    >
                        <TouchableOpacity
                            style={{
                                width: SIZES.width * 0.8,
                                padding: SIZES.padding,
                                backgroundColor: COLORS.secondary,
                                alignItems: 'center',
                                borderRadius: SIZES.radius,
                                elevation: 5,
                            }}
                            onPress={() => {
                              
                              navigation.navigate('Home')
                            }}
                        >
                            <Text style={{ color: COLORS.white, ...FONTS.h2 }}>Atras</Text>
                        </TouchableOpacity>
                    </View>

               
               
      </View>
        // <Button title='Go to Login' onPress={this.goToLogin} />
      
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
