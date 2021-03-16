import React, { Component } from 'react';

class Label extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return ( 
            <label htmlFor={this.props.for} className={this.props.class}>{this.props.children}</label>
        );
    }
}
 
export default Label;