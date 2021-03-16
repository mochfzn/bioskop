import React, { Component } from 'react';

class Select extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return ( 
            <select id={this.props.id} name={this.props.name} value={this.props.value} onChange={this.props.onChange} className={this.props.class}>
                {this.props.children}
            </select>
         );
    }
}
 
export default Select;