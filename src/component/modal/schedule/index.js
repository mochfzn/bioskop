import React, { Component } from 'react';

import './style.css';
import { Div } from '../../../component';

class Schedule extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }

    close = () => {
        const modal = document.getElementById("modal");
        modal.style.display = "none";
    }

    render() { 
        return ( 
            <Div id="modal" class="modal" onClick={this.close}>
                <Div class="modal-content">
                    <Div class="modal-header">
                        <span className="close" onClick={this.close}>&times;</span>
                        Jadwal Film
                    </Div>
                    <Div class="modal-body">
                        {this.props.children}
                    </Div>
                    <Div class="modal-footer"></Div>
                </Div>
            </Div>
         );
    }
}
 
export default Schedule;