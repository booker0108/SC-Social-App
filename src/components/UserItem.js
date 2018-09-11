import React, { Component } from 'react';
import {View, Text, StyleSheet, Dimensions, TouchableOpacity} from 'react-native';

const {width} = Dimensions.get('window');
const ITEM_WIDTH = width/3;

class UserItem extends Component {
    render () {
        const {user} = this.props
        
        return (
            <TouchableOpacity>
                <View style={[styles.container, {width: ITEM_WIDTH}]}>
                    <Text style={styles.avatar}>account_circle</Text>
                    <Text style={styles.userName} numberOfLines={3}>{user.name}</Text>
                </View>
            </TouchableOpacity>
        )
    }
}

export default UserItem;

const styles = StyleSheet.create({
    container: {
        height: 'auto',
        alignItems: 'center',
        padding: 12
    },
    avatar: {
        fontFamily: 'Material Icons',
        fontSize: 64
    },
    userName: {
        color: 'white',
        textAlign: 'center'
    }
})