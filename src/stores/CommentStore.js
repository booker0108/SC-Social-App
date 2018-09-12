import { observable, action, computed } from "mobx";
import ApiHelper from "../helpers/ApiHelper";


export default new class CommentStore {
    @observable comments = [];

    /**
     * Fetch all comments for a post
     * @param {string} postId ID of selected Post
     */
    @action fetchComments(postId){
        this.comments = [];
        ApiHelper.get(`/posts/${postId}/comments`).then(comments => this.comments = comments);
    }

    @computed get commentLength(){
        return this.comments.length;
    }
}

