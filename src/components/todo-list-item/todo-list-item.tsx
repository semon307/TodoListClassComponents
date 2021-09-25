import React from "react";
import './todo-list-item.css'
type TodoListItemPropsType = {
    label: string
    important: boolean
    done: boolean
    onToggleImportant: () => void
    onToggleDone: () => void
    onDeleted: () => void
}


class TodoListItem extends React.Component<TodoListItemPropsType> {
    render() {
        const {label, onDeleted, onToggleImportant, onToggleDone, important, done} = this.props

        let classNames = "todo-list-item d-flex justify-content-between";
        if (done)(
            classNames += " done"
        )
        if (important)(
            classNames += " important"
        )

        return (
            <span className={classNames}>

                <span onClick={onToggleDone} className="todo-list-item-label todo-list-item" >{label}</span>
    <div>
            <button onClick={onToggleImportant} type="button" className="btn btn-outline-success btn-sm float-right">
                <i className="fas fa-exclamation"/>
            </button>
            <button onClick={onDeleted} type="button" className="btn btn-outline-danger btn-sm float-right">
                <i className="fas fa-trash"/>
            </button>
    </div>

        </span>
        )
    }
}

export default TodoListItem;