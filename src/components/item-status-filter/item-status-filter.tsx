import React from "react";
import './item-status-filter.css'
import {FilterType} from "../app/app";
type ItemStatusFilterPropsType = {
    filter: FilterType
    onFilterChange: (filter: FilterType) => void
}
type ButtonType = {
    name: FilterType
    label: "All" | "Active" | "Done"
}
type ButtonsType = Array<ButtonType>

class ItemStatusFilter extends React.Component<ItemStatusFilterPropsType> {
    buttons: ButtonsType = [
        {name: "all", label: "All"},
        {name: "active", label: "Active"},
        {name: "done", label: "Done"},
    ]
    render() {
        const {filter, onFilterChange} = this.props

        const buttons = this.buttons.map((buttons) => {
           const isActive = filter === buttons.name;
           const clazz = isActive ? "btn-info" : "btn-outline-secondary";
            return (
                <button type="button" key={buttons.name} className={`btn ${clazz}`}
                        onClick={() => onFilterChange(buttons.name)}>
                    {buttons.label}
                </button>
            )
        })
        return (
            <div className="btn-group">
                {buttons}
            </div>
        )
    }
}

export default ItemStatusFilter;