/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import LoginScreen from './src/screens/LoginScreen';
import DashboardScreen from './src/screens/DashboardScreen';
import InvoiceCards from './src/screens/InvoicesScreen';
import DetailsScreen from './src/screens/InvoiceDetailsScreen';
import DistributerScreen from './src/screens/DistributerScreen';
import LoyaltyScreen from './src/screens/LoyaltyScreen';
import LoansScreen from './src/screens/LoansScreen';
import LoanDetailsScreen from './src/screens/LoanDetailsScreen';
import SplashScreen from './src/screens/SplashScreen';
import OtpScreen from './src/screens/OtpScreen';
import TermsAndConditionScreen from './src/screens/TermsAndConditionScreen'
import MoreDetails from './src/screens/MoreDetails'
export default class App extends Component {
  constructor(properties) {
    super(properties);
    this.state = {
      appid: '',
    };
  }
  AppNavigator = createStackNavigator(
    {
      Login: {
        screen: LoginScreen,
        navigationOptions: {
          headerShown: false,
        },
      },
      Dashboard: DashboardScreen,
      Invoices: InvoiceCards,
      Details: DetailsScreen,
      Distributer: DistributerScreen,
      Loyalties: LoyaltyScreen,
      Loans: LoansScreen,
      LoanDetails: LoanDetailsScreen,
      TermsAndConditionScreen: TermsAndConditionScreen,
      MoreDetails: MoreDetails,
      OtpScreen: {
        screen:OtpScreen,
        navigationOptions: {
          headerShown: false,
        },
      },
      Splash: {
        screen: props => (
          <SplashScreen
            {...props}
            baseurl="http://ardouranalytics.com/fundlys/"
            appid={this.state.appid}
          />
        ),
        navigationOptions: {
          headerShown: false,
        },
      },
    },
    {
      initialRouteName: 'Splash',

      defaultNavigationOptions: {
        title: 'Fundly',
        headerStyle: {
          backgroundColor: '#0077b5',
          elevation: 0,
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      },
    },
  );

  AppContainer = createAppContainer(this.AppNavigator);
  render() {
    return <this.AppContainer />;
  }
}
/*

Fintap Name instead of Fundly
Violet color for header in all screens
Splash screen lower bg -> #fff
Fontcolor -> #000

make api for changing status of invoices
make api for changing status of loans on paying (multiple at once -- array of ids)
make api to change status of loand from new to pending if due date passed


loan model:
amount (int),
id,
number (int),
due_date (date),
start_date (date),
status (new, pending, paid) (string)

*/