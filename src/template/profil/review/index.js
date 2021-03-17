import React, { Component } from 'react';
import  { Redirect } from 'react-router-dom';

import './style.css';
import AdminNavigation from '../../admin/navigation';
import CustomerNavigation from '../../customer/navigation';

class Review extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            user: {
                nama: "",
                alamat: "",
                telepon: "",
                email: "",
                username: "",
                hakAkses: ""
            },
            change: false,
            password: false
         };
    }

    componentDidMount() {
        document.body.classList.remove("background");
        this.setState({user: this.props.user});
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
        const { nama, alamat, telepon, email, username } = this.state.user;
        let navigation;

        if(this.state.change === true) 
        {
            return <Redirect to="/profil/change" />
        } 
        else if(this.state.password === true) 
        {
            return <Redirect to="/profil/password" />
        }

        if(this.state.user.hakAkses === 0)
        {
            navigation = <AdminNavigation />;
        }
        else if(this.state.user.hakAkses === 1)
        {
            navigation = <CustomerNavigation />;
        }

        return ( 
            <React.Fragment>
                {navigation}
                <div class="lihat-profil">
                    <div class="judul">Profil</div>
                    <div class="row">
                        <label>Nama Lengkap :</label>
                        <input type="text" name="nama" class="input" value={nama} placeholder="Nama Lengkap" disabled="disabled" />
                    </div>
                    <div class="row">
                        <label>Alamat :</label>
                        <textarea name="alamat" class="textarea" value={alamat} placeholder="Alamat" disabled="disabled"></textarea>
                    </div>
                    <div class="row">
                        <label>No. Telepon/HP :</label>
                        <input type="text" name="nama" class="input" value={telepon} placeholder="No. Telepon/HP" disabled="disabled" />
                    </div>
                    <div class="row">
                        <label>Email :</label>
                        <input type="text" name="nama" class="input" value={email} placeholder="Email" disabled="disabled" />
                    </div>
                    <div class="row">
                        <label>Nama Pengguna :</label>
                        <input type="text" name="nama" class="input" value={username} placeholder="Nama Pengguna" disabled="disabled" />
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