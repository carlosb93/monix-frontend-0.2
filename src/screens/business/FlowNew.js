import React from 'react'
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    TextInput,
    Modal,
    FlatList,
    Dimensions,
    TouchableHighlight
} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {COLORS, SIZES, FONTS, iconData} from '../../constants';
import FlowModel from '../../models/Flow';

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

export default class BusinessNew extends React.Component {

    toggleModal2(visible) {
        this.setState({modal2Visible: visible});
    }
    constructor(props) {
        super(props);
        this.nameRef = React.createRef();
        this.state = {
            name: '',
            type: '',
            color: '',
            icon: '',
            code: '',
            error: '',
            nameError: false,
            navigation: this.props.navigation,
            modalVisible: false,
            modal2Visible: false,
            IconSelection: 'archive',
            negocioId: this.props.route.params.itemId
        }

    }

    getIcon(name) {
        this.setState({IconSelection: name});
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

    showData = async() => {

        const props = {
            name: this.state.name,
            business_id: parseInt(this.state.negocioId),
            user_id: JSON.parse(await AsyncStorage.getItem('id')),
            icon: this.state.IconSelection,
        }

        try {
            var flujo = [];
            flujo = new FlowModel(props)

            console.log(flujo)
            flujo.save()

        } catch (error) {

            console.log(error)
        }

        this.state.navigation.navigate('BusinessFlow', {
            itemId: this.state.negocioId,
            otherParam: this.state.otherParam,
          });
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
                <Text>Nuevo Flujo de Trabajo</Text>

                <View style={{
                    margin: 10
                }}>
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
                        placeholder='Nombre del Flujo'
                        autoCapitalize='none'
                        error={this.state.nameError}
                        ref={this.nameRef}
                        value={this.state.name}
                        onChangeText={(name) => this.setState({name})}/>
                </View>
                
                

                <View
                    style={{
                    padding: SIZES.padding * 0.5,
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                    <Modal
                        animationType={"slide"}
                        transparent={false}
                        visible={this.state.modal2Visible}
                        onRequestClose=
                        {() => { console.log("Modal has been closed.") } }>

                        <View
                            style={{
                            flex: 1,
                            alignItems: 'center',
                            padding: 13,
                            backgroundColor: COLORS.transparent
                        }}>

                            <Text
                                style={{
                                color: COLORS.black,
                                ...FONTS.h2
                            }}>Selecciona un icono!</Text>
                            <FlatList
                                data={iconData}
                                renderItem={({item}) => (
                                <View style={stylesflat.itemContainer}>
                                    <TouchableOpacity
                                        style={{
                                        width: SIZES.width * 0.25,
                                        height: SIZES.width * 0.25,
                                        backgroundColor: COLORS.white,
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        borderRadius: 8,
                                        elevation: 5
                                    }}
                                        onPress=
                                        {() => { this.getIcon(item.name), this.toggleModal2(!this.state.modal2Visible) }}>
                                        <Icon
                                            size={60}
                                            name={item.name}
                                            style={{
                                            color: COLORS.primary
                                        }}/></TouchableOpacity>
                                </View>
                            )}
                                keyExtractor={item => item.id}
                                numColumns={numColumns}/>

                            <TouchableHighlight
                                style={{
                                width: SIZES.width * 0.8,
                                height: SIZES.width * 0.1,
                                padding: SIZES.padding,
                                backgroundColor: COLORS.softgray,
                                alignItems: 'center',
                                justifyContent: 'center',
                                borderRadius: SIZES.radius,
                                elevation: 5
                            }}
                                onPress=
                                {() => { this.toggleModal2(!this.state.modal2Visible) }}>

                                <Text
                                    style={{
                                    color: COLORS.white,
                                    ...FONTS.h2
                                }}>Cancelar</Text>
                            </TouchableHighlight>
                        </View>
                    </Modal>
                </View>

                <View
                    style={{
                    flex: 1,
                    flexDirection: 'column',
                    width: SIZES.width,
                    alignItems: 'center',
                    padding: SIZES.padding
                }}>
                    <View
                        style={{
                        padding: SIZES.padding *3,
                        alignItems: 'center',
                        justifyContent: 'center',
                        height: 50,
                        width: 150
                    }}>
                        <TouchableOpacity
                            style={{
                            width: SIZES.width * 0.8,
                            height: SIZES.width * 0.15,
                            padding: SIZES.padding,
                            backgroundColor: COLORS.softgray,
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderRadius: SIZES.radius * 0.2,
                            elevation: 5
                        }}
                            onPress=
                            {() => {this.toggleModal2(true)}}>
                            <Icon
                                size={40}
                                name={this.state.IconSelection}
                                style={{
                                color: COLORS.primary
                            }}/>
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
                            backgroundColor: COLORS.softgray,
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderRadius: SIZES.radius,
                            elevation: 5
                        }}
                            onPress={() => { navigation.navigate('BusinessFlow', {
                                itemId: this.state.negocioId,
                                otherParam: this.state.otherParam,
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
        // <Button title='Go to Login' onPress={this.goToLogin} />

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
