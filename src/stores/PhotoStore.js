import {observable, action, computed} from 'mobx';
import ApiHelper from '../helpers/ApiHelper';

class PhotoStore {
    @observable photos = [];

    /**
     * Fetch photos in the album
     * @param {string} albumId Id of selected ablum
     */
    @action fetchPhotos(albumId) {
        this.photos = [];
        ApiHelper.get(`/albums/${albumId}/photos`).then(photos => {
            this.photos = photos;
        });
    }
}

export default new PhotoStore();