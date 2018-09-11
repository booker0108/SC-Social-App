import React, { Component } from 'react';
import {View, StyleSheet, FlatList, Text} from 'react-native';
import { inject, observer } from 'mobx-react';
import UserItem from '../components/UserItem';
import { Color } from '../styles/CommonStyle';
@inject('userStore')
@observer
class HomeScreen extends Component {
    static navigationOptions = {
        title: 'Friend List',
    };

    componentDidMount () {
        this.props.userStore.loadUsers();   
    }

    render () {
        const {userStore} = this.props;
        return (
            <View style={styles.container}>
                <FlatList
                    data={userStore.users.slice()}
                    numColumns={3}
                    keyExtractor={(item) => item.id}
                    renderItem={this.renderUserItem} />
            </View>
        )
    }

    renderUserItem = ({item, index}) => {
        return (
            <UserItem key={item.id} user={item} onUserSelect={this.onUserSelect} />
        )
    }

    onUserSelect = (user) => {
        const {navigation} = this.props;
        navigation.navigate('User', {user})
    }
}

export default HomeScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Color.bg_color_blue
    }
})