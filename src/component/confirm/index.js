import React, { Component } from 'react';

import { Div, Button } from '../index';
import './style.css';

class Confirm extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }

    close = () => {
        const confirm = document.getElementById("confirm");
        confirm.style.display = "none";
    }

    render() { 
        return ( 
            <Div id="confirm" class="confirm">
                <Div class="modal-content">
                    <Div class="container">
                        <h1>{this.props.title}</h1>
                        {this.props.children}
                        <p>{this.props.question}</p>

                        <Div class="clearfix">
                            <Button class="cancelbtn" value="Batal" onClick={this.close} />
                            <Button class="submitbtn" value="Simpan" onClick={this.props.changeSaveConfirm} />
                        </Div>
                    </Div>
                </Div>
            </Div>
         );
    }
}
 
export default Confirm;