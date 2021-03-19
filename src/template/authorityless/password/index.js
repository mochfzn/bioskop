import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import {Alert, Div, Button, Label} from '../../../component';
import './style.css';

class Password extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            user: {
                id: "",
                nama: "",
                alamat: "",
                telepon: "",
                email: "",
                username: "",
                password: "",
                hakAkses: ""
            },
            password: "",
            pelanggan: false,
            admin: false,
            back: false
         }
    }

    componentDidMount() {
        document.body.classList.add("background");
        this.setState({
            user: {
                id: this.props.user.id,
                nama: this.props.user.nama,
                alamat: this.props.user.alamat,
                telepon: this.props.user.telepon,
                email: this.props.user.email,
                username: this.props.user.username,
                hakAkses: this.props.user.hakAkses,
            }
        });
    }

    doLogin = () => {
        const alert = document.getElementById("alert");

        if(this.validation() === true)
        {
            let newUser = this.state.user;
            newUser.password = this.state.password;

            this.setState({
                user: newUser
            });

            fetch('http://localhost:8080/bioskop/pengguna/login/', {
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
                if(json.successMessage === "true")
                {
                    this.props.changeReduxPersist(this.state.user.hakAkses, this.state.user.id);

                    if(this.state.user.hakAkses === 1)
                    {
                        this.setState({
                            pelanggan: true
                        });
                    }
                    else if(this.state.user.hakAkses === 0)
                    {
                        this.setState({
                            admin: true
                        });
                    }
                }
                else if(json.successMessage === "false")
                {
                    this.setState({alert: "Kata sandi salah!"});
                    alert.style.display = "block";
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

        if(this.state.password === "")
        {
            this.setState({alert: "Kata sandi tidak boleh kosong!"});
            alert.style.display = "block";
            return false;
        }

        return true;
    }

    onChange = event => {
        this.setState({
            password: event.target.value
        });
    }

    back = () => {
        this.setState({
            back: true
        });
    }
    
    render() { 
        const { password } = this.state;

        if(this.state.admin === true)
        {
            return <Redirect to="/admin" />
        }
        else if(this.state.pelanggan === true)
        {
            return <Redirect to="/customer" />
        }
        else if(this.state.back === true)
        {
            return <Redirect to="/" />
        }

        return ( 
            <React.Fragment>
                <Alert>{this.state.alert}</Alert>
                <Div class="login-password">
                    <span>Kata Sandi</span>
                    <i className="fa fa-user-circle"></i>
                    <Label>{this.props.user.username}</Label>
                    <input type="password" id="password" name="password" className="input" placeholder="Kata Sandi" value={password} onChange={el => this.onChange(el)} />
                    <Button class="button" value="Masuk" onClick={this.doLogin} />
                    <Button class="button" value="Kembali" onClick={this.back} />
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

const mapDispatchToProps = dispatch => ({
    changeReduxPersist: (role, idUser) => dispatch({ type: "login", role: role, idUser: idUser })
})
 
export default connect(mapStateToProps, mapDispatchToProps)(Password);