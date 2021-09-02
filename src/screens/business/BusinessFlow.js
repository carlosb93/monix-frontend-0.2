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
  import Numeral from 'numeral';
  import { icons,COLORS, SIZES, FONTS } from '../../constants'
  import APIKit, {setClientToken} from '../../shared/APIKit';
  import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
  import Icon from 'react-native-vector-icons/FontAwesome';
  import { faPlus } from '@fortawesome/free-solid-svg-icons'
  import BusinessModel from '../../models/Business';
  import InventaryModel from '../../models/Inventary';
  import SalesModel from '../../models/Sales';
  import FlowModel from '../../models/Flow';


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

export default class BusinessFlow extends React.Component { 

  
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
      negocioId: this.props.route.params.itemId,
      otherParam: this.props.route.params.otherParam,
      flows:[],
		}
	}

  
  componentDidMount() {
    this._focusListener = this.props.navigation.addListener('focus', () => {
      this.get_flows();
		});
  }
  
  componentWillUnmount() {
    this._focusListener();
  }

  async get_flows(){
      const flows = await FlowModel.findBy({business_id_eq: this.state.negocioId});
 if(flows != null){
this.setState({flows: [flows]}) 
 }
    
 
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
                  <Text style={{ color: COLORS.white, ...FONTS.h2 }}>   Flujos de Trabajo</Text>
                  <TouchableOpacity
     onPress={() => {navigation.navigate('FlowNew', {
      itemId: this.state.otherParam.id,
      otherParam: this.state.otherParam,
    }); }}
  >
                  <Icon size={30} name='trash'
                                  style={{
                                    margin:8,
                                    color: COLORS.white,
                                  }}/>
</TouchableOpacity>
              </View>
              </View>
      <FlatList
      data={this.state.flows}
      renderItem={({item}) => (
        <TouchableOpacity>
        <View style={stylesflat.itemContainer}>
          {/* Expense Description */}
          <View style={{ paddingHorizontal: SIZES.padding }}>
              {/* Title and description */}
              
          <View style={{ flexDirection: 'row', padding: SIZES.padding, alignItems: 'center',justifyContent: 'space-between'  }}>
              {/* Title and description */}
              <View style={{ flexDirection: 'row', alignItems: 'center'}}>
              <Text style={{ ...FONTS.body5, color:COLORS.darkgray }}>Flujo:</Text>
              <Text style={{ ...FONTS.h4, flexWrap: 'wrap', color: COLORS.primary }}> {item.name}</Text>
              </View>
              <View style={{ flexDirection: 'row', alignItems: 'center'}}>
              <TouchableOpacity
     onPress={() => {
         navigation.navigate('FlowDesign', {
      itemId: this.state.negocioId,
      otherParam: item,
    });
 }}
  >
                  <Icon size={30} name='lightbulb-o'
                                  style={{
                                    margin:8,
                                    color: COLORS.softgray,
                                  }}/>
</TouchableOpacity>
<TouchableOpacity
     onPress={() => {navigation.navigate('FlowEdit', {
      itemId: this.state.negocioId,
      otherParam: item,
    }); }}
  >
                  <Icon size={30} name='edit'
                                  style={{
                                    margin:8,
                                    color: COLORS.softgray,
                                  }}/>
</TouchableOpacity>
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
     onPress={() => {navigation.navigate('FlowNew', {
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
