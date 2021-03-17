import React, { Component } from 'react';
import  { Redirect } from 'react-router-dom';

import './style.css';
import Alert from '../../../component/alert';
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
            review: false
         }
    }

    componentDidMount() {
        document.body.classList.remove("background");
        this.setState({user: this.props.user});
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
                    this.setState({alert: "Pengguna " + this.state.user.nama + " berhasil diubah."});
                    alert.style.display = "block";
                    this.getAllData();
                    this.reset();
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

    toReview = () => {
        this.setState({
            review: true
        });
    }

    render() { 
        const { nama, alamat, telepon, email, username } = this.state.user;
        let navigation;

        if(this.state.review === true) 
        {
            return <Redirect to="/profil" />
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
                <Alert>{this.state.alert}</Alert>
                <div class="ubah-profil">
                    <div class="judul">Ubah Profil</div>
                    <div class="row">
                        <label>Nama Lengkap :</label>
                        <input type="text" name="nama" value={nama} class="input" placeholder="Nama Lengkap" onChange={this.onChangeUser} />
                    </div>
                    <div class="row">
                        <label>Alamat :</label>
                        <textarea name="alamat" value={alamat} class="textarea" placeholder="Alamat" onChange={this.onChangeUser}></textarea>
                    </div>
                    <div class="row">
                        <label>No. Telepon/HP :</label>
                        <input type="text" value={telepon} name="telepon" class="input" placeholder="No. Telepon/HP" disabled="disabled" />
                    </div>
                    <div class="row">
                        <label>Email :</label>
                        <input type="text" value={email} name="email" class="input" placeholder="Email" onChange={this.onChangeUser} />
                    </div>
                    <div class="row">
                        <label>Nama Pengguna :</label>
                        <input type="text" value={username} name="username" class="input" placeholder="Nama Pengguna" onChange={this.onChangeUser} />
                    </div>
                    <div class="tombol">
                        <input type="button" class="button" value="Simpan" onClick={this.onClickSubmit} />
                        <input type="button" class="button" value="Batal" onClick={this.toReview} />
                    </div>
                </div>
            </React.Fragment>
         );
    }
}
 
export default Change;