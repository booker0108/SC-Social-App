import React, { Component } from 'react';
import {View, Text, StyleSheet, ScrollView, TouchableOpacity, Linking, Alert, Clipboard} from 'react-native';
import { Color, Font } from '../styles/CommonStyle';
import { inject, observer } from 'mobx-react';

@inject('userDetailStore')
@observer
class UserScreen extends Component {
    static navigationOptions = {
        title: 'Friend'
    }

    componentDidMount () {
        //Fetch User detail (Posts, Todos, Albums)
        const {userDetailStore} = this.props;
        const {user} = this.props.navigation.state.params
        userDetailStore.fetchUserDetail(user);
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
                    <View style={{flex: 1, alignItems: 'center', padding: 8}}>
                        <View style={styles.userInfo}>
                            {/* {this.renderDetailButton(`${userDetailStore.todoLength}\nTodo(s)`, this.onTodoPressed)} */}
                            <Text style={styles.avatar}>account_circle</Text>
                            {/* {this.renderDetailButton(`${userDetailStore.albumLength}\nAlbum(s)`, this.onAlbumPressed)} */}
                        </View>

                        <Text style={{color: 'white', fontSize: 24}}>{user.name}</Text>
                        <Text style={{color: 'white', fontSize: 14}}>({user.username})</Text>
                        
                        <TouchableOpacity onPress={() => this.onEmailPressed(user.email)}>
                            <Text style={{color: 'white', fontSize: 14, textDecorationLine:'underline'}}>{user.email}</Text>
                        </TouchableOpacity>

                        <View style={{width: "100%", marginVertical: 12}}>
                            {this.renderTextWithIcon(userDetailStore.userAddress, 'location_city', () => {this.onLinkTextPressed('', userDetailStore.geoLocationURL)})}
                            {this.renderTextWithIcon(userDetailStore.phone, 'phone', () => {this.onLinkTextPressed(userDetailStore.phone, userDetailStore.phoneURL)})}
                            {this.renderTextWithIcon(userDetailStore.website, 'home', () => {this.onLinkTextPressed(userDetailStore.website, userDetailStore.websiteURL)})}
                            {this.renderTextWithIcon(userDetailStore.companyName, 'copyright')}
                        </View>

                    </View>
                </ScrollView>
            </View>
        )
    }

    async onLinkTextPressed(value, url){
        if(await Linking.canOpenURL(url)){
            Linking.openURL(url);
        }else {
            if(value){
                Clipboard.setString(value);
                Alert.alert(`Cannot perform action, ${value} is copied to clipboard`);
            } else {
                Alert.alert(`Cannot perform action`);
            }
        }
    }

    renderTextWithIcon(text, icon, callback) {
        return (
            <TouchableOpacity onPress={() => callback && callback()}>
                <View style={{width: "100%", flexDirection: 'row', justifyContent: 'center', alignItems: 'center', paddingVertical: 4}}>
                    <Text style={{fontFamily: Font.materialIcons, color: 'white', fontSize: 24, paddingHorizontal: 18}}>{icon}</Text>
                    <Text style={{flex: 1, color: 'white', fontSize: 16}}>{text}</Text>
                </View>
            </TouchableOpacity>
        )
    }


    /**
     * Render a round button with text inside
     * @param {string} text String display in the button
     * @param {function} onPressCallback Callback function when pressing on the button
     */
    renderDetailButton(text, onPressCallback){
        return (
            <TouchableOpacity style={{flex: 1}} onPress={() => onPressCallback && onPressCallback()}>
                <View style={styles.buttonContainer}>
                    <Text style={styles.buttonText}>{text}</Text>
                </View>        
            </TouchableOpacity>
        )
    }

    /**
     * Open Email client with target receipent's email address
     * Email address will be copied to clipboard if email client is not available
     * @param {string} email Email address of the user
     */
    onEmailPressed = async (email) => {
        let url = `mailto::${email}`;
        if(await Linking.canOpenURL(url)){
            Linking.openURL(url);
        }else {
            Clipboard.setString(email);
            Alert.alert(`Cannot open Email Client, Email(${email}) is copy to clipboard`);

        }
    }

    /**
     * Callback function when pressing on Todo button
     */
    onTodoPressed = () => {
        //navigate to todo screen
    }

    /**
     * Callback function when pressing on Album button
     */
    onAlbumPressed = () => {
        //navigate to album screen
    }

    /**
     * Callback function when pressing on Post button
     */
    onPostPressed = () => {
        //navigate to post screen
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
        justifyContent: 'center',
        alignItems: 'center',
        padding: 8
    },
    avatar: {
        fontFamily: Font.materialIcons,
        color: 'white',
        fontSize: 128
    },
    buttonContainer: {
        borderRadius: 99, 
        backgroundColor: 'white', 
        padding: 4
    },
    buttonText: {
        textAlign: 'center'
    }
})