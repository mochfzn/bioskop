import React, { Component } from "react";

class Div extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }

    render() {
        return(
            <div id={this.props.id} className={this.props.class}>{this.props.children}</div>
        );
    }
}

export default Div;