import React, {Component} from 'react';
import {createStackNavigator} from 'react-navigation';
import HomeScreen from './src/screens/HomeScreen';
import AllStores from './src/stores';
import {Provider} from 'mobx-react';
import UserScreen from './src/screens/UserScreen';

const RootStack = createStackNavigator(
  {
  Home: HomeScreen,
  User: UserScreen
  }, 
  {
    navigationOptions: {
      headerStyle: {
        backgroundColor: '#D79A5B',
      },
      headerTitleStyle: {
        fontWeight: 'bold',
        color: 'white'
      },
      headerTintColor: 'white',
      headerBackTitleStyle: {
        color: 'transparent'
      }
    }
  })
export default class App extends Component {

  render() {
    return (
      <Provider {...AllStores}>
        <RootStack />
      </Provider>
    );
  }
}