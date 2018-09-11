import React, { Component } from 'react';
import {View, StyleSheet, FlatList, Text} from 'react-native';
import { inject, observer } from 'mobx-react';

@inject('userStore')
@observer
class HomeScreen extends Component {

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
            <View key={item.id} style={{flex: 1}}><Text>{item.name}</Text></View>
        )
    }
}

export default HomeScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
})