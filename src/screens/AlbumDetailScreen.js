import React, { Component } from 'react'
import {View, StyleSheet, FlatList, Dimensions, TouchableOpacity, Modal} from 'react-native'
import { Color } from '../styles/CommonStyle';
import { inject, observer } from 'mobx-react';
import FastImage from 'react-native-fast-image';
import ImageViewer from 'react-native-image-zoom-viewer';


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

    componentWillUnmount () {
        //Reset selected photo for safety
        this.props.photoStore.selectedPhoto = null
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

                <Modal visible={!!photoStore.selectedPhoto} transparent={true}>
                    <ImageViewer 
                        enableSwipeDown={true}
                        onClick={this.onDismissPhotoViewer}
                        onSwipeDown={this.onDismissPhotoViewer}
                        renderIndicator={() => null} 
                        imageUrls={[{url:photoStore.selectedImageUrl}]}/>
                </Modal>
            </View>
        )
    }

    renderPhotoThumbnail = ({item}) => {
        const {photoStore} = this.props;
        return (
            <TouchableOpacity onPress={() => photoStore.selectedPhoto = item}>
                <FastImage style={{width: THUMBNAIL_SIZE, height: THUMBNAIL_SIZE}}
                    source={{uri: item.thumbnailUrl}} />
            </TouchableOpacity>
        )
    }

    /**
     * Dimiss photo viewer modal by setting selected photo to null
     */
    onDismissPhotoViewer = () => this.props.photoStore.selectedPhoto = null;
}

export default AlbumDetailScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Color.bg_color_blue
    }
})