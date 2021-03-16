import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import './style.css';
import logo from '../../../images/cinema-4d.png';

class Pelanggan extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return ( 
            <div class="navigation">
                <img src={logo} alt="logo" width="32px" />
                
                <div class="profil">
                    <i class="fa fa-user-circle"></i>
                    <div class="profilbtn">
                        <Link to="/profil">Profil</Link>
                        <Link to="/customer/history">Riwayat</Link>
                        <Link to="/">Keluar</Link>
                    </div>
                </div>
            </div>
         );
    }
}
 
export default Pelanggan;