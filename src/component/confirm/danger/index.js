import React, { Component } from 'react';

import '../style.css';
import { Div, Button } from '../../index';

class Danger extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }

    close = () => {
        const confirm = document.getElementById("confirm-danger");
        confirm.style.display = "none";
    }

    render() { 
        return ( 
            <Div id="confirm-danger" class="confirm">
                <Div class="modal-content">
                    <Div class="container">
                        <h1>{this.props.title}</h1>
                        {this.props.children}
                        <p>{this.props.question}</p>

                        <Div class="clearfix">
                            <Button class="cancelbtn" value="Batal" onClick={this.close} />
                            <Button class="submitbtn danger" value={this.props.confirmName} onClick={this.props.confirm} />
                        </Div>
                    </Div>
                </Div>
            </Div>
         );
    }
}
 
export default Danger;