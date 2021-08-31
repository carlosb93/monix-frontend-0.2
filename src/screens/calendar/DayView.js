import React from 'react';
import { Dimensions, View, Text, TouchableOpacity,Image,
    StyleSheet } from 'react-native';
import EventCalendar from '../../components/EventCalendar/src/EventCalendar'
import { COLORS, SIZES, FONTS, icons } from '../../constants'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import Icon from 'react-native-vector-icons/FontAwesome';
import moment from 'moment';
import CalendarModel from '../../models/Calendar';

let { width } = Dimensions.get('window');
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

export default class DayView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      navigation: this.props.navigation,
      currentDate: this.props.route.params?.currentDate ?? (() => null),
      events: [],
      // events: [
      //   {
      //     start: '2021-08-06 22:30:00',
      //     end: '2021-08-06 23:30:00',
      //     title: 'Dr. Mariana Joseph',
      //     summary: '3412 Piedmont Rd NE, GA 3032',
      //     color: 'green',
      //   },
      //   {
      //     start: '2021-08-07 00:30:00',
      //     end: '2021-08-07 01:30:00',
      //     title: 'Dr. Mariana Joseph',
      //     summary: '3412 Piedmont Rd NE, GA 3032',
      //   },
      //   {
      //     start: '2021-08-07 01:30:00',
      //     end: '2021-08-07 02:20:00',
      //     title: 'Dr. Mariana Joseph',
      //     summary: '3412 Piedmont Rd NE, GA 3032',
      //   },
      //   {
      //     start: '2021-08-07 04:10:00',
      //     end: '2021-08-07 04:40:00',
      //     title: 'Dr. Mariana Joseph',
      //     summary: '3412 Piedmont Rd NE, GA 3032',
      //   },
      //   {
      //     start: '2021-08-07 01:05:00',
      //     end: '2021-08-07 01:45:00',
      //     title: 'Dr. Mariana Joseph',
      //     summary: '3412 Piedmont Rd NE, GA 3032',
      //   },
      //   {
      //     start: '2021-08-07 14:30:00',
      //     end: '2021-08-07 16:30:00',
      //     title: 'Dr. Mariana Joseph',
      //     summary: '3412 Piedmont Rd NE, GA 3032',
      //   },
      //   {
      //     start: '2021-08-08 01:20:00',
      //     end: '2021-08-08 02:20:00',
      //     title: 'Dr. Mariana Joseph',
      //     summary: '3412 Piedmont Rd NE, GA 3032',
      //   },
      //   {
      //     start: '2021-08-08 04:10:00',
      //     end: '2021-08-08 04:40:00',
      //     title: 'Dr. Mariana Joseph',
      //     summary: '3412 Piedmont Rd NE, GA 3032',
      //     color: '#FF45',
      //   },
      //   {
      //     start: '2021-08-08 00:45:00',
      //     end: '2021-08-08 01:45:00',
      //     title: 'Dr. Mariana Joseph',
      //     summary: '3412 Piedmont Rd NE, GA 3032',
      //     color: '#F4EFDB',
      //   },
      //   {
      //     start: '2021-08-08 11:30:00',
      //     end: '2021-08-08 12:30:00',
      //     title: 'Dr. Mariana Joseph',
      //     summary: '3412 Piedmont Rd NE, GA 3032',
      //   },
      //   {
      //     start: '2021-08-09 01:30:00',
      //     end: '2021-08-09 02:00:00',
      //     title: 'Dr. Mariana Joseph',
      //     summary: '3412 Piedmont Rd NE, GA 3032',
      //   },
      //   {
      //     start: '2021-08-31 03:10:00',
      //     end: '2021-08-09 03:40:00',
      //     title: 'Dr. Mariana Joseph',
      //     summary: '3412 Piedmont Rd NE, GA 3032',
      //   },
      //   {
      //     start: '2021-08-31 00:10:00',
      //     end: '2021-08-31 01:45:00',
      //     title: 'Dr. Mariana Joseph',
      //     summary: '3412 Piedmont Rd NE, GA 3032',
      //   },
      //   {
      //     start: '2021-08-31 12:10:00',
      //     end: '2021-08-31 13:45:00',
      //     title: 'Dr. Mariana Joseph',
      //     summary: '3412 Piedmont Rd NE, GA 3032',
      //   },
      // ],
    };
  }

  componentDidMount() {
    this._focusListener = this.props.navigation.addListener('focus', () => {
       this.get_events();
    });
  };
  
  componentWillUnmount() {
    this._focusListener();
  };


  _eventTapped(event) {
    alert(JSON.stringify(event));
  }

 async get_events(){
      var events = [];
      try{
          events = await CalendarModel.query();
        
      }catch{
       console.log('query event error')
      }
      let data = events.map((item) => {
        return {
          title: item.title,
          summary: item.summary,
          start: moment(item.start).format('YYYY-MM-DD HH:mm'),
          end: moment(item.end).format('YYYY-MM-DD HH:mm'),
          color: item.color,
      }
      })

      console.log(data)
this.setState({events: data})

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
                      <Text style={{ color: COLORS.white, ...FONTS.h2 }}>   Agenda</Text>
                      <TouchableOpacity
         onPress={() => {this.state.navigation.navigate('CreateTask', {
          updateCurrentTask: false
        }) }}
      >
                      <Icon size={30} name='plus'
                                      style={{
                                        margin:8,
                                        color: COLORS.white,
                                      }}/>
    </TouchableOpacity>
                  </View>
                  </View>

        <EventCalendar
          eventTapped={this._eventTapped.bind(this)}
          events={this.state.events}
          width={width}
          initDate={this.state.currentDate}
          scrollToFirst={false}
          upperCaseHeader
          uppercase
          
        />
      </View>
    );
  }
}