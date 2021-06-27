import React from 'react';
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage';

import { Home, Signup, Login, SplashScreen } from './screens'
import Tabs from './navigation/tabs'

import { COLORS, SIZES } from './constants'

const Stack = createStackNavigator();

export default class App extends React.Component {

	constructor() {
		super();
		this.state = {
			isAuthenticated: 'false'
		}
	}
 
	componentDidMount() {
		let isAuth = AsyncStorage.getItem('isAuthenticated');
		this.setState({ isAuthenticated: isAuth });
	}
	render() { 
		return(
        <NavigationContainer>
            <Stack.Navigator initialRouteName="SplashScreen"            
                screenOptions={{
                    headerShown: true,
                    headerStyle: {
                        
                        height: SIZES.header,
                        backgroundColor: COLORS.lightGray4,
                        shadowOpacity: 0,
                        elevation: 0,
                      },
                      headerTintColor: COLORS.transparent,
                }}
                
            > 
                <Stack.Screen name="SplashScreen" component={SplashScreen} options={{headerShown: false}}/>
                <Stack.Screen name="Home" component={Tabs} />
                <Stack.Screen name="Signup" component={Signup} />
                <Stack.Screen name="Login" component={Login} />
                 
            </Stack.Navigator>
        </NavigationContainer>

        )};
}



