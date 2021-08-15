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
import BaseIcon from '../Profile/Icon'
import Chevron from '../Profile/Chevron'
import InfoText from '../Profile/InfoText'
import {LinearGradient} from 'expo-linear-gradient';



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

export default class Accounts extends React.Component {

    toggleModal(visible) {
        this.setState({modalVisible: visible});
    }

    constructor(props) {
        super(props);
        this.state = {
            navigation: this.props.navigation,
            user_id: this.props.route.params.itemId,
            otherParam: this.props.route.params.otherParam,
            modalVisible: false,
            accounts: []
        }

    }

    componentDidMount() {
        this._focusListener = this
            .props
            .navigation
            .addListener('focus', () => {
                this.get_accounts()
            });
    }

    componentWillUnmount() {
        this._focusListener();
    }

    async get_accounts() {

        var accounts = [];
        try {
            accounts = await AccountModel.query({user_id: this.state.user_id});
            console.log(accounts)
        } catch {
            console.log('query accounts error')
        }

        this.setState({accounts: accounts})
        console.log(this.state.accounts)

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
                {/* // <ListItem
                        //     onPress={() => {
                        //     navigation.navigate('AccountEdit', {
                        //         itemId: this.state.user_id,
                        //         otherParam: item
                        //     });
                        // }}
                        //     containerStyle={styles.listItemContainer}>
                        //     <ListItem.Content>
                        //         <View
                        //             style={{
                        //             flex: 1,
                        //             flexDirection: 'row',
                        //             alignItems: 'center',
                        //             justifyContent: 'space-between'
                        //         }}>
                        //             <BaseIcon
                        //                 containerStyle={{
                        //                 backgroundColor: item.color
                        //             }}
                        //                 icon={{
                        //                 type: 'font-awesome',
                        //                 name: 'credit-card'
                        //             }}/>
                        //             <ListItem.Subtitle
                        //                 style={{
                        //                 color: COLORS.white
                        //             }}>{item.currency + ' - ' + item.name + ' $ ' + item.monto}</ListItem.Subtitle>
                        //         </View>
                        //     </ListItem.Content>
                        //     <ListItem.Content right>
                        //         <Chevron/>
                        //     </ListItem.Content>
                        // </ListItem> */}

                <ScrollView style={styles.scroll}>

                    <FlatList
                        data={this.state.accounts}
                        horizontal
                        showsHorizontalScrollIndicator={false}
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

                 

                  
                </View>
            </View>
        </LinearGradient>
                    )}
                        keyExtractor={item => item.id}
                        numColumns={numColumns}/>

                </ScrollView>

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
