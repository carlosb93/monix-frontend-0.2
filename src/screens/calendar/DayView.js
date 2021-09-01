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
          otro: moment(item.end).format('HH:mm'),
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