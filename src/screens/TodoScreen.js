import React, { Component } from 'react'
import {View, Text, StyleSheet, FlatList} from 'react-native'
import { Color, Font } from '../styles/CommonStyle';
import { inject, observer } from 'mobx-react';
import Swipeable from 'react-native-swipeable';

@inject('userDetailStore', 'todoStore')
@observer
class TodoScreen extends Component {

    static navigationOptions = {
        title: 'Todo'
    }

    render () {
        const {userDetailStore, todoStore} = this.props;
        return (
            <View style={styles.container}>
                <Text style={{textAlign: 'center', color: 'white', padding: 16, textDecorationLine:'underline', fontWeight: 'bold'}}>Swipe from left to right for quick action</Text>
                <FlatList
                    scrollEnabled={!todoStore.isSwiping}
                    data={userDetailStore.todos}
                    extraData={todoStore.todoCompleted}
                    ItemSeparatorComponent={ () => <View style={{height: 1, flex: 1, backgroundColor: Color.bg_color_blue}} />}
                    keyExtractor={item => item.id.toString()}
                    renderItem={this.renderTodoItem} />
            </View>
        )
    }

    renderTodoItem = ({item}) => {
        const {todoStore} = this.props;

        const isCompleted = item.completed || todoStore.isTodoCompleted(item.id)
        return (
            <Swipeable 
                leftContent={this.renderLeftContent(isCompleted)}
                onLeftActionRelease={() => this.onTodoSwipAction(item)}
                onSwipeStart={() => todoStore.startSwipe()}
                onSwipeRelease={() => todoStore.finishSwipe()}>

                <View style={{flex:1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', padding: 24, backgroundColor: '#353335'}}>
                    <Text style={{fontFamily: Font.materialIcons, fontSize: 36, marginRight: 24, color: isCompleted ? '#40BA15' : 'transparent'}}>check_circle</Text>
                    <Text numberOfLines={3} style={{flex: 1, color: 'white', fontSize: 18}}>{item.title}</Text>
                </View>

            </Swipeable>
        )
    }

    renderLeftContent = (isCompleted) => {
        return (
            <View style={{flex: 1, backgroundColor: isCompleted ? '#DD5347':'#40BA15', alignItems: 'flex-end', justifyContent: 'center'}}>
                <Text style={{fontFamily: Font.materialIcons, fontSize: 36, marginRight: 24, color: 'white'}}>{isCompleted? 'close':'check'}</Text>
            </View>
        )
    }

    onTodoSwipAction = (todo) => {
        const {todoStore} = this.props;

        todoStore.updateCompleted(todo.id)
    }
}

export default TodoScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Color.bg_color_blue
    }
})