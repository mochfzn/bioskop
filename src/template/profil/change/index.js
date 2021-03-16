import React, { Component } from 'react';
import  { Redirect } from 'react-router-dom';

import './style.css';
import Navigation from '../../admin/navigation'
import Alert from '../../../component/alert';

class Change extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            review: false
         }
    }

    componentDidMount() {
        document.body.classList.remove("background");
    }

    toReview = () => {
        this.setState({
            review: true
        });
    }

    render() { 
        if(this.state.review === true) 
        {
            return <Redirect to="/profil" />
        }

        return ( 
            <React.Fragment>
                <Navigation />
                <Alert />
                <div class="ubah-profil">
                    <div class="judul">Ubah Profil</div>
                    <div class="row">
                        <label>Nama Lengkap :</label>
                        <input type="text" name="nama" class="input" placeholder="Nama Lengkap" />
                    </div>
                    <div class="row">
                        <label>Alamat :</label>
                        <textarea class="textarea" placeholder="Alamat"></textarea>
                    </div>
                    <div class="row">
                        <label>No. Telepon/HP :</label>
                        <input type="text" name="telepon" class="input" placeholder="No. Telepon/HP" disabled="disabled" />
                    </div>
                    <div class="row">
                        <label>Email :</label>
                        <input type="text" name="nama" class="input" placeholder="Email" />
                    </div>
                    <div class="row">
                        <label>Nama Pengguna :</label>
                        <input type="text" name="nama" class="input" placeholder="Nama Pengguna" />
                    </div>
                    <div class="tombol">
                        <input type="button" class="button" value="Simpan" />
                        <input type="button" class="button" value="Batal" onClick={this.toReview} />
                    </div>
                </div>
            </React.Fragment>
         );
    }
}
 
export default Change;