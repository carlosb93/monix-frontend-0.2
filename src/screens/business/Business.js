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


const numColumns = 2;
const size = Dimensions.get('window').width / numColumns;
const stylesflat = StyleSheet.create({
  itemContainer: {
    width: size - 20,
    marginRight: SIZES.padding,
    marginLeft:  SIZES.padding,
    marginVertical: SIZES.radius,
    borderRadius: 8,
    backgroundColor:COLORS.lightGray4,
    elevation: 5
  }
});

export default class Business extends React.Component { 

  
  constructor(props){
		super(props);
		this.codeRef = React.createRef();
		this.nameRef = React.createRef();
		this.emailRef = React.createRef();
		this.passwordRef = React.createRef();
		this.confirmPasswordRef = React.createRef();
    this.state = {
      id:null,
      name:'',
			email: '',
			password: '',
			confirmPassword: '',
			code: '',
			error: '',
			emailError: false,
			codeError: false,
			nameError: false,
			passwordError: false,
			confirmPasswordError: false,
      navigation: this.props.navigation,
      negocio:[]
		}
	}
  async get_businnesses(){
    var negocios = [];
    negocios = await BusinessModel.query({user_id: JSON.parse(await AsyncStorage.getItem('id'))});
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

  componentDidMount() {
		this._focusListener = this.props.navigation.addListener('focus', () => {
    this.get_businnesses();
		
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
        padding: SIZES.padding * 0.5,
    }}>
        
                 <Text style={{ color: COLORS.black, ...FONTS.h2 }}>Negocios</Text>

      <FlatList
      data={this.state.negocio}
      renderItem={({item}) => (
        <TouchableOpacity
     onPress={() => {navigation.navigate('BusinessServices', {
      itemId: item.id,
      otherParam: item,
    }); }}
  >
        <View style={stylesflat.itemContainer}>
          {/* Title */}
          <View style={{ flexDirection: 'row', padding: SIZES.padding, alignItems: 'center',justifyContent: 'center' }}>
              <View
                  style={{
                      height: 45,
                      width: 45,
                      borderRadius: 25,
                      backgroundColor: COLORS.lightGray4,
                      alignItems: 'center',
                      justifyContent: 'center'
                  }}
              >
                  <Icon size={30} name={item.icon}
                                  style={{
                                      color: item.color,
                                  }}/>
              </View>

                             
          </View>

          {/* Expense Description */}
          <View style={{ paddingHorizontal: SIZES.padding }}>
              {/* Title and description */}
              <Text style={{ ...FONTS.h2, color:item.color }}>{item.name}</Text>
              <Text style={{ ...FONTS.body3, flexWrap: 'wrap', color: COLORS.darkgray }}>
                  CODIGO:{item.code}
              </Text>


          </View>

          {/* Price */}
          <View
              style={{
                  height: 20,
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderBottomStartRadius: 8,
                  borderBottomEndRadius: 8,
                  backgroundColor: item.color,
              }}
          >
              <Text style={{ color: COLORS.white, ...FONTS.h4 }}>{item.categoria}</Text>
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
     onPress={() => {navigation.navigate('BusinessNew') }}
  >
     <FontAwesomeIcon size={25} icon={ faPlus  } 
                        style={{
                            color: COLORS.primary,
                        }}/>
                        
  </TouchableOpacity>               
     </View>
      </View>
      

      
        )
      }
      }
