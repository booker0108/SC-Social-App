import React, { Component } from 'react'
import {View, Text, FlatList, StyleSheet, TouchableOpacity} from 'react-native'
import { inject, observer } from 'mobx-react';
import { Color, Font } from '../styles/CommonStyle';


const INDEX_DOT_COLORS = [
    '#FF3B30',
    '#FF9500',
    '#59C8FA',
    '#27AE60',
]

@inject('userDetailStore', 'commentStore')
@observer
class PostScreen extends Component {

    static navigationOptions = {
        title: 'Posts'
    }

    render () {
        const {userDetailStore} = this.props
        return (
            <View style={styles.container}>
                <FlatList
                    style={{flex: 1}}
                    data={userDetailStore.posts}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={this.renderPostItem} />
            </View>
        )
    }

    renderPostItem = ({item, index}) => {
        const dotColor = INDEX_DOT_COLORS[index%INDEX_DOT_COLORS.length];
        return (
            <TouchableOpacity key={item.id} onPress={() => this.onPostItemPress(item)}>
                <View style={styles.postContainer}>
                    <View style={[styles.postDot, {backgroundColor: dotColor}]} />
                    <View style={styles.postTextContainer}>
                        <Text numberOfLines={1} ellipsizeMode="tail" style={styles.postTitleText}>
                            {item.title}
                        </Text>

                        <Text numberOfLines={2} ellipsizeMode="tail" style={styles.postBodyText}>
                            {item.body}
                        </Text>
                    </View>

                    <Text style={styles.postArrowIcon}>keyboard_arrow_right</Text>

                </View>
            </TouchableOpacity>
        )
    }

    /**
     * Callback function wehn pressing on a post
     * @param {object} post Post Item selceted
     */
    onPostItemPress = (post) => {
        const {commentStore, navigation} = this.props;
        commentStore.fetchComments(post.id)
        navigation.navigate('PostDetail', {post});
    }
}

export default PostScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Color.bg_color_blue
    },
    postContainer: {
        flexDirection: 'row', 
        padding: 24, 
        alignItems: 'center'
    },
    postDot: {
        width: 8, 
        height: 8, 
        borderRadius: 99
    },
    postTextContainer: {
        flexDirection: 'column', 
        flex: 1, 
        marginLeft: 24
    },
    postTitleText: {
        fontWeight: 'bold', 
        fontSize: 18, 
        color: 'white'
    },
    postBodyText: {
        fontSize: 14, 
        color: '#c1c1c1'
    },
    postArrowIcon: {
        fontFamily: Font.materialIcons, 
        marginLeft: 24, 
        color: 'white', 
        fontSize: 21
    }
});