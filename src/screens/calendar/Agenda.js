import React from 'react';
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
import {Agenda} from 'react-native-calendars';
import * as Calendar from 'expo-calendar';
import * as Localization from 'expo-localization';
import { COLORS, SIZES, FONTS, icons } from '../../constants'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import Icon from 'react-native-vector-icons/FontAwesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import moment from 'moment';

        let mes = new Date().getMonth()
        let currentyear = new Date().getFullYear()
        let datenew = new Date(currentyear, mes, 10); 
        const firstDay = new Date(datenew.getFullYear(),datenew.getMonth(), 1)
        const lastDay = new Date(datenew.getFullYear(), datenew.getMonth() + 1, 0)


        
const numColumns = 1;
const size = Dimensions.get('window').width / numColumns;
const stylesflat = StyleSheet.create({
  itemContainer: {
    width: size - 20,
    marginRight: SIZES.padding,
    marginLeft:  SIZES.padding,
    marginVertical: SIZES.radius,
    borderRadius: 16,
    backgroundColor:COLORS.lightGray4,
    elevation: 5
  }
});

export default class AgendaScreen extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
          navigation: this.props.navigation,
          currentDate: new Date(),
          setCurrentDate: new Date(),
          events: [],
          markedDates: [],
          mes: new Date().getMonth()
        }
      };
      
      componentDidMount() {
        this._focusListener = this.props.navigation.addListener('focus', () => {
            console.log('///////////////////////////////////EVENTS///////////////////////////////////////');
            this.eventsfunc();
           
        });
      };
      
      componentWillUnmount() {
        this._focusListener();
      };

   

     async eventsfunc(){
       

        const events = await Calendar.getEventsAsync(["1","3","4","5","6","7","8","9","10","11"], firstDay, lastDay)
        
        let element = {};
        let marked = {};

            for (let index = 0; index < events.length; index++) {

                if (!element[events[index].startDate.split('T')[0]]) {

                    element[events[index].startDate.split('T')[0]] = [];
                    marked[events[index].startDate.split('T')[0]] = {marked: true};

              }
             
              element[events[index].startDate.split('T')[0]].push({
                id: events[index].id,
                calendarId: events[index].calendarId,
                title: events[index].title,
                notes: events[index].notes,
                startDate:  events[index].startDate,
                endDate:  events[index].endDate,
                allDay:  events[index].allDay,
                location:  events[index].location,
                marked: true
            })

              }

              this.setState({events: element})
              this.setState({markedDates: marked})
              console.log(this.state.events)
            }

      
      
      render() { 
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
             onPress={() => {console.log( 'nuevo evento' ) }}
          >
                          <Icon size={30} name='plus'
                                          style={{
                                            margin:8,
                                            color: COLORS.white,
                                          }}/>
        </TouchableOpacity>
                      </View>
                      </View>
            <Agenda
            
            // The list of items that have to be displayed in agenda. If you want to render item as empty date
            // the value of date key has to be an empty array []. If there exists no value for date key it is
            // considered that the date in question is not yet loaded
            items={this.state.events}
            // Callback that gets called when items for a certain month should be loaded (month became visible)
            loadItemsForMonth={(month) => {console.log('trigger by month')}}
            // Callback that fires when the calendar is opened or closed
            onCalendarToggled={(calendarOpened) => {console.log(calendarOpened)}}
            // Callback that gets called on day press
            onDayPress={(day) => {console.log('day pressed')}}
            // Callback that gets called when day changes while scrolling agenda list
            onDayChange={(day) => {console.log('day changed')}}
            // Initially selected day
            selected={this.state.currentDate}
            // Minimum date that can be selected, dates before minDate will be grayed out. Default = undefined
            minDate={firstDay}
            // Maximum date that can be selected, dates after maxDate will be grayed out. Default = undefined
            maxDate={lastDay}
            // Max amount of months allowed to scroll to the past. Default = 50
            pastScrollRange={50}
            // Max amount of months allowed to scroll to the future. Default = 50
            futureScrollRange={50}
            // Specify how each item should be rendered in agenda
            renderItem={(item, firstItemInDay) => {return (<TouchableOpacity style={{height:size*0.3,backgroundColor:COLORS.white,margin:5,alignItems: 'center',
            justifyContent: 'center',}}><Text style={{ ...FONTS.h2,color:COLORS.softgray }}>{item.title}</Text></TouchableOpacity>  
                   );}}
            // Specify how each date should be rendered. day can be undefined if the item is not first in that day
            // renderDay={(day, item) => (<Text>{day ? day.day: 'item'}</Text>)}
            // renderDay={(day, item) => {return (<Text style={{ ...FONTS.h2,color:COLORS.primary }}>date</Text>   );}}
            // Specify how empty date content with no items should be rendered
            // renderEmptyDate={() => {return (<Text style={{ ...FONTS.h2,color:COLORS.primary }}>emptydate</Text> );}}
            // Specify how agenda knob should look like
            renderKnob={() => {return (<TouchableOpacity style={{opacity:0.5,width:30,height:7,backgroundColor:COLORS.gray,margin:5,alignItems: 'center',
            justifyContent: 'center',borderRadius:20}}></TouchableOpacity>   );}}
            // Specify what should be rendered instead of ActivityIndicator
            renderEmptyData = {() => {return (<TouchableOpacity style={{opacity:0.9,width:size*0.7,height:size*0.3,backgroundColor:COLORS.white,elevation:2,margin:5,alignItems: 'center',
            justifyContent: 'center',}}><Text style={{ ...FONTS.h2,color:COLORS.softgray }}>vacio</Text></TouchableOpacity> );}}
            // Specify your item comparison function for increased performance
            rowHasChanged={(r1, r2) => {return r1.text !== r2.text}}
            // Hide knob button. Default = false
            hideKnob={false}
            hideExtraDays={false}
            // When `true` and `hideKnob` prop is `false`, the knob will always be visible and the user will be able to drag the knob up and close the calendar. Default = false
            showClosingKnob={true}
            // By default, agenda dates are marked if they have at least one item, but you can override this if needed
            markedDates={this.state.markedDates
        }
            // If disabledByDefault={true} dates flagged as not disabled will be enabled. Default = false
            disabledByDefault={true}
            // If provided, a standard RefreshControl will be added for "Pull to Refresh" functionality. Make sure to also set the refreshing prop correctly
            onRefresh={() => console.log('refreshing...')}
            // Set this true while waiting for new data from a refresh
            refreshing={false}
            // Add a custom RefreshControl component, used to provide pull-to-refresh functionality for the ScrollView
            refreshControl={null}

            // Agenda theme
            theme={{
            //   ...calendarTheme,
              calendarBackground: 'white',
              agendaDayTextColor: 'gray',
              agendaDayNumColor: 'gray',
              agendaTodayColor: 'gray',
              agendaKnobColor: 'blue'
            }}
            // Agenda container style
            style={{}}
          />

</View>
        )
      }

     
}