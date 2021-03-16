import React, { Component } from 'react';
import  { Redirect } from 'react-router-dom';

import './style.css';
import Navigation from '../../admin/navigation'

class Review extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            change: false,
            password: false
         };
    }

    componentDidMount() {
        document.body.classList.remove("background");
    }

    toPageChange = () => {
        this.setState({
            change: true
        });
    }

    toPagePassword = () => {
        this.setState({
            password: true
        });
    }

    render() { 
        if(this.state.change === true) 
        {
            return <Redirect to="/profil/change" />
        } 
        else if(this.state.password === true) 
        {
            return <Redirect to="/profil/password" />
        }

        return ( 
            <React.Fragment>
                <Navigation />
                <div class="lihat-profil">
                    <div class="judul">Profil</div>
                    <div class="row">
                        <label>Nama Lengkap :</label>
                        <input type="text" name="nama" class="input" placeholder="Nama Lengkap" disabled="disabled" />
                    </div>
                    <div class="row">
                        <label>Alamat :</label>
                        <textarea class="textarea" placeholder="Alamat" disabled="disabled"></textarea>
                    </div>
                    <div class="row">
                        <label>No. Telepon/HP :</label>
                        <input type="text" name="nama" class="input" placeholder="No. Telepon/HP" disabled="disabled" />
                    </div>
                    <div class="row">
                        <label>Email :</label>
                        <input type="text" name="nama" class="input" placeholder="Email" disabled="disabled" />
                    </div>
                    <div class="row">
                        <label>Nama Pengguna :</label>
                        <input type="text" name="nama" class="input" placeholder="Nama Pengguna" disabled="disabled" />
                    </div>
                    <div class="tombol">
                        <input type="button" class="button" value="Ubah Profil" onClick={this.toPageChange} />
                        <input type="button" class="button" value="Ubah Kata Sandi" onClick={this.toPagePassword} />
                    </div>
                </div>
            </React.Fragment>
         );
    }
}
 
export default Review;