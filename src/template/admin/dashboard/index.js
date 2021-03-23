import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import './style.css';
import {Div} from '../../../component';
import Navigation from '../navigation';

class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            navigation: ""
         }
    }

    componentDidMount() {
        document.body.classList.remove("background");
    }

    onChangeNavigation = value => {
        this.setState({
            navigation: value
        });
    }

    render() { 
        if(this.props.login === false)
        {
            return <Redirect to="/" />
        }
        else if(this.props.role === 1)
        {
            return <Redirect to="/customer" />
        }

        switch(this.state.navigation)
        {
            case "pengguna":
                return <Redirect to="/admin/master/pengguna" />
            case "ruang":
                return <Redirect to="/admin/master/ruang" />
            case "film":
                return <Redirect to="/admin/master/film" />
            case "jadwal":
                return <Redirect to="/admin/master/jadwal" />
            case "profil":
                return <Redirect to="/profil" />
            case "keluar":
                this.props.changeReduxPersist();
                break;
            default:
                break;
        }

        return ( 
            <React.Fragment>
                <Navigation />
                <Div class="dashboard-admin">
                    <Div class="tanggal">
                        <Div class="logo"><i class='fas fa-calendar'></i></Div>
                        03-03-2021
                    </Div>
                    <Div class="counts">
                        <Div class="count">
                            <Div class="judul">Film Terjadwal</Div>
                            <Div class="isi">7</Div>
                        </Div>
                        <Div class="count">
                            <Div class="judul">Tiket Terjual</Div>
                            <Div class="isi">254</Div>
                        </Div>
                        <Div class="count">
                            <Div class="judul">Pendapatan</Div>
                            <Div class="isi">Rp. 12.000.00,-</Div>
                        </Div>
                    </Div>
                    <Div class="tombol-utama">
                        <Div class="tombol" onClick={() => this.onChangeNavigation("pengguna")}><i class="fas fa-user-alt"></i></Div>
                        <Div class="tombol" onClick={() => this.onChangeNavigation("ruang")}><i class="fas fa-home"></i></Div>
                        <Div class="tombol" onClick={() => this.onChangeNavigation("film")}><i class="fas fa-film"></i></Div>
                        <Div class="tombol" onClick={() => this.onChangeNavigation("jadwal")}><i class="fas fa-calendar-alt"></i></Div>
                        <Div class="tombol" onClick={() => this.onChangeNavigation("profil")}><i class="fas fa-edit"></i></Div>
                        <Div class="tombol" onClick={() => this.onChangeNavigation("keluar")}><i class="fas fa-sign-out-alt"></i></Div>
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

const mapDispatchToProps = dispatch => ({
    changeReduxPersist: () => dispatch({ type: "logout" })
});
 
export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);