import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import '../style.css';
import Navigation from '../../navigation';
import { Div, Button, ConfirmSubmit, Alert } from '../../../../component';

class Regular extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            purchasing: {
                jumlahTiket: "",
                total: "",
                jadwal: {},
                pengguna: {},
                tempatDuduk: []
            },
            seatAmount: "",
            pesan: "",
            alert: "",
            back: false,
            finish: false
         }
    }

    componentDidMount() {
        document.body.classList.remove("background");

        let pesan = "Pilih " + this.props.seatAmount + " bangku.";
        this.setState({
            seatAmount: this.props.seatAmount,
            pesan: pesan
        });

        this.determineBenchBooked();
    }

    determineBenchBooked = () => {
        let buttons = document.getElementsByClassName("button");

        for(let button of buttons)
        {
            this.props.benchChoice.forEach(value => {
                if(value === button.value)
                {
                    button.classList.add("merah");
                    button.classList.add("blocked");
                }
            })
        }
    }

    onClickSeatChosen = event => {
        let pesan;
        let amount;
        let cek;
        
        cek = this.props.benchChoice.findIndex(e => {
            return e === event.target.value
        });

        if(cek === -1)
        {
            if(event.target.classList.contains("biru"))
            {
                event.target.classList.remove("biru");
                this.removeNotAllowedButton();

                amount = Number(this.state.seatAmount);
                amount = amount + 1;

                if(amount !== Number(this.props.seatAmount))
                {
                    pesan = "Pilih " + amount + " bangku lagi.";
                }
                else if(amount === Number(this.props.seatAmount))
                {
                    pesan = "Pilih " + amount + " bangku.";
                }

                this.setState({
                    seatAmount: amount,
                    pesan: pesan
                });
            }
            else
            {
                if( this.state.seatAmount !== 0)
                {
                    event.target.classList.add("biru");

                    amount = Number(this.state.seatAmount);
                    amount = amount - 1;
        
                    if(amount !== 0)
                    {
                        pesan = "Pilih " + amount + " bangku lagi.";
                    }
                    else
                    {
                        pesan = "";
                        this.addNotAllowedButton();
                    }
        
                    this.setState({
                        seatAmount: amount,
                        pesan: pesan
                    });
                }
            }
        }
    }

    onClickSubmit = () => {
        if(this.state.seatAmount !== 0)
        {
            const alert = document.getElementById("alert");
            this.setState({ alert: "Silahkan pilih kursi sebelum simpan." });
            alert.style.display = "block";
        }
        else
        {
            const confirm = document.getElementById("confirm-submit");
            confirm.style.display = "block";
        }   
    }

    onClickBack = () => {
        this.props.setSeat("");

        this.setState({
            back: true
        });

        this.props.setSeat("");
    }

    addNotAllowedButton = () => {
        let buttons = document.getElementsByClassName("button");
        for(let button of buttons)
        {
            if(button.classList.contains("biru") === false)
            {
                button.classList.add("blocked");
            }
        }
    }

    removeNotAllowedButton = () => {
        let buttons = document.getElementsByClassName("button");

        for(let button of buttons)
        {
            if(!button.classList.contains("merah"))
                button.classList.remove("blocked");
        }
    }

    changeSaveConfirm = () => {
        let buttonsSelected;
        let purchasingNew;
        let seatObject;

        buttonsSelected = document.getElementsByClassName("biru");
        purchasingNew = this.state.purchasing;

        purchasingNew.jumlahTiket = this.props.seatAmount;
        purchasingNew.jadwal = this.props.schedule;
        purchasingNew.pengguna = this.props.user;

        for(let button of buttonsSelected)
        {
            seatObject = {
                posisi: button.value
            };

            purchasingNew.tempatDuduk.push(seatObject);
        }

        purchasingNew.total = this.props.seatAmount * this.props.schedule.ruang.harga;

        this.setState({
            purchasing: purchasingNew
        });

        this.save();
    }

    save = () => {
        const alert = document.getElementById("alert");

        fetch('http://localhost:8080/bioskop/pembelian/', {
            method: "post",
            headers: {
                "Content-Type": "application/json; ; charset=utf-8",
                "Access-Control-Allow-Headers": "Authorization, Content-Type",
                "Access-Control-Allow-Origin": "*"
            },
            body: JSON.stringify(this.state.purchasing)
        })
        .then(response => response.json())
        .then(json => {
            if(typeof json.errorMessage !== 'undefined')
            {
                this.setState({alert: json.errorMessage});
                alert.style.display = "block";
            }
            else
            {
                this.props.setSeat("");
                this.props.setSuccess("buyTicket", true);

                this.setState({
                    purchasing: {},
                    finish: true
                });
            }
        })
        .catch((e) => {
            this.setState({alert: "Gagal mengirimkan data! " + e});
            alert.style.display = "block";
        });
    }
    
    render() {
        if(this.props.login === false)
        {
            return <Redirect to="/" />
        }
        else if(this.props.role === 0)
        {
            return <Redirect to="/admin" />
        }

        if(this.state.back === true)
        {
            return <Redirect to={"/customer/detail/" + this.props.schedule.film.id} />
        }
        else if(this.state.finish === true)
        {
            return <Redirect to="/customer" />
        }

        return ( 
            <React.Fragment>
                <Navigation />
                <Alert>{this.state.alert}</Alert>
                <Div class="kursi">
                    <Div class="judul">Denah</Div>
                    <Div class="denah">
                        <Div class="kiri">
                            <Button class="button" value="J5" onClick={event => this.onClickSeatChosen(event)} />
                            <Button class="button" value="I5" onClick={event => this.onClickSeatChosen(event)} />
                            <Button class="button" value="H5" onClick={event => this.onClickSeatChosen(event)} />
                            <Button class="button" value="G5" onClick={event => this.onClickSeatChosen(event)} />
                            <Button class="button" value="F5" onClick={event => this.onClickSeatChosen(event)} />

                            <Button class="button" value="J4" onClick={event => this.onClickSeatChosen(event)} />
                            <Button class="button" value="I4" onClick={event => this.onClickSeatChosen(event)} />
                            <Button class="button" value="H4" onClick={event => this.onClickSeatChosen(event)} />
                            <Button class="button" value="G4" onClick={event => this.onClickSeatChosen(event)} />
                            <Button class="button" value="F4" onClick={event => this.onClickSeatChosen(event)} />

                            <Button class="button" value="J3" onClick={event => this.onClickSeatChosen(event)} />
                            <Button class="button" value="I3" onClick={event => this.onClickSeatChosen(event)} />
                            <Button class="button" value="H3" onClick={event => this.onClickSeatChosen(event)} />
                            <Button class="button" value="G3" onClick={event => this.onClickSeatChosen(event)} />
                            <Button class="button" value="F3" onClick={event => this.onClickSeatChosen(event)} />

                            <Button class="button" value="J2" onClick={event => this.onClickSeatChosen(event)} />
                            <Button class="button" value="I2" onClick={event => this.onClickSeatChosen(event)} />
                            <Button class="button" value="H2" onClick={event => this.onClickSeatChosen(event)} />
                            <Button class="button" value="G2" onClick={event => this.onClickSeatChosen(event)} />
                            <Button class="button" value="F2" onClick={event => this.onClickSeatChosen(event)} />

                            <Button class="button" value="J1" onClick={event => this.onClickSeatChosen(event)} />
                            <Button class="button" value="I1" onClick={event => this.onClickSeatChosen(event)} />
                            <Button class="button" value="H1" onClick={event => this.onClickSeatChosen(event)} />
                            <Button class="button" value="G1" onClick={event => this.onClickSeatChosen(event)} />
                            <Button class="button" value="F1" onClick={event => this.onClickSeatChosen(event)} />
                        </Div>
                        <Div class="kanan">
                            <Button class="button" value="E5" onClick={event => this.onClickSeatChosen(event)} />
                            <Button class="button" value="D5" onClick={event => this.onClickSeatChosen(event)} />
                            <Button class="button" value="C5" onClick={event => this.onClickSeatChosen(event)} />
                            <Button class="button" value="B5" onClick={event => this.onClickSeatChosen(event)} />
                            <Button class="button" value="A5" onClick={event => this.onClickSeatChosen(event)} />

                            <Button class="button" value="E4" onClick={event => this.onClickSeatChosen(event)} />
                            <Button class="button" value="D4" onClick={event => this.onClickSeatChosen(event)} />
                            <Button class="button" value="C4" onClick={event => this.onClickSeatChosen(event)} />
                            <Button class="button" value="B4" onClick={event => this.onClickSeatChosen(event)} />
                            <Button class="button" value="A4" onClick={event => this.onClickSeatChosen(event)} />

                            <Button class="button" value="E3" onClick={event => this.onClickSeatChosen(event)} />
                            <Button class="button" value="D3" onClick={event => this.onClickSeatChosen(event)} />
                            <Button class="button" value="C3" onClick={event => this.onClickSeatChosen(event)} />
                            <Button class="button" value="B3" onClick={event => this.onClickSeatChosen(event)} />
                            <Button class="button" value="A3" onClick={event => this.onClickSeatChosen(event)} />

                            <Button class="button" value="E2" onClick={event => this.onClickSeatChosen(event)} />
                            <Button class="button" value="D2" onClick={event => this.onClickSeatChosen(event)} />
                            <Button class="button" value="C2" onClick={event => this.onClickSeatChosen(event)} />
                            <Button class="button" value="B2" onClick={event => this.onClickSeatChosen(event)} />
                            <Button class="button" value="A2" onClick={event => this.onClickSeatChosen(event)} />

                            <Button class="button" value="E1" onClick={event => this.onClickSeatChosen(event)} />
                            <Button class="button" value="D1" onClick={event => this.onClickSeatChosen(event)} />
                            <Button class="button" value="C1" onClick={event => this.onClickSeatChosen(event)} />
                            <Button class="button" value="B1" onClick={event => this.onClickSeatChosen(event)} />
                            <Button class="button" value="A1" onClick={event => this.onClickSeatChosen(event)} />
                        </Div>
                        <Div class="layar">Layar</Div>
                        <Div class="keterangan">
                            <Div class="legend">
                                {/* <Div class="kotak-abu"></Div><span>Tidak tersedia</span> */}
                                <Div class="kotak-merah"></Div><span>Sudah dipesan</span>
                                <Div class="kotak-hijau"></Div><span>Tersedia</span>
                                <Div class="kotak-biru"></Div><span>dipilih</span>
                            </Div>
                            <span className="hitung">{this.state.pesan}</span>
                        </Div>
                        <Div class="tombol">
                            <Button name="tombol" class="button-batal" value="Kembali" onClick={this.onClickBack} />
                            <Button name="tombol" class="button-simpan" value="Simpan" onClick={this.onClickSubmit} />
                        </Div>
                    </Div>
                </Div>
                <ConfirmSubmit title="Simpan Posisi Duduk!" question="Apakah Anda ingin menyimpan posisi tempat duduk yang dipilih?" confirmName="Simpan" confirm={this.changeSaveConfirm} />
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
 
export default connect(mapStateToProps)(Regular);