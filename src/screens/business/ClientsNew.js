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
  Button,
  Dimensions,
  TouchableHighlight
} from 'react-native'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import Icon from 'react-native-vector-icons/FontAwesome';
import SelectDropdown from 'react-native-select-dropdown'
import AsyncStorage from '@react-native-async-storage/async-storage';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import {
  COLORS,
  SIZES,
  FONTS,
  iconData,
  icons
} from '../../constants'
import APIKit, {
  setClientToken
} from '../../shared/APIKit';
import {toTimestamp, toDatetime } from '../../shared/tools';
import ToggleSwitch from 'toggle-switch-react-native'

import CategoryModel from '../../models/Category';
import BusinessModel from '../../models/Business';
import InventaryModel from '../../models/Inventary';
import ExpensesModel from '../../models/Expenses';
import ClientsModel from '../../models/Clientes';
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




export default class ClientsNew extends React.Component {


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
    this.fechaRef = React.createRef();
    this.priceRef = React.createRef();
    this.ageRef = React.createRef();
    this.packRef = React.createRef();
    this.extrasRef = React.createRef();
    this.nameRef = React.createRef();
    this.state = {
      negocioId: this.props.route.params.itemId,
      error: '',
      fechaError: false,
      iskid: false,
      ispregnant: false,
      isoutdoors: false,
      priceError: false,
      ageError: false,
      ageError: false,
      packError: false,
      nameError: false,
      navigation: this.props.navigation,
      otherParam: this.props.route.params.otherParam,
      fecha: new Date(),
      fecha_mod: 'MM/DD/YYYY',
      name: '',// opcional
      age: '1',// opcional
      pack: '900',// opcional
      extras: '',// opcional
      isDatePickerVisible: false,
      day:new Date().getDate(),
      month:new Date().getMonth() + 1,
      year:new Date().getFullYear(),

    }

  }

  componentDidMount() {
    this._focusListener = this.props.navigation.addListener('focus', () => {
    if(this.state.month < 10){
      this.setState({fecha_mod: '0'+ this.state.month +'/'+ this.state.day +'/'+ this.state.year})
    }else{
      this.setState({fecha_mod: this.state.month +'/'+ this.state.day +'/'+ this.state.year})
    }
    });
  }

  componentWillUnmount() {
    this._focusListener();
  }


  
   showDatePicker = () => {
    this.setState({isDatePickerVisible: true});
  };

   hideDatePicker = () => {
    this.setState({isDatePickerVisible: false});
  };

   handleConfirm = (date) => {
    this.setState({fecha: date})

    this.setState({day:this.state.fecha.getDate()})
    this.setState({month:this.state.fecha.getMonth() + 1})
    this.setState({year:this.state.fecha.getFullYear()})

    if(this.state.month < 10){
      this.setState({fecha_mod: '0'+ this.state.month +'/'+ this.state.day +'/'+ this.state.year})
    }else{
      this.setState({fecha_mod: this.state.month +'/'+ this.state.day +'/'+ this.state.year})
    }

    this.hideDatePicker();
  };

  showData = async () => {

    var datum = toTimestamp(this.state.fecha)

    const props = {
        name:this.state.name,
        extras:this.state.extras,
        age:parseInt(this.state.age),
        pack:parseInt(this.state.pack),
        iskid:this.state.iskid,
        ispregnant:this.state.ispregnant,
        isoutdoors:this.state.isoutdoors,
        date:datum,
        business_id: this.state.negocioId,
       }
  try {
  var clients =[];
  clients = new ClientsModel(props)
  clients.save()
  
        } catch (error) {
              
        console.log(error)
    }
 this.state.navigation.navigate('BusinessClients', {
  itemId: this.state.negocioId,
  otherParam: this.state.otherParam,
});
  }

