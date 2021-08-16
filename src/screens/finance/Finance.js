



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
    Button,
    Dimensions,
    TouchableHighlight,
    ImageBackground
} from 'react-native'
import {Avatar, ListItem} from 'react-native-elements'
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome'
import Icon from 'react-native-vector-icons/FontAwesome';
import {faPlus} from '@fortawesome/free-solid-svg-icons'
import SelectDropdown from 'react-native-select-dropdown'
import AsyncStorage from '@react-native-async-storage/async-storage';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import {COLORS, SIZES, FONTS, iconData, icons} from '../../constants'
import APIKit, {setClientToken} from '../../shared/APIKit';
import {toTimestamp, toDatetime} from '../../shared/tools';
import CategoryModel from '../../models/Category';
import BusinessModel from '../../models/Business';
import InventaryModel from '../../models/Inventary';
import SalesModel from '../../models/Sales';
import AccountModel from '../../models/Account';
import BalanceModel from '../../models/Balance';
import BaseIcon from '../Profile/Icon'
import Chevron from '../Profile/Chevron'
import InfoText from '../Profile/InfoText'
import {LinearGradient} from 'expo-linear-gradient';

const date = new Date();
const  months = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];

const numColumns = 1;
const size = Dimensions
    .get('window')
    .width / numColumns;
const stylesflat = StyleSheet.create({
    itemContainer: {
        width: size * 0.8,
        height: size,
        margin: 1
    }, itemContainerList: {
        width: size - 20,
        marginRight: SIZES.padding,
        marginLeft:  SIZES.padding,
        marginVertical: SIZES.padding,
        borderRadius: 16,
        backgroundColor:COLORS.lightGray4,
        elevation: 5
      }
    
});
const styles = StyleSheet.create({
    scroll: {
        backgroundColor: '#F4F5F4'
    },
    userRow: {
        alignItems: 'center',
        backgroundColor: 'white',
        flexDirection: 'row',
        paddingBottom: 8,
        paddingLeft: 15,
        paddingRight: 15,
        paddingTop: 6
    },
    userImage: {
        marginRight: 12
    },
    listItemContainer: {
        width: size * 0.9,
        height: size * 0.4,
        margin: 5,
        borderRadius: 10,
        elevation: 5,
        backgroundColor: COLORS.softdark,
    },
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center'
    },
    Box: {
        width: size * 0.9,
        height: 185,
        borderRadius: 15,
        flexDirection: 'row',
        padding: 22,
        margin:5,
        elevation:5
    }
})

export default class Finance extends React.Component {

    toggleModal(visible) {
        this.setState({modalVisible: visible});
    }

    constructor(props) {
        super(props);
        this.state = {
            navigation: this.props.navigation,
            user_id:0,
            otherParam: [],
            modalVisible: false,
            accounts: [],
            item:[],
            balance:[],
            date: date,
            contador: 0,
            monthName:months[date.getMonth()],
            firstDay: new Date(date.getFullYear(), date.getMonth(), 1),
            lastDay: new Date(date.getFullYear(), date.getMonth() + 1, 0),
        }

    }

    componentDidMount() {
        this._focusListener = this
            .props
            .navigation
            .addListener('focus', () => {
                this.user()
              
            });
    }

    componentWillUnmount() {
        this._focusListener();
    }
    next_month(){

        if( this.state.contador < 0){
          this.setState({contador: 0})
        }
        const contador = this.state.contador + 1
        
        this.setState({contador: contador})
        
        let month =new Date().getMonth() + contador
        let currentyear = new Date().getFullYear()
        
        
        let datenew = new Date(currentyear, month, 10);
        
        
        const firstDay = new Date(datenew.getFullYear(),datenew.getMonth(), 1)
        const lastDay = new Date(datenew.getFullYear(), datenew.getMonth() + 1, 0)
        
        
        
        this.setState({date: datenew})
        this.setState({firstDay: firstDay})
        this.setState({lastDay: lastDay})
        
        var monthName=months[datenew.getMonth()];
        
        this.setState({monthName:monthName}, () => {
          this.get_business_balance();
        })
        
        
        
               
          }
        
