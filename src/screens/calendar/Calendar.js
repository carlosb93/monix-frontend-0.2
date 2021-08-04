import React, { useEffect} from 'react';
import {
  Alert,
  Dimensions,
  Image,
  Modal,
  Pressable,
  Platform,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import moment from 'moment';
import * as Calendar from 'expo-calendar';
import * as Localization from 'expo-localization';
import { COLORS, SIZES, FONTS, icons } from '../../constants'
import CalendarStrip from 'react-native-calendar-strip';
import DateTimePicker from 'react-native-modal-datetime-picker';
// import { Task } from '../../components';
// import { useStore } from '../../store/';
import { SafeAreaView } from 'react-native-safe-area-context';

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import Icon from 'react-native-vector-icons/FontAwesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons'




const styles = StyleSheet.create({
  taskListContent: {
    height: 100,
    width: 327,
    alignSelf: 'center',
    borderRadius: 10,
    shadowColor: '#2E66E7',
    backgroundColor: '#ffffff',
    marginTop: 10,
    marginBottom: 10,
    shadowOffset: {
      width: 3,
      height: 3
    },
    shadowRadius: 5,
    shadowOpacity: 0.2,
    elevation: 3,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  viewTask: {
    position: 'absolute',
    bottom: 40,
    right: 17,
    height: 60,
    width: 60,
    backgroundColor: '#2E66E7',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#2E66E7',
    shadowOffset: {
      width: 0,
      height: 5
    },
    shadowRadius: 30,
    shadowOpacity: 0.5,
    elevation: 5,
    zIndex: 999
  },
  deleteButton: {
    backgroundColor: '#ff6347',
    width: 100,
    height: 38,
    alignSelf: 'center',
    marginTop: 40,
    borderRadius: 5,
    justifyContent: 'center'
  },
  updateButton: {
    backgroundColor: '#2E66E7',
    width: 100,
    height: 38,
    alignSelf: 'center',
    marginTop: 40,
    borderRadius: 5,
    justifyContent: 'center',
    marginRight: 20
  },
  separator: {
    height: 0.5,
    width: '100%',
    backgroundColor: '#979797',
    alignSelf: 'center',
    marginVertical: 20
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
    height: 475,
    width: 327,
    alignSelf: 'center',
    borderRadius: 20,
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
  cardMain: {
    position: 'absolute',
    top: 100,
    width: 327,
    alignSelf: 'center',
    zIndex: 1000,
    elevation: 1000,
    paddingBottom: 54
  },
  card: {
    width: 327,
    borderRadius: 20,
    backgroundColor: '#ffffff',
    alignSelf: 'center'
  },
  container: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)'
  },
  btnContainer: ({ pressed }) => ({
    position: 'absolute',
    alignSelf: 'center',
    bottom: 0,
    right: 0,
    left: 0,
    backgroundColor: '#FFFFFF',
    height: 44,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    opacity: pressed ? 0.5 : 1
  }),
  textContainer: { textAlign: 'center', fontSize: 17, fontWeight: '500' }
});

const zustandCreateStore = (children) => create(immer(children));

export default class CalendarScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      navigation: this.props.navigation,
      todoList: [],
      setTodoList: [],
      markedDate: [],
      setMarkedDate: [],
      currentDate: moment().format('YYYY')+'-'+moment().format('MM')+'-'+moment().format('DD'),
      setCurrentDate: moment().format('YYYY')+'-'+moment().format('MM')+'-'+moment().format('DD'),
      isModalVisible: false,
      setModalVisible: false,
      selectedTask: null,
      setSelectedTask: null,
      isDateTimePickerVisible: false,
      setDateTimePickerVisible: false,
      todo: [],
    }
  };
  
  componentDidMount() {
    this._focusListener = this.props.navigation.addListener('focus', () => {
      this.handleDeletePreviousDayTask(this.state.todo);
    });
  };
  
  componentWillUnmount() {
    this._focusListener();
  };
///////////////////////////////////deleteSelectedTask//////////////////////////////////////////////
  deleteSelectedTask= async (item)  =>{
    new Promise(async (resolve) => {
      const previousTodo = get().todo;
      const newTodo = previousTodo.map((data) => {
        if (item.date === data.date) {
          const previousTodoList = [...data.todoList];
          const newTodoList = previousTodoList.filter((list) => {
            if (list.key === item.todo.key) {
              return false;
            }
            return true;
          });

          return { ...data, todoList: newTodoList };
        }
        return data;
      });
      const checkForEmpty = newTodo.filter((data) => {
        if (data.todoList.length === 0) {
          return false;
        }
        return true;
      });
      try {
        set({ todo: checkForEmpty });
        resolve();
        await AsyncStorage.setItem('TODO', JSON.stringify(checkForEmpty));
      } catch (error) {
        // Error saving data
      }
    })
  }
