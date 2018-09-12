import React, { Component } from 'react';
import {View, Text, StyleSheet, ScrollView, TouchableOpacity, Linking, Alert, Clipboard} from 'react-native';
import { Color, Font } from '../styles/CommonStyle';
import { inject, observer } from 'mobx-react';
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/Ionicons';

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
                    <View style={styles.userBasicContainer}>
                        <View style={styles.userInfo}>
                            {/* {this.renderDetailButton(`${userDetailStore.todoLength}\nTodo(s)`, this.onTodoPressed)} */}
                            <Text style={styles.avatar}>account_circle</Text>
                            {/* {this.renderDetailButton(`${userDetailStore.albumLength}\nAlbum(s)`, this.onAlbumPressed)} */}
                        </View>

                        <Text style={styles.nameText}>{user.name}</Text>
                        <Text style={styles.usernameText}>({user.username})</Text>
                        
                        <TouchableOpacity onPress={() => this.onLinkTextPressed(user.email, userDetailStore.emailURL)}>
                            <Text style={{color: 'white', fontSize: 14, textDecorationLine:'underline'}}>{user.email}</Text>
                        </TouchableOpacity>

                        {this.renderUserInformation()}

                    </View>
                </ScrollView>

                {this.renderFAB()}
                
            </View>
        )
    }

    renderFAB() {
        const {userDetailStore} = this.props;
        let menuIcon = () => <Icon name="md-menu" style={styles.actionButtonIcon} />

        return (
            <ActionButton buttonColor="rgba(231,76,60,1)" renderIcon={menuIcon} degrees={0} autoInactive={false}>
                <ActionButton.Item buttonColor='#9b59b6' title={`Post (${userDetailStore.postLength})`} onPress={() => this.onSubMenuPress('Post')}>
                    <Icon name="md-create" style={styles.actionButtonIcon} />
                </ActionButton.Item>
                <ActionButton.Item buttonColor='#3498db' title={`Album (${userDetailStore.albumLength})`} onPress={() => this.onSubMenuPress('Album')}>
                    <Icon name="md-images" style={styles.actionButtonIcon} />
                </ActionButton.Item>
                <ActionButton.Item buttonColor='#1abc9c' title={`Todo (${userDetailStore.todoLength})`} onPress={() => this.onSubMenuPress('Todo')}>
                    <Icon name="md-done-all" style={styles.actionButtonIcon} />
                </ActionButton.Item>
            </ActionButton>
        );
    }

    renderUserInformation() {
        const {userDetailStore} = this.props;
        return (
            <View style={styles.inforContainer}>
                {this.renderTextWithIcon(userDetailStore.userAddress, 'location_city', () => {this.onLinkTextPressed('', userDetailStore.geoLocationURL)})}
                {this.renderTextWithIcon(userDetailStore.phone, 'phone', () => {this.onLinkTextPressed(userDetailStore.phone, userDetailStore.phoneURL)})}
                {this.renderTextWithIcon(userDetailStore.website, 'home', () => {this.onLinkTextPressed(userDetailStore.website, userDetailStore.websiteURL)})}
                {this.renderTextWithIcon(userDetailStore.companyName, 'copyright')}
            </View>
        )
    }

    renderTextWithIcon(text, icon, callback) {
        return (
            <TouchableOpacity onPress={() => callback && callback()}>
                <View style={styles.textIconContainer}>
                    <Text style={styles.infoIcon}>{icon}</Text>
                    <Text style={styles.infoText}>{text}</Text>
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
     * Open URL (tel, mailto, http) action
     * Copy value to clipboard if failed to open URL
     * @param {string} value Original value of field
     * @param {string} url Formatted value as URL
     */
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

    /**
     * Callback function when pressing on sub menu button
     */
    onSubMenuPress = (route) => {
        const {navigation} = this.props;
        navigation.navigate(route);
    }
}

export default UserScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Color.bg_color_blue
    },
    userBasicContainer: {
        flex: 1, 
        alignItems: 'center', 
        padding: 8
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
    nameText: {
        color: 'white', 
        fontSize: 24
    },
    usernameText: {
        color: 'white', 
        fontSize: 14
    },
    buttonContainer: {
        borderRadius: 99, 
        backgroundColor: 'white', 
        padding: 4
    },
    buttonText: {
        textAlign: 'center'
    },
    actionButtonIcon: {
        fontSize: 20,
        height: 22,
        color: 'white',
    },
    inforContainer: {
        width: "100%", 
        marginVertical: 12,
        marginTop: 24
    },
    textIconContainer: {
        width: "100%", 
        flexDirection: 'row', 
        justifyContent: 'center', 
        alignItems: 'center', 
        paddingVertical: 4
    },
    infoIcon: {
        fontFamily: Font.materialIcons, 
        color: 'white', 
        fontSize: 24, 
        paddingHorizontal: 18
    },
    infoText: {
        flex: 1, 
        color: 'white', 
        fontSize: 16
    }
})