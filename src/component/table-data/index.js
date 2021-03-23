import React, { Component } from 'react';

class TableData extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return ( 
            <td className={this.props.class} style={this.props.style}>{this.props.children}</td>
         );
    }
}
 
export default TableData;