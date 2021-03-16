import React, { Component } from 'react';

import {Div, Button} from '../../index';
import './style.css';

class Detail extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }

    close = () => {
        const modal =  document.getElementById("modal-rincian");
        modal.style.display = "none";
    }

    render() { 
        return ( 
            <Div id="modal-rincian">
                <Div class="modal-content">
                    <Div class="modal-header">
                        <span className="close" id="close" onClick={this.close}>&times;</span>
                        Rincian
                    </Div>
                    <Div class="modal-body">
                        {this.props.children}
                        <Button name="tombol" class="button" value="Tutup" onClick={this.close} />
                    </Div>
                </Div>
                <Div class="kosong"></Div>
            </Div>
         );
    }
}
 
export default Detail;