import React from 'react'
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Modal,
  Image,
  ScrollView,
  FlatList,
  Dimensions,
  SafeAreaView,
  StatusBar,
  ImageBackground,
  Animated,
  Platform,
  TouchableHighlight
} from 'react-native'
import {Svg} from 'react-native-svg';
import { VictoryPie } from 'victory-native';
import {
  FontAwesomeIcon
} from '@fortawesome/react-native-fontawesome'
import {
  faUser,
  faEyeDropper,
  faArchive
} from '@fortawesome/free-solid-svg-icons'
import Icon from 'react-native-vector-icons/FontAwesome';

import SelectDropdown from 'react-native-select-dropdown'
import HsvColorPicker from 'react-native-hsv-color-picker';

import AsyncStorage from '@react-native-async-storage/async-storage';

import {
  COLORS,
  SIZES,
  FONTS,
  icons,
  iconData
} from '../../constants'
import APIKit, {
  setClientToken
} from '../../shared/APIKit';

import CategoryModel from '../../models/Category';
import BusinessModel from '../../models/Business';
import ClientsModel from '../../models/Clientes';


import {toTimestamp, toDatetime } from '../../shared/tools';
import { Alert } from 'react-native';

const numColumns = 3;
const size = Dimensions.get('window').width / numColumns;
const stylesflat = StyleSheet.create({
  itemContainer: {
    width: size,
    height: size,
    margin: 1,
  }
});

export default class GraphKidsByAge extends React.Component {


  
  constructor(props) {
    super(props);
    this.state = {
      navigation: this.props.navigation,
      otherParam: this.props.route.params.otherParam,
      itemId: this.props.route.params.itemId,
      negocioId: this.props.route.params.itemId,
      clients:[],
      viewMode:'chart',
      selectedClientType: [],
      showMoreToggle:false,
      month:new Date().getMonth() + 1,
      mescontrol:'',
      chartData2:[],
      databyname:[],
      colorScales:[],
      colorScales2:[],
      total_ninos: 0,
      selectedClientAge: []
    }

  }
 



  componentDidMount() {
    this._focusListener = this.props.navigation.addListener('focus', () => {
    this.get_clients()
    
    });
  }

  componentWillUnmount() {
    this._focusListener();
  }
  
  get_clients = async () => {
    var data = [];
    try{
        data = await ClientsModel.query({business_id: this.state.negocioId});
        this.setState({clients: data}) 
    }catch{
        console.log('Query clients error')
    }

    
    await this.processAgeRange()
       
                
        
     }  

