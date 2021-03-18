import React, { Component } from 'react';

class TableData extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return ( 
            <td className={this.props.class}>{this.props.children}</td>
         );
    }
}
 
export default TableData;