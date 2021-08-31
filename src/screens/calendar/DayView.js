import React from 'react';
import { Dimensions, View, Text, TouchableOpacity,Image,
    StyleSheet } from 'react-native';
import EventCalendar from '../../components/EventCalendar/src/EventCalendar'
import { COLORS, SIZES, FONTS, icons } from '../../constants'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import Icon from 'react-native-vector-icons/FontAwesome';

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

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      navigation: this.props.navigation,
      events: [
        {
          start: '2017-09-06 22:30:00',
          end: '2017-09-06 23:30:00',
          title: 'Dr. Mariana Joseph',
          summary: '3412 Piedmont Rd NE, GA 3032',
          color: 'green',
        },
        {
          start: '2017-09-07 00:30:00',
          end: '2017-09-07 01:30:00',
          title: 'Dr. Mariana Joseph',
          summary: '3412 Piedmont Rd NE, GA 3032',
        },
        {
          start: '2017-09-07 01:30:00',
          end: '2017-09-07 02:20:00',
          title: 'Dr. Mariana Joseph',
          summary: '3412 Piedmont Rd NE, GA 3032',
        },
        {
          start: '2017-09-07 04:10:00',
          end: '2017-09-07 04:40:00',
          title: 'Dr. Mariana Joseph',
          summary: '3412 Piedmont Rd NE, GA 3032',
        },
        {
          start: '2017-09-07 01:05:00',
          end: '2017-09-07 01:45:00',
          title: 'Dr. Mariana Joseph',
          summary: '3412 Piedmont Rd NE, GA 3032',
        },
        {
          start: '2017-09-07 14:30:00',
          end: '2017-09-07 16:30:00',
          title: 'Dr. Mariana Joseph',
          summary: '3412 Piedmont Rd NE, GA 3032',
        },
        {
          start: '2017-09-08 01:20:00',
          end: '2017-09-08 02:20:00',
          title: 'Dr. Mariana Joseph',
          summary: '3412 Piedmont Rd NE, GA 3032',
        },
        {
          start: '2017-09-08 04:10:00',
          end: '2017-09-08 04:40:00',
          title: 'Dr. Mariana Joseph',
          summary: '3412 Piedmont Rd NE, GA 3032',
          color: '#FF45',
        },
        {
          start: '2017-09-08 00:45:00',
          end: '2017-09-08 01:45:00',
          title: 'Dr. Mariana Joseph',
          summary: '3412 Piedmont Rd NE, GA 3032',
          color: '#F4EFDB',
        },
        {
          start: '2017-09-08 11:30:00',
          end: '2017-09-08 12:30:00',
          title: 'Dr. Mariana Joseph',
          summary: '3412 Piedmont Rd NE, GA 3032',
        },
        {
          start: '2017-09-09 01:30:00',
          end: '2017-09-09 02:00:00',
          title: 'Dr. Mariana Joseph',
          summary: '3412 Piedmont Rd NE, GA 3032',
        },
        {
          start: '2017-09-09 03:10:00',
          end: '2017-09-09 03:40:00',
          title: 'Dr. Mariana Joseph',
          summary: '3412 Piedmont Rd NE, GA 3032',
        },
        {
          start: '2017-09-09 00:10:00',
          end: '2017-09-09 01:45:00',
          title: 'Dr. Mariana Joseph',
          summary: '3412 Piedmont Rd NE, GA 3032',
        },
        {
          start: '2017-09-10 12:10:00',
          end: '2017-09-10 13:45:00',
          title: 'Dr. Mariana Joseph',
          summary: '3412 Piedmont Rd NE, GA 3032',
        },
      ],
    };
  }

  _eventTapped(event) {
    alert(JSON.stringify(event));
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

        <EventCalendar
          eventTapped={this._eventTapped.bind(this)}
          events={this.state.events}
        //   renderEvent={(event) => <TouchableOpacity style={{backgroundColor:event.color,alignItems: 'center',
        //   justifyContent: 'center',}}><Text style={{color:COLORS.softgray }}>{event.title}</Text></TouchableOpacity> }
          width={width}
          initDate={'2017-09-07'}
          scrollToFirst
          upperCaseHeader
          uppercase
          scrollToFirst={false}
          styles= {{
            event: {
                opacity: 0.9,
                backgroundColor: '#FF45'
            }
        }}
        />
      </View>
    );
  }
}