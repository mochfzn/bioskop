import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import './style.css';
import logo from '../../../images/cinema-4d.png';
import { Div } from '../../../component';

class Pelanggan extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }

    doLogout = () => {
        this.props.changeReduxPersist();
    }

    render() { 
        return ( 
            <Div class="navigation">
                <img src={logo} alt="logo" width="32px" />
                
                <Link to="/customer" className="link">Utama</Link>
                <Link to="/customer/history" className="link">Riwayat</Link>

                <Div class="profil">
                    <i className="fa fa-user-circle"></i>
                    <Div class="profilbtn">
                        <Link to="/profil">Profil</Link>
                        <Link to="/" onClick={this.doLogout}>Keluar</Link>
                    </Div>
                </Div>
            </Div>
         );
    }
}

const mapDispatchToProps = dispatch => ({
    changeReduxPersist: () => dispatch({ type: "logout" })
});
 
export default connect(null, mapDispatchToProps)(Pelanggan);