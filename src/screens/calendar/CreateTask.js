import React, { useEffect } from 'react';
import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import moment from 'moment';
import 'react-native-get-random-values';
// import { Routes } from '@calendar/navigation';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS, SIZES, FONTS, icons } from '../../constants'
import Icon from 'react-native-vector-icons/FontAwesome';
import ColorPicker from '../../components/ColorPicker/ColorPicker'
import DateTimePickerModal from "react-native-modal-datetime-picker";
import SelectDropdown from 'react-native-select-dropdown'

import CalendarModel from '../../models/Calendar';
import BusinessModel from '../../models/Business';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {toTimestamp, toDatetime } from '../../shared/tools';

const { width: vw } = Dimensions.get('window');
// moment().format('YYYY/MM/DD')

const styles = StyleSheet.create({
  createTaskButton: {
    width: 252,
    height: 48,
    alignSelf: 'center',
    marginTop: 40,
    borderRadius: 5,
    justifyContent: 'center'
  },
  separator: {
    height: 0.3,
    width: '100%',
    backgroundColor: '#979797',
    alignSelf: 'center',
    marginVertical: 20
  },
  notes: {
    color: '#9CAAC4',
    fontSize: 16,
    fontWeight: '600'
  },
  notesContent: {
    height: 0.5,
    width: '100%',
    backgroundColor: '#979797',
    alignSelf: 'center',
    marginVertical: 20
  },
  learn: {
    height: 23,
    width: 51,
    backgroundColor: '#F8D557',
    justifyContent: 'center',
    borderRadius: 5
  },
  design: {
    height: 23,
    width: 59,
    backgroundColor: '#62CCFB',
    justifyContent: 'center',
    borderRadius: 5,
    marginRight: 7
  },
  readBook: {
    height: 23,
    width: 83,
    backgroundColor: '#4CD565',
    justifyContent: 'center',
    borderRadius: 5,
    marginRight: 7
  },
  title: {
    height: 25,
    borderColor: '#5DD976',
    borderLeftWidth: 1,
    paddingLeft: 8,
    fontSize: 19
  },
  taskContainer: {
    height: 600,
    width: 375,
    alignSelf: 'center',
    borderRadius: 8,
    shadowColor: '#2E66E7',
    backgroundColor: '#ffffff',
    shadowOffset: {
      width: 3,
      height: 3
    },
    shadowRadius: 20,
    shadowOpacity: 0.2,
    elevation: 5,
    padding: 22
  },
  calenderContainer: {
    marginTop: 30,
    width: 350,
    height: 350,
    alignSelf: 'center'
  },
  newTask: {
    alignSelf: 'center',
    fontSize: 20,
    width: 120,
    height: 25,
    textAlign: 'center'
  },
  backButton: {
    flexDirection: 'row',
    marginTop: 20,
    width: '100%',
    alignItems: 'center'
  },
  container: {
    flex: 1,
    backgroundColor: '#eaeef7'
  }
});
  

  


export default class CreateTask extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      navigation: this.props.navigation,
      selectedDay: {[moment().format('YYYY')+'-'+moment().format('MM')+'-'+moment().format('DD')]:{selected: true, selectedColor: '#2E66E7'}},
      setSelectedDay: {[moment().format('YYYY')+'-'+moment().format('MM')+'-'+moment().format('DD')]:{selected: true, selectedColor: '#2E66E7'}},
      currentDay: moment().format(),
      setCurrentDay: moment().format(),
      taskText:'',
      setTaskText:'',
      notesText:'',
      setNotesText:'',
      visibleHeight: Dimensions.get('window').height,
      setVisibleHeight: Dimensions.get('window').height,
      isAlarmSet:false,
      setAlarmSet:false,
      alarmTime: moment().format(),
      setAlarmTime: moment().format(),
      isDateTimePickerVisible:false,
      setDateTimePickerVisible:false,
      keyboardHeight:50,
      updateCurrentTask: this.props.route.params?.updateCurrentTask ?? (() => null),
      currentDate: this.props.route.params?.currentDate ?? (() => null),
      
      ColorPicker: COLORS.primary,
      isDatePickerVisible1: false,
      isDatePickerVisible2: false,
      timeStart: moment().format(),
      timeEnd: moment().format(),
      negocio:[],
      business_id:0,
      isworkflow:false,
      summary:'',
      title:'',
      id:0,
    }
  };


  componentDidMount() {
    this._focusListener = this.props.navigation.addListener('focus', () => {
    this.get_businnesses()
    });
  };
  
  componentWillUnmount() {
    this._focusListener();
  };

  callbackType = (childData) => {
    this.setState({ColorPicker: childData})
}
  callbackColor = (childData) => {
    this.setState({ColorPicker: childData})
}

