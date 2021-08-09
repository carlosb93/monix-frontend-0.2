import React from 'react';
import { Platform, StatusBar } from 'react-native';
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {Signup, Login, SplashScreen, ProfileScreen,
        EditProfile, Expenses, Business, BusinessNew,
        BusinessServices, InventaryNew, InventaryEdit, BusinessEdit,
        BusinessInv, BusinessSales, SalesNew, SalesEdit,
        BusinessExpense, ExpenseNew, ExpenseEdit, CalendarScreen,
        CreateTask, BusinessClients, ClientsNew, ClientsEdit,
        GraphKidsByAge, GraphKidsVsPregnant, GraphOutdoorsVsIndoors, Options,
        Accounts, AccountNew, AccountEdit, ClientsSummaryMenu} from './screens';

import Tabs from './navigation/tabs';
import { COLORS, SIZES } from './constants';

import CategoryModel from './models/Category';
import BusinessModel from './models/Business';
import UserModel from './models/User';
import InventaryModel from './models/Inventary';
import SalesModel from './models/Sales';
import ExpensesModel from './models/Expenses';
import CalendarModel from './models/Calendar';
import ClientsModel from './models/Clientes';
import AccountModel from './models/Account';
import BalanceModel from './models/Balance';

import * as Calendar from 'expo-calendar';



const Stack = createStackNavigator();


export default class App extends React.Component {

    
	constructor() {
		super();
		this.state = {
            isAuthenticated: 'false',
            category: null,
		}
    }
    
    
    async fillTable () {

        var categories =[];
        var negocio =[];
        var inv =[];
        var sales =[];
        var calendar =[];
        var expenses =[];
        var user =[];
        var clients =[];
        var accounts =[];
        var balance =[];
      
        const props =[
          {
            name: 'Balance de cuenta',
            icon: 'credit-card',
            color: COLORS.third
        },
          {
            name: 'Education',
            icon: 'archive',
            color: COLORS.blue
        },
        {
          name: 'Nutrition',
          icon: 'cutlery',
          color: COLORS.green
       },
        {
            name: 'Child',
            icon: 'child',
            color: COLORS.yellow
        },
        {
          name: 'Beauty & Care',
          icon: 'eye',
          color: COLORS.pink
       },
        {
            name: 'Travel',
            icon: 'plane',
            color: COLORS.blue
        },
        {
          name: 'Clothing',
          icon: 'shopping-bag',
          color: COLORS.primary
       }
        ]
        
      
      try {
        user =  await UserModel.query()
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
        calendar =  await CalendarModel.query()
          } catch (error) {
                await CalendarModel.createTable()
                console.log('Table calendar created successfully')
      }
      try {
        // await SalesModel.dropTable()
        sales =  await SalesModel.query()
          } catch (error) {
                await SalesModel.createTable()
                console.log('Table sales created successfully')
      }
      try {
        // await ExpensesModel.dropTable()
        expenses =  await ExpensesModel.query()
          } catch (error) {
                await ExpensesModel.createTable()
                console.log('Table expenses created successfully')
      }
      try {
        clients =  await ClientsModel.query()
          } catch (error) {
                await ClientsModel.createTable()
                console.log('Table clients created successfully')
      }
      try {
        
        accounts =  await AccountModel.query()
          } catch (error) {
                await AccountModel.createTable()
                console.log('Table accounts created successfully')
      }
      try {
        // await BalanceModel.dropTable()
        balance =  await BalanceModel.query()
          } catch (error) {
                await BalanceModel.createTable()
                console.log('Table balances created successfully')
      }
      try {
        
        categories =  await CategoryModel.query()
       
       if(categories.length == 0){

         var i ;
         for(i=0; i < props.length; i++){
           const categoria = new CategoryModel(props[i])
           categoria.save()
         }
         console.log('Table categories filled successfully')
         const setCategory = await CategoryModel.query()
        
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

        await this._askForCalendarPermissions();
        await this._askForReminderPermissions();

        
	}

  _askForCalendarPermissions = async () => {
    const { status } = await Calendar.requestCalendarPermissionsAsync();
    if (status === 'granted') {
      const calendars = await Calendar.getCalendarsAsync(
        Calendar.EntityTypes.EVENT
      );
      console.log('Here are all your calendars:');
      // console.log({ calendars });
    }
  };

  _askForReminderPermissions = async () => {
    if (Platform.OS === 'android') {
      return true;
    }

    const { status } = await Calendar.requestRemindersPermissionsAsync();
    if (status === 'granted') {
      const calendars = await Calendar.getRemindersPermissionsAsync(
        Calendar.EntityTypes.REMINDER
      );
      console.log('Here are all your calendars:');
      // console.log({ calendars });
    }
  };

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

                <Stack.Screen name="Home" component={Tabs} />

                <Stack.Screen name="Login" component={Login} />
                <Stack.Screen name="Signup" component={Signup} />
                <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
                <Stack.Screen name="Options" component={Options} />
                <Stack.Screen name="Accounts" component={Accounts} />
                <Stack.Screen name="AccountNew" component={AccountNew} />
                <Stack.Screen name="AccountEdit" component={AccountEdit} />
                <Stack.Screen name="EditProfile" component={EditProfile} />

                <Stack.Screen name="BusinessServices" component={BusinessServices} />
                <Stack.Screen name="BusinessNew" component={BusinessNew} />
                <Stack.Screen name="BusinessEdit" component={BusinessEdit} />
                <Stack.Screen name="Business" component={Business} />

                <Stack.Screen name="BusinessInv" component={BusinessInv} />
                <Stack.Screen name="InventaryNew" component={InventaryNew} />
                <Stack.Screen name="InventaryEdit" component={InventaryEdit} />

                <Stack.Screen name="BusinessSales" component={BusinessSales} />
                <Stack.Screen name="SalesNew" component={SalesNew} />
                <Stack.Screen name="SalesEdit" component={SalesEdit} />

                <Stack.Screen name="BusinessExpense" component={BusinessExpense} />
                <Stack.Screen name="ExpenseNew" component={ExpenseNew} />
                <Stack.Screen name="ExpenseEdit" component={ExpenseEdit} />

                <Stack.Screen name="BusinessClients" component={BusinessClients} />
                 <Stack.Screen name="ClientsNew" component={ClientsNew} />
                <Stack.Screen name="ClientsEdit" component={ClientsEdit} />
                <Stack.Screen name="GraphKidsByAge" component={GraphKidsByAge} />
                <Stack.Screen name="GraphKidsVsPregnant" component={GraphKidsVsPregnant} />
                <Stack.Screen name="GraphOutdoorsVsIndoors" component={GraphOutdoorsVsIndoors} />
                <Stack.Screen name="ClientsSummaryMenu" component={ClientsSummaryMenu} />
                
                <Stack.Screen name="Expenses" component={Expenses} />
                <Stack.Screen name="CalendarScreen" component={CalendarScreen} />
                <Stack.Screen name="CreateTask" component={CreateTask} />


                 
            </Stack.Navigator>
        </NavigationContainer>

        )};
}



