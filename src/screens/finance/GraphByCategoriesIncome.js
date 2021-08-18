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
import Numeral from 'numeral'
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
import BalanceModel from '../../models/Balance';
import AccountModel from '../../models/Account';


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

export default class GraphByCategoriesIncome extends React.Component {


  
  constructor(props) {
    super(props);
    this.state = {
      navigation: this.props.navigation,
      otherParam: this.props.route.params.otherParam,
      itemId: this.props.route.params.itemId,
      negocioId: this.props.route.params.itemId,
      balance:[],
      categories:[],
      viewMode:'chart',
      selectedCategory: [],
      showMoreToggle:false,
      month:new Date().getMonth() + 1,
      mescontrol:'',
      chartData:[],
      chartData2:[],
      databyname:[],
      colorScales:[],
      colorScales2:[],
      total_ninos: 0,
      category:[],
      selectedClientAge: []
    }

  }
 



  componentDidMount() {
    this._focusListener = this.props.navigation.addListener('focus', () => {
    this.get_balance()
    
    });
  }

  componentWillUnmount() {
    this._focusListener();
  }
  
  get_balance = async () => {
    var data = [];
    try{
        // data = await BalanceModel.query({account_id: this.state.otherParam.id});
        data = await BalanceModel.getBalance(this.state.otherParam.id);
        console.log(data)
    }catch{
        console.log('Query clients error')
    }
   if(data.length > 0){
       this.setState({balance: data}, () => {
           this.processCategoriesChart();
         })
       
   }
       
                
        
     }   

     setSelectCategoryByName = async (name) => {
        let category = this.state.categories.filter(a => a.name == name)
        this.setState({selectedCategory:category[0]})
    }
   
  

  processCategoriesChart = async () => {

    const categories = await CategoryModel.query();
let categoriesData = []

// let balanceData = this.state.balance.map((item) => {
//     return {
//         account_id: item.account_id,
//         business_id: item.business_id,
//         categoria_id:item.categoria_id,
//         date: item.date,
//         expense_id: item.expense_id,
//         id: item.id,
//         income_id: item.income_id,
//         isPositive: item.isPositive,
//         monto: item.isPositive ? item.monto : -item.monto,
//         sale_id: item.sale_id,
//         timestamp: item.timestamp,
//         user_id: item.user_id,
//       }

// });
// console.log('this.state.balance')
// console.log(this.state.balance)
// console.log('balanceData')
// console.log(balanceData)

    categories.forEach(element => {
       

        let balancebycat = this.state.balance.filter(a => a.categoria_id == element.id)
        categoriesData.push(
            {  
                 id: element.id,
                name: element.name,
                icon: element.icon,
                color: element.color,
                expenses: balancebycat
                          }
                         )
    });
console.log(categoriesData)
    this.setState({categories: categoriesData}, () => {
        this.processCategoryDataToDisplay();
      })
}
processCategoryDataToDisplay = async () => {

    // Filter expenses with "Confirmed" status
    let chartData = this.state.categories.map((item) => {
        let confirmExpenses = item.expenses.filter(a => a.isPositive == true)
        var total = confirmExpenses.reduce((a, b) => a + (b.monto || 0), 0)

        return {
            name: item.name,
            y: total,
            expenseCount: confirmExpenses.length,
            color: item.color,
            id: item.id
        }
    })

    // filter out categories with no data/expenses
    let filterChartData = chartData.filter(a => a.y > 0)

    // Calculate the total expenses
    let totalExpense = filterChartData.reduce((a, b) => a + (b.y || 0), 0)

    // Calculate percentage and repopulate chart data
    let finalChartData = filterChartData.map((item) => {
        let percentage = (item.y / totalExpense * 100).toFixed(0)
        return {
            label: `${percentage}%`,
            y: Number(item.y),
            expenseCount: item.expenseCount,
            color: item.color,
            name: item.name,
            id: item.id
        }
    })

    let colorScales = finalChartData.map((item) => item.color)
    this.setState({chartData: finalChartData})
    this.setState({colorScales: colorScales})

    this.setState({chartData: finalChartData})
    this.setState({totalExpenseCount: finalChartData.length})

    console.log(finalChartData)

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
     onPress={() => {navigation.navigate('Finance');}}
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
                  <Text style={{ color: COLORS.white, ...FONTS.h2 }}>   Ingresos Balance por Categorias </Text>
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
                            data={this.state.chartData}
                            labels={(datum) => console.log(datum) `${datum.name}`}
                            radius={({ datum }) => (this.state.selectedCategory && this.state.selectedCategory.name == datum.name) ? SIZES.width * 0.4 : SIZES.width * 0.4 - 10}
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
                            colorScale={this.state.colorScales}
                            events={[{
                                target: "data",
                                eventHandlers: {
                                    onPress: () => {
                                        return [{
                                            target: "labels",
                                            mutation: (props) => {
                                                let categoryName = this.state.chartData[props.index].name
                                                this.setSelectCategoryByName(categoryName)
                                            }
                                        }]
                                    }
                                }
                            }]}
        
                        />
                 </Svg>
                    <View style={{ position: 'absolute', top: '42%', left: "42%" }}>
                        <Text style={{ ...FONTS.h1, textAlign: 'center' }}>{this.state.totalExpenseCount}</Text>
                        <Text style={{ ...FONTS.body3, textAlign: 'center' }}>Ingresos</Text>
                    </View>
                </View>
     
      <View style={{ padding: SIZES.padding }}>
                <FlatList
                    data={this.state.chartData}
                    renderItem={({item}) => (
                  <TouchableOpacity
                      style={{
                          flexDirection: 'row',
                          height: 40,
                          paddingHorizontal: SIZES.radius,
                          borderRadius: 10,
                          backgroundColor: (this.state.selectedCategory && this.state.selectedCategory.name == item.name) ? item.color : COLORS.white
                      }}
                      onPress={() => {
                        let clientType = item.name
                        this.setSelectCategoryByName(clientType)
                      }}
                  >
                      {/* Name/Category */}
                      <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                          <View
                              style={{
                                  width: 20,
                                  height: 20,
                                  backgroundColor: (this.state.selectedCategory && this.state.selectedCategory.name == item.name) ? COLORS.white : item.color,
                                  borderRadius: 5
                              }}
                          />
      
                          <Text style={{ marginLeft: SIZES.base, color: (this.state.selectedCategory && this.state.selectedCategory.name == item.name) ? COLORS.white : COLORS.primary, ...FONTS.h3 }}>{item.expenseCount}</Text>
                      </View>
      
                      {/* Expenses */}
                      <View style={{ justifyContent: 'center' }}>
                    <Text style={{ color: (this.state.selectedCategory && this.state.selectedCategory.name == item.name) ? COLORS.white : COLORS.primary, ...FONTS.h4 }}>{item.name}   { Numeral(item.y).format('0,0.00')} CUP - {item.label}</Text>
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
