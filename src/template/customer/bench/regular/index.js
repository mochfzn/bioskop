import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import '../style.css';
import Navigation from '../../navigation';
import { Div, Button, Confirm, Alert } from '../../../../component';

class Regular extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            purchasing: {
                jumlahTiket: "",
                total: "",
                jadwal: {},
                pengguna: {},
                posisi: []
            },
            seatAmount: "",
            pesan: "",
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
    }

    onClickSeatChosen = event => {
        let pesan;
        let amount;

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

    onClickSubmit = () => {
        if(this.state.seatAmount !== 0)
        {
            const alert = document.getElementById("alert");
            alert.style.display = "block";
        }
        else
        {
            const confirm = document.getElementById("confirm");
            confirm.style.display = "block";
        }   
    }

    onClickBack = () => {
        this.setState({
            back: true
        });
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
            button.classList.remove("blocked");
        }
    }

    changeSaveConfirm = () => {

    }
    
    render() {
        if(this.state.back === true)
        {
            return <Redirect to={"/customer/detail/" + this.props.schedule.film.id} />
        }

        return ( 
            <React.Fragment>
                <Navigation />
                <Alert>{"Silahkan pilih kursi sebelum simpan."}</Alert>
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
                                <Div class="kotak-abu"></Div><span>Tidak tersedia</span>
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
                <Confirm title="Simpan Posisi Duduk!" question="Apakah Anda ingin menyimpan posisi tempat duduk yang dipilih?" />
            </React.Fragment>
         );
    }
}
 
export default Regular;