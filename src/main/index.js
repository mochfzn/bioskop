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
                nama: "",
                alamat: "",
                telepon: "",
                email: "",
                username: "",
                hakAkses: 1
            }
         }
    }

    setUser = user => {
        this.setState({
            user
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
                        <Detail />
                    </Route>
                    <Route path="/customer/history">
                        <History />
                    </Route>
                    <Route path="/customer/bench/vip">
                        <Vip />
                    </Route>
                    <Route path="/customer/bench/regular">
                        <Regular />
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
                        <SavePassword user={this.state.user} />
                    </Route>
                    <Route path="/password">
                        <Password user={this.state.user} />
                    </Route>
                    <Route path="/registration">
                        <Registration setUser={this.setUser} />
                    </Route>
                    <Route path="/">
                        <Login setUser={this.setUser} />
                    </Route>
                </Switch>
            </div>
         );
    }
}
 
export default Main;