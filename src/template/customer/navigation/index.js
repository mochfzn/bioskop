import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import './style.css';
import logo from '../../../images/cinema-4d.png';
import { Div, Button, ConfirmDanger } from '../../../component';

class Pelanggan extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }

    doLogout = () => {
        this.props.changeReduxPersist();
    }

    showConfirm = () => {
        const confirm = document.getElementById("confirm-danger");
        confirm.style.display = "block";
    }

    render() { 
        return ( 
            <React.Fragment>
                <Div class="navigation">
                    <img src={logo} alt="logo" width="32px" />
                    
                    <Link to="/customer" className="link">Utama</Link>
                    <Link to="/customer/history" className="link">Riwayat</Link>

                    <Div class="profil">
                        <i className="fa fa-user-circle"></i>
                        <Div class="profilbtn">
                            <Link to="/profil">Profil</Link>
                            {/* <Link to="/" onClick={this.doLogout}>Keluar</Link> */}
                            <Button class="button" value="Keluar" onClick={this.showConfirm} />
                        </Div>
                    </Div>
                </Div>
                <ConfirmDanger title="Keluar Aplikasi" question="Apakah Anda yakin ingin keluar?" confirmName="Keluar" confirm={this.doLogout} />
            </React.Fragment>
         );
    }
}

const mapDispatchToProps = dispatch => ({
    changeReduxPersist: () => dispatch({ type: "logout" })
});
 
export default connect(null, mapDispatchToProps)(Pelanggan);