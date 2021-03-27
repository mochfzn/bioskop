import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import './style.css';
import { Div, Tanggal, Alert } from '../../../component';
import Navigation from '../navigation';

class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            countFilm: 0,
            countTicket: 0,
            income: 0,
            date: "",
            navigation: "",
            alert: ""
         }
    }

    componentDidMount() {
        document.body.classList.remove("background");
        this.init();
    }

    init = () => {
        let date = new Date();
        let hari = date.getDate();
        let bulan = date.getMonth() + 1;
        let tahun = date.getFullYear();

        if(bulan < 10)
            bulan = '0' + bulan.toString();
        if(hari < 10)
            hari = '0' + hari.toString();

        let dateSearch = hari + "-" + bulan + "-" + tahun;
        let dateView = tahun + "-" + bulan + "-" + hari;
        this.getFilmScheduled(dateSearch);
        this.ticketSold(dateSearch);
        this.setState({
            date: dateView
        });
    }

    getFilmScheduled = date => {
        const alert = document.getElementById("alert");

        fetch('http://localhost:8080/bioskop/jadwal/tanggal/' + date, {
            method: "get",
            headers: {
                 "Content-Type": "application/json; ; charset=utf-8",
                 "Access-Control-Allow-Headers": "Authorization, Content-Type",
                 "Access-Control-Allow-Origin": "*"
            }
        })
        .then(response => response.json())
        .then(json => {
            this.countFilm(json);
        })
        .catch((e) => {
            this.setState({alert: "Gagal mengambil data! ", e});
            alert.style.display = "block";
        });
    }

    ticketSold = date => {
        const alert = document.getElementById("alert");

        fetch('http://localhost:8080/bioskop/pembelian/tanggal/' + date, {
            method: "get",
            headers: {
                 "Content-Type": "application/json; ; charset=utf-8",
                 "Access-Control-Allow-Headers": "Authorization, Content-Type",
                 "Access-Control-Allow-Origin": "*"
            }
        })
        .then(response => response.json())
        .then(json => {
            this.setState({
                countTicket: json.length
            });

            this.countIncome(json);
        })
        .catch((e) => {
            this.setState({alert: "Gagal mengambil data! ", e});
            alert.style.display = "block";
        });
    }

    countFilm = data => {
        let film = [];

        data.forEach(value => {
            if(film.indexOf(value.film.id) === -1)
            {
                film.push(value.film.id);
            }
        });

        this.setState({
            countFilm: film.length
        });
    }

    countIncome = data => {
        let count = 0;

        data.forEach(value => {
            count = count + value.total;
        });
        this.setState({
            income: count 
        });
    }

    onChangeNavigation = value => {
        this.setState({
            navigation: value
        });
    }

    onChangeDate = el => {
        this.setState({
            date: el.target.value
        });

        let date = new Date(el.target.value);
        let hari = date.getDate();
        let bulan = date.getMonth() + 1;
        let tahun = date.getFullYear();

        if(bulan < 10)
            bulan = '0' + bulan.toString();
        if(hari < 10)
            hari = '0' + hari.toString();

        let dateSearch = hari + "-" + bulan + "-" + tahun;
        this.getFilmScheduled(dateSearch);
        this.ticketSold(dateSearch);
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
                <Alert>{this.state.alert}</Alert>
                <Div class="dashboard-admin">
                    <Tanggal name="nama" class="input" id="tanggal" placeholder="Tanggal" value={this.state.date} onChange={this.onChangeDate} max={"max"} />
                    <Div class="counts">
                        <Div class="count">
                            <Div class="judul">Film Terjadwal</Div>
                            <Div class="isi">{this.state.countFilm}</Div>
                        </Div>
                        <Div class="count">
                            <Div class="judul">Tiket Terjual</Div>
                            <Div class="isi">{this.state.countTicket}</Div>
                        </Div>
                        <Div class="count">
                            <Div class="judul">Pendapatan</Div>
                            <Div class="isi">Rp. {this.state.income.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ".")} ,-</Div>
                        </Div>
                    </Div>
                    <Div class="tombol-utama">
                        <Div class="tombol" onClick={() => this.onChangeNavigation("pengguna")}>
                            <i className="fas fa-user-alt"></i>
                            <Div class="tooltiptext">
                                Master Pengguna
                            </Div>
                        </Div>
                        <Div class="tombol" onClick={() => this.onChangeNavigation("ruang")}>
                            <i className="fas fa-home"></i>
                            <Div class="tooltiptext">
                                Master Ruang
                            </Div>
                        </Div>
                        <Div class="tombol" onClick={() => this.onChangeNavigation("film")}>
                            <i className="fas fa-film"></i>
                            <Div class="tooltiptext">
                                Master Film
                            </Div>
                        </Div>
                        <Div class="tombol" onClick={() => this.onChangeNavigation("jadwal")}>
                            <i className="fas fa-calendar-alt"></i>
                            <Div class="tooltiptext">
                                Master Jadwal
                            </Div>
                        </Div>
                        <Div class="tombol" onClick={() => this.onChangeNavigation("profil")}>
                            <i className="fas fa-edit"></i>
                            <Div class="tooltiptext">
                                Profil
                            </Div>
                        </Div>
                        <Div class="tombol" onClick={() => this.onChangeNavigation("keluar")}>
                            <i className="fas fa-sign-out-alt"></i>
                            <Div class="tooltiptext">
                                Keluar
                            </Div>
                        </Div>
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