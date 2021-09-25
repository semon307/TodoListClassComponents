import React from "react";
import AppHeader from "../app-header/app-header";
import SearchPanel from "../search-panel/search-panel";
import TodoList from "../todo-list/todo-list";
import ItemStatusFilter from "../item-status-filter/item-status-filter";
import './app.css'
import ItemAddForm from "../item-add-form/item-add-form";

const important = "important"
const done = "done"
export type PropNameType = "important" | "done"
export type FilterType = "all" | "active" | "done"
export type TodoItemType = {
    label: string
    important: boolean
    done: boolean
    id: number
}
export type TodoDataType = Array<TodoItemType>
export type StateType = {
    todoData: TodoDataType
    term: "" | "important" | "done"
    filter: FilterType
}

export function saveState<T>(key: string, state: T) {
    const stateAsString = JSON.stringify(state)
    localStorage.setItem(key, stateAsString)
}

export function restoreState<T>(key: string, defaultState: T) {
    let state = defaultState
    const stateAsString = localStorage.getItem(key)
    if (stateAsString !== null) state = JSON.parse(stateAsString) as T
    return state
}

class App extends React.Component {
    maxId: number = 100;

    createToDoItem(label: string) {
        return {
            label,
            [important]: false,
            [done]: false,
            id: this.maxId++
        }
    }

    state: StateType = restoreState<StateType>("current-state", {
        todoData: [
            this.createToDoItem("Drink Coffee"),
            this.createToDoItem("Build React App"),
            this.createToDoItem("Have a lunch"),
        ],
        term: "",
        filter: "all"
    })

    deleteItem = (id: number) => {
        const idx = this.state.todoData.findIndex((el: TodoItemType) => el.id === id);
        this.setState((state) => {

            return {
                todoData: [
                    ...this.state.todoData.slice(0, idx),
                    ...this.state.todoData.slice(idx + 1)]
            }
        })
        saveState<StateType>("current-state", {...this.state, todoData: [...this.state.todoData.slice(0, idx),
                ...this.state.todoData.slice(idx + 1)]})
    }
    addItem = (text: string) => {
        const newItem = this.createToDoItem(text);

        this.setState((state) => {
            const newArray = [...this.state.todoData, newItem];
            return {
                todoData: newArray
            }
        })
        saveState<StateType>("current-state", {...this.state, todoData: [...this.state.todoData, this.createToDoItem(text)]})
    }

    toggleProperty(arr: TodoDataType, id: number, propName: PropNameType) {
        const idx = arr.findIndex((el: TodoItemType) => el.id === id);
        const oldItem = arr[idx];
        const newItem = {...oldItem, [propName]: !oldItem[propName]}
        return [
            ...arr.slice(0, idx),
            newItem,
            ...arr.slice(idx + 1)];
    }

    onToggleImportant = (id: number) => {
        this.setState((state) => {
            return {
                todoData: this.toggleProperty(this.state.todoData, id, "important")
            }
        })
        saveState<StateType>("current-state", {...this.state, todoData: this.toggleProperty(this.state.todoData, id, "important")})
    }
    onToggleDone = (id: number) => {
        this.setState((state) => {
            return {
                todoData: this.toggleProperty(this.state.todoData, id, "done")
            }
        })
        saveState<StateType>("current-state", {...this.state, todoData: this.toggleProperty(this.state.todoData, id, "done")})
    }

    search(items: TodoDataType, term: string) {
        if (term.length === 0) {
            return items
        }
        return items.filter((item: TodoItemType) => {
            return item.label.toLowerCase().indexOf(term) > -1
        })
    }

    onSearchChange = (term: string) => {
        this.setState({term})
    }


    filter(items: TodoDataType, filter: FilterType) {
        switch (filter) {
            case "all":
                return items;
            case "active":
                return items.filter((item: TodoItemType) => !item.done);
            case "done":
                return items.filter((item: TodoItemType) => item.done);
            default:
                return items;
        }
    }

    onFilterChange = (filter: FilterType) => {
        this.setState({filter})
    }

    render() {
        const {todoData, term, filter} = this.state;
        const visibleItems = this.filter(this.search(todoData, term), filter)
        const doneCount = todoData.filter((el) => el.done).length
        const todoCount = todoData.length - doneCount;
        return (
            <div className="todo-app">

                <AppHeader toDo={todoCount} done={doneCount}/>
                <div className="top-panel d-flex">
                    <SearchPanel onSearchChange={this.onSearchChange}/>
                    <ItemStatusFilter filter={filter} onFilterChange={this.onFilterChange}/>
                </div>
                <TodoList todos={visibleItems} onDeleted={this.deleteItem}
                          onToggleImportant={this.onToggleImportant} onToggleDone={this.onToggleDone}/>
                <ItemAddForm onItemAdded={this.addItem}/>

            </div>
        );
    }
}

export default App;