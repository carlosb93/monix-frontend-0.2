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
    TouchableHighlight
} from 'react-native'
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome'
import {faUser, faEyeDropper, faArchive, faCircle} from '@fortawesome/free-solid-svg-icons'
import Icon from 'react-native-vector-icons/FontAwesome';
import SelectDropdown from 'react-native-select-dropdown'
import AsyncStorage from '@react-native-async-storage/async-storage';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import ColorPicker from '../../components/ColorPicker/ColorPicker'
import {
    COLORS,
    SIZES,
    FONTS,
    iconData,
    icons,
    colorData
} from '../../constants'
import APIKit, {setClientToken} from '../../shared/APIKit';
import {toTimestamp, toDatetime} from '../../shared/tools';

import CategoryModel from '../../models/Category';
import BusinessModel from '../../models/Business';
import InventaryModel from '../../models/Inventary';
import ExpensesModel from '../../models/Expenses';
import AccountModel from '../../models/Account';
import BalanceModel from '../../models/Balance';

const currencies = ["CUP", "USD", "EUR"]
const numColumns = 3;
const size = Dimensions
    .get('window')
    .width / numColumns;
const stylesflat = StyleSheet.create({
    itemContainer: {
        width: size,
        height: size,
        margin: 1
    }
});

export default class AccountNew extends React.Component {

    toggleModal(visible) {
        this.setState({modalVisible: visible});
    }
    constructor(props) {
        super(props);
        this.nameRef = React.createRef();
        this.montoRef = React.createRef();

        this.state = {
            nameError: false,
            montoError: false,
            user_id: this.props.route.params.itemId,
            otherParam: this.props.route.params.otherParam,
            name: '',
            currency: '',
            monto: '',
            color: '',
            error: '',
            hue: 0,
            sat: 0,
            val: 1,
            modalVisible: false,
            ColorPicker: this.props.route.params.otherParam.color,
            ColorPicker: COLORS.primary,
            navigation: this.props.navigation
        }

    }

    componentDidMount() {
        this._focusListener = this
            .props
            .navigation
            .addListener('focus', () => {});
    }

    componentWillUnmount() {
        this._focusListener();
    }

    callbackFunction = (childData) => {
        this.setState({ColorPicker: childData})
    }

    _handlingCardNumber(name) {
        this.setState({
            name: name
                .replace(/\s?/g, '')
                .replace(/(\d{4})/g, '$1 ')
                .trim()
        });
    }

    showData = async() => {

        const props = {
            name: this.state.name,
            currency: this.state.currency,
            monto: parseFloat(this.state.monto),
            user_id: this.state.user_id,
            color: this.state.ColorPicker
        }

        try {
            var account = [];
            account = new AccountModel(props)
            account.save()

            var accounts = [];
            try {
                accounts = await AccountModel.findBy({user_id_eq: this.state.user_id, name_eq: account.name});
            } catch {
                console.log('query accounts error')
            }
            const propsBalance = {
                user_id: this.state.user_id,
                account_id: accounts.id,
                categoria_id: 1,
                isPositive: true,
                monto: parseFloat(this.state.monto)
            }
            var balance = [];
            balance = new BalanceModel(propsBalance)
            balance.save()
        } catch (error) {

            console.log(error)
        }

        this
            .state
            .navigation
            .navigate('Accounts', {
                itemId: this.state.user_id,
                otherParam: ''
            });
    }

