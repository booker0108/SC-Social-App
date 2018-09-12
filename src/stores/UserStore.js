import {observable, action, computed} from 'mobx';
import ApiHelper from '../helpers/ApiHelper';

class UserStore {
    @observable users = [];

    /**
     * Fetch users from API
     */
    @action loadUsers() {
        ApiHelper.get('/users').then(users => {
            this.users = users;
        });
    }
}

export default new UserStore();