import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import { Alert, Div, Text, Button } from '../../../component';
import './style.css';

class Registration extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            user: {
                nama: "",
                alamat: "",
                telepon: "",
                email: "",
                username: "",
                hakAkses: 1
            },
            alert: "",
            savePassword: false,
            back: false
         }
    }

    componentDidMount() {
        document.body.classList.add("background");
    }

    onChangeText = (el, attribut) => {
        let newUser = this.state.user;
        newUser[attribut] = el.target.value;

        this.setState({
            user: newUser
        });
    }

    onClickSubmit = () => {
        const alert = document.getElementById("alert");

        if(this.validation() === true)
        {
            fetch('http://localhost:8080/bioskop/pengguna/', {
                method: "post",
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
                    this.props.setUser(this.state.user);
                    this.toSavePassword();
                }
            })
            .catch(() => {
                this.setState({alert: "Gagal mengirimkan data!"});
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

        if(this.state.user.telepon === "")
        {
            this.setState({alert: "Telepon tidak boleh kosong!"});
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

        if(this.state.user.telepon.length > 14)
        {
            this.setState({alert: "Telepon tidak boleh lebih dari 14 nomor!"});
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

    toSavePassword = () => {
        this.setState({
            savePassword: true
        });
    }

    back = () => {
        this.setState({
            back: true
        })
    }

    render() { 
        const { nama, alamat, telepon, email, username } = this.state.user;

        if(this.state.savePassword === true)
        {
            return <Redirect to="/save-password" />
        }
        else if(this.state.back === true)
        {
            return <Redirect to="/" />
        }

        return ( 
            <React.Fragment>
                <Alert>{this.state.alert}</Alert>
                <Div class="registrasi">
                    <span>Daftar</span>
                    <Text id="name" name="name" class="input" placeholder="Nama Lengkap" value={nama} onChange={el => this.onChangeText(el, "nama")} />
                    <textarea className="textarea" id="address" name="address" placeholder="Alamat" value={alamat} onChange={el => this.onChangeText(el, "alamat")}></textarea>
                    <Text id="telephone" name="telephone" class="input" placeholder="Telp ex: 08xxxxxxxxxxx" value={telepon} onChange={el => this.onChangeText(el, "telepon")} />
                    <Text id="email" name="email" class="input" placeholder="Surel ex: xxx.xxx@xxx.xxx" value={email} onChange={el => this.onChangeText(el, "email")} />
                    <Text id="username" name="username" class="input" placeholder="Nama Pengguna" value={username} onChange={el => this.onChangeText(el, "username")} />
                    <Button id="submit" name="submit" class="button" value="Daftar" onClick={this.onClickSubmit} />
                    <Button id="reset" name="reset" class="button" value="Batal" onClick={this.back} />
                </Div>
            </React.Fragment>
         );
    }
}
 
export default Registration;