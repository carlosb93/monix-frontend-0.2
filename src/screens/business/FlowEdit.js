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
    Image,
    TouchableHighlight
} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {COLORS, SIZES, FONTS, iconData, icons} from '../../constants';
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
            name: this.props.route.params.otherParam.name,
            icon: this.props.route.params.otherParam.icon,
            error: '',
            nameError: false,
            navigation: this.props.navigation,
            modal2Visible: false,
            IconSelection: this.props.route.params.otherParam.icon,
            negocioId: this.props.route.params.itemId,
            flujo: this.props.route.params.otherParam
        }

    }

    getIcon(name) {
        this.setState({IconSelection: name});
    }

    componentDidMount() {
        this._focusListener = this
            .props
            .navigation
            .addListener('focus', () => {
                console.log(this.state)
            });
    }

    componentWillUnmount() {
        this._focusListener();
    }

    Delete = async () => {

        const id = this.state.otherParam.id;
        const flujo = await FlowModel.destroy(id)
        
        this.state.navigation.navigate('BusinessFlow', {
          itemId: this.state.negocioId,
          otherParam: this.state.otherParam,
        });
        }

        showData = async () => {

            const id = this.state.otherParam.id;
        
            const flujo = await FlowModel.find(id)
                flujo.name= this.state.name,
                flujo.icon= this.state.IconSelection,
                flujo.save()
            
            
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
                alignItems: 'center',
                justifyContent: 'center'
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
     onPress={() => {navigation.navigate('BusinessFlow', {
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
                  <Text style={{ color: COLORS.white, ...FONTS.h2 }}>  Editar Flujo de Trabajo</Text>
                  <TouchableOpacity
     onPress={() => {this.Delete() }}
  >
                  <Icon size={30} name='trash-o'
                                  style={{
                                    margin:8,
                                    color: COLORS.white,
                                  }}/>
</TouchableOpacity>
              </View>
              </View>
              

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
                        placeholder={this.state.name}
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
