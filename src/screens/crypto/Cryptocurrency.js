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
import  APICrypto from '../../shared/APICrypto';
import {toTimestamp, toDatetime} from '../../shared/tools';
import CategoryModel from '../../models/Category';
import BusinessModel from '../../models/Business';
import InventaryModel from '../../models/Inventary';
import SalesModel from '../../models/Sales';
import AccountModel from '../../models/Account';
import BaseIcon from '../Profile/Icon'
import Chevron from '../Profile/Chevron'
import InfoText from '../Profile/InfoText'
import {LinearGradient} from 'expo-linear-gradient';
import { API_KEY, LIMIT_PER_PAGE, apiBaseURL } from '../../constants/api';
import axios from 'axios'
import Numeral from 'numeral'
import Spinner from 'react-native-loading-spinner-overlay';
import { images } from '../../utils/CoinIcons';

const numColumns = 1;
const size = Dimensions
    .get('window')
    .width / numColumns;
const stylesflat = StyleSheet.create({
    itemContainer: {
        width: size * 0.8,
        height: size,
        margin: 1
    },
    
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

export default class Cryptocurrency extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            navigation: this.props.navigation,
            cryptos:[],
            spinner:true,
        }

    }

    componentDidMount() {
        this._focusListener = this
            .props
            .navigation
            .addListener('focus', () => {
              this.fetchData();
            });
    }

    componentWillUnmount() {
        this._focusListener();
    }

    async fetchData() {
      let qs = `?start=1&limit=10`
      
      await axios.get('https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest' + qs, {
              headers: { 'X-CMC_PRO_API_KEY': API_KEY }
          }) .then((res) => {
const crypto = res.data.data.map(coin => ({
  key: coin.name,
  coin_name: coin.name,
  symbol: coin.symbol,
  price: coin.quote?.USD?.price,
  price_usd: Numeral(coin.quote?.USD?.price).format('0,0.00'),
  percent_change_24h: Numeral(coin.quote?.USD?.percent_change_24h).format('0,0.00'),
  percent_change_7d: Numeral(coin.quote?.USD?.percent_change_7d).format('0,0.00'),
  cmcRank: coin.cmc_rank,
  volume: coin.quote?.USD?.volume_24h,
  volumeHR: Numeral(coin.quote?.USD?.volume_24h).format('0,0.00a'),
}))
console.log(crypto);

          // console.log(res)
           this.setState({
               cryptos: crypto
           });

           this.setState({
               spinner: false
           });
      }).catch((error) => {  
        console.log(error)  
        navigation.navigate('Home');    

       });
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
                           Tracker de Crypto Divisa</Text>
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
                <ScrollView style={styles.scroll}>
                <Spinner
            visible={this.state.spinner}
            textConent='Loading...'
            textStyle={{color: '#253145'}}
            animation='fade'

          />
              
                    <FlatList
                        data={this.state.cryptos}
                        renderItem={({item}) => (
                          <View style={container}>
                          <View style={upperRow}>
                            <Image
                              style={image}
                              source={images[item.symbol]}
                            />
                            <Text style={coinSymbol}>{item.symbol}</Text>
                            <Text style={separator}>|</Text>
                            <Text style={coinName}>{item.coin_name}</Text>
                            <Text style={coinPrice}>{item.price_usd} $</Text>
                          </View>
                    
                          <View style={statisticsContainer}>
                            <Text style={percentChange24h}>24h:
                              <Text style={item.percent_change_24h < 0 ? percentChangeMinus : percentChangePlus }> {item.percent_change_24h} % </Text>
                            </Text>
                            <Text style={percentChange7d}>7d:
                              <Text style={item.percent_change_7d < 0 ? percentChangeMinus : percentChangePlus }> {item.percent_change_7d} % </Text>
                            </Text>
                          </View>
                    
                    
                        </View>
                        
                    )}
                        keyExtractor={item => item.key}
                        numColumns={numColumns}/>

                </ScrollView>

               

            </View>

        )

    }
}

const stylescard = StyleSheet.create({
  container: {
    width: size*0.97,
    display: 'flex',
    marginBottom: 20,
    elevation: 5,
    padding:20,
    backgroundColor : COLORS.white,
    borderRadius:10,
  },
  upperRow: {
    display: 'flex',
    flexDirection: 'row',
    marginBottom: 15
  },
  coinSymbol: {
    marginTop: 10,
    marginLeft: 20,
    marginRight: 5,
    fontWeight: 'bold'
  },
  coinName: {
    marginTop: 10,
    marginLeft: 5,
    marginRight: 20
  },
  separator: {
    marginTop: 10
  },
  coinPrice: {
    marginTop: 10,
    marginLeft: 'auto',
    marginRight: 10,
    fontWeight: 'bold'
  },
  image: {
    width: 35,
    height: 35
  },
  statisticsContainer: {
    display: 'flex',
    borderTopColor: "#FAFAFA",
    borderTopWidth: 2,
    padding: 5,
    flexDirection: "row"
  },
  percentChangePlus: {
    color: "#00BFA5",
    fontWeight: "bold",
    marginLeft: 5
  },
  percentChangeMinus: {
    color: "#DD2C00",
    fontWeight: "bold",
    marginLeft: 5
  },
  percentChange24h: {
    marginLeft: 50
  },
  percentChange7d: {
    marginLeft: 'auto'
  }
});

const {
    container,
    image,
    upperRow,
    coinSymbol,
    coinName,
    coinPrice,
    statisticsContainer,
    separator,
    percentChangePlus,
    percentChangeMinus,
    percentChange24h,
    percentChange7d
} = stylescard;