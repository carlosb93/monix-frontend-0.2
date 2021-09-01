import React from 'react'
import {StyleSheet, View, Text, Button, Alert, Modal, TouchableOpacity} from 'react-native'


import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';
import APIKit, {setClientToken} from '../shared/APIKit';
import {COLORS, SIZES, FONTS, icons} from '../constants'
import UserModel from '../models/User';
import BusinessModel from '../models/Business';
import {toTimestamp, toDatetime} from '../shared/tools';

export default class Home extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isAuth: true,
            id: 0,
            modalVisible: false,
            name: '',
            role: '',
            email: '',
            token: '',
            isActive: '',
            business_id: 0,
            navigation: props.navigation,
            userEmail: null
        }
    }

    componentDidMount() {
        this._focusListener = this
            .props
            .navigation
            .addListener('focus', () => {
                this.verifysession();
                this.mainbusiness();
                this.get_accounts();
                // this.AccountDialog();

            });
    }

    componentWillUnmount() {
        this._focusListener();
    }

    async get_accounts() {

        var accounts = [];
        try {
            accounts = await AccountModel.query({user_id: this.state.id});
            console.log(accounts)
        } catch {
            console.log('query accounts error')
        }

if(accounts.length = 0){
    this.setState({modalVisible:true}, () => {
        this.AccountDialog();
      })
    }

    }

 AccountDialog() {
    Alert.alert(
      "Acciones necesarias",
      "Para un funcionamiento correcto esta app necesita de una cuenta fictícia donde realizar los débitos o créditos para su mejor organización.\n\nPuede crear tantas cuentas usted necesite, usando un código, de preferencia similar a alguna tarjeta bancaria real. Estos datos son privados.\n\n Desea crearla ahora? ",
      [
        {
          text: "Mas tarde",
          onPress: () => console.log("Ask me later pressed")
        },
        {
          text: "Cancelar",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "OK", onPress: () => {
            this.state.navigation.navigate('AccountNew', {
                itemId: this.state.id,
                otherParam: []
            });
        } }
      ],
      { cancelable: false }
    );
    }

    async logOut() {

        await AsyncStorage.setItem('isAuth', JSON.stringify(false))
        await AsyncStorage.setItem('token', '')
        await AsyncStorage.setItem('id', JSON.stringify(0))
        this
            .state
            .navigation
            .replace('Login')
    }

    async verifysession() {

        const token = await AsyncStorage.getItem('token')
        this.setState({
            token: await AsyncStorage.getItem('token')
        })
        await setClientToken(token);
        console.log('///////////////////////////// token /////////////////////////////////////////')
        console.log(token)
        await APIKit
            .get('/users/me')
            .then((res) => {
                

                if (res.data.user.isActive == 0) {

                    this.logOut()

                } else {

                    this.setState({isAuth: true})
                    this.setState({id: res.data.user.id})
                    this.setState({name: res.data.user.name})
                    this.setState({role: res.data.user.rol})
                    this.setState({email: res.data.user.email})
                    this.setState({isActive: res.data.user.isActive})
                    this.setState({business_id: 1})

                    if (this.state.isAuth) {
                        this.filluser();
                    }
                }
            })
            .catch((error) => {
                // this.setState({ isAuth: false}); this.state.navigation.replace('Login');
                this.loginoutsideloop();

            });

    }
    async loginoutsideloop() {

        const id = await AsyncStorage.getItem('id')
        const usuario = await UserModel.query({id: id})
        if (usuario.length > 0) {
            this.setState({isAuth: true})
            this.setState({id: usuario[0].id})
            this.setState({name: usuario[0].name})
            this.setState({role: usuario[0].rol})
            this.setState({currency: usuario[0].currency})
            this.setState({email: usuario[0].email})
            this.setState({isActive: usuario[0].isActive})
            this.setState({business_id: usuario[0].business_id})

        }

    }
    async mainbusiness() {
        const id = await AsyncStorage.getItem('id')
        const business = [
            {
                name: 'Personal',
                code: 'HOME',
                categoria: 'Personal',
                user_id: id,
                icon: 'credit-card-alt',
                color: COLORS.primary
            }
        ]
        const negocio = await BusinessModel.query()
        console.log(negocio)
        if (negocio.length == 0) {

            var i;
            for (i = 0; i < business.length; i++) {
                const n = new BusinessModel(business[i])
                n.save()
            }
            console.log('Table negocio filled successfully')

        }

    }
    async filluser() {

        const usuario = await UserModel.query({id: this.state.id})

        if (usuario.length > 0) {

            this.setState({isAuth: true});

            await AsyncStorage.setItem('isAuth', JSON.stringify(true))
            await AsyncStorage.setItem('id', JSON.stringify(this.state.id))
            await AsyncStorage.setItem('token', this.state.token)

            const user_id = this.state.id
            const user = await UserModel.find(user_id)

            if (user) {

                user.name = this.state.name,
                user.email = this.state.email,
                user.rol = this.state.role,
                user.isActive = this.state.isActive,
                user.token = this.state.token,
                user.isAuth = true,
                user.save()

            } else {
                console.log('query error')

            }

        } else {
            await AsyncStorage.setItem('isAuth', JSON.stringify(true))
            await AsyncStorage.setItem('id', JSON.stringify(this.state.id))
            await AsyncStorage.setItem('token', this.state.token)

            const props = {
                user_id: this.state.id,
                name: this.state.name,
                email: this.state.email,
                rol: this.state.role,
                token: this.state.token,
                isActive: this.state.isActive,
                isAuth: true
            }

            const newuser = new UserModel(props)
            newuser.save()

        }

    }

    render() {

        const {navigation} = this.state;

        return (
            <View
                style={{
                padding: SIZES.padding * 0.5,
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                <Text>Home</Text>
                <Text>{this.state.email}</Text>
                
                <TouchableOpacity
                    style={{
                    width: SIZES.width * 0.5,
                    height: SIZES.width * 0.14,
                    justifyContent: 'center',
                    padding: SIZES.padding,
                    backgroundColor: COLORS.primary,
                    alignItems: 'center',
                    borderRadius: SIZES.radius,
                    elevation: 5,
                    margin: 5
                }}
                    onPress={() => {
                    this
                        .state
                        .navigation
                        .replace('AgendaScreen')
                }}>
                    <View
                        style={{
                        flexDirection: 'row'
                    }}>
                        <Icon
                            size={20}
                            name='calendar'
                            style={{
                            color: COLORS.white,
                            margin: 5
                        }}/>
                        <Text
                            style={{
                            color: COLORS.white,
                            ...FONTS.h2
                        }}>AGENDA</Text>
                    </View>

                </TouchableOpacity>

                <TouchableOpacity
                    style={{
                    width: SIZES.width * 0.5,
                    height: SIZES.width * 0.14,
                    justifyContent: 'center',
                    padding: SIZES.padding,
                    backgroundColor: COLORS.primary,
                    alignItems: 'center',
                    borderRadius: SIZES.radius,
                    elevation: 5,
                    margin: 5
                }}
                    onPress={() => {
                    this
                        .state
                        .navigation
                        .navigate('Transaction', {
                            itemId: 1,
                            otherParam: this.state.id
                        });
                }}>
                    <View
                        style={{
                        flexDirection: 'row'
                    }}>
                        <Icon
                            size={20}
                            name='inbox'
                            style={{
                            color: COLORS.white,
                            margin: 5
                        }}/>
                        <Text
                            style={{
                            color: COLORS.white,
                            ...FONTS.h2
                        }}>INGRESO</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity
                    style={{
                    width: SIZES.width * 0.5,
                    height: SIZES.width * 0.14,
                    justifyContent: 'center',
                    padding: SIZES.padding,
                    backgroundColor: COLORS.primary,
                    alignItems: 'center',
                    borderRadius: SIZES.radius,
                    elevation: 5,
                    margin: 5
                }}
                    onPress={() => {
                    this
                        .state
                        .navigation
                        .navigate('Transaction', {
                            itemId: 2,
                            otherParam: this.state.id
                        });
                }}>
                    <View
                        style={{
                        flexDirection: 'row'
                    }}>
                        <Icon
                            size={20}
                            name='money'
                            style={{
                            color: COLORS.white,
                            margin: 5
                        }}/>
                        <Text
                            style={{
                            color: COLORS.white,
                            ...FONTS.h2
                        }}>GASTO</Text>
                    </View>
                </TouchableOpacity>

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
})
