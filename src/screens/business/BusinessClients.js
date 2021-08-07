import React from 'react'
import { StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Image,
  Dimensions,
  FlatList,
  ColorPropType} from 'react-native'
  
  import AsyncStorage from '@react-native-async-storage/async-storage';

  import { icons,COLORS, SIZES, FONTS } from '../../constants'
  import APIKit, {setClientToken} from '../../shared/APIKit';
  import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
  import Icon from 'react-native-vector-icons/FontAwesome';
  import { faPlus } from '@fortawesome/free-solid-svg-icons'
  import BusinessModel from '../../models/Business';
  import InventaryModel from '../../models/Inventary';
  import ExpensesModel from '../../models/Expenses';
  import ClientsModel from '../../models/Clientes';

  import {toTimestamp, toDatetime } from '../../shared/tools';
  // account
  // description
  // price
  // category_id
  // business_id
  // date

const numColumns = 1;
const size = Dimensions.get('window').width / numColumns;
const stylesflat = StyleSheet.create({
  itemContainer: {
    width: size - 20,
    marginRight: SIZES.padding,
    marginLeft:  SIZES.padding,
    marginVertical: SIZES.padding,
    borderRadius: 16,
    backgroundColor:COLORS.lightGray4,
    elevation: 5
  }
});

export default class BusinessClients extends React.Component { 

  
  constructor(props){
		super(props);
    this.state = {
      navigation: this.props.navigation,
      negocioId: this.props.route.params.itemId,
      otherParam: this.props.route.params.otherParam,
      clients:[]
		}
	}
  async get_clients(){

    var clients = [];
    try{
        clients = await ClientsModel.query({business_id: this.state.negocioId});
    }catch{
     console.log('query clients error')
    }

    this.setState({clients: clients}) 

  }

  componentDidMount() {
		this._focusListener = this.props.navigation.addListener('focus', () => {
    this.get_clients();
		});
  }

  componentWillUnmount() {
    this._focusListener();
  }
  
  
  render() {

  const { navigation } = this.state;

  return (
    

      <View  style={{
        flex: 1,
        alignItems: 'center',
        backgroundColor:COLORS.transparent,
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
     onPress={() => {navigation.navigate('BusinessServices', {
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
                                tintColor: COLORS.white,
                            }}
                        />
                </TouchableOpacity>
                  <Text style={{ color: COLORS.white, ...FONTS.h2 }}>   Clientes</Text>
                  <TouchableOpacity
     onPress={() => {navigation.navigate('ClientsSummaryMenu', {
      itemId: this.state.negocioId,
      otherParam: this.state.otherParam,
    }); }}
  >
                  <Icon size={30} name='bar-chart'
                                  style={{
                                    margin:8,
                                    color: COLORS.white,
                                  }}/>
</TouchableOpacity>
              </View>
              </View>
      <FlatList
      data={this.state.clients}
      renderItem={({item}) => (
        <TouchableOpacity
        
     onPress={() => {navigation.navigate('ClientsEdit', {
      itemId: item.id,
      otherParam: this.state.otherParam,
    }); }}
  >
        <View style={stylesflat.itemContainer}>
          {/* Expense Description */}
          <View style={{ paddingHorizontal: SIZES.padding }}>
              {/* Title and description */}
              
          <View style={{ flexDirection: 'row', padding: SIZES.padding, alignItems: 'center',justifyContent: 'space-between'  }}>
              {/* Title and description */}
              <View style={{ flexDirection: 'column',justifyContent: 'flex-start'}}>
                <View style={{ flexDirection: 'row',justifyContent: 'flex-start' }}>
              <TouchableOpacity>
                  
                  <Icon size={30} name={item.iskid ? 'child': item.ispregnant? 'female': 'user' }
                                  style={{
                                    margin:8,
                                    color: item.color,
                                  }}/>
        </TouchableOpacity>
        <View style={{ flexDirection: 'column',justifyContent: 'flex-start' }}>
              <Text style={{ ...FONTS.body5, color:COLORS.darkgray }}>Nombre:</Text>
              <Text style={{ ...FONTS.body3, flexWrap: 'wrap', color: COLORS.primary }}> {item.name}</Text>
              </View>
              </View>

        <View style={{ flexDirection: 'row',justifyContent: 'flex-start' }}>
              <TouchableOpacity>
                  
                  <Icon size={30} name={item.isoutdoors ? 'tree': 'building' }
                                  style={{
                                    margin:8,
                                    color: item.color,
                                  }}/>
        </TouchableOpacity>
        <View style={{ flexDirection: 'column',justifyContent: 'flex-start' }}>
              <Text style={{ ...FONTS.body5, color:COLORS.darkgray }}>Fecha:</Text>
              <Text style={{ ...FONTS.body3, flexWrap: 'wrap', color: COLORS.primary }}> {toDatetime(item.date)}</Text>
              </View>
              </View>
              </View>
        
              <View style={{ flexDirection: 'column',justifyContent: 'flex-start'}}>
              <Text style={{ ...FONTS.body5, color:COLORS.darkgray }}>Edad</Text>
              <Text style={{ ...FONTS.h4, flexWrap: 'wrap', color: COLORS.primary }}>{item.age} </Text>
              <Text style={{ ...FONTS.body5, color:COLORS.darkgray }}>Paquete</Text>
              <Text style={{ ...FONTS.h4, flexWrap: 'wrap', color: COLORS.primary }}>{item.pack}</Text>
              </View>
              
          </View>
         
      </View>
      </View>
      </TouchableOpacity>


      )}
      keyExtractor={item => item.id}
      numColumns={numColumns} />



                 
        
        <View>
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
    borderRadius: 100,
    }}
     onPress={() => {navigation.navigate('ClientsNew', {
      itemId: this.state.negocioId,
      otherParam: this.state.otherParam,
    });}}
  >
     <FontAwesomeIcon size={25} icon={ faPlus  } 
                        style={{
                            color: COLORS.primary,
                        }}/>
                        
  </TouchableOpacity>               
     </View>
      </View>
      
        // <Button title='Go to Login' onPress={this.goToLogin} />
      
        )
      }
      }