          last_month(){
           
            if( this.state.contador > 0){
              this.setState({contador: 0})
              
            }
            
            const contador = this.state.contador - 1
            this.setState({contador: contador})
            let month = new Date().getMonth() + contador
            let currentyear = new Date().getFullYear()
            let datenew = new Date(currentyear, month, 10);
            
              
            const firstDay = new Date(datenew.getFullYear(),datenew.getMonth(), 1)
            const lastDay = new Date(datenew.getFullYear(), datenew.getMonth() + 1, 0)
              
              
              this.setState({date: datenew})
              this.setState({firstDay: firstDay})
              this.setState({lastDay: lastDay})
            
            
            var monthName=months[datenew.getMonth()];
            this.setState({monthName:monthName}, () => {
              this.get_business_balance();
            })
            
          }

    async user() {

        this.setState({user_id:  await AsyncStorage.getItem('id')}, () => {
            this.get_accounts();
          })
        

    }

    async get_accounts() {

        var accounts = [];
        try {
            accounts = await AccountModel.query({user_id: this.state.user_id});
        } catch {
            console.log('query accounts error')
        }

        this.setState({accounts: accounts})
        this.setState({accounts: accounts}, () => {
            this.datainit();
          })
        

    }

    onViewableItemsChanged = async ({ viewableItems, changed }) => {
        
        this.setState({item:viewableItems[0].item}, () => {
            this.onScrollChanged();
          })

        // console.log("Visible items are", viewableItems);
        // console.log("Changed in this iteration", changed);
      }
    onScrollChanged = async() => {
        const balance = await BalanceModel.getBalanceByMonthAndAccountJoin(this.state.item.id, toTimestamp(this.state.firstDay), toTimestamp(this.state.lastDay));
        this.setState({balance:balance})
     
      }

    datainit = async() => {
        // console.log(this.state.accounts.length)
        const balance = await BalanceModel.getBalanceByMonthAndAccountJoin(this.state.accounts.length, toTimestamp(this.state.firstDay), toTimestamp(this.state.lastDay));
        this.setState({balance:balance})
        
      }

