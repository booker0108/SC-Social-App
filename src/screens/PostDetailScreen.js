import React, { Component } from 'react'
import {View, Text, FlatList, StyleSheet} from 'react-native'
import { inject, observer } from 'mobx-react';
import { Color, Font } from '../styles/CommonStyle';

@inject('commentStore')
@observer
class PostDetailScreen extends Component {

    static navigationOptions = {
        title: 'Comments'
    }

    render () {
        const {commentStore} = this.props;

        return (
            <View style={styles.container}>
                <FlatList
                    ListHeaderComponent={this.renderOriginalPost}
                    data={commentStore.comments}
                    keyExtractor={item => item.id.toString()}
                    renderItem={this.renderComment} />
            </View>
        )
    }

    renderOriginalPost = () => {
        const {post} = this.props.navigation.state.params;
        const {commentStore} = this.props;
        return (
            <View style={styles.postContainer}>
                <Text style={styles.postTitleText}>{post.title}</Text>
                <Text style={styles.postBodyText}>{post.body}</Text>
                <View style={styles.divider}/>
                <Text style={styles.repliesText}>Replies{commentStore.commentLength > 0 && ` (${commentStore.commentLength})`}</Text>
            </View>
        )
    }

    renderComment = ({item, index}) => {
        return (
            <View key={item.id} style={styles.commentContainer}>
                <View style={styles.replierContainer}>
                    <Text style={styles.avatar}>account_circle</Text>
                    <View style={styles.replierTextContainer}>
                        <Text numberOfLines={1} style={styles.replierNameText}>{item.name}</Text>
                        <Text>{item.email}</Text>
                    </View>
                </View>
                <Text>{item.body}</Text>
            </View>
        )
    }
}

export default PostDetailScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Color.bg_color_blue
    },
    postContainer: {
        padding: 18
    },
    postTitleText: {fontSize: 24, fontWeight: 'bold', color: 'white', marginBottom: 18},
    postBodyText: {fontSize: 16, color: 'white', marginBottom: 12},
    divider: {height: 1, flex: 1, backgroundColor: '#c1c1c1', marginVertical: 4},
    repliesText: {fontSize: 16, fontWeight: 'bold', color: 'white', marginTop: 12},
    commentContainer: {marginHorizontal: 18, marginVertical: 4, backgroundColor: 'white', borderRadius: 8, padding: 12},
    replierContainer: {flexDirection: 'row', marginBottom: 8},
    avatar: {fontFamily: Font.materialIcons, fontSize: 54, marginRight: 12},
    replierTextContainer: {justifyContent: 'center', flex: 1},
    replierNameText: {fontWeight: 'bold'}
});