render() { 
  const { navigation  } = this.state;


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
     onPress={() => {navigation.navigate('BusinessClients', {
      itemId: this.state.negocioId,
      otherParam: this.state.otherParam,
    });}}
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
                  <Text style={{ color: COLORS.white, ...FONTS.h2 }}>   Nuevo Cliente</Text>
                  <TouchableOpacity>
                  <Icon size={30} name='trash'
                                  style={{
                                    margin:8,
                                    color: COLORS.transparent,
                                  }}/>
</TouchableOpacity>
              </View>
              </View>
      
        <View>  
        <View style={{ flexDirection: 'row', margin: 10, height:60,justifyContent:'space-between',alignItems: 'center'}}>
        <TouchableOpacity>
                  <Icon size={30} name='user'
                                  style={{
                                    margin:8,
                                    color: COLORS.primary,
                                  }}/>
        </TouchableOpacity>
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
            placeholder='Nombre'
            autoCapitalize='none'
            error={this.state.nameError}
						ref={this.nameRef}
						value={this.state.name}
						onChangeText={ (name) => this.setState({ name })} 
          />
        </View>
        <View style={{ flexDirection: 'row', margin: 10, height:60,justifyContent:'space-between',alignItems: 'center'}}>
        <TouchableOpacity>
                  <Icon size={30} name='birthday-cake'
                                  style={{
                                    margin:8,
                                    color: COLORS.primary,
                                  }}/>
        </TouchableOpacity>
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
            name='age'
            placeholder='Edad'
            autoCapitalize='none'
            error={this.state.ageError}
						ref={this.ageRef}
						value={this.state.age}
						onChangeText={ (age) => this.setState({ age })} 
          />
        </View>
        <View style={{ flexDirection: 'row', margin: 10, height:60,justifyContent:'space-between',alignItems: 'center'}}>
        <TouchableOpacity>
                  <Icon size={30} name='tag'
                                  style={{
                                    margin:8,
                                    color: COLORS.primary,
                                  }}/>
        </TouchableOpacity>
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
            name='pack'
            placeholder='Paquete'
            autoCapitalize='none'
            error={this.state.packError}
						ref={this.packRef}
						value={this.state.pack}
						onChangeText={ (pack) => this.setState({ pack })} 
          />
        </View>
        <View style={{ flexDirection: 'row', margin: 10, height:60,justifyContent:'space-between',alignItems: 'center'}}>

        <TouchableOpacity onPress={this.showDatePicker}>
                  <Icon size={30} name='calendar'
                                  style={{
                                    margin:8,
                                    color: COLORS.primary,
                                  }}/>
        </TouchableOpacity>
        <TouchableOpacity
                            style={{
                                width: SIZES.width * 0.8,
                                height: SIZES.width * 0.1,
                                padding: SIZES.padding,
                                backgroundColor: COLORS.white,
                                borderRadius: SIZES.radius,
                                borderColor: COLORS.primary,
                                borderWidth: SIZES.input,
                                alignItems: 'center',
                                justifyContent: 'center',
                                borderRadius: SIZES.radius,
                                elevation: 5,
                            }}
                            onPress={this.showDatePicker}
                        >
                            <Text style={{ color: COLORS.darkgray, ...FONTS.body4 }}>{this.state.fecha_mod}</Text>
                        </TouchableOpacity>
      <DateTimePickerModal
        isVisible={this.state.isDatePickerVisible}
        mode="date"
        onConfirm={this.handleConfirm}
        onCancel={this.hideDatePicker}
      />
        </View> 
        
          
        <View style={{ flexDirection: 'row', margin: 10, height:30,alignItems: 'center'}}>
        <TouchableOpacity>
                  <Icon size={30} name='child'
                                  style={{
                                    margin:8,
                                    color: COLORS.primary,
                                  }}/>
        </TouchableOpacity>
        <ToggleSwitch
  isOn={this.state.iskid}
  onColor="green"
  offColor="gray"
  label="Niño"
  labelStyle={{ color: "black", fontWeight: "900" }}
  size="large"
  onToggle={isOn => this.setState({ iskid: isOn })}
/>

</View>
        <View style={{ flexDirection: 'row', margin: 10, height:30,alignItems: 'center'}}>
        <TouchableOpacity>
                  <Icon size={30} name='female'
                                  style={{
                                    margin:8,
                                    color: COLORS.primary,
                                  }}/>
        </TouchableOpacity>
        <ToggleSwitch
  isOn={this.state.ispregnant}
  onColor="green"
  offColor="gray"
  label="Embarazada"
  labelStyle={{ color: "black", fontWeight: "900" }}
  size="large"
  onToggle={isOn =>  this.setState({ ispregnant: isOn })}
/>
</View>
        <View style={{ flexDirection: 'row', margin: 10, height:30,alignItems: 'center'}}>
        <TouchableOpacity>
                  <Icon size={30} name='tree'
                                  style={{
                                    margin:8,
                                    color: COLORS.primary,
                                  }}/>
        </TouchableOpacity>
        <ToggleSwitch
  isOn={this.state.isoutdoors}
  onColor="green"
  offColor="gray"
  label="Exteriores"
  labelStyle={{ color: "black", fontWeight: "900" }}
  size="large"
  onToggle={isOn =>  this.setState({ isoutdoors: isOn })}
/>
</View>


<View style={{ flexDirection: 'row', margin: 10, height:60,justifyContent:'space-between',alignItems: 'center'}}>
        <TouchableOpacity>
                  <Icon size={30} name='tag'
                                  style={{
                                    margin:8,
                                    color: COLORS.primary,
                                  }}/>
        </TouchableOpacity>
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
            name='extras'
            placeholder='Extras'
            autoCapitalize='none'
            error={this.state.extrasError}
						ref={this.extrasRef}
						value={this.state.extras}
						onChangeText={ (extras) => this.setState({ extras })} 
          />
        </View>
        
                    <View style={{
                                  flexDirection:'column',
                                  alignItems: 'center',
                                  marginLeft:50,
                                  justifyContent: 'center',
                                  padding: SIZES.padding* 2}}>
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
