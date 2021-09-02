import React from 'react'
import { StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Image,
  Dimensions,
  FlatList,
  SafeAreaView,
  ScrollView,
  Modal,
  ColorPropType} from 'react-native'
  import BaseIcon from '../../components/TypePicker/Icon'
  import AsyncStorage from '@react-native-async-storage/async-storage';
  import DraggableFlatList, {
    RenderItemParams,
  } from "react-native-draggable-flatlist";
  import Numeral from 'numeral';
  import { icons,COLORS, SIZES, FONTS } from '../../constants'
  import APIKit, {setClientToken} from '../../shared/APIKit';
  import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
  import Icon from 'react-native-vector-icons/FontAwesome';
  import { faPlus } from '@fortawesome/free-solid-svg-icons'
  import BusinessModel from '../../models/Business';
  import InventaryModel from '../../models/Inventary';
  import SalesModel from '../../models/Sales';
  import FlowStepsModel from '../../models/FlowSteps';


const numColumns = 1;
const size = Dimensions.get('window').width / numColumns;
const stylesflat = StyleSheet.create({
  itemContainer: {
    width: size - 20,
    marginRight: SIZES.padding,
    marginLeft:  SIZES.padding,
    marginVertical: SIZES.padding,
    borderRadius: 16,
    backgroundColor:COLORS.lightGray4,
    elevation: 5
  }
});

export default class FlowDesign extends React.Component { 

  
  constructor(props){
		super(props);
		this.codeRef = React.createRef();
		this.nameRef = React.createRef();
		this.emailRef = React.createRef();
		this.passwordRef = React.createRef();
		this.confirmPasswordRef = React.createRef();
    this.state = {
      id:null,
      name:'',
	  email: '',
	  password: '',
	  confirmPassword: '',
	  code: '',
	  error: '',
	  emailError: false,
	  codeError: false,
	  nameError: false,
	  passwordError: false,
	  confirmPasswordError: false,
      visibleHeight: Dimensions.get('window').height,
      navigation: this.props.navigation,
      negocioId: this.props.route.params.itemId,
      otherParam: this.props.route.params.otherParam,
      modal2Visible:false,
      modalVisible:false,
      sales:[],
    //   flowsteps:[],
      flowsteps:[
          {
           id:1,
           name: 'Edición',
           summary: 'reserva amy',
           icon: 'edit',
           color: COLORS.peach,
           step: 1},
          {
            id:2,
            name: 'Impresión',
            summary: 'reserva amy',
            icon: 'print',
            color: COLORS.green,
            step: 2},
          {
            id:3,
            name: 'Taller',
            summary: 'reserva amy',
            icon: 'archive',
            color: COLORS.yellow,
            step: 3},
          {
            id:3,
            name: 'Entrega',
            summary: ' reserva amy',
            icon: 'gift',
            color: COLORS.purple,
            step: 3}],
      steps:[],
		}
	}

  
  componentDidMount() {
    this._focusListener = this.props.navigation.addListener('focus', () => {
      this.get_flowsteps();
      this.toggleModal2(true)
		});
  }
  
  componentWillUnmount() {
    this._focusListener();
  }

  async get_flowsteps(){
    const flowsteps = await FlowStepsModel.getByBusiness(parseInt(this.state.negocioId));
console.log(flowsteps.length )
    if(flowsteps.length > 0){
        this.setState({flowsteps: flowsteps}) 
         }
   
 
  }
   maparray(data){
 
  let reordered = data.map((item) => {
                  
   const index = data.findIndex(obj => obj.id === item.id);
console.log(index)
            return {
                id:item.id,
                name: item.name,
                summary: item.summary,
                icon: item.icon,
                color: item.color,
                business_id: item.business_id,
                flow_id: item.flow_id,
                step: index +1
            }
        });

this.setState({flowsteps:reordered})
return reordered;


  }
  toggleModal2(visible) {
      if(this.state.flowsteps.length == 0){ this.setState({modal2Visible: visible});}
  }

  toggleModal(visible) {
     this.setState({modalVisible: visible});
  }
     

  
  
/////////////////////////////////////////////////////////////////////////////////////////////////////// 
///////////////////////////////////////////////////////////////////////////////////////////////////////

