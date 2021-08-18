import React from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import {material} from 'react-native-typography';
import {icons, COLORS, SIZES, FONTS} from '../../../../constants';
import Numeral from 'numeral'

export const Details = ({suma, ingreso, gasto}) => {
    return (
        <View style={Styles.container}>
            <View style={Styles.content}>
                <Text
                    style={suma > 0
                    ? Styles.paragraph2
                    : Styles.paragraph1}>
                    {'$ ' + Numeral(suma).format('0,0.00') + ' CUP'
}
                </Text>

            </View>
            <View
                style={{
                flexDirection: 'row',
                padding: SIZES.padding,
                alignItems: 'center',
                justifyContent: 'space-between'
            }}>
                <TouchableOpacity style={Styles.itemContainer}>
                <View
                        style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        width: 135,
                    }}>
                        <View
                            style={{
                              height: 50,
                              width: 3,
                              backgroundColor: COLORS.green,
                              borderRadius: 8,
                              margin: 8
                            
                        }}></View>
                        <View
                            style={{
                            height: 50,
                            margin: 10
                        }}>
                            <Text style={Styles.paragraph3}>{'$ ' +  Numeral(ingreso).format('0,0.00')}</Text>
                        </View>
                    </View>
                   
                </TouchableOpacity>

                <TouchableOpacity style={Styles.itemContainer2}>
                    <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          width: 135,
                    }}>
                        <View
                            style={{
                            height: 50,
                            width: 3,
                            backgroundColor: COLORS.peach,
                            borderRadius: 8,
                            margin: 8
                        }}></View>
                        <View
                            style={{
                            height: 50,
                            margin: 10
                        }}>
                            <Text style={Styles.paragraph4}>{'$ ' +  Numeral(gasto).format('0,0.00')}</Text>
                        </View>
                    </View>

                </TouchableOpacity>
            </View>
        </View>
    );
};

const Styles = StyleSheet.create({
    container: {
        width: '100%',
        paddingHorizontal: 24,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-start',
        marginTop: 18
    },
    itemContainer: {
      width: 150,
      height: 80,
      alignItems: 'center',
      justifyContent: 'center',
      marginRight: SIZES.padding,
      marginLeft: SIZES.padding,
      marginVertical: SIZES.radius,
      borderRadius: 8,
      backgroundColor: COLORS.lightgreen2,
      elevation: 0
    },
    itemContainer2: {
        width: 150,
        height: 80,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: SIZES.padding,
        marginLeft: SIZES.padding,
        marginVertical: SIZES.radius,
        borderRadius: 8,
        backgroundColor: COLORS.lightred2,
        elevation: 0
    },
    content: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        color: 'gray'
    },
    paragraph: {
        ...material.display1,
        color: 'gray'
    },
    paragraph1: {
        ...material.display1,
        color: COLORS.peach
    },
    paragraph2: {
        ...material.display1,
        color: COLORS.green
    },
    paragraph3: {
      ...FONTS.h4,
        color: COLORS.green,
        margin: 10
        
    },
    paragraph4: {
      ...FONTS.h4,
        color: COLORS.peach,
        margin: 10
    }
});
