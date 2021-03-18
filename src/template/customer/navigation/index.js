import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import './style.css';
import logo from '../../../images/cinema-4d.png';
import { Div } from '../../../component';

class Pelanggan extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return ( 
            <Div class="navigation">
                <img src={logo} alt="logo" width="32px" />
                
                <Div class="profil">
                    <i className="fa fa-user-circle"></i>
                    <Div class="profilbtn">
                        <Link to="/profil">Profil</Link>
                        <Link to="/customer/history">Riwayat</Link>
                        <Link to="/">Keluar</Link>
                    </Div>
                </Div>
            </Div>
         );
    }
}
 
export default Pelanggan;