import React from 'react';
import {
    View,
    Image,
    TouchableOpacity,
    StyleSheet
} from 'react-native';
import { createBottomTabNavigator, BottomTabBar } from "@react-navigation/bottom-tabs"
import Svg, { Path } from 'react-native-svg';
import { isIphoneX } from 'react-native-iphone-x-helper';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faUsers,faBriefcase } from '@fortawesome/free-solid-svg-icons'

import { Home, ProfileScreen, Business,Expenses} from "../screens"

import { COLORS, icons } from "../constants"



const Tab = createBottomTabNavigator();


const TabBarCustomButton = ({ accessibilityState, children, onPress }) => {

    var isSelected = accessibilityState.selected

    if (isSelected) {
        return (
            <View style={{ flex: 1, alignItems: "center" }}>
                <View style={{ flexDirection: 'row', position: 'absolute', top: 0 }}>
                    <View style={{ flex: 1, backgroundColor: COLORS.white }}></View>
                    <Svg
                        width={69}
                        height={60}
                        viewBox="0 0 75 65"
                        color={COLORS.transparent}
                    >
                        <Path
                            d="M75.2 0v61H0V0c4.1 0 7.4 3.1 7.9 7.1C10 21.7 22.5 33 37.7 33c15.2 0 27.7-11.3 29.7-25.9.5-4 3.9-7.1 7.9-7.1h-.1z"
                            fill={COLORS.white}
                        />
                    </Svg>
                    <View style={{ flex: 1, backgroundColor: COLORS.white }}></View>
                </View>

                <TouchableOpacity
                    style={{
                        top: -25.5,
                        justifyContent: 'center',
                        alignItems: 'center',
                        width: 50,
                        height: 50,
                        borderRadius: 25,
                        backgroundColor: COLORS.white
                    }}
                    onPress={onPress}
                >
                    {children}
                </TouchableOpacity>
            </View>
        )
    } else {
        return (
            <TouchableOpacity
                style={{
                    flex: 1,
                    height: 60,
                    backgroundColor: COLORS.white
                }}
                activeOpacity={1}
                onPress={onPress}
            >
                {children}
            </TouchableOpacity>
        )
    }
}

const CustomTabBar = (props) => {
    if (isIphoneX()) {
        return (
            <View>
                <View
                    style={{
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        right: 0,
                        height: 30,
                        backgroundColor: COLORS.white
                        
                    }}
                ></View>
                <BottomTabBar
                    {...props.props}
                />
            </View>
        )
    } else {
        return (
            <BottomTabBar
                {...props.props}
            />
        )
    }

}

const Tabs = ({ navigation }) => {
    return (
        <Tab.Navigator
            tabBarOptions={{
                showLabel: false,
                style: {
                    position: 'absolute',
                    left: 0,
                    bottom: 0,
                    right: 0,
                    borderTopWidth: 0,
                    backgroundColor: "transparent",
                    elevation: 0
                }
            }}
            tabBar={(props) => (
                <CustomTabBar
                    props={props}
                />
            )}
        >
            <Tab.Screen
                name="Home"
                component={Home}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <Image
                            source={icons.calendar}
                            resizeMode="contain"
                            style={{
                                width: 25,
                                height: 25,
                                tintColor: focused ? COLORS.primary : COLORS.secondaryold
                            }}
                        />
                    ),
                    tabBarButton: (props) => (
                        <TabBarCustomButton
                            {...props}
                        />
                    )
                }}
            />

            <Tab.Screen
                name="Expenses"
                component={Expenses}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <Image
                            source={icons.money}
                            resizeMode="contain"
                            style={{
                                width: 25,
                                height: 25,
                                tintColor: focused ? COLORS.primary : COLORS.secondaryold
                            }}
                        />
                    ),
                    tabBarButton: (props) => (
                        <TabBarCustomButton
                        onPress ={ () => { navigation.replace('Expenses') }}
                        {...props}
                        />
                    )
                }}
            />

            <Tab.Screen
                name="Business"
                component={Business}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <FontAwesomeIcon size={25} icon={ faBriefcase  } 
                        style={{
                            color: focused ? COLORS.primary : COLORS.secondaryold,
                        }}/>
                    ),
                    tabBarButton: (props) => (
                        <TabBarCustomButton
                        onPress ={ () => { navigation.replace('Business') }}
                            {...props}
                        />
                    )
                }}
            />

            <Tab.Screen
                name="Users"
                component={Home}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <FontAwesomeIcon size={25} icon={ faUsers  } 
                        style={{
                            color: focused ? COLORS.primary : COLORS.secondaryold,
                        }}/>
                    ),
                    tabBarButton: (props) => (
                        <TabBarCustomButton
                            {...props}
                        />
                    )
                }}
            />

            <Tab.Screen
                name="User"
                component={ProfileScreen}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <Image
                            source={icons.user}
                            resizeMode="contain"
                            style={{
                                width: 25,
                                height: 25,
                                tintColor: focused ? COLORS.primary : COLORS.secondaryold
                            }}
                        />
                    ),
                    tabBarButton: (props) => (
                        <TabBarCustomButton
                        onPress ={ () => { navigation.replace('ProfileScreen') }}
                            {...props}
                        />
                    )
                }}
            />
        </Tab.Navigator>
    )
}

export default Tabs