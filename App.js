import React, {Component} from 'react';
import {createStackNavigator} from 'react-navigation';
import HomeScreen from './src/screens/HomeScreen';
import AllStores from './src/stores';
import {Provider} from 'mobx-react';
import UserScreen from './src/screens/UserScreen';
import PostScreen from './src/screens/PostScreen';
import AlbumScreen from './src/screens/AlbumScreen';
import TodoScreen from './src/screens/TodoScreen';
import AlbumDetailScreen from './src/screens/AlbumDetailScreen';
import PostDetailScreen from './src/screens/PostDetailScreen';

const RootStack = createStackNavigator(
  {
    Home: HomeScreen,
    User: UserScreen,
    Post: PostScreen,
    PostDetail: PostDetailScreen,
    Album: AlbumScreen,
    AlbumDetail: AlbumDetailScreen,
    Todo: TodoScreen
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