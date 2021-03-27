import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import { Alert, Div, Button } from '../../../component';
import './style.css';

class SavePassword extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            user: {
                nama: "",
                alamat: "",
                telepon: "",
                email: "",
                username: "",
                password: "",
                hakAkses: ""
            },
            password: "",
            repeatPassword: "",
            alert: "",
            login: false,
            back: false
         }
    }

    componentDidMount() {
        document.body.classList.add("background");

        this.setState({
            user: {
                nama: this.props.user.nama,
                alamat: this.props.user.alamat,
                telepon: this.props.user.telepon,
                email: this.props.user.email,
                username: this.props.user.username,
                hakAkses: this.props.user.hakAkses,
            }
        });

        if(this.props.success.registration === true)
        {
            const alert = document.getElementById("alert");
            alert.classList.add("success");

            this.setState({ alert: "Registrasi berhasil, silahkan masukkan kata sandi." });
            alert.style.display = "block";

            this.props.setSuccess("registration", false);
        }
    }

    onChange = (el, attribut) => {
        this.setState({
            [attribut]: el.target.value
        });
    }

    onClickSubmit = () => {
        const alert = document.getElementById("alert");
        alert.classList.remove("success");

        if(this.validation() === true)
        {
            let newUser = this.state.user;
            newUser.password = this.state.password;

            this.setState({
                user: newUser
            });

            fetch('http://localhost:8080/bioskop/pengguna/save-password/', {
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
                    this.setState({alert: json.errorMessage});
                    alert.style.display = "block";
                }
                else
                {
                    this.props.setSuccess("savePassword", true);
                    this.toLogin();
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
        let regPass = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{6,8}$/;

        if(this.state.password === "")
        {
            this.setState({alert: "Kata sandi tidak boleh kosong!"});
            alert.style.display = "block";
            return false;
        }

        if(this.state.repeatPassword === "")
        {
            this.setState({alert: "Ulang kata sandi tidak boleh kosong!"});
            alert.style.display = "block";
            return false;
        }

        if(regPass.test(this.state.password) === false)
        {
            this.setState({alert: "Kata sandi antara 6-8 karakter yang terdiri dari huruf besar, huruf kecil, dan angka."});
            alert.style.display = "block";
            return false;
        }

        if(this.state.password !== this.state.repeatPassword)
        {
            this.setState({alert: "kata sandi tidak sama dengan ulang kata sandi!"});
            alert.style.display = "block";
            return false;
        }

        return true;
    }

    toLogin = () => {
        this.setState({
            login: true
        });
    }

    back = () => {
        this.setState({
            back: true
        });
    }
    
    render() { 
        const { password, repeatPassword } = this.state;

        if(this.state.login === true)
        {
            return <Redirect to="/" />
        }
        else if(this.state.back === true)
        {
            return <Redirect to="/" />
        }

        return ( 
            <React.Fragment>
                <Alert>{this.state.alert}</Alert>
                <Div class="simpan-kata-sandi">
                    <span>Simpan Kata Sandi</span>
                    <input type="password" className="input" placeholder="Kata Sandi" value={password} onChange={el => this.onChange(el, "password")} />
                    <input type="password" className="input" placeholder="Ulang Kata Sandi" value={repeatPassword} onChange={el => this.onChange(el, "repeatPassword")} />
                    <Button class="button" value="Simpan" onClick={this.onClickSubmit} />
                    <Button class="button" value="Batal" onClick={this.back} />
                </Div>
            </React.Fragment>
            
         );
    }
}
 
export default SavePassword;