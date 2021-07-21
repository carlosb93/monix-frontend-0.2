import React from 'react';
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {Signup, Login, SplashScreen, Profile,
        EditProfile, Expenses, Business, BusinessForm,
        BusinessServices, InventaryNew, InventaryEdit, BusinessEdit,
        BusinessInv } from './screens';

import Tabs from './navigation/tabs';
import { COLORS, SIZES } from './constants';

import CategoryModel from './models/Category';
import BusinessModel from './models/Business';
import UserModel from './models/User';
import InventaryModel from './models/Inventary';
import SalesModel from './models/Sales';



const Stack = createStackNavigator();


export default class App extends React.Component {

    
	constructor() {
		super();
		this.state = {
            isAuthenticated: 'false',
            setCategory: null,
            category: null,
		}
    }
    
    async fillTable () {

        var categories =[];
        var negocio =[];
        var inv =[];
        var sales =[];
        var user =[];
      
        const props =[
          {
            name: 'Education',
            icon: 'faGraduationCap',
            color: COLORS.blue
        },
        {
          name: 'Nutrition',
          icon: 'faCutlery',
          color: COLORS.green
       },
        {
            name: 'Child',
            icon: 'faChild',
            color: COLORS.yellow
        },
        {
          name: 'Beauty & Care',
          icon: 'faEye',
          color: COLORS.pink
       },
        {
            name: 'Travel',
            icon: 'faPlane',
            color: COLORS.blue
        },
        {
          name: 'Clothing',
          icon: 'faShoppingBag',
          color: COLORS.primary
       }
        ]
        
      
      try {
        user =  await UserModel.query()
        console.log(user)
          } catch (error) {
                await UserModel.createTable()
                console.log('Table user created successfully')
      }
      try {
        negocio =  await BusinessModel.query()
          } catch (error) {
                await BusinessModel.createTable()
                console.log('Table negocio created successfully')
      }
      try {
        inv =  await InventaryModel.query()
          } catch (error) {
                await InventaryModel.createTable()
                console.log('Table inventary created successfully')
      }
      try {
        inv =  await SalesModel.query()
          } catch (error) {
                await SalesModel.createTable()
                console.log('Table sales created successfully')
      }
      try {
        categories =  await CategoryModel.query()
        if(categories.length = 0 ){
      
          var i ;
          for(i=0; i < props.length; i++){
            const categoria = new CategoryModel(props[i])
            await categoria.save()
          }
          this.state.setCategory = await CategoryModel.query()
          console.log('Table categories filled with data')
        }
          } catch (error) {
                await CategoryModel.createTable()
                console.log('Table categories created successfully')
      }
            
    }

async	componentDidMount() {
		let isAuth = await AsyncStorage.getItem('isAuth', (err, value) => {
      if (err) {
          console.log(err)
      } else {
          JSON.parse(value) // boolean false
      }
  });
        this.setState({ isAuthenticated: isAuth });
        this.fillTable();
	}
	render() { 
		return(
        <NavigationContainer>
            <Stack.Navigator initialRouteName="SplashScreen"            
                screenOptions={{
                    headerShown: true,
                    headerStyle: {
                        
                        height: SIZES.header,
                        backgroundColor: COLORS.primary,
                        shadowOpacity: 0,
                        elevation: 0,
                      },
                      headerTintColor: COLORS.transparent,
                }}
                
            > 
                <Stack.Screen name="SplashScreen" component={SplashScreen} options={{headerShown: false}}/>
                <Stack.Screen name="Signup" component={Signup} />
                <Stack.Screen name="Login" component={Login} />

                <Stack.Screen name="Profile" component={Profile} />
                <Stack.Screen name="EditProfile" component={EditProfile} />
                <Stack.Screen name="BusinessForm" component={BusinessForm} />
                <Stack.Screen name="BusinessServices" component={BusinessServices} />
                <Stack.Screen name="BusinessEdit" component={BusinessEdit} />
                <Stack.Screen name="BusinessInv" component={BusinessInv} />
                <Stack.Screen name="InventaryNew" component={InventaryNew} />
                <Stack.Screen name="InventaryEdit" component={InventaryEdit} />
                <Stack.Screen name="Business" component={Business} />
                <Stack.Screen name="Expenses" component={Expenses} />
                <Stack.Screen name="Home" component={Tabs} />

                 
            </Stack.Navigator>
        </NavigationContainer>

        )};
}



