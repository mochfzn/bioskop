import React, { Component } from 'react';

import './style.css';
import {Div} from '../../../component';
import Navigation from '../navigation';

class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }

    componentDidMount() {
        document.body.classList.remove("background");
    }

    render() { 
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
                        <Div class="tombol"><i class="fas fa-user-alt"></i></Div>
                        <Div class="tombol"><i class="fas fa-home"></i></Div>
                        <Div class="tombol"><i class="fas fa-film"></i></Div>
                        <Div class="tombol"><i class="fas fa-calendar-alt"></i></Div>
                        <Div class="tombol"><i class="fas fa-edit"></i></Div>
                        <Div class="tombol"><i class="fas fa-sign-out-alt"></i></Div>
                    </Div>
                </Div>
            </React.Fragment>
         );
    }
}
 
export default Dashboard;