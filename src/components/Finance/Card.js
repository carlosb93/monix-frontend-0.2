import React from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import {LinearGradient} from 'expo-linear-gradient';
import {
    COLORS,
    SIZES,
    FONTS,
    iconData,
    icons,
    colorData
} from '../../constants'
// import {useSelector} from 'react-redux';

const BalanceNew = ({navigation}) => {
    const {transactions} = []; //useSelector((state) => state.transactions);

    const prices = []; //transactions.map((transaction) => transaction.price);
    const totalPrice = []; //prices.reduce((prev, cur) => (prev += cur), 0).toFixed(2);

    const expense = prices.filter((price) => price < 0).reduce((prev, cur) => (prev += cur), 0).toFixed(2) * -1;

    return (
        <LinearGradient
            colors={[COLORS.softgray, COLORS.softgray, COLORS.black]}
            style={styles.Box}>
            <View
                style={{
                width: '70%',
                alignItems: 'flex-start'
            }}>
                <Text
                    style={{
                    fontSize: 15,
                    color: '#fff',
                    fontWeight: '700'
                }}>
                    Income
                </Text>
                <Text
                    style={{
                    fontSize: 32,
                    color: '#fff',
                    fontWeight: '700'
                }}>
                    ₦{totalPrice}
                </Text>

                <Text
                    style={{
                    marginTop: 67,
                    color: '#fff',
                    fontSize: 18,
                    fontWeight: '700'
                }}>
                    4234 **** **** 6533
                </Text>
            </View>

            <View
                style={{
                alignItems: 'flex-end',
                width: '30%'
            }}>
                <Text
                    style={{
                    fontSize: 18,
                    color: '#fff',
                    fontWeight: '700'
                }}>
                    NGN
                </Text>
                <View style={{
                    flex: 1
                }}>
                <TouchableOpacity onPress={() => { navigation.navigate('Home')}} 
                 style={{
                  padding: 10,
                  marginTop: 32,
                  borderRadius:25,
                  backgroundColor: '#E10C62',
                  alignItems: 'center',
                  justifyContent: 'center'
              }}>
                <Text
                    style={{
                    color: '#fff',
                    fontWeight: '700',
                    fontSize: 15
                }} >
                    Add
                </Text>
            </TouchableOpacity>

                 

                    <Text
                        style={{
                        marginTop: 17,
                        color: '#fff',
                        fontSize: 15,
                        fontWeight: '700'
                    }}>
                        Expense
                    </Text>
                    <Text
                        style={{
                        color: '#fff',
                        fontSize: 18,
                        fontWeight: '700'
                    }}>
                        -₦{expense}
                    </Text>
                </View>
            </View>
        </LinearGradient>
    );
};

const styles = StyleSheet.create({
    Box: {
        width: '100%',
        height: 189,
        borderRadius: 15,
        flexDirection: 'row',
        padding: 22
    }
});

export default BalanceNew;
