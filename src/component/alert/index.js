import React, { Component } from 'react';

import {Div} from '../index';
import './style.css';

class Alert extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            //success: false
         }
    }

    // static getDerivedStateFromProps(props, state) {
    //     return {success: props.success}
    // }

    // componentDidMount() {
    //     const alert = document.getElementById("alert");

    //     if(alert.style.display === "block")
    //     {
    //         setTimeout(() => {
    //             this.close();
    //         }, 3000);
    //     }

    //     console.log("Masuk component did mount");
    // }

    componentDidUpdate() {
        const alert = document.getElementById("alert");

        if(alert.style.display === "block")
        {
            setTimeout(() => {
                this.close();
            }, 3000);
        }
    }

    close = () => {
        const alert = document.getElementById("alert");
        alert.style.display = "none";
    }

    render() { 
        return ( 
            <Div id="alert" class="notification">
                <span>{this.props.children}</span>
                <span className="fa fa-times" onClick={this.close}></span>
            </Div> 
         );
    }
}
 
export default Alert;