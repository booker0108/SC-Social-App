import React, { Component } from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import { Color } from '../styles/CommonStyle';
import { inject, observer } from 'mobx-react';

@inject('userDetailStore')
@observer
class UserScreen extends Component {
    static navigationOptions = ({navigation}) => {
        const {user} = navigation.state.params
        return {
            title: user.name
        }
    };

    componentDidMount () {
        //Fetch User detail (Posts, Todos, Albums)
        const {userDetailStore} = this.props;
        const {user} = this.props.navigation.state.params
        userDetailStore.fetchUserDetail(user.id);
    }

    componentWillUnmount(){
        const {userDetailStore} = this.props;
        userDetailStore.reset()
    }

    render () {
        const {userDetailStore} = this.props;
        const {user} = this.props.navigation.state.params
        return (
            <View style={styles.container}>
                <ScrollView>
                    <View style={styles.userInfo}>
                        <Text style={{flex: 1, textAlign: 'center'}}>{userDetailStore.todoLength} TODO</Text>
                        <Text style={styles.avatar}>account_circle</Text>
                        <Text style={{flex: 1, textAlign: 'center'}}>{userDetailStore.albumLength} TODO</Text>
                    </View>
                </ScrollView>
            </View>
        )
    }
}

export default UserScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Color.bg_color_blue
    },
    userInfo: {
        flex: 1,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center'
    },
    avatar: {
        fontFamily: 'Material Icons',
        color: 'white',
        fontSize: 128
    }
})