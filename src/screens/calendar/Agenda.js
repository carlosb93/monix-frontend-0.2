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
import {Agenda, Calendar, CalendarList} from 'react-native-calendars';
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

        const vacation = {key: 'vacation', color: 'red', selectedDotColor: 'blue'};
        const massage = {key: 'massage', color: 'blue', selectedDotColor: 'blue'};
        const workout = {key: 'workout', color: 'green'};
        
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
          mes: new Date().getMonth(),
          selected:'2021-08-29'
        }
      };
      
      componentDidMount() {
        this._focusListener = this.props.navigation.addListener('focus', () => {
           
        });
      };
      
      componentWillUnmount() {
        this._focusListener();
      };
      onDayPress(day) {
        console.log(day)
        this.state.navigation.navigate('DayView')
      };

     


      
      
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

           {/* <Calendar
  markingType={'multi-dot'}
  markedDates={{
    '2021-08-25': {dots: [vacation, massage, workout], selected: true, selectedColor: COLORS.primary},
    '2021-08-26': {dots: [massage, workout], disabled: true},
    '2021-08-15': {dots: [massage, workout],},
    '2021-08-16': { dots: [massage, workout],},
    '2021-08-21': {dots: [massage]},
    '2021-08-22': {dots: [ workout]},
    '2021-08-23': {dots: [ workout]},
    '2021-08-24': {dots: [massage]},
  }}
/> */}
<CalendarList
  // Callback which gets executed when visible months change in scroll view. Default = undefined
  onVisibleMonthsChange={(months) => {console.log('now these months are visible', months);}}
  // Max amount of months allowed to scroll to the past. Default = 50
  pastScrollRange={50}
  // Max amount of months allowed to scroll to the future. Default = 50
  futureScrollRange={50}
  // Enable or disable scrolling of calendar list
  scrollEnabled={true}
  // Enable or disable vertical scroll indicator. Default = false
  showScrollIndicator={true}
  onDayPress={(day) => {this.onDayPress(day)}}
  markingType={'multi-dot'}
  markedDates={{
    '2021-08-25': {dots: [vacation, massage, workout], selected: true, selectedColor: COLORS.primary},
    '2021-08-26': {dots: [massage, workout], disabled: true},
    '2021-08-15': {dots: [massage, workout],},
    '2021-08-16': { dots: [massage, workout],},
    '2021-08-21': {dots: [massage]},
    '2021-08-22': {dots: [ workout]},
    '2021-08-23': {dots: [ workout]},
    '2021-08-24': {dots: [massage]},
  }}
/>

</View>
        )
      }

     
}