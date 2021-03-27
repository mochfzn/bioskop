import React, { Component } from 'react';
import { Switch, Route } from "react-router-dom";

import { Login, Registration, Password, SavePassword } from '../template/authorityless';
import { Dashboard as DashboardAdmin, Laporan, Film, Jadwal, Pengguna, Ruang } from '../template/admin';
import { Regular, Vip, Dashboard as DashboardCustomer, Detail, History } from '../template/customer';
import { Change, Password as ProfilPassword, Review } from '../template/profil';


class Main extends Component {
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
                hakAkses: 1
            },
            schedule: {
                id: "",
                tanggal: "",
                jam: "",
                ruang: {
                    id: "",
                    nama: "",
                    jenis: "",
                    harga: ""
                }, 
                film: {
                    id: "",
                    judul: "",
                    produser: "",
                    direktur: "",
                    sensor: "",
                    bahasa: "",
                    judulTambahan: "",
                    durasi: "",
                    genre: [],
                    deskripsi: ""
                }
            },
            purchasingBySchedule: [],
            seatAmount: "",
            benchChoice: [],
            success: {
                registration: false,
                savePassword: false
            }
        }
    }

    setUser = user => {
        this.setState({
            user
        });
    }

    setSchedule = schedule => {
        this.setState({
            schedule
        });
    }

    setSeat = amount => {
        this.setState({
            seatAmount: amount
        });
    }

    setBenchChoice = array => {
        this.setState({
            benchChoice: array
        });
    }

    setSuccess = (attribute, value) => {
        let success = this.state.success;
        success[attribute] = value;

        this.setState({
            success
        });
    }

    render() { 
        return ( 
            <div className="container">
                <Switch>
                    <Route path="/profil/password">
                        <ProfilPassword user={this.state.user} />
                    </Route>
                    <Route path="/profil/change">
                        <Change user={this.state.user} />
                    </Route>
                    <Route path="/profil">
                        <Review user={this.state.user} />
                    </Route>
                    <Route path="/customer/detail/:id">
                        <Detail schedule={this.state.schedule} seatAmount={this.state.seatAmount} setSchedule={this.setSchedule} setSeat={this.setSeat} setBenchChoice={this.setBenchChoice} />
                    </Route>
                    <Route path="/customer/history">
                        <History />
                    </Route>
                    <Route path="/customer/bench/vip">
                        <Vip seatAmount={this.state.seatAmount} schedule={this.state.schedule} user={this.state.user} benchChoice={this.state.benchChoice} setSeat={this.setSeat} />
                    </Route>
                    <Route path="/customer/bench/regular">
                        <Regular seatAmount={this.state.seatAmount} schedule={this.state.schedule} user={this.state.user} benchChoice={this.state.benchChoice} setSeat={this.setSeat} />
                    </Route>
                    <Route path="/customer">
                        <DashboardCustomer />
                    </Route>
                    <Route path="/admin/master/ruang">
                        <Ruang />
                    </Route>
                    <Route path="/admin/master/pengguna">
                        <Pengguna />
                    </Route>
                    <Route path="/admin/master/jadwal">
                        <Jadwal />
                    </Route>
                    <Route path="/admin/master/film">
                        <Film />
                    </Route>
                    <Route path="/admin/laporan">
                        <Laporan />
                    </Route>
                    <Route path="/admin">
                        <DashboardAdmin />
                    </Route>
                    <Route path="/save-password">
                        <SavePassword user={this.state.user} success={this.state.success} setSuccess={this.setSuccess} />
                    </Route>
                    <Route path="/password">
                        <Password user={this.state.user} />
                    </Route>
                    <Route path="/registration">
                        <Registration setUser={this.setUser} setSuccess={this.setSuccess} />
                    </Route>
                    <Route path="/">
                        <Login setUser={this.setUser} success={this.state.success} setSuccess={this.setSuccess} />
                    </Route>
                </Switch>
            </div>
         );
    }
}
 
export default Main;