///////////////////////////////updateSelectedTask////////////////////////////////////////
  updateSelectedTask = async(item) =>{
    new Promise(async (resolve) => {
      const previousTodo = get().todo;
      const newTodo = previousTodo.map((data) => {
        if (item.date === data.date) {
          const previousTodoList = [...data.todoList];
          const newTodoList = previousTodoList.map((list) => {
            if (list.key === item.todo.key) {
              return item.todo;
            }
            return list;
          });
          return { ...data, todoList: newTodoList };
        }
        return data;
      });
      try {
        set({ todo: newTodo });
        resolve();
        await AsyncStorage.setItem('TODO', JSON.stringify(newTodo));
      } catch (error) {
        // Error saving data
      }
    })
  }
  //////////////////////////////////////////////////////////////////////////
  handleDeletePreviousDayTask = async (oldTodo) => {
    try {
      if (oldTodo !== []) {
        const todayDate = `${moment().format('YYYY')}-${moment().format(
          'MM'
        )}-${moment().format('DD')}`;
        console.log(todayDate)
        const checkDate = moment(todayDate);
        await oldTodo.filter((item) => {
          const currDate = moment(item.date);
          const checkedDate = checkDate.diff(currDate, 'days');
          console.log(item)
          console.log(checkedDate)
          if (checkedDate > 0) {
            item.todoList.forEach(async (listValue) => {
              try {
                await Calendar.deleteEventAsync(
                  listValue.alarm.createEventAsyncRes.toString()
                );
              } catch (error) {
                console.log(error);
              }
            });
            return false;
          }
          return true;
        });
  
        // await AsyncStorage.setItem('TODO', JSON.stringify(updatedList));
        this.updateCurrentTask(this.state.currentDate);
      }
    } catch (error) {
      // Error retrieving data
    }
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



  ////////////////////////////////////////////////////////////////////////////////////////////////////////
  render() { 

 
    
    const datesWhitelist = [
      {
        start: moment(),
        end: moment().add(365, 'days') // total 4 days enabled
      }
    ];
    
    const handleModalVisible = () => {
      this.setState({isModalVisible: !this.state.isModalVisible});
    };
    
   
   
    const showDateTimePicker = () => this.setState({dateTimePickerVisible: true});

    const hideDateTimePicker = () => this.setState({dateTimePickerVisible: false});
   
    const handleDatePicked = (date) => {
      console.log(date)
      let prevSelectedTask = JSON.parse(JSON.stringify(this.state.selectedTask));
      const selectedDatePicked = prevSelectedTask.alarm.time;
      const hour = moment(date).hour();
      const minute = moment(date).minute();
      let newModifiedDay = moment(selectedDatePicked).hour(hour).minute(minute);
      prevSelectedTask.alarm.time = newModifiedDay;
      this.setState({selectedTask:prevSelectedTask});
      this.setState({selectedTask:prevSelectedTask});
      hideDateTimePicker();
    };

    const handleAlarmSet = () => {
      let prevSelectedTask = JSON.parse(JSON.stringify(this.state.selectedTask));
      prevSelectedTask.alarm.isOn = !prevSelectedTask.alarm.isOn;
      this.setState({selectedTask:prevSelectedTask});
    };

    const updateAlarm = async () => {
      const calendarId = await createNewCalendar();
      const event = {
        title: this.state.selectedTask.title,
        notes: this.state.selectedTask.notes,
        startDate: moment(this.state.selectedTask?.alarm.time).add(0, 'm').toDate(),
        endDate: moment(this.state.selectedTask?.alarm.time).add(5, 'm').toDate(),
        timeZone: Localization.timezone
      };
    
      if (!this.state.selectedTask?.alarm.createEventAsyncRes) {
        try {
          const createEventAsyncRes = await Calendar.createEventAsync(
            calendarId.toString(),
            event
          );
          let updateTask = JSON.parse(JSON.stringify(this.state.selectedTask));
          updateTask.alarm.createEventAsyncRes = createEventAsyncRes;
          this.setState({selectedTask: updateTask});
        } catch (error) {
          console.log(error);
        }
      } else {
        try {
          await Calendar.updateEventAsync(
            this.state.selectedTask?.alarm.createEventAsyncRes.toString(),
            event
          );
        } catch (error) {
          console.log(error);
        }
      }
    };
 
    const deleteAlarm = async () => {
      try {
        if (this.state.selectedTask?.alarm.createEventAsyncRes) {
          await Calendar.deleteEventAsync(
            this.state.selectedTask?.alarm.createEventAsyncRes
          );
        }
        let updateTask = JSON.parse(JSON.stringify(this.state.selectedTask));
        updateTask.alarm.createEventAsyncRes = '';
        this.setState({selectedTask: updateTask});
      } catch (error) {
        console.log('deleteAlarm', error.message);
      }
    };

    const getEvent = async () => {
      if (this.state.selectedTask?.alarm.createEventAsyncRes) {
        try {
          await Calendar.getEventAsync(
            this.state.selectedTask?.alarm.createEventAsyncRes.toString()
            );
            console.log(this.state.selectedTask);
        } catch (error) {
          console.log(error);
        }
      }
    };

    const createNewCalendar = async () => {
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

  return (
    <View
    style={{
      flex: 1,
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
     onPress={() => {this.state.navigation.navigate('Home')}}
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
                  <Text style={{ color: COLORS.white, ...FONTS.h2 }}>   Calendario</Text>
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
      {console.log(this.state.selectedTask)}
      {this.state.selectedTask !== null && (
        <Modal
        animationType="fade"
        transparent
        visible={this.state.isModalVisible}
        onRequestClose={() => this.setState({isModalVisible: false})}
      >
        <View
          style={[
            styles.container,
            {
              ...Platform.select({
                android: {
                  // paddingTop: shouldMove ? 240 : null,
                }
              })
            }
          ]}
        >
          <View style={styles.cardMain}>
            <View style={styles.card}>
          <DateTimePicker
            isVisible={this.state.isDateTimePickerVisible}
            onConfirm={handleDatePicked}
            onCancel={hideDateTimePicker}
            mode="time"
            date={new Date()}
            isDarkModeEnabled
          />
          <View style={styles.taskContainer}>
            <TextInput
              style={styles.title}
              onChangeText={(text) => {
                let prevSelectedTask = JSON.parse(JSON.stringify(this.state.selectedTask));
                prevSelectedTask.title = text;
                this.setState({selectedTask:prevSelectedTask});
              }}
              value={this.state.selectedTask.title}
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
                <Text style={{ textAlign: 'center', fontSize: 14 }}>Learn</Text>
              </View>
            </View>
            <View style={styles.notesContent} />
            <View>
              <Text
                style={{
                  color: '#9CAAC4',
                  fontSize: 16,
                  fontWeight: '600'
                }}
              >
                Notes
              </Text>
              <TextInput
                style={{
                  height: 25,
                  fontSize: 19,
                  marginTop: 3
                }}
                onChangeText={(text) => {
                  let prevSelectedTask = JSON.parse(
                    JSON.stringify(this.state.selectedTask)
                  );
                  prevSelectedTask.notes = text;
                  this.setState({selectedTask:prevSelectedTask});
                }}
                value={this.state.selectedTask.notes}
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
                  {moment(this.state.selectedTask?.alarm?.time || moment()).format(
                    'h:mm A'
                  )}
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
                    {moment(this.state.selectedTask?.alarm?.time || moment()).format(
                      'h:mm A'
                    )}
                  </Text>
                </View>
              </View>
              <Switch
                value={this.state.selectedTask?.alarm?.isOn || false}
                onValueChange={handleAlarmSet}
              />
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center'
              }}
            >
              <TouchableOpacity
                onPress={async () => {
                  handleModalVisible();
                  console.log('isOn', this.state.selectedTask?.alarm.isOn);
                  if (this.state.selectedTask?.alarm.isOn) {
                    await updateAlarm();
                  } else {
                    await deleteAlarm();
                  }
                  await this.updateSelectedTask({
                    date: this.state.currentDate,
                    todo: this.state.selectedTask
                  });
                  this.updateCurrentTask(this.state.currentDate);
                }}
                style={styles.updateButton}
              >
                <Text
                  style={{
                    fontSize: 18,
                    textAlign: 'center',
                    color: '#fff'
                  }}
                >
                  UPDATE
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={async () => {
                  handleModalVisible();
                  deleteAlarm();
                  await this.deleteSelectedTask({
                    date: this.state.currentDate,
                    todo: this.state.selectedTask
                  });
                  this.updateCurrentTask(this.state.currentDate);
                }}
                style={styles.deleteButton}
              >
                <Text
                  style={{
                    fontSize: 18,
                    textAlign: 'center',
                    color: '#fff'
                  }}
                >
                  DELETE
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          </View>
            <Pressable
              style={styles.btnContainer}
              onPress={() => this.setState({isModalVisible: false})}
            >
              <Text style={styles.textContainer}>Cancel</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
      )}
     
      <SafeAreaView
        style={{
          flex: 1
        }}
      >
        <CalendarStrip
          calendarAnimation={{ type: 'sequence', duration: 30 }}
          daySelectionAnimation={{
            type: 'background',
            duration: 200
          }}
          style={{
            height: 150,
            paddingTop: 20,
            paddingBottom: 20
          }}
          calendarHeaderStyle={{ color: '#000000' }}
          dateNumberStyle={{ color: '#000000', paddingTop: 10 }}
          dateNameStyle={{ color: '#BBBBBB' }}
          highlightDateNumberStyle={{
            color: '#fff',
            backgroundColor: '#2E66E7',
            marginTop: 10,
            height: 35,
            width: 35,
            textAlign: 'center',
            borderRadius: 17.5,
            overflow: 'hidden',
            paddingTop: 6,
            fontWeight: '400',
            justifyContent: 'center',
            alignItems: 'center'
          }}
          highlightDateNameStyle={{ color: '#2E66E7' }}
          disabledDateNameStyle={{ color: 'grey' }}
          disabledDateNumberStyle={{ color: 'grey', paddingTop: 10 }}
          datesWhitelist={datesWhitelist}
          iconLeft={icons.left_arrow}
          iconRight={icons.right_arrow}
          iconContainer={{ flex: 0.1 }}
          // If you get this error => undefined is not an object (evaluating 'datesList[_this.state.numVisibleDays - 1].date')
          // temp: https://github.com/BugiDev/react-native-calendar-strip/issues/303#issuecomment-864510769
          markedDates={this.state.markedDate}
          selectedDate={this.state.currentDate}
          onDateSelected={(date) => {
            const selectedDate = `${moment(date).format('YYYY')}-${moment(
              date
            ).format('MM')}-${moment(date).format('DD')}`;
            this.updateCurrentTask(selectedDate);
            this.setState({currentDate:selectedDate})
            // this.state.setCurrentDate(selectedDate);
          }}
        />
        
        <TouchableOpacity
    style={{
      
      borderColor: 'rgba(0,0,0,0.2)',
    width: 60,
    position: 'absolute',
    bottom: 40,
    right: 17,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 999,
    height: 60,
    elevation: 6,
    backgroundColor: '#fff',
    borderRadius: 100,
    }}
     onPress={() => {this.state.navigation.navigate('CreateTask', {
      updateCurrentTask: false,
      currentDate:this.state.currentDate,
      createNewCalendar: this.createNewCalendar
    })}}
  >
     <FontAwesomeIcon size={25} icon={ faPlus  } 
                        style={{
                            color: COLORS.primary,
                        }}/>
                        
  </TouchableOpacity>  

        <View
          style={{
            width: '100%',
            height: Dimensions.get('window').height - 170
          }}
        >
          <ScrollView
            contentContainerStyle={{
              paddingBottom: 20
            }}
          >
           
            {this.state.todoList.map((item) => (
              <TouchableOpacity
                onPress={() => {
                  this.setState({selectedTask: item});
                  this.setState({isModalVisible: true});
                  getEvent();
                }}
                key={item.key}
                style={styles.taskListContent}
              >
                <View
                  style={{
                    marginLeft: 13
                  }}
                >
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center'
                    }}
                  >
                    <View
                      style={{
                        height: 12,
                        width: 12,
                        borderRadius: 6,
                        backgroundColor: item.color,
                        marginRight: 8
                      }}
                    />
                    <Text
                      style={{
                        color: '#554A4C',
                        fontSize: 20,
                        fontWeight: '700'
                      }}
                    >
                      {item.title}
                    </Text>
                  </View>
                  <View>
                    <View
                      style={{
                        flexDirection: 'row',
                        marginLeft: 20
                      }}
                    >
                      <Text
                        style={{
                          color: '#BBBBBB',
                          fontSize: 14,
                          marginRight: 5
                        }}
                      >{`${moment(item.alarm.time).format('YYYY')}/${moment(
                        item.alarm.time
                      ).format('MM')}/${moment(item.alarm.time).format(
                        'DD'
                      )}`}</Text>
                      <Text
                        style={{
                          color: '#BBBBBB',
                          fontSize: 14
                        }}
                      >
                        {item.notes}
                      </Text>
                    </View>
                  </View>
                </View>
                <View
                  style={{
                    height: 80,
                    width: 5,
                    backgroundColor: item.color,
                    borderRadius: 5
                  }}
                />
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </SafeAreaView>
    </View>
  );
}
}
