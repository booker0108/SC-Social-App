import React, { Component } from 'react';
import {View, StyleSheet, FlatList, Text} from 'react-native';
import { inject, observer } from 'mobx-react';
import UserItem from '../components/UserItem';
@inject('userStore')
@observer
class HomeScreen extends Component {
    static navigationOptions = {
        title: 'Friend List',
        headerStyle: {
            backgroundColor: '#D79A5B',
        },
        headerTitleStyle: {
            fontWeight: 'bold',
            color: 'white'
        }
    };

    componentDidMount () {
        this.props.userStore.loadUsers();   
    }

    render () {
        const {userStore} = this.props;
        return (
            <View style={styles.container}>
                <FlatList
                    data={userStore.users}
                    numColumns={3}
                    keyExtractor={(item) => item.id}
                    renderItem={this.renderUserItem} />
            </View>
        )
    }

    renderUserItem = ({item, index}) => {
        return (
            <UserItem key={item.id} user={item} />
        )
    }
}

export default HomeScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#506D92'
    }
})