    render() {
        const {navigation, hue, sat, val} = this.state;

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
                            navigation.navigate('Accounts', {
                                itemId: this.state.user_id,
                                otherParam: this.state.otherParam
                            });
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
                            Nueva Cuenta</Text>
                        <TouchableOpacity>
                            <Icon
                                size={30}
                                name='trash'
                                style={{
                                margin: 8,
                                color: COLORS.transparent
                            }}/>
                        </TouchableOpacity>
                    </View>
                </View>

                <View>
                    <View
                        style={{
                        flexDirection: 'row',
                        margin: 10,
                        height: 60,
                        justifyContent: 'space-between',
                        alignItems: 'center'
                    }}>
                        <TouchableOpacity
                            style={{
                            elevation: 8,
                            backgroundColor: COLORS.primary,
                            width: 40,
                            height: 40,
                            margin: SIZES.padding,
                            borderRadius: 10,
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}>
                            <Icon
                                size={20}
                                name='credit-card'
                                style={{
                                margin: 8,
                                color: COLORS.white
                            }}/>
                        </TouchableOpacity>
                        <TextInput
                            style={{
                            width: SIZES.width * 0.8,
                            height: SIZES.width * 0.1,
                            padding: SIZES.padding,
                            alignItems: 'center',
                            borderRadius: SIZES.radius,
                            borderColor: COLORS.primary,
                            borderWidth: SIZES.input,
                            elevation: 5,
                            backgroundColor: COLORS.white
                        }}
                            name='name'
                            error={this.state.nameError}
                            ref={this.nameRef}
                            value={this.state.name}
                            keyboardType='number-pad'
                            maxLength={19}
                            onChangeText={(name) => this._handlingCardNumber(name)}
                            placeholder='0000 0000 0000 0000'
                            onSubmitEditing={() => this.montoRef.current.focus()}/>
                    </View>
                    <View
                        style={{
                        flexDirection: 'row',
                        margin: 10,
                        height: 60,
                        justifyContent: 'space-between',
                        alignItems: 'center'
                    }}>
                        <TouchableOpacity
                            style={{
                            elevation: 8,
                            backgroundColor: COLORS.primary,
                            width: 40,
                            height: 40,
                            margin: SIZES.padding,
                            borderRadius: 10,
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}>
                            <Icon
                                size={20}
                                name='money'
                                style={{
                                margin: 8,
                                color: COLORS.white
                            }}/>
                        </TouchableOpacity>
                        <TextInput
                            style={{
                            width: SIZES.width * 0.8,
                            height: SIZES.width * 0.1,
                            padding: SIZES.padding,
                            alignItems: 'center',
                            borderRadius: SIZES.radius,
                            borderColor: COLORS.primary,
                            borderWidth: SIZES.input,
                            elevation: 5,
                            backgroundColor: COLORS.white
                        }}
                            name='monto'
                            placeholder='Monto Total'
                            autoCapitalize='none'
                            error={this.state.montoError}
                            ref={this.montoRef}
                            value={this.state.monto}
                            onChangeText={(monto) => this.setState({monto})}/>
                    </View>

                    <View
                        style={{
                        flexDirection: 'row',
                        margin: 10,
                        height: 60,
                        justifyContent: 'space-between',
                        alignItems: 'center'
                    }}>
                        <TouchableOpacity
                            style={{
                            elevation: 8,
                            backgroundColor: COLORS.primary,
                            width: 40,
                            height: 40,
                            margin: SIZES.padding,
                            borderRadius: 10,
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}>
                            <Icon
                                size={25}
                                name='usd'
                                style={{
                                margin: 8,
                                color: COLORS.white
                            }}/>
                        </TouchableOpacity>

                        <SelectDropdown
                            defaultButtonText='Seleccione una Moneda'
                            buttonTextStyle={{
                            ...FONTS.body4,
                            color: COLORS.darkgray
                        }}
                            buttonStyle={{
                            width: SIZES.width * 0.8,
                            height: SIZES.width * 0.1,
                            padding: SIZES.padding,
                            alignItems: 'center',
                            borderRadius: SIZES.radius,
                            borderColor: COLORS.primary,
                            borderWidth: SIZES.input,
                            elevation: 5,
                            backgroundColor: COLORS.white
                        }}
                            data={currencies}
                            onSelect={async(selectedItem, index) => {
                            this.setState({currency: selectedItem}) // 
                            await AsyncStorage.setItem('currency', selectedItem); }}
                            buttonTextAfterSelection={(selectedItem, index) => { 
                              // text represented after item is selected 
                              // if data array is an array of objects then return selectedItem.property to render after item is selected 
                              return selectedItem }}
                            rowTextForSelection={(item, index) => { 
                              // text represented for each item in dropdown 
                              // if data array is an array of objects then return item.property to represent item in dropdown 
                              return item }}/>
                    </View>

                    <View
                        style={{
                        flexDirection: 'row',
                        margin: 10,
                        height: 60,
                        justifyContent: 'space-between',
                        alignItems: 'center'
                    }}>
                        <TouchableOpacity
                            style={{
                            elevation: 8,
                            backgroundColor: COLORS.primary,
                            width: 40,
                            height: 40,
                            margin: SIZES.padding,
                            borderRadius: 10,
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}>
                            <Icon
                                size={25}
                                name='tint'
                                style={{
                                margin: 8,
                                color: COLORS.white
                            }}/>
                        </TouchableOpacity>

                        <ColorPicker parentCallback={this.callbackFunction}/>
                        
                    </View>
                    <View
                        style={{
                        flexDirection: 'row',
                        margin: 20,
                        height: 60,
                        justifyContent: 'space-between',
                        alignItems: 'center'
                    }}></View>

                    <View
                        style={{
                        flexDirection: 'column',
                        alignItems: 'center',
                        marginLeft: 50,
                        justifyContent: 'center',
                        padding: SIZES.padding * 2
                    }}>
                        <View
                            style={{
                            alignItems: 'center',
                            justifyContent: 'center',
                            height: 60,
                            width: 30
                        }}>
                            <TouchableOpacity
                                style={{
                                width: SIZES.width * 0.8,
                                height: SIZES.width * 0.1,
                                padding: SIZES.padding,
                                backgroundColor: COLORS.primary,
                                alignItems: 'center',
                                justifyContent: 'center',
                                borderRadius: SIZES.radius,
                                elevation: 5
                            }}
                                onPress={() => this.showData()}>
                                <Text
                                    style={{
                                    color: COLORS.white,
                                    ...FONTS.h2
                                }}>Aceptar</Text>
                            </TouchableOpacity>
                        </View>
                        <View
                            style={{
                            alignItems: 'center',
                            justifyContent: 'center',
                            height: 60,
                            width: 30
                        }}>
                            <TouchableOpacity
                                style={{
                                width: SIZES.width * 0.8,
                                height: SIZES.width * 0.1,
                                padding: SIZES.padding,
                                backgroundColor: COLORS.secondary,
                                alignItems: 'center',
                                justifyContent: 'center',
                                borderRadius: SIZES.radius,
                                elevation: 5
                            }}
                                onPress={() => {
                                navigation.navigate('Accounts', {
                                    itemId: this.state.user_id,
                                    otherParam: this.state.otherParam
                                });
                            }}>
                                <Text
                                    style={{
                                    color: COLORS.white,
                                    ...FONTS.h2
                                }}>Cancelar</Text>
                            </TouchableOpacity>
                        </View>

                    </View>

                </View>

            </View>

        )

    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center'
    }
});
