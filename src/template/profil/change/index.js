import React, { Component } from 'react';
import  { Redirect, Link } from 'react-router-dom';
import { connect } from 'react-redux';

import './style.css';
import { Div, Label, Text, Alert, Button } from '../../../component';
import AdminNavigation from '../../admin/navigation';
import CustomerNavigation from '../../customer/navigation';

class Change extends Component {
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
            alert: "",
            toReview: false
         }
    }

    componentDidMount() {
        document.body.classList.remove("background");
        this.getUserData();
    }

    getUserData = () => {
        const alert = document.getElementById("alert");

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
            this.setState({alert: "Gagal mengambil data! ", e});
            alert.style.display = "block";
        });
    }

    onChangeUser = el => {
        let newUser = this.state.user;
        newUser[el.target.name] = el.target.value;

        this.setState({
            user: newUser
        });
    }

    onClickSubmit = () => {
        const alert = document.getElementById("alert");

        if(this.validation() === true)
        {
            fetch('http://localhost:8080/bioskop/pengguna/', {
                method: "put",
                headers: {
                    "Content-Type": "application/json; ; charset=utf-8",
                    "Access-Control-Allow-Headers": "Authorization, Content-Type",
                    "Access-Control-Allow-Origin": "*"
                },
                body: JSON.stringify(this.state.user)
            })
            .then(response => response.json())
            .then(json => {
                if(typeof json.errorMessage !== 'undefined')
                {
                    if(json.errorMessage === "Duplicate entry '" + this.state.user.telepon + "' for key 'telepon'")
                    {
                        this.setState({alert: "Telepon sudah tersedia!"});
                    }
                    else if(json.errorMessage === "Duplicate entry '" + this.state.user.email + "' for key 'email'")
                    {
                        this.setState({alert: "Email sudah tersedia!"});
                    }
                    else if(json.errorMessage === "Duplicate entry '" + this.state.user.username + "' for key 'username'")
                    {
                        this.setState({alert: "Nama pengguna sudah tersedia!"});
                    }
                    else
                    {
                        this.setState({alert: json.errorMessage});
                    }
                    alert.style.display = "block";
                }
                else
                {
                    this.setState({
                        toReview: true
                    });
                }
            })
            .catch((e) => {
                this.setState({alert: "Gagal mengirimkan data! " + e});
                alert.style.display = "block";
            });
        }
    }

    validation = () => {
        const alert = document.getElementById("alert");
        let regEmail = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
        let regUname = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
        let regPhone = /^(^08)(\d{3,4}-?){2}\d{3,4}$/;

        if(this.state.user.nama === "")
        {
            this.setState({alert: "Nama lengkap tidak boleh kosong!"});
            alert.style.display = "block";
            return false;
        }

        if(this.state.user.username === "")
        {
            this.setState({alert: "Nama pengguna tidak boleh kosong!"});
            alert.style.display = "block";
            return false;
        }

        if(this.state.user.alamat === "")
        {
            this.setState({alert: "Alamat tidak boleh kosong!"});
            alert.style.display = "block";
            return false;
        }

        if(this.state.user.nama.length > 50)
        {
            this.setState({alert: "Nama lengkap tidak boleh lebih dari 50 karakter!"});
            alert.style.display = "block";
            return false;
        }

        if(this.state.user.username.length > 50)
        {
            this.setState({alert: "Nama pengguna tidak boleh lebih dari 50 karakter!"});
            alert.style.display = "block";
            return false;
        }

        if(this.state.user.email !== "")
        {
            if(this.state.user.email.length > 100)
            {
                this.setState({alert: "Telepon tidak boleh lebih dari 14 nomor!"});
                alert.style.display = "block";
                return false;
            }

            if(regEmail.test(this.state.user.email) === false)
            {
                this.setState({alert: "Format email salah. Contoh (xxx.xxx@xxx.xxx)."});
                alert.style.display = "block";
                return false;
            }
        }
        
        if(regPhone.test(this.state.user.telepon) === false)
        {
            this.setState({alert: "Format telepon salah. Contoh (08xxxxxxxxxxx)."});
            alert.style.display = "block";
            return false;
        }

        if(regUname.test(this.state.user.username) === false)
        {
            this.setState({alert: "Nama pengguna minimal 6 karakter yang terdiri dari huruf besar, huruf kecil, dan angka."});
            alert.style.display = "block";
            return false;
        }

        return true;
    }

    render() { 
        const { nama, alamat, telepon, email, username } = this.state.user;
        let navigation;

        if(this.props.login === false)
        {
            return <Redirect to="/" />
        }

        if(this.state.toReview === true)
        {
            return <Redirect to="/profil" />
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
                <Alert>{this.state.alert}</Alert>
                <Div class="ubah-profil">
                    <Div class="judul">Ubah Profil</Div>
                    <Div class="row">
                        <Label>Nama Lengkap :</Label>
                        <Text name="nama" value={nama} class="input" placeholder="Nama Lengkap" onChange={this.onChangeUser} />
                    </Div>
                    <Div class="row">
                        <Label>Alamat :</Label>
                        <textarea name="alamat" value={alamat} className="textarea" placeholder="Alamat" onChange={this.onChangeUser}></textarea>
                    </Div>
                    <Div class="row">
                        <Label>No. Telepon/HP :</Label>
                        <Text value={telepon} name="telepon" class="input" placeholder="No. Telepon/HP" disabled="disabled" />
                    </Div>
                    <Div class="row">
                        <Label>Email :</Label>
                        <Text value={email} name="email" class="input" placeholder="Email" onChange={this.onChangeUser} />
                    </Div>
                    <Div class="row">
                        <Label>Nama Pengguna :</Label>
                        <Text value={username} name="username" class="input" placeholder="Nama Pengguna" onChange={this.onChangeUser} />
                    </Div>
                    <Div class="tombol">
                        <Button class="button" value="Simpan" onClick={this.onClickSubmit} />
                        <Link to="/profil" className="link">Batal</Link>
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
 
export default connect(mapStateToProps)(Change);