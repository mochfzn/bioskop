import React, { Component } from "react";

class Text extends Component {
    constructor(props) {
        super(props);
        this.state = {  };
    }

    render() {
        return(
            <input type="text" name={this.props.name} className={this.props.class} id={this.props.id} value={this.props.value} defaultValue={this.props.defaultValue} placeholder={this.props.placeholder} onChange={this.props.onChange} disabled={this.props.disabled} />
        );
    }
}

export default Text;