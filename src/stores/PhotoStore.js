import {observable, action, computed} from 'mobx';
import ApiHelper from '../helpers/ApiHelper';

class PhotoStore {
    @observable photos = [];
    @observable selectedPhoto = null

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

    /**
     * Return selected photo record url
     */
    @computed get selectedImageUrl(){
        return this.selectedPhoto && this.selectedPhoto.url;
    }
}

export default new PhotoStore();