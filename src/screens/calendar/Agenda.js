import React, {Component} from 'react';
import {Alert, Dimensions, Image, StyleSheet, Text, View, TouchableOpacity} from 'react-native';
// @ts-expect-error
import {Agenda} from 'react-native-calendars';
import { COLORS, SIZES, FONTS, icons } from '../../constants'
import Icon from 'react-native-vector-icons/FontAwesome';
import moment from 'moment';
import CalendarModel from '../../models/Calendar';



export default class AgendaScreen extends Component {
  state = {
    navigation: this.props.navigation,
    markedDates:{},
    events:{},
    selectedDate: moment().format('YYYY-MM-DD'),
    items: {}
  };
  componentDidMount() {
    this._focusListener = this.props.navigation.addListener('focus', () => {
       this.get_marks();
       this.get_events(moment().format('YYYY-MM-DD'));
    });
  };
  
  componentWillUnmount() {
    this._focusListener();
  };
  
 async get_marks(){
  var events = [];
  try{
      events = await CalendarModel.query();
    
  }catch{
   console.log('query event error')
  }

  var element = {};
      var contador = 0;
            for(var i =0;i<events.length;i++){

                if((Object.keys(element)).indexOf(events[i].date_start) > -1){

                  for(var j = 0;j<Object.keys(element).length;j++){

                    if(events[i].date_start === Object.keys(element)[j] && element[events[i].date_start].dots.length < 3){

                      if(events[i].date_start == moment(this.state.timeStart).format('YYYY-MM-DD') && contador == 0){

                        var selected = true;
                        var selectedColor = COLORS.primary;
                        element[events[i].date_start].selected = selected;
                        element[events[i].date_start].selectedColor = selectedColor;
                        contador = 1;

                      }
                      var a ={key:String(events[i].id), color:events[i].color}
                      element[events[i].date_start].dots.push(a);

                    }
                  }
                }else{

                  var a = {dots:[{key:String(events[i].id),color:events[i].color}]}
                  element[events[i].date_start+''] = a;

                }
            }
            this.setState({markedDates: element})

   }
  
 async get_events(date){
console.log(date)
  var events = [];
  try{

      events = await CalendarModel.getByDate(date);
    console.log(events)
     
  }catch{
   console.log('query event error')
  }
  var element = {};
            for(var i =0;i<events.length;i++){

                if((Object.keys(element)).indexOf(events[i].date_start) > -1){

                  for(var j = 0;j<Object.keys(element).length;j++){
                    if(events[i].date_start === Object.keys(element)[j]){

                      var a ={
                        key: String(events[i].id),
                        name: events[i].title,
                        summary: events[i].summary,
                        start: moment(events[i].start).format('YYYY-MM-DD HH:mm'),
                        end: moment(events[i].end).format('YYYY-MM-DD HH:mm'),
                        height: 30,
                        color: events[i].color
                      }

                      element[events[i].date_start].push(a);

                    }
                  }
                }else{

                  var a = [{
                        key: String(events[i].id),
                        name: events[i].title,
                        summary: events[i].summary,
                        start: moment(events[i].start).format('YYYY-MM-DD HH:mm'),
                        end: moment(events[i].end).format('YYYY-MM-DD HH:mm'),
                        height: 30,
                        color: events[i].color
                  }]

                  element[events[i].date_start+''] = a;

                }
            }
            this.setState({events: element})

   }
changeSelectedDate(day){
      this.setState({selectedDate:day.dateString}, () => {
        this.get_events(day.dateString);
       })

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

      <Agenda
        testID={'agenda'}
        items={this.state.events}
        // loadItemsForMonth={(day) => {this.loadItems(day)}}
        renderItem={this.renderItem.bind(this)}
        renderEmptyDate={this.renderEmptyDate.bind(this)}
        rowHasChanged={this.rowHasChanged.bind(this)}
        showClosingKnob={true}
        markingType={'multi-dot'}
        markedDates={this.state.markedDates}
        onDayChange={(day) => {this.changeSelectedDate(day)}}
        onDayPress={(day) => {this.changeSelectedDate(day)}}
        selected={this.state.selectedDate}
        //renderDay={(day, item) => (<Text>{day ? day.day: 'item'}</Text>)}
        hideExtraDays={false}
      />
      </View>
    );
  }

 



height_calc (column) {
  const CALENDER_HEIGHT = 1800
  const offset = CALENDER_HEIGHT / 24

  const startTime = moment(column.start)
  const endTime = column.end ? moment(column.end) : startTime.clone().add(1, 'hour')

  column.height = endTime.diff(startTime, 'hours', true) * offset

  return column.height
}

  renderItem(item) {
    return (
      <TouchableOpacity
        testID={'item'}
        style={[styles.item, {height: this.height_calc(item), borderColor: item.color || '#F0F4FF',
        borderLeftWidth: 8,}]}
        onPress={() => Alert.alert(item.name)}
      >
        <Text>{item.name}</Text>
        <Text
                  style={{ color: '#615B73',
                  fontSize: 12,
                  flexWrap: 'wrap',}}
                >{item.summary}</Text>
        <Text style={{ marginTop: 3,
      fontSize: 10,
      color: '#615B73',
      flexWrap: 'wrap',}} >{moment(item.start).format('YYYY-MM-DD HH:mm')} - {moment(item.end).format('YYYY-MM-DD HH:mm')}</Text>
      </TouchableOpacity>
    );
  }

  renderEmptyDate() {
    return (
      <View style={styles.emptyDate}>
        <Text>This is empty date!</Text>
      </View>
    );
  }

  rowHasChanged(r1, r2) {
    return r1.name !== r2.name;
  }

  timeToString(time) {
    const date = new Date(time);
    return date.toISOString().split('T')[0];
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
  },
  emptyDate: {
    height: 15,
    flex: 1,
    paddingTop: 30
  }
});