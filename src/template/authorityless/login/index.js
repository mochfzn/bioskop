import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import './style.css';
import logo from '../../../images/cinema-4d.png';
import {Alert, Button, Div, Text} from '../../../component';

class Login extends Component {
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
                hakAkses: ""
            },
            username: "",
            password: false,
            savePassword: false,
            registration: false,
            alert: ""
         }
    }

    componentDidMount() {
        document.body.classList.add("background");
    }

    toRegistration = () => {
        this.setState({
            registration: true
        });
    }

    doLogin = () => {
        const alert = document.getElementById("alert");

        if(this.validation() === true)
        {
            fetch('http://localhost:8080/bioskop/pengguna/check-username/' + this.state.username, {
                method: "get",
                headers: {
                    "Content-Type": "application/json; ; charset=utf-8",
                    "Access-Control-Allow-Headers": "Authorization, Content-Type",
                    "Access-Control-Allow-Origin": "*"
                }
            })
            .then(response => response.json())
            .then(json => {
                if(typeof json.errorMessage !== 'undefined')
                {
                    if(json.errorMessage === "User with username " + this.state.username + " not found")
                    {
                        this.setState({alert: "Nama pengguna " + this.state.username + " tidak ditemukan!"});
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
                        user: json
                    });
                    
                    this.checkPassword();
                }
            })
            .catch(() => {
                this.setState({alert: "Gagal mengirimkan data!"});
                alert.style.display = "block";
            });
        }
    }

    checkPassword = () => {
        const alert = document.getElementById("alert");

        fetch('http://localhost:8080/bioskop/pengguna/check-password/', {
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
                if(json.successMessage === "true")
                {
                    this.props.setUser(this.state.user);

                    this.setState({
                        password: true
                    });
                }
                else if(json.successMessage === "false")
                {
                    this.props.setUser(this.state.user);

                    this.setState({
                        savePassword: true
                    });
                }
            }
        })
        .catch((e) => {
            this.setState({alert: "Gagal mengirimkan data!!! => " + e});
            alert.style.display = "block";

        });
    }

    onChange = event => {
        this.setState({
            username: event.target.value
        });
    }

    validation = () => {
        const alert = document.getElementById("alert");

        if(this.state.username === "")
        {
            this.setState({alert: "Nama pengguna tidak boleh kosong!"});
            alert.style.display = "block";
            return false;
        }
        
        return true;
    }

    render() { 
        const { username } = this.state;

        if(this.props.role === 0)
        {
            return <Redirect to="/admin" />
        }
        else if(this.props.role === 1)
        {
            return <Redirect to="/customer" />
        }

        if(this.state.password === true)
        {
            return <Redirect to="/password" />
        }
        else if(this.state.savePassword === true)
        {
            return <Redirect to="/save-password" />
        }
        else if(this.state.registration === true)
        {
            return <Redirect to="/registration" />
        }

        return ( 
            <React.Fragment>
                <Alert>{this.state.alert}</Alert>
                <Div class="login">
                    <span>Masuk</span>
                    <img src={logo} alt="logo" width="120px" />
                    <Text class="input" placeholder="Nama Pengguna" value={username} onChange={e => this.onChange(e)} />
                    <Button class="button" value="Masuk" onClick={this.doLogin} />
                    <Button class="button" value="Daftar" onClick={this.toRegistration} />
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
 
export default connect(mapStateToProps)(Login);