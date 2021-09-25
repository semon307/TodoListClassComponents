import React from "react";
import './app-header.css'
export type AppHeaderPropsType = {
    toDo: number
    done: number
}
const AppHeader = ({toDo, done}: AppHeaderPropsType) => {
    return (
    <div className="app-header d-flex">
        <h1>Todo List</h1>
        <h2>{toDo} more to do, {done} done</h2>
    </div>
    );
}
export default AppHeader;