     setSelectclientTypeByName = async (name) => {
      let chartData = this.state.chartData.filter(a => a.name == name)
      this.setState({selectedClientType: chartData[0]})
      
  }
     setSelectclientTypeByAge = async (name) => {
      let chartData2 = this.state.chartData2.filter(a => a.name == name)
      this.setState({selectedClientAge: chartData2[0]})
      
  }

processAgeRange = async () => {

      const total = this.state.clients.length
  
      
        let iskidTotal = this.state.clients.filter(a => a.iskid == true)
        let group = iskidTotal.reduce((r, a) => {
          r[a.age] = [...r[a.age] || [], a];
          return r;
         }, {});
        let ages = iskidTotal.reduce((r, a) => {
          r[a.age]= a.age;
          return r;
         }, {});
         const edadesarray = Object.keys(ages).map((key) => Number(key))
         console.log("Edades", ages);
         console.log("Edades", edadesarray);
         console.log("group", group);
        let chartdata2 = []
        var total_kid = iskidTotal.length
        
        for (let index = 0; index < edadesarray.length; index++) {
          const element = edadesarray[index];
          console.log("edad en forloop",element);
          console.log("group cantidad", group[String(element)].length);
          let percentagekid = (group[String(element)].length  / total_kid * 100).toFixed(0)

          chartdata2.push({
            name: String(element) + ' año',
            clientCount: group[String(element)].length,
            color: COLORS.yellow,
            x:2,
            y:group[String(element)].length,
            label: percentagekid + '%',
            id: index
          })
        }

        
  
        
  
  
  
  

  let colorScales = ["tomato", "orange", "gold", "cyan", "navy" ]
  this.setState({chartData2: chartdata2})
  this.setState({total_ninos: total_kid})
  this.setState({colorScales2: colorScales})
  
 
}

render() { 
  
  // const { hue, sat, val } = this.state;
  const { navigation, hue, sat, val  } = this.state;


  return (
      <View  style={{
        alignItems: 'center',
        justifyContent: 'center'
    }}>
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
     onPress={() => {navigation.navigate('ClientsSummaryMenu', {
        itemId: this.state.negocioId,
        otherParam: this.state.otherParam,
      });}}
  >
     <Image
                            source={icons.left_arrow}
                            resizeMode="contain"
                            style={{
                                width: 25,
                                height: 25,
                                margin:6,
                                tintColor: COLORS.white
                            }}
                        />

                </TouchableOpacity>
                  <Text style={{ color: COLORS.white, ...FONTS.h2 }}>   Niños Por Edades </Text>
                  <TouchableOpacity
      onPress={() => console.log('delete')}
  >
                  <Icon size={30} name='trash-o'
                                  style={{
                                    margin:8,
                                    color: COLORS.transparent,
                                  }}/>
</TouchableOpacity>
              </View>
              </View>
        
              <View style={{ flexDirection: 'row', padding: SIZES.padding, justifyContent: 'space-between', alignItems: 'center' }}>
                {/* Title */}
                

                {/* Button */}
                <View style={{ flexDirection: 'row' }}>
                    <TouchableOpacity
                        style={{
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: this.state.viewMode == "chart" ? COLORS.secondary : null,
                            height: 50,
                            width: 50,
                            borderRadius: 25
                        }}
                        onPress={() => this.setState({viewMode:"chart"})}
                    >
                        <Image
                            source={icons.chart}
                            resizeMode="contain"
                            style={{
                                width: 20,
                                height: 20,
                                tintColor: this.state.viewMode == "chart" ? COLORS.white : COLORS.darkgray,
                            }}
                        />
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={{
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: this.state.viewMode == "list" ? COLORS.secondary : null,
                            height: 50,
                            width: 50,
                            borderRadius: 25,
                            marginLeft: SIZES.base
                        }}
                        onPress={() => this.setState({viewMode:"list"})}
                    >
                        <Image
                            source={icons.menu}
                            resizeMode="contain"
                            style={{
                                width: 20,
                                height: 20,
                                tintColor: this.state.viewMode == "list" ? COLORS.white : COLORS.darkgray,
                            }}
                        />
                    </TouchableOpacity>
                </View>
                
            </View>
            <ScrollView contentContainerStyle={{ paddingBottom: 60 }}>
       
            <View  style={{ alignItems: 'center', justifyContent: 'center'}}>
      <Svg width={SIZES.width} height={SIZES.width} style={{width: "100%", height: "auto"}}>

          <VictoryPie
              standalone={false} // Android workaround
              data={this.state.chartData2}
              labels={(datum) => `${datum.clientCount}`}
              radius={({ datum }) => (this.state.selectedClientAge && this.state.selectedClientAge.name == datum.name) ? SIZES.width * 0.4 : SIZES.width * 0.4 - 10}
              innerRadius={70}
              labelRadius={({ innerRadius }) => (SIZES.width * 0.4 + innerRadius) / 2.5}
              style={{
                  labels: { fill: "white" },
                  parent: {
                      ...styles.shadow
                  },
              }}
              width={SIZES.width}
              height={SIZES.width}
              colorScale={this.state.colorScales2}
              events={[{
                  target: "data",
                  eventHandlers: {
                      onPress: () => {
                          return [{
                              target: "labels",
                              mutation: (props) => {
                                  let clientType = this.state.chartData2[props.index].name
                                  this.setSelectclientTypeByAge(clientType)
                              }
                          }]
                      }
                  }
              }]}

          />
      </Svg>
      <View style={{ position: 'absolute', top: '42%', left: "42%" }}>
          <Text style={{ ...FONTS.h1, textAlign: 'center' }}>{this.state.total_ninos}</Text>
          <Text style={{ ...FONTS.body3, textAlign: 'center' }}>Niños</Text>
      </View>
      </View>
      <View style={{ padding: SIZES.padding }}>
                <FlatList
                    data={this.state.chartData2}
                    renderItem={({item}) => (
                  <TouchableOpacity
                      style={{
                          flexDirection: 'row',
                          height: 40,
                          paddingHorizontal: SIZES.radius,
                          borderRadius: 10,
                          backgroundColor: (this.state.selectedClientAge && this.state.selectedClientAge.name == item.name) ? this.state.colorScales2[item.id] : COLORS.white
                      }}
                      onPress={() => {
                        let clientType = item.name
                        this.setSelectclientTypeByAge(clientType)
                      }}
                  >
                      {/* Name/Category */}
                      <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                          <View
                              style={{
                                  width: 20,
                                  height: 20,
                                  backgroundColor: (this.state.selectedClientAge && this.state.selectedClientAge.name == item.name) ? COLORS.white : this.state.colorScales2[item.id],
                                  borderRadius: 5
                              }}
                          />
      
                          <Text style={{ marginLeft: SIZES.base, color: (this.state.selectedClientAge && this.state.selectedClientAge.name == item.name) ? COLORS.white : COLORS.primary, ...FONTS.h3 }}>{item.clientCount}</Text>
                      </View>
      
                      {/* Expenses */}
                      <View style={{ justifyContent: 'center',alignItems: 'center' }}>
                          <Text style={{ color: (this.state.selectedClientAge && this.state.selectedClientAge.name == item.name) ? COLORS.white : COLORS.primary, ...FONTS.h3 }}>  {item.name}  </Text>
                      </View>
                  </TouchableOpacity>)}
                    keyExtractor={item => item.id}
                />

            </View>
            </ScrollView>
               
      </View>
     
      
        )

        
      }
    }
            const styles = StyleSheet.create({
              container: {
                flex: 1,
                backgroundColor: '#fff',
                alignItems: 'center',
                justifyContent: 'center',
              },
              shadow: {
                shadowColor: "#000",
                shadowOffset: {
                    width: 2,
                    height: 2,
                },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,
                elevation: 3,
            }
            });
