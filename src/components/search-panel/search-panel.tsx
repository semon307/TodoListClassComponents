import React, {ChangeEvent} from "react";
import './search-panel.css'
export type SearchPanelPropsType = {
    onSearchChange: (term: string) => void
}
class SearchPanel extends React.Component<SearchPanelPropsType> {
    state = {
        term: ''
    }
    onSearchChange = (e: ChangeEvent<HTMLInputElement>) =>{
        const term = e.currentTarget.value
        this.setState({term})
        this.props.onSearchChange(term)
    }

    render() {

        return (
            <form >
            <input placeholder="type to search" type="text" className="form-control search-input"
        onChange={this.onSearchChange} value={this.state.term}/>
            </form>
        );
    }
}

export default SearchPanel;