import React, { Component } from 'react'
import {View, Text, StyleSheet, FlatList, Dimensions, TouchableOpacity, Image} from 'react-native'
import { Color } from '../styles/CommonStyle';
import { inject, observer } from 'mobx-react';

const {width} = Dimensions.get('window');
const NUMBER_OF_COLUMN = 2;
const THUMBNAIL_SIZE = width/NUMBER_OF_COLUMN;
@inject('photoStore')
@observer
class AlbumDetailScreen extends Component {

    static navigationOptions = ({navigation}) => {
        return {
            title: navigation.state.params.album.title
        }
    }

    render () {
        const {photoStore} = this.props;
        return (
            <View style={styles.container}>
                <FlatList
                    numColumns={NUMBER_OF_COLUMN}
                    data={photoStore.photos}
                    keyExtractor={item => item.id.toString()}
                    renderItem={this.renderPhotoThumbnail} />
            </View>
        )
    }

    renderPhotoThumbnail = ({item}) => {
        return (
            <TouchableOpacity>
                <Image style={{width: THUMBNAIL_SIZE, height: THUMBNAIL_SIZE}}
                    source={{uri: item.thumbnailUrl}} />
            </TouchableOpacity>
        )
    }
}

export default AlbumDetailScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Color.bg_color_blue
    }
})