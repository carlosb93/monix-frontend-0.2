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
    height: 400,
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
      createNewCalendar: this.props.route.params?.createNewCalendar ?? (() => null),
      updateCurrentTask: this.props.route.params?.updateCurrentTask ?? (() => null),
      currentDate: this.props.route.params?.currentDate ?? (() => null),
    }
  };
//////////////////////////////updateTodo//////////////////////////////////
  updateTodo= async (item) =>{
    new Promise(async (resolve) => {
      const datePresent = get().todo.find((data) => {
        if (data.date === item.date) {
          return true;
        }
        return false;
      });
  
      if (datePresent) {
        const updatedTodo = get().todo.map((data) => {
          if (datePresent.date === data.date) {
            return { ...data, todoList: [...data.todoList, ...item.todoList] };
          }
          return data;
        });
  
        try {
          set({ todo: updatedTodo });
          await AsyncStorage.setItem('TODO', JSON.stringify(updatedTodo));
        } catch (error) {
          // Error saving data
        }
      } else {
        const newTodo = [...get().todo, item];
  
        try {
          set({ todo: newTodo });
          resolve();
          await AsyncStorage.setItem('TODO', JSON.stringify(newTodo));
        } catch (error) {
          // Error saving data
        }
      }
    })
  }
 ////////////////////////////////////////////////////////

  componentDidMount() {
    this._focusListener = this.props.navigation.addListener('focus', () => {


      if (this.state.keyboardHeight > 0) {
        this.setState({visibleHeight:Dimensions.get('window').height - this.state.keyboardHeight})
        // this.state.setVisibleHeight(Dimensions.get('window').height - this.state.keyboardHeight);
      } else if (this.state.keyboardHeight === 0) {
        this.setState({visibleHeight:Dimensions.get('window').height});
      }
    });
  };
  
  componentWillUnmount() {
    this._focusListener();
  };

   handleAlarmSet = () => {
     this.setState({isAlarmSet: !this.state.isAlarmSet})
    // this.state.setAlarmSet(!this.state.isAlarmSet);
  };

  createNewCalendar = async () => {
    const defaultCalendarSource =
      Platform.OS === 'ios'
        ? await Calendar.getDefaultCalendarAsync(Calendar.EntityTypes.EVENT)
        : { isLocalAccount: true, name: 'Google Calendar' };
  console.log('defaultCalendarSource')
  console.log(defaultCalendarSource)
    const newCalendar = {
      title: 'Personal',
      entityType: Calendar.EntityTypes.EVENT,
      color: '#2196F3',
      sourceId: defaultCalendarSource?.sourceId || undefined,
      source: defaultCalendarSource,
      name: 'internal',
      accessLevel: Calendar.CalendarAccessLevel.OWNER,
      ownerAccount: 'personal'
    };
    console.log('newCalendar')
    console.log(newCalendar)
    
    let calendarId = null;
  
    try {
      calendarId = await Calendar.createCalendarAsync(newCalendar);
    } catch (e) {
      Alert.alert(e.message);
    }
    console.log('calendarId')
    console.log(calendarId)
    return calendarId;
  };

  updateCurrentTask = async (currentDate) => {
    console.log('currentDate')
    try {
      if (this.state.todo !== [] && this.state.todo) {
        const markDot = this.state.todo.map((item) => item.markedDot);
        const todoLists = this.state.todo.filter((item) => {
          if (currentDate === item.date) {
            return true;
          }
          return false;
        });
        this.state.setMarkedDate = markDot;
        // this.setState({markedDate: []});////////////////////////////////////////
        if (todoLists.length !== 0) {
          this.state.setTodoList = todoLists[0].todoList;
          // this.setState({todoList:todoLists[0].this.state.todoList});//////////////////////////////////////
          
        } else {
          this.state.setTodoList = [];
          // this.setState({todoList:[]});
        }
      }
    } catch (error) {
      console.log('updateCurrentTask', error.message);
    }
  };
  
   synchronizeCalendar = async () => {
    const calendarId = await this.createNewCalendar();
    console.log('calendarId')
    console.log(calendarId)
    try {
      const createEventId = await this.addEventsToCalendar(calendarId);
      this.handleCreateEventData(createEventId);
    } catch (e) {
      Alert.alert(e.message);
    }
  };
  
   addEventsToCalendar = async (calendarId) => {
     console.log('calendarId')
     console.log(calendarId)
    const event = {
      title: this.state.taskText,
      notes: this.state.notesText,
      startDate: moment(this.state.alarmTime).add(0, 'm').toDate(),
      endDate: moment(this.state.alarmTime).add(5, 'm').toDate(),
      timeZone: Localization.timezone
    };
    console.log('event')
    console.log(event)
  
    try {
      const createEventAsyncResNew = await Calendar.createEventAsync(
        calendarId.toString(),
        event
      );
      return createEventAsyncResNew;
    } catch (error) {
      console.log(error);
    }
  };
  
   showDateTimePicker = () => this.state.setDateTimePickerVisible(true);
  
   hideDateTimePicker = () => this.state.setDateTimePickerVisible(false);
  
   handleCreateEventData = async (createEventId) => {
    const creatTodo = {
      key: uuidv4(),
      date: `${moment(this.state.currentDay).format('YYYY')}-${moment(this.state.currentDay).format(
        'MM'
      )}-${moment(this.state.currentDay).format('DD')}`,
      todoList: [
        {
          key: uuidv4(),
          title: this.state.taskText,
          notes: this.state.notesText,
          alarm: {
            time: this.state.alarmTime,
            isOn: this.state.isAlarmSet,
            createEventAsyncRes: createEventId
          },
          color: `rgb(${Math.floor(
            Math.random() * Math.floor(256)
          )},${Math.floor(Math.random() * Math.floor(256))},${Math.floor(
            Math.random() * Math.floor(256)
          )})`
        }
      ],
      markedDot: {
        date: this.state.currentDay,
        dots: [
          {
            key: uuidv4(),
            color: '#2E66E7',
            selectedDotColor: '#2E66E7'
          }
        ]
      }
    };
    console.log('event')
    console.log(creatTodo)

    this.state.navigation.navigate('CalendarScreen');
    await this.updateTodo(creatTodo);
    this.updateCurrentTask(this.state.currentDate);
  };
  
   handleDatePicked = (date) => {
    const selectedDatePicked = this.state.currentDay;
    const hour = moment(date).hour();
    const minute = moment(date).minute();
    const newModifiedDay = moment(selectedDatePicked).hour(hour).minute(minute);
    this.state.setAlarmTime(newModifiedDay);
    hideDateTimePicker();
  };
  
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
        onConfirm={this.handleDatePicked}
        onCancel={this.hideDateTimePicker}
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
              paddingBottom: 100
            }}
          >
            
            <View style={styles.calenderContainer}>
              <CalendarList
                style={{
                  width: 350,
                  height: 350
                }}
                current={this.state.currentDay}
                minDate={moment().format()}
                horizontal
                pastScrollRange={0}
                pagingEnabled
                calendarWidth={350}
                onDayPress={(day) => {
                  this.state.setSelectedDay({
                    [day.dateString]: {
                      selected: true,
                      selectedColor: '#2E66E7'
                    }
                  });
                  this.state.setCurrentDay(day.dateString);
                  this.state.setAlarmTime(day.dateString);
                }}
                monthFormat="yyyy MMMM"
                hideArrows
                markingType="custom"
                theme={{
                  selectedDayBackgroundColor: '#2E66E7',
                  selectedDayTextColor: '#ffffff',
                  todayTextColor: '#2E66E7',
                  backgroundColor: '#eaeef7',
                  calendarBackground: '#eaeef7',
                  textDisabledColor: '#d9dbe0'
                }}
                markedDates={this.state.selectedDay}
              />
            </View>
            <View style={styles.taskContainer}>
              <TextInput
                name='taskText'
                style={styles.title}
                onChangeText={(taskText) => this.setState({taskText})}
                value={this.state.taskText}
                placeholder="What do you need to do?"
              />
              <Text
                style={{
                  fontSize: 14,
                  color: '#BDC6D8',
                  marginVertical: 10
                }}
              >
                Suggestion
              </Text>
              <View style={{ flexDirection: 'row' }}>
                <View style={styles.readBook}>
                  <Text style={{ textAlign: 'center', fontSize: 14 }}>
                    Read book
                  </Text>
                </View>
                <View style={styles.design}>
                  <Text style={{ textAlign: 'center', fontSize: 14 }}>
                    Design
                  </Text>
                </View>
                <View style={styles.learn}>
                  <Text style={{ textAlign: 'center', fontSize: 14 }}>
                    Learn
                  </Text>
                </View>
              </View>
              <View style={styles.notesContent} />
              <View>
                <Text style={styles.notes}>Notes</Text>
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
              <View>
                <Text
                  style={{
                    color: '#9CAAC4',
                    fontSize: 16,
                    fontWeight: '600'
                  }}
                >
                  Times
                </Text>
                <TouchableOpacity
                  onPress={() => showDateTimePicker()}
                  style={{
                    height: 25,
                    marginTop: 3
                  }}
                >
                  <Text style={{ fontSize: 19 }}>
                    {moment(this.state.alarmTime).format('h:mm A')}
                  </Text>
                </TouchableOpacity>
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
                <Switch value={this.state.isAlarmSet} onValueChange={this.handleAlarmSet} />
              </View>
            </View>
            <TouchableOpacity
              disabled={this.state.taskText === ''}
              style={[
                styles.createTaskButton,
                {
                  backgroundColor: this.state.taskText === '' ? 'rgba(46, 102, 231,0.5)' : '#2E66E7'
                }
              ]}
              onPress={async () => {
                if (this.state.isAlarmSet) {
                  await this.synchronizeCalendar();
                }
                if (!this.state.isAlarmSet) {
                  this.handleCreateEventData();
                }
              }}
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
