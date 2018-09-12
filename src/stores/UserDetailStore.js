import {observable, action, computed} from 'mobx';
import ApiHelper from '../helpers/ApiHelper';

class UserDetailStore {
    @observable posts = [];
    @observable todos = [];
    @observable albums = [];
    @observable user = {};

    /**
     * Fetch users from API
     */
    @action fetchUserDetail(user) {
        this.user = user;

        let userId = user.id;

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

    /**
     * Return user address in format {street, suite, city}
     */
    @computed get userAddress(){
        if(!this.user.address){
            return "";
        }

        const {street, suite, city, zipcode} = this.user.address;

        let address = '';

        /**
         * Append next path to current address, comma will only be added if current address is not empty
         * @param {string} address Current address string
         * @param {string} nextPath Next path of address
         */
        let appendAddress = (address, nextPath) => {
            if(nextPath){
                if(address.length > 0){
                    address += ', ';
                }
                address += nextPath;
            }

            return address;
        }

        address = appendAddress(address, street);
        address = appendAddress(address, suite);
        address = appendAddress(address, city);

        if(zipcode){
            address = `${address} (${zipcode})`
        }

        return address;
    }

    @computed get emailURL(){
        return `mailto:${this.user.email}`
    }

    @computed get geoLocationURL(){
        if(!this.user.address){
            return "";
        }

        const {lat, lng} = this.user.address.geo;
        return `https://www.google.com/maps/@${lat},${lng},15z`
    }
    
    @computed get phone(){
        return this.user.phone;
    }

    @computed get website(){
        return this.user.website;
    }

    @computed get phoneURL(){
        return `tel:${this.user.phone.replace(/\D/g,'')}`;
    }

    @computed get websiteURL(){
        return `http://${this.user.website}`;
    }

    @computed get companyName(){
        return this.user.company ? this.user.company.name : "";
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
        this.user = {}
    }
}

export default new UserDetailStore();