SwitchWorkflow = () => {
  this.setState({isworkflow: !this.state.isworkflow});
};
showDatePickerStart = () => {
  this.setState({isDatePickerVisible1: true});
};

 hideDatePickerStart = () => {
  this.setState({isDatePickerVisible1: false});
};
showDatePickerEnd = () => {
  this.setState({isDatePickerVisible2: true});
};

 hideDatePickerEnd = () => {
  this.setState({isDatePickerVisible2: false});
};

handleConfirmEnd = (timeEnd) => {
  this.setState({timeEnd: timeEnd})
  console.log(timeEnd)
  this.hideDatePickerEnd();
};
handleConfirmStart = (timeStart) => {
  this.setState({timeStart: timeStart})
  this.hideDatePickerStart();
};


createEvent = async () => {
  const user_id = this.state.id

const date_start =  moment(this.state.timeStart).format('YYYY-MM-DD')
const start =  moment(this.state.timeStart).valueOf()
const end =  moment(this.state.timeEnd).valueOf()
// console.log(moment(start).format('YYYY-MM-DD HH:mm'))


  const props = {
      title:this.state.title,
      summary:this.state.summary,
      start: start,
      date_start: date_start,
      end: end,
      color:this.state.ColorPicker,
      isworkflow:this.state.isworkflow,
      user_id: parseInt(user_id),
      business_id: this.state.business_id,
      type:'EVENTO',
      status:1
      // todo:{},
     }

try {

var evento =[];
evento = new CalendarModel(props)
console.log(evento)
evento.save()

} catch (error) {
   console.log(error)
}

if(this.state.isworkflow){
console.log('creando flujo de trabajo')
// agregar for loop para crear cada flujo  generado por el evento del negocio
  var event = [];
    try{
      const options = {
        where: {
          user_id_eq: this.state.id,
          business_id_eq: this.state.business_id
        },
        order: 'id DESC'
      }
        event = await CalendarModel.query(options);
        console.log(event)
    }catch (error){
     console.log(error)
    }
  
  //     const propsWorkflow = {
  //       user_id: user_id,
  //       business_id: this.state.business_id,
  //       event_id: event[0].id,
  //       status: 1,
  //     }
  //     var workflow =[];
  //     workflow = new WorkflowModel(propsBalance)
  //     balance.save()
  //     console.log(workflow)
  
  

} 
      

this.state.navigation.navigate('AgendaScreen');

}