  render() {

  const { navigation } = this.state;


    return (
        <View  style={{
            flex: 1,
            alignItems: 'center',
            backgroundColor:COLORS.transparent,
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
         onPress={() => {navigation.navigate('BusinessFlow', {
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
                      <Text style={{ color: COLORS.white, ...FONTS.h2 }}>   Pasos de tu Flujo de Trabajo</Text>
                      <TouchableOpacity
         onPress={() => {console.log('something')}}
      >
                      <Icon size={30} name='bar-chart'
                                      style={{
                                        margin:8,
                                        color: COLORS.primary,
                                      }}/>
    </TouchableOpacity>
                  </View>
                  </View>
    
    {/* /////////////////////////////////////////////////////////////////////////////////////////////////////// */}
    {/* /////////////////////////////////////////////////////////////////////////////////////////////////////// */}
<DraggableFlatList
data={this.state.flowsteps}
renderItem={this.renderItem.bind(this)}
keyExtractor={(item, index) => `draggable-item-${item.step}`}
onDragEnd={({ data }) =>  this.maparray(data)}
/>
<View >
    <TouchableOpacity
    style={{
      
      borderColor: 'rgba(0,0,0,0.2)',
    width: 60,
    position: 'absolute',
    bottom: 60,
    right: -170,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 999,
    height: 60,
    elevation: 6,
    backgroundColor: '#fff',
    borderRadius: 100,
    }}
     onPress={() => {this.toggleModal(!this.state.modalVisible)}}
  >
     <FontAwesomeIcon size={25} icon={ faPlus  } 
                        style={{
                            color: COLORS.primary,
                        }}/>
                        
  </TouchableOpacity>               
     </View>
     


<View
style={{
padding: SIZES.padding * 0.5,
alignItems: 'center',
justifyContent: 'center'
}}>
<Modal
    
    animationType={"slide"}
    transparent={false}
    visible={this.state.modalVisible}
    onRequestClose=
    {() => { console.log("Modal has been closed.") } }>
<View
                            style={{
                            flex: 1,
                            flexDirection:'row',
                            alignItems: 'center',
                            justifyContent: 'center',
                            margin:15,
                            padding: 13,
                            backgroundColor: COLORS.transparent,
                            height:300
                        }}>
                            <Text  style={{
                            color: COLORS.black,
                            ...FONTS.h2
                        }}> Modal de formulario</Text>
                          
        <TouchableOpacity onPress={() => {this.toggleModal(!this.state.modalVisible)}}>
                      <Icon size={30} name='remove'
                                      style={{
                                        margin:8,
                                        color: COLORS.softgray,
                                      }}/>
    </TouchableOpacity>
                        </View>


</Modal>
</View>

<View
style={{
padding: SIZES.padding * 0.5,
alignItems: 'center',
justifyContent: 'center'
}}>
<Modal
    
    animationType={"slide"}
    transparent={false}
    visible={this.state.modal2Visible}
    onRequestClose=
    {() => { console.log("Modal has been closed.") } }>
<View
                            style={{
                            flex: 1,
                            flexDirection:'row',
                            alignItems: 'center',
                            justifyContent: 'center',
                            margin:15,
                            padding: 13,
                            backgroundColor: COLORS.transparent,
                            height:300
                        }}>
                            <Text  style={{
                            color: COLORS.black,
                            ...FONTS.h2
                        }}> En esta seccion se define la estructura de este flujo de trabajo o etepas que recorre un proceso dentro de su negocio. con un orden logico estos elementos pueden ser reordenados en cualquier momento durante su creacion</Text>
                          
        <TouchableOpacity onPress={() => {this.toggleModal2(false)}}>
                      <Icon size={30} name='remove'
                                      style={{
                                        margin:8,
                                        color: COLORS.softgray,
                                      }}/>
    </TouchableOpacity>
                        </View>


</Modal>
</View>

</View>
        )
      
        
  }

 
      
      renderItem(item) {
        return (
          <TouchableOpacity
            testID={'item'}
            style={[styles.item, {height: 65,backgroundColor: item.isActive ? COLORS.gray : COLORS.white, borderColor: item.item.color || '#F0F4FF',
            borderLeftWidth: 8,}]}
            
          >
            <View style={{flexDirection:'row',alignItems: 'center',justifyContent:'space-between'}}>
              <View>
              <Text style={ FONTS.h2}>{item.item.step}</Text>
           
            
          
              </View>
              <TouchableOpacity
                                style={{
                                    width: SIZES.width * 0.5,
                                    height: SIZES.width * 0.1,
                                    padding: SIZES.padding,
                                    marginBottom:-10,
                                    backgroundColor: item.item.color,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    borderRadius: 5,
                                }}
                             
                            >
                                 <View style={{flexDirection: 'row', alignItems: 'center',
                                justifyContent: 'center'}}>
                                <Text style={{fontSize: 15,marginVertical: 20,color: COLORS.white},FONTS.h2}> {item.item.name} </Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity onLongPress={item.drag}>
                      <Icon size={30} name='edit'
                                      style={{
                                        margin:8,
                                        color: COLORS.gray,
                                      }}/>
    </TouchableOpacity>
                            <TouchableOpacity onLongPress={item.drag}>
                      <Icon size={30} name='trash'
                                      style={{
                                        margin:8,
                                        color: COLORS.gray,
                                      }}/>
    </TouchableOpacity>
                            <TouchableOpacity onLongPress={item.drag}>
                      <Icon size={30} name='ellipsis-v'
                                      style={{
                                        margin:8,
                                        color: COLORS.gray,
                                      }}/>
    </TouchableOpacity>
            </View>
            
           
          </TouchableOpacity>
        );
      }

    }
    const styles = StyleSheet.create({
      item: {
        backgroundColor: 'white',
        flex: 1,
        borderRadius: 5,
        padding: 10,
        marginRight: 10,
        marginTop: 17,
        width:350,
      },
      emptyDate: {
        height: 15,
        flex: 1,
        paddingTop: 30
      }
    });
