import React, { Component } from 'react';
import  { Redirect, Link } from 'react-router-dom';
import { connect } from 'react-redux';

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
            }
         };
    }

    componentDidMount() {
        document.body.classList.remove("background");
        this.getUserData();
    }

    getUserData = () => {
        //const alert = document.getElementById("alert");

        fetch('http://localhost:8080/bioskop/pengguna/id/' + this.props.idUser, {
            method: "get",
            headers: {
                 "Content-Type": "application/json; ; charset=utf-8",
                 "Access-Control-Allow-Headers": "Authorization, Content-Type",
                 "Access-Control-Allow-Origin": "*"
            }
        })
        .then(response => response.json())
        .then(json => {
            this.setState({user: json});
        })
        .catch((e) => {
            //this.setState({alert: "Gagal mengambil data! ", e});
            //alert.style.display = "block";

            console.log("Error:", e);
        });
    }

    render() { 
        const { nama, alamat, telepon, email, username } = this.state.user;
        let navigation;

        if(this.props.login === false)
        {
            return <Redirect to="/" />
        }

        if(this.props.role === 0)
        {
            navigation = <AdminNavigation />;
        }
        else if(this.props.role === 1)
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
                        <Link to="/profil/change" className="link">Ubah Profil</Link>
                        <Link to="/profil/password" className="link">Ubah Kata Sandi</Link>
                    </div>
                </div>
            </React.Fragment>
         );
    }
}

const mapStateToProps = state => {
    return {
        login: state.login,
        role: state.role,
        idUser: state.user
    }
}
 
export default connect(mapStateToProps)(Review);