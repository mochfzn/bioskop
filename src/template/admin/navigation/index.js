import React, { Component } from 'react';
import { Link } from "react-router-dom";

import {Div} from '../../../component';
import logo from '../../../images/cinema-4d.png';
import './style.css';

class Navigation extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return ( 
            <Div class="navigation">
                <img src={logo} alt="logo" width="32px" />

                <Link to="/admin/dashboard" className="link">Utama</Link>

                <Div class="dropdown">
                    <button className="dropbtn">Master
                        <i className="fa fa-caret-down"></i>
                    </button>
                    <Div class="dropdown-content">
                        <Link to="/admin/master/pengguna">Pengguna</Link>
                        <Link to="/admin/master/ruang">Ruang</Link>
                        <Link to="/admin/master/film">Film</Link>
                        <Link to="/admin/master/jadwal">Jadwal</Link>
                    </Div>
                </Div>

                <Link to="/admin/laporan" className="link">Laporan</Link>
                
                <Div class="profil">
                    <i className="fa fa-user-circle"></i>
                    <Div class="profilbtn">
                        <Link to="/profil" className="link">Profil</Link>
                        <Link to="/" className="link">Keluar</Link>
                    </Div>
                </Div>
            </Div>
         );
    }
}
 
export default Navigation;