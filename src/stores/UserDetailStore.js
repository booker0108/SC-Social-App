import {observable, action, computed} from 'mobx';
import ApiHelper from '../helpers/ApiHelper';

class UserDetailStore {
    @observable posts = [];
    @observable todos = [];
    @observable albums = [];

    /**
     * Fetch users from API
     */
    @action fetchUserDetail(userId) {
        ApiHelper.get(`/users/${userId}/posts`).then(posts => {
            this.posts = posts;
        });

        ApiHelper.get(`/users/${userId}/todos`).then(todos => {
            this.todos = todos;
        });

        ApiHelper.get(`/users/${userId}/albums`).then(albums => {
            this.albums = albums;
        });
    }

    @computed get todoLength(){
        return this.todos.length;
    }

    @computed get albumLength(){
        return this.todos.length;
    }

    @action reset() {
        this.posts = []
        this.todos = []
        this.albums = []
    }
}

export default new UserDetailStore();