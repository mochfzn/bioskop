import React, { Component } from 'react';
import './style.css';

class Password extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }

    onMouseDownEye = () => {
        document.getElementById(this.props.id + "-eye").className = "visible-eye fas fa-eye-slash";
        document.getElementById(this.props.id).type = "text";
    }

    onMouseUpEye = () => {
        document.getElementById(this.props.id + "-eye").className = "visible-eye fas fa-eye";
        document.getElementById(this.props.id).type = "password";
    }

    render() { 
        return ( 
            <React.Fragment>
                <input type="password" id={this.props.id} name={this.props.name} className={this.props.class} placeholder={this.props.placeholder} value={this.props.value} onChange={this.props.onChange} />
                <span id={this.props.id + "-eye"} className="visible-eye fas fa-eye" onMouseDown={this.onMouseDownEye} onMouseUp={this.onMouseUpEye} />
            </React.Fragment>
         );
    }
}
 
export default Password;