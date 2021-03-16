import React, { Component } from 'react';
import  { Redirect } from 'react-router-dom';

import './style.css';
import Navigation from '../../admin/navigation'
import Alert from '../../../component/alert';

class Password extends Component {
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
                <div class="ubah-kata-sandi">
                    <div class="judul">Ubah Kata Sandi</div>
                    <div class="row">
                        <label>Kata Sandi Lama :</label>
                        <input type="text" name="kata-sandi-lama" class="input" placeholder="Nama Lengkap" />
                    </div>
                    <div class="row">
                        <label>Kata Sandi Baru :</label>
                        <input type="text" name="kata-sandi-baru" class="input" placeholder="No. Telepon/HP" disabled="disabled" />
                    </div>
                    <div class="row">
                        <label>Ulang Kata Sandi :</label>
                        <input type="text" name="ulang-kata-sandi" class="input" placeholder="Email" />
                    </div>
                    <div class="tombol">
                        <input type="button" class="button" value="Ubah Kata Sandi" />
                        <input type="button" class="button" value="Batal" onClick={this.toReview} />
                    </div>
                </div>
            </React.Fragment>
         );
    }
}
 
export default Password;