import React, { Component } from 'react';
import  { Redirect, Link } from 'react-router-dom';
import { connect } from 'react-redux';

import './style.css';
import { Div, Label, Text } from '../../../component';
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
                <Div class="lihat-profil">
                    <Div class="judul">Profil</Div>
                    <Div class="row">
                        <Label>Nama Lengkap :</Label>
                        <Text name="nama" class="input" value={nama} placeholder="Nama Lengkap" disabled="disabled" />
                    </Div>
                    <Div class="row">
                        <Label>Alamat :</Label>
                        <textarea name="alamat" className="textarea" value={alamat} placeholder="Alamat" disabled="disabled"></textarea>
                    </Div>
                    <Div class="row">
                        <Label>No. Telepon/HP :</Label>
                        <Text name="nama" class="input" value={telepon} placeholder="No. Telepon/HP" disabled="disabled" />
                    </Div>
                    <Div class="row">
                        <Label>Email :</Label>
                        <Text name="nama" class="input" value={email} placeholder="Email" disabled="disabled" />
                    </Div>
                    <Div class="row">
                        <Label>Nama Pengguna :</Label>
                        <Text name="nama" class="input" value={username} placeholder="Nama Pengguna" disabled="disabled" />
                    </Div>
                    <Div class="tombol">
                        <Link to="/profil/change" className="link">Ubah Profil</Link>
                        <Link to="/profil/password" className="link">Ubah Kata Sandi</Link>
                    </Div>
                </Div>
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