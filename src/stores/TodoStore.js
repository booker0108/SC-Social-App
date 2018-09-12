import {observable, action, computed} from 'mobx';

class TodoStore {
    @observable isSwiping = false;
    @observable todoCompleted = {};

    updateCompleted(todoId){
        this.todoCompleted[todoId] = !!!this.todoCompleted[todoId];
    }

    isTodoCompleted(todoId) {
        return !!this.todoCompleted[todoId]
    }
}

export default new TodoStore();