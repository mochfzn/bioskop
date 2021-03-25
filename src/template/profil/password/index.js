import React, { Component } from 'react';
import  { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import './style.css';
import { Alert, Password as InputPassword } from '../../../component';
import AdminNavigation from '../../admin/navigation';
import CustomerNavigation from '../../customer/navigation';

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
                hakAkses: ""
            },
            password: {
                old: "",
                fresh: "",
                repeat: ""
            },
            alert: "",
            review: false
         }
    }

    componentDidMount() {
        document.body.classList.remove("background");
        this.getUser();
    }

    getUser = () => {
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

    onChange = (el, attribute) => {
        let password = this.state.password;
        password[attribute] = el.target.value;

        this.setState({
            password
        });
    }

    onClickSubmit = () => {
        const alert = document.getElementById("alert");

        if(this.validation() === true)
        {
            let user = this.state.user;
            user.password = this.state.password.old;

            this.setState({ user });

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
                if(typeof json.errorMessage !== 'undefined')
                {
                    this.setState({alert: json.errorMessage});
                    alert.style.display = "block";
                }
                else if(typeof json.successMessage != 'undefined')
                {
                    this.savePassword();
                }
                else
                {
                    this.setState({alert: "Terjadi kesalahan pada peladen!"});
                    alert.style.display = "block";
                }
            })
            .catch(() => {
                this.setState({alert: "Gagal mengirimkan data!"});
                alert.style.display = "block";
            });
        }
    }

    savePassword = () => {
        const alert = document.getElementById("alert");
        let user = this.state.user;
        user.password = this.state.password.fresh;

        this.setState({ user });

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
                this.setState({alert: json.successMessage});
                alert.style.display = "block";
            }
        })
        .catch(() => {
            this.setState({alert: "Gagal mengirimkan data!"});
            alert.style.display = "block";
        });
    }

    toReview = () => {
        this.setState({
            review: true
        });
    }

    validation = () => {
        const alert = document.getElementById("alert");
        let regPass = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{6,8}$/;

        if(this.state.password.old === "")
        {
            this.setState({alert: "Kata sandi lama tidak boleh kosong!"});
            alert.style.display = "block";
            return false;
        }

        if(this.state.password.fresh === "")
        {
            this.setState({alert: "Kata sandi baru tidak boleh kosong!"});
            alert.style.display = "block";
            return false;
        }

        if(this.state.password.repeat === "")
        {
            this.setState({alert: "Ulang kata sandi tidak boleh kosong!"});
            alert.style.display = "block";
            return false;
        }

        if(regPass.test(this.state.password.fresh) === false)
        {
            this.setState({alert: "Kata sandi antara 6-8 karakter yang terdiri dari huruf besar, huruf kecil, dan angka!"});
            alert.style.display = "block";
            return false;
        }

        if(this.state.password.fresh !== this.state.password.repeat)
        {
            this.setState({alert: "kata sandi harus sama dengan ulang kata sandi!"});
            alert.style.display = "block";
            return false;
        }

        return true;
    }

    render() { 
        const { old, fresh, repeat } = this.state.password;
        let navigation;

        if(this.props.login === false)
        {
            return <Redirect to="/" />
        }

        if(this.state.review === true) 
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
                <div class="ubah-kata-sandi">
                    <div class="judul">Ubah Kata Sandi</div>
                    <div class="row">
                        <label>Kata Sandi Lama :</label>
                        {/* <input type="password" name="kata-sandi-lama" class="input" value={old} placeholder="Kata Sandi Lama" onChange={el => this.onChange(el, "old")} /> */}
                        {/* <span className="fas fa-eye" style={{position: "relative", left: "200px", bottom: "60px"}}></span> */}
                        <InputPassword id="kata-sandi-lama" name="kata-sandi-lama" class="input" value={old} placeholder="Kata Sandi Lama" onChange={el => this.onChange(el, "old")} />
                    </div>
                    <div class="row">
                        <label>Kata Sandi Baru :</label>
                        {/* <input type="password" name="kata-sandi-baru" class="input" value={fresh} placeholder="Kata Sandi Baru" onChange={el => this.onChange(el, "fresh")} /> */}
                        <InputPassword id="kata-sandi-baru" name="kata-sandi-baru" class="input" value={fresh} placeholder="Kata Sandi Baru" onChange={el => this.onChange(el, "fresh")} />
                    </div>
                    <div class="row">
                        <label>Ulang Kata Sandi :</label>
                        {/* <input type="password" name="ulang-kata-sandi" class="input" value={repeat} placeholder="Ulang Kata Sandi"  onChange={el => this.onChange(el, "repeat")} /> */}
                        <InputPassword id="ulang-kata-sandi" name="ulang-kata-sandi" class="input" value={repeat} placeholder="Ulang Kata Sandi"  onChange={el => this.onChange(el, "repeat")} />
                    </div>
                    <div class="tombol">
                        <input type="button" class="button" value="Ubah Kata Sandi" onClick={this.onClickSubmit} />
                        <input type="button" class="button" value="Batal" onClick={this.toReview} />
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
 
export default connect(mapStateToProps)(Password);