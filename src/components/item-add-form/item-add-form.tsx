import React, {ChangeEvent, FormEvent} from 'react';
type ItemAddFormPropsType = {
    onItemAdded: (text: string) => void
}

class ItemAddForm extends React.Component<ItemAddFormPropsType> {
    state = {
        label: ""
    }
    onLabelChange = (e: ChangeEvent<HTMLInputElement>) => {
    this.setState({label: e.target.value})
    }
    onSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        this.props.onItemAdded(this.state.label)
        this.setState({
            label: ""
        })
    }
    onClickSubmit = () => {
        if (this.state.label) {
            this.props.onItemAdded(this.state.label)
        }
        this.setState({
            label: ""
        })
    }

    render() {
        return (
            <form className="item-add-form d-flex" onSubmit={this.onSubmit}>
                <input type="text" className="form-control" onChange={this.onLabelChange} placeholder="What needs to be done"
                value={this.state.label}/>
                <button type="button" className="btn btn-outline-secondary" onClick={this.onClickSubmit}>Add Item</button>
            </form>
        )
    }
}

export default ItemAddForm;