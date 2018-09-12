import React, { Component } from 'react'
import {View, StyleSheet, FlatList, Text, TouchableOpacity} from 'react-native'
import { Color, Font } from '../styles/CommonStyle';
import { inject } from 'mobx-react';

@inject('userDetailStore', 'photoStore')
class AlbumScreen extends Component {

    static navigationOptions = {
        title: 'Albums'
    }

    render () {
        const {userDetailStore} = this.props;
        return (
            <View style={styles.container}>
                <FlatList 
                    data={userDetailStore.albums}
                    keyExtractor={item => item.id.toString()}
                    renderItem={this.renderAlbumItem}
                    numColumns={2} />
            </View>
        )
    }

    renderAlbumItem = ({item}) => {
        return (
            <TouchableOpacity style={styles.ablumContainer} onPress={() => this.onAlbumPress(item)}>
            <View style={styles.albumInfoContainer}>
                <Text style={styles.albumThumbnail}>photo_library</Text>
                <Text numberOfLines={2} style={styles.albumnTitleText}>{item.title}</Text>
            </View>
            </TouchableOpacity>
        )
    }

    /**
     * Callback function when pressing on an album
     * @param {object} album Selected album
     */
    onAlbumPress = (album) => {
        const {photoStore, navigation} = this.props;
        photoStore.fetchPhotos(album.id)
        navigation.navigate('AlbumDetail', {album});
    }
}

export default AlbumScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Color.bg_color_blue
    },
    ablumContainer: {
        flex: 1
    },
    albumInfoContainer: {justifyContent: 'center', alignItems: 'center'},
    albumThumbnail: {fontFamily: Font.materialIcons, fontSize: 96, color: 'white', padding: 12},
    albumnTitleText: {padding: 8, color: 'white', fontWeight: 'bold'}
})