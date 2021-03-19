import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import './style.css';
import { Table, Alert, Div, Text, Button, TableRow, TableData } from '../../../../component';
import Navigation from '../../navigation';

class Pengguna extends Component {
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
                hakAkses: 0
            },
            data: [],
            alert: "",
            search: ""
         }
        this.tableHeader = ["Nama Lengkap", "No Telp/HP", "Email", "Nama Pengguna", "Alamat", "Hak Akses", "Aksi"];
        this.searchOption = ["Nama Lengkap", "Nama Pengguna", "No Telp/HP"];
        this.valueSubmit = "Simpan";
        this.valueSelect = "";
    }

    componentDidMount() {
        document.body.classList.remove("background");
        this.getAllData();
    }

    getAllData = () => {
        const alert = document.getElementById("alert");

        fetch('http://localhost:8080/bioskop/pengguna/', {
            method: "get",
            headers: {
                 "Content-Type": "application/json; ; charset=utf-8",
                 "Access-Control-Allow-Headers": "Authorization, Content-Type",
                 "Access-Control-Allow-Origin": "*"
            }
        })
        .then(response => response.json())
        .then(json => {
            this.setState({ data: json })
        })
        .catch((e) => {
            this.setState({alert: "Gagal mengambil data! ", e});
            alert.style.display = "block";
        });
    }

    onChangeText = (el, attribut) => {
        let newUser = this.state.user;
        newUser[attribut] = el.target.value;

        this.setState({
            user: newUser
        });
    }

    onChangeSelect = el => {
        this.valueSelect = el.target.value;
    }

    onClickSubmit = () => {
        if(this.valueSubmit === "Simpan")
        {
            this.save();
        }
        else if(this.valueSubmit === "Ubah")
        {
            this.update();
        }
    }

    onClickUpdate = objek => {
        this.valueSubmit = "Ubah";

        const newUser = objek;
        this.setState({
            user: newUser
        });
    }

    onChangeSearch = el => {
        const value = el.target.value;
        this.setState({search: value});

        if((this.valueSelect === "") || (value === ""))
        {
            this.getAllData();
        }
        else if(this.valueSelect === "Nama Lengkap")
        {
            this.searchByName(value);
        }
        else if(this.valueSelect === "Nama Pengguna")
        {
            this.searchByUsername(value);
        }
        else if(this.valueSelect === "No Telp/HP")
        {
            this.searchByTelephone(value);
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

    save = () => {
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
                    this.setState({alert: "Pengguna " + this.state.user.nama + " berhasil disimpan."});
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

    update = () => {
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

    reset = () => {
        this.valueSubmit = "Simpan";

        const newUser = {
            id: "",
            nama: "",
            alamat: "",
            telepon: "",
            email: "",
            username: "",
            hakAkses: 0
        };

        this.setState({
            user: newUser
        });
    }

    searchByName = value => {
        const alert = document.getElementById("alert");
        
        if(value === "") 
        {
            value = "&nbsp;";
        }

        fetch('http://localhost:8080/bioskop/pengguna/nama/' + value, {
            method: "get",
            headers: {
                 "Content-Type": "application/json; ; charset=utf-8",
                 "Access-Control-Allow-Headers": "Authorization, Content-Type",
                 "Access-Control-Allow-Origin": "*"
            }
        })
        .then(response => response.json())
        .then(json => {
            this.setState({ data: json })
        })
        .catch((e) => {
            this.setState({alert: "Gagal mengambil data! ", e});
            alert.style.display = "block";
        });
    }

    searchByUsername = value => {
        const alert = document.getElementById("alert");

        if(value === "") 
        {
            value = "&nbsp;";
        }

        fetch('http://localhost:8080/bioskop/pengguna/username/' + value, {
            method: "get",
            headers: {
                 "Content-Type": "application/json; ; charset=utf-8",
                 "Access-Control-Allow-Headers": "Authorization, Content-Type",
                 "Access-Control-Allow-Origin": "*"
            }
        })
        .then(response => response.json())
        .then(json => {
            this.setState({ data: json })
        })
        .catch((e) => {
            this.setState({alert: "Gagal mengambil data! ", e});
            alert.style.display = "block";
        });
    }

    searchByTelephone = value => {
        const alert = document.getElementById("alert");

        if(value === "") 
        {
            value = "&nbsp;";
        }

        fetch('http://localhost:8080/bioskop/pengguna/telepon/' + value, {
            method: "get",
            headers: {
                 "Content-Type": "application/json; ; charset=utf-8",
                 "Access-Control-Allow-Headers": "Authorization, Content-Type",
                 "Access-Control-Allow-Origin": "*"
            }
        })
        .then(response => response.json())
        .then(json => {
            this.setState({ data: json })
        })
        .catch((e) => {
            this.setState({alert: "Gagal mengambil data! ", e});
            alert.style.display = "block";
        });
    }
    
    render() { 
        const {nama, telepon, email, username, alamat} = this.state.user;

        if(this.props.login === false)
        {
            return <Redirect to="/" />
        }
        else if(this.props.role === 1)
        {
            return <Redirect to="/customer" />
        }
        
        return ( 
            <React.Fragment>
                <Navigation />
                <Alert>{this.state.alert}</Alert>
                <Div class="pengguna">
                    <Div class="judul">
                        Master Jadwal
                    </Div>
                    <Div class="form">
                        <Text id="nama" name="nama" class="input" placeholder="Nama Lengkap" value={nama} onChange={el => this.onChangeText(el, "nama")} />
                        <Text id="telepon" name="telepon" class="input" placeholder="Telp ex: 08xxxxxxxxxxx" value={telepon} onChange={el => this.onChangeText(el, "telepon")} />
                        <Text id="email" name="email" class="input" placeholder="Surel ex: xxx.xxx@xxx.xxx" value={email} onChange={el => this.onChangeText(el, "email")} />
                        <Text id="username" name="username" class="input" placeholder="Nama Pengguna" value={username} onChange={el => this.onChangeText(el, "username")} />
                        <textarea id="alamat" name="alamat" class="textarea" placeholder="Alamat" value={alamat} onChange={el => this.onChangeText(el, "alamat")}></textarea>
                    </Div>
                    <Div class="tombol">
                        <Button id="reset" name="reset" class="button-batal" value="Batal" onClick={this.reset} />
                        <Button id="submit" name="submit" class="button-simpan" value={this.valueSubmit} onClick={this.onClickSubmit} />
                    </Div>
                </Div>
                <Table tableHeader={this.tableHeader} searchOption={this.searchOption} searchText={this.state.search} onChangeSelect={this.onChangeSelect} onChangeSearch={this.onChangeSearch}>
                    {
                        this.state.data.map((value, index) => {
                            return (
                                <TableRow key={index}>
                                    <TableData>{value.nama}</TableData>
                                    <TableData>{value.telepon}</TableData>
                                    <TableData>{value.email}</TableData>
                                    <TableData>{value.username}</TableData>
                                    <TableData>{value.alamat}</TableData>
                                    <TableData>{(value.hakAkses === 1) ? "Pelanggan" : "Admin"}</TableData>
                                    <TableData>
                                        {
                                            (value.hakAkses === 1) ? <Button id="update" name="update" class="button" value="Ubah" onClick={() => this.onClickUpdate(value)} /> : ""
                                        }
                                    </TableData>
                                </TableRow>
                            )
                        })
                    }
                </Table>
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

 
export default connect(mapStateToProps)(Pengguna);