async get_businnesses() {
  var negocios = [];
  var negocioicon = [];

  negocios = await BusinessModel.findBy({
      user_id_eq: JSON.parse(await AsyncStorage.getItem('id')),
      id_neq: JSON.parse(await AsyncStorage.getItem('id'))  
  });
  if(negocios != null){
      this.setState({
          id: await AsyncStorage.getItem('id')
      })

      for (let index = 0; index < [negocios].length; index++) {
        
        const element = [negocios][index]

        element.iconview = <Text style={{ color: COLORS.darkgray, fontSize: 19 }}> <Icon size={20} name={element.icon} style={{color:element.color, margin:8}}/>  {element.name}</Text>
        negocioicon.push(element)
      }
    


      this.setState({negocio: negocioicon})  

  }else{
      this.setState({negocio: []})
  }
 

}
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  render() { 
  
  return (
    <View
    style={{
      flex: 1
    }}
  >
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
     onPress={() => {this.state.navigation.navigate('AgendaScreen')}}
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
                  <Text style={{ color: COLORS.white, ...FONTS.h2 }}>   Nueva tarea</Text>
                  <TouchableOpacity
     onPress={() => {this.Delete() }}
  >
                  <Icon size={30} name='trash-o'
                                  style={{
                                    margin:8,
                                    color: COLORS.white,
                                  }}/>
</TouchableOpacity>
              </View>
              </View>

{/* ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////// */}
{/* ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////// */}


      <DateTimePickerModal
        isVisible={this.state.isDatePickerVisible1}
        mode="datetime"
        onConfirm={this.handleConfirmStart}
        onCancel={this.hideDatePickerStart}
      />   
      <DateTimePickerModal
        isVisible={this.state.isDatePickerVisible2}
        mode="datetime"
        onConfirm={this.handleConfirmEnd}
        onCancel={this.hideDatePickerEnd}
      />   

      <SafeAreaView style={styles.container}>
        <View
          style={{
            height: this.state.visibleHeight
          }}
        >
          <ScrollView
            contentContainerStyle={{
              paddingBottom: 120
            }}
          >
            
            <View style={styles.taskContainer}>
              <TextInput
                name='title'
                style={styles.title}
                onChangeText={(title) => this.setState({title})}
                value={this.state.title}
                placeholder="Nombre su tarea!!!"
              />
              
              <Text
                style={{
                  color: '#9CAAC4',
                  fontSize: 16,
                  fontWeight: '600',
                  marginVertical: 20

                }}
              >
                Tipo de tarea
              </Text>
               {/* <TypePicker parentCallback={this.callbackType}/> */}
              

<SelectDropdown
        defaultButtonText='Seleccione un Negocio'
        buttonTextStyle={{fontSize: 19, color:COLORS.darkgray, }}
        buttonStyle={{ 
            backgroundColor: COLORS.white,
            height: 30,
            width: 230,
            borderColor: '#5DD976',
            borderLeftWidth: 1,
            paddingLeft: 8,
            
          }}
        
	data={this.state.negocio}
	onSelect={(selectedItem, index) => {
    this.setState({ business_id: selectedItem.id })
		
	}}
	buttonTextAfterSelection={(selectedItem, index) => {
		return selectedItem.iconview
	}}
	rowTextForSelection={(item, index) => {
		return item.iconview
	}}
/>

              <View style={styles.notesContent} />
              <View>
                <Text style={styles.notes}>Descripción</Text>
                <TextInput
                
                  name='summary'
                  style={{
                    height: 25,
                    fontSize: 19,
                    marginTop: 3,
                    borderColor: '#5DD976',
                    borderLeftWidth: 1,
                    paddingLeft: 8,
            
                    
                  }}
                  onChangeText={(summary) => this.setState({summary})}
                  value={this.state.summary}
                  placeholder="Añada notas sobre este evento."
                />
              </View>

              <View style={styles.separator} />

              <View style={{flex: 1,flexDirection: 'row', alignItems: 'center',
                            justifyContent: 'center',paddingBottom: 30,paddingTop: 30}}>

              <View style={{backgroundColor:COLORS.white,borderColor: '#5DD976',
    borderLeftWidth: 1,width:165, alignItems: 'center',
                            justifyContent: 'center',elevation:2}}>
                <Text
                  style={{
                    color: '#9CAAC4',
                    fontSize: 16,
                    fontWeight: '600'
                  }}
                >
                  Inicio
                </Text>
                <TouchableOpacity
                  style={{
                    height: 25,
                    marginTop: 3,
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                  onPress={this.showDatePickerStart}
                >
                   <Icon size={14} name='calendar'
                                  style={{
                                    margin:5,
                                    color: COLORS.primary,
                                  }}/>
                  <Text style={{ fontSize: 14 }}>
                    {moment(this.state.timeStart).format('YYYY-MM-DD HH:mm')}
                  </Text>
                </TouchableOpacity>
              </View>

              <View  style={{width:14, alignItems: 'center',
                           }}>
                <Text style={{ fontSize: 14 }}>
                    
                    -
                    
                    
                  </Text>
              </View>
              <View  style={{backgroundColor:COLORS.white,borderColor: '#5DD976',
    borderLeftWidth: 1,width:165, alignItems: 'center',
                            justifyContent: 'center',elevation:2}}>
                <Text
                  style={{
                    color: '#9CAAC4',
                    fontSize: 16,
                    fontWeight: '600'
                  }}
                >
                  Fin
                </Text>
                <TouchableOpacity
                  style={{
                    height: 25,
                    marginTop: 3,
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                  onPress={this.showDatePickerEnd}
                  >
                     <Icon size={14} name='calendar'
                                    style={{
                                      margin:5,
                                      color: COLORS.primary,
                                    }}/>
                  <Text style={{ fontSize: 14}}>
                    {moment(this.state.timeEnd).format('YYYY-MM-DD HH:mm')}
                  </Text>
                </TouchableOpacity>
              </View>
              </View>
              <View style={styles.separator} />
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}
              >

                <View>
                  <Text
                    style={{
                      color: '#9CAAC4',
                      fontSize: 19,
                      fontWeight: '600'
                    }}
                  >
                    Flujo de Trabajo
                  </Text>
                  
                </View>
                <Switch value={this.state.isworkflow} onChange={this.SwitchWorkflow}  />
              </View>
<View style={styles.separator} />
              <Text
                style={{
                  color: '#9CAAC4',
                  fontSize: 16,
                  fontWeight: '600',
                  marginVertical: 20
                }}
              >
                Color
              </Text>
               <ColorPicker parentCallback={this.callbackColor}/>

            
              
            </View>
            <TouchableOpacity
              disabled={this.state.title === ''}
              onPress={this.createEvent}
              style={[
                styles.createTaskButton,
                {
                  backgroundColor: this.state.taskText === '' ? 'rgba(46, 102, 231,0.5)' : '#2E66E7'
                }
              ]}
             
            >
              <Text
                style={{
                  fontSize: 18,
                  textAlign: 'center',
                  color: '#fff'
                }}
              >
                Crear Evento
              </Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </SafeAreaView>
    </View>
  );
}
}
