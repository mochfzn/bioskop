import React, { Component } from 'react';

class Paragraph extends Component {
    state = {  }
    render() { 
        return ( 
            <p>{this.props.children}</p>
         );
    }
}
 
export default Paragraph;