import React, {Component} from 'react';
import {createStackNavigator} from 'react-navigation';
import HomeScreen from './src/screens/HomeScreen';
import AllStores from './src/stores';
import {Provider} from 'mobx-react';

const RootStack = createStackNavigator({
  Home: HomeScreen
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