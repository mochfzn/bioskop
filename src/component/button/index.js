import React, { Component } from 'react';

class Button extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return ( 
            <input type="button" id={this.props.id} name={this.props.name} className={this.props.class} value={this.props.value} onClick={this.props.onClick} />
         );
    }
}
 
export default Button;