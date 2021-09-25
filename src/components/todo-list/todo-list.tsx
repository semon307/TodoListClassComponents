import React from "react";
import TodoListItem from "../todo-list-item/todo-list-item";
import './todo-list.css'
import {TodoDataType, TodoItemType} from "../app/app";
export type TodoListType = {
    todos: TodoDataType
    onToggleImportant: (id: number) => void
    onToggleDone: (id: number) => void
    onDeleted: (id: number) => void
}
const TodoList = (props: TodoListType) => {
    const elements = props.todos.map((item: TodoItemType) =>{
            //деструткурируем item так, что свойство id становится переменной id,
        // а остальная часть объекта становится объектом propsItems
        const { id, ...propsItems } = item;
        return (
            <div key={id} className="list-group-item">
                <TodoListItem {...propsItems} onDeleted={() => props.onDeleted(id)}
                onToggleImportant={() => props.onToggleImportant(id)} onToggleDone={() => props.onToggleDone(id)}/>
            </div>
        )
    })
    return (
        <div className="list-group todo-list">
            {elements}
        </div>
    )
}
export default TodoList;