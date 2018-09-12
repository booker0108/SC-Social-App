import {observable, action, computed} from 'mobx';

class TodoStore {
    @observable isSwiping = false;
    @observable todoCompleted = {};

    @action updateCompleted(todoId){
        this.todoCompleted[todoId] = !!!this.todoCompleted[todoId];
    }

    isTodoCompleted(todoId) {
        return !!this.todoCompleted[todoId]
    }

    @action startSwipe(){
        this.isSwiping = true;
    }

    @action finishSwipe(){
        this.isSwiping = false;
    }
}

export default new TodoStore();