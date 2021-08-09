import React from 'react'
import { StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
  Image,
  Dimensions,
  FlatList,
  ColorPropType} from 'react-native'
  
  import AsyncStorage from '@react-native-async-storage/async-storage';

  import { icons,COLORS, SIZES, FONTS } from '../../constants'
  import APIKit, {setClientToken} from '../../shared/APIKit';
  import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
  import Icon from 'react-native-vector-icons/FontAwesome';
  import { faArchive, faPlus } from '@fortawesome/free-solid-svg-icons'
  import BusinessModel from '../../models/Business';
  import BalanceModel from '../../models/Balance';

  import About from '../../components/About';

const numColumns = 2;
const size = Dimensions.get('window').width / numColumns;
const width = Dimensions.get('window').width;
const stylesflat = StyleSheet.create({
  itemContainer: {
    width: size - 20,
    marginRight: SIZES.padding,
    marginLeft:  SIZES.padding,
    marginVertical: SIZES.radius,
    borderRadius: 8,
    backgroundColor: COLORS.white,
    elevation: 5
  }
});



export default class Finance extends React.Component { 

  
  constructor(props){
	super(props);
    this.state = {
      id:null,
      navigation: this.props.navigation,
      negocioId: 1,
      otherParam: [],
      negocio:[],
      sum:0,
      ingreso:0,
      gasto:0,
      height:width*0.7,
      balance:[],
      options:[ 
        {id:1,
        icon: 'archive',
        texto: 'Inventario'},
        {id:2,
        icon: 'money',
        texto: 'Gastos'},
        {id:3,
        icon: 'shopping-basket',
        texto: 'Ventas'},
        {id:4,
        icon: 'users',
        texto: 'Mis Clientes'}
    ]
		}
	}
  async get_businnesses(){

    var negocios = [];
    negocios = await BusinessModel.find( this.state.negocioId);
    this.setState({id: await AsyncStorage.getItem('id')})
    this.setState({negocio: negocios}) 

    setClientToken(await AsyncStorage.getItem('token'));

    await APIKit.get('/auth/me')
            .then((res) => {
              this.setState({id: res.data.user.id})
              

      this.setState({negocio: negocios}) 

            }).catch((error) => {
              
              console.log(error);
            })
   
  }
  async get_business_balance(){

    
    const balance = await BalanceModel.query({business_id: this.state.negocioId });


    let sum = 0; 
    let gasto = 0; 
    let ingreso = 0; 
    balance.forEach(obj => {
        if(obj.isPositive){
          sum += obj.monto;
          ingreso += obj.monto;
        }else{
          sum -= obj.monto;
          gasto -= obj.monto;
        }
    
})
    this.setState({balance: balance}) 
    this.setState({sum: sum}) 
    this.setState({ingreso: ingreso}) 
    this.setState({gasto: gasto}) 


   
   
  }

  componentDidMount() {
	this._focusListener = this.props.navigation.addListener('focus', () => {
    this.get_businnesses();
    this.get_business_balance();
		
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
         <View
                  style={{
                    flex:1,
                    flexDirection: 'column',
                    backgroundColor: COLORS.transparent,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
              >
      <FlatList
      data={this.state.options}
      renderItem={({item}) => (
        <TouchableOpacity
     onPress={() => {
       if(item.id === 1){
        navigation.navigate('BusinessInv', {
          itemId: this.state.otherParam.id,
          otherParam: this.state.otherParam,
        });
     }else if(item.id === 2){
      navigation.navigate('BusinessExpense', {
        itemId: this.state.otherParam.id,
        otherParam: this.state.otherParam,
      });
     
     }else if(item.id === 3){
      navigation.navigate('BusinessSales', {
        itemId: this.state.otherParam.id,
        otherParam: this.state.otherParam,
      });
     
     }else {
      navigation.navigate('BusinessClients', {
        itemId: this.state.otherParam.id,
        otherParam: this.state.otherParam,
      });
     }
      }}
  >
        <View style={stylesflat.itemContainer}>
          {/* Title */}
          <View style={{ flexDirection: 'row', padding: SIZES.padding, alignItems: 'center',justifyContent: 'center' }}>
              
                  <Icon size={70} name={item.icon}
                                  style={{
                                      color: COLORS.primary,
                                  }}/>
              

                               
          </View>

          {/* Expense Description */}
          <View style={{ paddingHorizontal: SIZES.padding, justifyContent: 'center',alignItems: 'center'  }}>
              {/* Title and description */}
              

          </View>

          {/* Price */}
          <View
              style={{
                  height: 20,
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderBottomStartRadius: 8,
                  borderBottomEndRadius: 8,
                  backgroundColor: COLORS.primary,
              }}
          >
            <Text style={{ ...FONTS.body4,color: COLORS.white, }}>{item.texto}</Text>

          </View>
      </View>
      </TouchableOpacity>

      )}
      keyExtractor={item => item.id}
      numColumns={numColumns} />
</View>
  <View
                  style={{
                    flex:1,
                    flexDirection: 'column',
                    borderRadius:30,
                    backgroundColor: COLORS.primary,
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
              >

<View style={{
    width: width,
    height: 70,
    backgroundColor: COLORS.primary,
    borderRadius:30,
    alignItems: 'center',
    justifyContent: 'center',
  }}>
<Text style={{...FONTS.body4,
            color: COLORS.black,
            }}>lola bunny</Text>


</View>
<View style={{
    width: width,
    height: 340,
    backgroundColor: COLORS.lightGray,
    borderRadius:30,
    alignItems: 'center',
    justifyContent: 'center',
  }}>
<Text style={{...FONTS.body4,
            color: COLORS.black,
            }}>lola bunny</Text>


</View>

</View>
                 
        
        {/* <View>
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
     onPress={() => {navigation.navigate('BusinessNew', {
      itemId: this.state.id,
      otherParam: 'New',
    }); }}
  >
     <FontAwesomeIcon size={25} icon={ faPlus  } 
                        style={{
                            color: COLORS.primary,
                        }}/>
                        
  </TouchableOpacity>               
     </View> */}
      </View>
      
        // <Button title='Go to Login' onPress={this.goToLogin} />
      
        )
      }
      }
