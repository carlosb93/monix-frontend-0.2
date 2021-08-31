import React, { useEffect } from 'react';
import {
  Alert,
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
import { CalendarList } from 'react-native-calendars';
import moment from 'moment';
import * as Calendar from 'expo-calendar';
import * as Localization from 'expo-localization';
import DateTimePicker from 'react-native-modal-datetime-picker';
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';
import { useKeyboardHeight } from '../../hooks';
import { useStore } from '../../utils';
// import { Routes } from '@calendar/navigation';
import { SafeAreaView } from 'react-native-safe-area-context';

import { COLORS, SIZES, FONTS, icons } from '../../constants'
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome'
import Icon from 'react-native-vector-icons/FontAwesome';
import TypePicker from '../../components/TypePicker/TypePicker'
import ColorPicker from '../../components/ColorPicker/ColorPicker'
import CalendarModel from '../../models/Calendar';

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
    height: 0.5,
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
    width: 327,
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
    }
  };


  componentDidMount() {
    this._focusListener = this.props.navigation.addListener('focus', () => {

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
     onPress={() => {this.state.navigation.navigate('CalendarScreen')}}
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




      <DateTimePicker
        isVisible={this.state.isDateTimePickerVisible}

        mode="time"
        date={new Date()}
        isDarkModeEnabled
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
                name='taskText'
                style={styles.title}
                onChangeText={(taskText) => this.setState({taskText})}
                value={this.state.taskText}
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
               <TypePicker parentCallback={this.callbackType}/>

              <View style={styles.notesContent} />
              <View>
                <Text style={styles.notes}>Descripción</Text>
                <TextInput
                
                  name='notesText'
                  style={{
                    height: 25,
                    fontSize: 19,
                    marginTop: 3
                    
                  }}
                  onChangeText={(notesText) => this.setState({notesText})}
                  value={this.state.notesText}
                  placeholder="Enter notes about the task."
                />
              </View>
              <View style={styles.separator} />

              <View style={{flex: 1,flexDirection: 'row', alignItems: 'center',
                            justifyContent: 'center',paddingBottom: 30,paddingTop: 30}}>

              <View style={{backgroundColor:COLORS.white,borderColor: '#5DD976',
    borderLeftWidth: 1,width:145, alignItems: 'center',
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
                    marginTop: 3
                  }}
                >
                  <Text style={{ fontSize: 14 }}>
                    {moment(this.state.alarmTime).format('YYYY-MM-DD h:mm A')}
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
    borderLeftWidth: 1,width:145, alignItems: 'center',
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
                    marginTop: 3
                  }}
                >
                  <Text style={{ fontSize: 14}}>
                    {moment(this.state.alarmTime).format('YYYY-MM-DD h:mm A')}
                  </Text>
                </TouchableOpacity>
              </View>
              </View>
            
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
                      fontSize: 16,
                      fontWeight: '600'
                    }}
                  >
                    Alarm
                  </Text>
                  <View
                    style={{
                      height: 25,
                      marginTop: 3
                    }}
                  >
                    <Text style={{ fontSize: 19 }}>
                      {moment(this.state.alarmTime).format('h:mm A')}
                    </Text>
                  </View>
                </View>
                <Switch value={this.state.isAlarmSet}  />
              </View>

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

              <View style={styles.notesContent} />
              
            </View>
            <TouchableOpacity
              disabled={this.state.taskText === ''}
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
                ADD YOUR TASK
              </Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </SafeAreaView>
    </View>
  );
}
}