    render() {
        const {navigation} = this.state;

        return (
            <View
                style={{
                flex: 1,
                alignItems: 'center',
                backgroundColor: COLORS.transparent
            }}>
                <View
                    style={{
                    backgroundColor: COLORS.transparent,
                    height: 35,
                    width: Dimensions
                        .get('window')
                        .width
                }}>

                    <View
                        style={{
                        flex: 1,
                        flexDirection: 'row',
                        height: 30,
                        width: Dimensions
                            .get('window')
                            .width,
                        backgroundColor: COLORS.primary,
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        marginRight: SIZES.base
                    }}>
                        <TouchableOpacity
                            onPress={() => {
                            navigation.navigate('Home');
                        }}>
                            <Image
                                source={icons.left_arrow}
                                resizeMode="contain"
                                style={{
                                width: 25,
                                height: 25,
                                margin: 6,
                                tintColor: COLORS.white
                            }}/>
                        </TouchableOpacity>
                        <Text
                            style={{
                            color: COLORS.white,
                            ...FONTS.h2
                        }}>
                            Mis Cuentas</Text>
                        <TouchableOpacity >
                            <Icon
                                size={30}
                                name='trash-o'
                                style={{
                                margin: 8,
                                color: COLORS.transparent
                            }}/>
                        </TouchableOpacity>
                    </View>
                </View>
        
                
                <ScrollView >
                <View style={{ flexDirection:'column',width: size ,alignItems: 'center',justifyContent: 'center', backgroundColor:COLORS.white,borderBottomLeftRadius:15,borderBottomRightRadius:15,elevation:5}}>
                        
                        <FlatList
                        data={this.state.accounts}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        // onScrollEndDrag={() => }
                        // onScrollBeginDrag={() => this.onScrollChanged()}
                        onViewableItemsChanged={this.onViewableItemsChanged }
                        viewabilityConfig={{
                          itemVisiblePercentThreshold: 50
                        }}
                        renderItem={({item}) => (
                       
                        <LinearGradient
            colors={[  COLORS.softdark,COLORS.softgray]}
            style={styles.Box}>
            <View
                style={{
                width: '68%',
                alignItems: 'flex-start'
            }}>
                <Text
                    style={{
                    fontSize: 15,
                    color: '#fff',
                    fontWeight: '700'
                }}>
                    Balance
                </Text>
                <Text
                    style={{
                    fontSize: 32,
                    color: '#fff',
                    fontWeight: '700'
                }}>
                    ${item.monto}
                </Text>

                <Text
                    style={{
                    marginTop: 67,
                    color: '#fff',
                    fontSize: 18,
                    fontWeight: '700'
                }}>
                   {item.name}
                </Text>
            </View>

            <View
                style={{
                alignItems: 'flex-end',
                width: '38%',
                paddingRight:6
            }}>
                <Text
                    style={{
                    fontSize: 17,
                    color: '#fff',
                    fontWeight: '700'
                }}>
                    Metropolitano
                </Text>
                <View style={{
                    flex: 1
                }}>
                <TouchableOpacity onPress={() => {  navigation.navigate('AccountEdit', {
                                itemId: this.state.user_id,
                                otherParam: item
                            });}} style={{
                  padding: 10,
                  marginTop: 32,
                  borderRadius:25,
                  backgroundColor: COLORS.peach,
                  alignItems: 'center',
                  justifyContent: 'center'
              }}>
                <Text
                    style={{
                    color: '#fff',
                    fontWeight: '700',
                    fontSize: 15
                }} >
                    Editar
                </Text>
            </TouchableOpacity>
                <TouchableOpacity onPress={() => {  navigation.navigate('Expenses', {
                                itemId: this.state.user_id,
                                otherParam: item
                            });}} style={{
                  padding: 10,
                  marginTop: 10,
                  borderRadius:25,
                  backgroundColor: COLORS.peach,
                  alignItems: 'center',
                  justifyContent: 'center'
              }}>
                <Icon size={20} name='pie-chart'
                                  style={{
                                    margin:1,
                                    color: COLORS.white,
                                  }}/>
            </TouchableOpacity>

                 

                  
                </View>
            </View>
        </LinearGradient>
                    )}
                        keyExtractor={item => item.id}
                        numColumns={numColumns}/>
                        
                        <View style={{width:20,height:4,opacity:0.5, backgroundColor:COLORS.gray,borderRadius:10 ,margin:5}}>

                        </View>
                        
                        </View>
                       

                        <FlatList
      data={this.state.balance}
      renderItem={({item}) => (
        <TouchableOpacity
        
     onPress={() => {console.log('edit')}}
  >
        <View style={stylesflat.itemContainerList}>
          {/* Expense Description */}
          <View style={{ paddingHorizontal: SIZES.padding }}>
              {/* Title and description */}
              
          <View style={{ flexDirection: 'row', padding: SIZES.padding, alignItems: 'center',justifyContent: 'space-between'  }}>
              {/* Title and description */}
                <View style={{ flexDirection: 'row',justifyContent: 'flex-start' }}>
              <TouchableOpacity>
                  <Icon size={30} name={item.icon}
                                  style={{
                                    margin:8,
                                    color: item.color,
                                  }}/>
        </TouchableOpacity>
        <View style={{ flexDirection: 'column',justifyContent: 'flex-start' }}>
              <Text style={{ ...FONTS.body5, color:COLORS.darkgray }}>Categoria:</Text>
              <Text style={{ ...FONTS.body3, flexWrap: 'wrap', color: COLORS.darkgray }}> {item.name}</Text>
              </View>
              </View>
              <View style={{ flexDirection: 'column',justifyContent: 'flex-start'}}>
              <Text style={{ ...FONTS.body5, color:COLORS.darkgray }}></Text>
              <Text style={{ ...FONTS.h4, flexWrap: 'wrap', color: COLORS.primary }}> </Text>
              </View>
              <View style={{ flexDirection: 'column',justifyContent: 'flex-start'}}>
              <Text style={{ ...FONTS.body5, color:COLORS.darkgray }}>Importe:</Text>
              <Text style={{ ...FONTS.h4, flexWrap: 'wrap', color: item.isPositive ? COLORS.green : COLORS.peach }}> {item.isPositive ? '$ '+item.monto : '$ - '+item.monto}</Text>
              </View>
          </View>
         
      </View>
      </View>
      </TouchableOpacity>


      )}
      keyExtractor={item => item.id}
      numColumns={numColumns} />


                        </ScrollView>
                

              

               
                <View >
                    <TouchableOpacity
                        style={{
                        borderColor: 'rgba(0,0,0,0.2)',
                        width: 60,
                        position: 'absolute',
                        bottom: 60,
                        right: -170,
                        justifyContent: 'center',
                        alignItems: 'center',
                        zIndex: 999,
                        height: 60,
                        elevation: 6,
                        backgroundColor: '#fff',
                        borderRadius: 100
                    }}
                        onPress={() => {
                        navigation.navigate('AccountNew', {
                            itemId: this.state.user_id,
                            otherParam: this.state.otherParam
                        });
                    }}>
                        <FontAwesomeIcon
                            size={25}
                            icon={faPlus}
                            style={{
                            color: COLORS.primary
                        }}/>

                    </TouchableOpacity>
                </View>

            </View>

        )

    }
}
