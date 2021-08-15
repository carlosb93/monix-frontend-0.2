import React from 'react'
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    TextInput,
    Image,
    Dimensions,
    FlatList,
    ImageBackground,
    ColorPropType
} from 'react-native'

import AsyncStorage from '@react-native-async-storage/async-storage';
import {LinearGradient} from 'expo-linear-gradient';
import {icons, COLORS, SIZES, FONTS} from '../../constants'
import APIKit, {setClientToken} from '../../shared/APIKit';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome'
import Icon from 'react-native-vector-icons/FontAwesome';
import {faPlus} from '@fortawesome/free-solid-svg-icons'
import {colors} from 'react-native-elements';
import {borderRadius} from 'react-select/src/theme';

import BusinessModel from '../../models/Business';


const numColumns = 1;
const size = Dimensions
    .get('window')
    .width / numColumns;
const stylesflat = StyleSheet.create({
    itemContainer: {
        width: size - 25,
        height: size - 250,
        marginRight: SIZES.padding,
        marginLeft: SIZES.padding,
        marginVertical: SIZES.padding,
        borderBottomLeftRadius: 8,
        borderBottomRightRadius: 8,
        borderRadius:8,
        backgroundColor: COLORS.white,
        elevation: 5
    },
    Box: {
        width: '100%',
        height: 189,
        borderRadius: 15,
        flexDirection: 'row',
        padding: 22,
      },
});

export default class Business extends React.Component {

    constructor(props) {
        super(props);
        this.codeRef = React.createRef();
        this.nameRef = React.createRef();
        this.emailRef = React.createRef();
        this.passwordRef = React.createRef();
        this.confirmPasswordRef = React.createRef();
        this.state = {
            image: require('../../assets/images/1.png'),
            id: null,
            name: '',
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
            negocio: []
        }
    }
    async get_businnesses() {
        var negocios = [];
        negocios = await BusinessModel.findBy({
            user_id_eq: JSON.parse(await AsyncStorage.getItem('id')),
            id_neq: JSON.parse(await AsyncStorage.getItem('id'))  
        });
        if(negocios != null){
            console.log(negocios)

            this.setState({
                id: await AsyncStorage.getItem('id')
            })
            this.setState({negocio: [negocios]})
    
            setClientToken(await AsyncStorage.getItem('token'));
    
            await APIKit
                .get('/auth/me')
                .then((res) => {
                    this.setState({id: res.data.user.id})
                    this.setState({negocio: [negocios]})
    
                })
                .catch((error) => {
                    console.log(error);
                })
        }else{
            this.setState({negocio: []})
        }
       

    }

    componentDidMount() {
        this._focusListener = this
            .props
            .navigation
            .addListener('focus', () => {
                this.get_businnesses();

            });
    }

    componentWillUnmount() {
        this._focusListener();

    }

    render() {

        const {navigation} = this.state;

        return (

            <View
                style={{
                flex: 1,
                alignItems: 'center',
                backgroundColor: COLORS.transparent,
                padding: SIZES.padding * 0.5
            }}>

                <Text
                    style={{
                    color: COLORS.black,
                    ...FONTS.h2
                }}>Negocios</Text>

                <FlatList
                    data={this.state.negocio}
                    renderItem={({item}) => (
                        
          <TouchableOpacity
      onPress={() => {
      navigation.navigate('BusinessServices', {
          itemId: item.id,
          otherParam: item
      });
  }}>
      <View style={stylesflat.itemContainer}>
          <View
              style={{
              height: 40,
              width: size - 25,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: item.color,
              borderTopLeftRadius:8,
              borderTopRightRadius:8,
          }}>
              <View
                  style={{
                  flexDirection: 'row',
                  paddingTop: 40,
                  paddingRight: 300,
                  alignItems: 'center',
                  justifyContent: 'center'
              }}>
                  <View
                      style={{
                      height: 60,
                      width: 60,
                      borderRadius: 30,
                      backgroundColor: COLORS.softgray,
                      alignItems: 'center',
                      justifyContent: 'center',
                      elevation:5
                  }}>
                      <Icon
                          size={35}
                          name={item.icon}
                          style={{
                          color: item.color
                      }}/>
                  </View>
              </View>
              {/* Title */}
          </View>
          <View
              style={{
              paddingTop:10,
              paddingLeft:80,
          }}>
              <Text
                  style={{
                  ...FONTS.h2,
                  color: COLORS.softgray
              }}>{item.name}</Text>
          </View>
          <View
              style={{
              paddingHorizontal: SIZES.padding,
              paddingTop:30,
          }}>
              <View
                  style={{
                  flexDirection: 'row'
              }}>
                  <View
                      style={{
                      height: 25,
                      alignItems: 'center',
                      justifyContent: 'center',
                      backgroundColor: COLORS.secondaryold,
                      borderRadius: 25
                  }}>
                      <Text
                          style={{
                          ...FONTS.body3,
                          color: COLORS.softgray,
                          margin: 10
                      }}>
                          CODIGO:{item.code}
                      </Text>
                  </View>
                  <View
                      style={{
                      height: 25,
                      alignItems: 'center',
                      justifyContent: 'center',
                      backgroundColor: COLORS.secondaryold,
                      borderRadius: 25
                  }}>
                      <Text
                          style={{
                          ...FONTS.body3,
                          color: COLORS.softgray,
                          margin: 10
                      }}>
                          {item.categoria}
                      </Text>
                  </View>
              </View>
          </View>
      </View>
  </TouchableOpacity>
                    
                )}
                    keyExtractor={item => item.id}
                    numColumns={numColumns}/>

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
                        borderRadius: 100
                    }}
                        onPress={() => {
                        navigation.navigate('BusinessNew')
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
