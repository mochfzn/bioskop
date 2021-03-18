import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import '../style.css';
import Navigation from '../../navigation';
import { Div, Button, Confirm, Alert } from '../../../../component';

class Vip extends Component {
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

        console.log(this.state.purchasing);
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
                this.setState({
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
                <Alert>{"Silahkan pilih kursi sebelum simpan."}</Alert>
                <Div class="kursi">
                    <Div class="judul">Denah</Div>
                    <Div class="denah">
                        <Div class="atas">
                            <Div class="col">
                                <Button class="button" value="F1" onClick={event => this.onClickSeatChosen(event)} />
                                <Button class="button" value="E1" onClick={event => this.onClickSeatChosen(event)} />
                            </Div>
                            <Div class="col">
                                <Button class="button" value="D2" onClick={event => this.onClickSeatChosen(event)} />
                                <Button class="button" value="C2" onClick={event => this.onClickSeatChosen(event)} />
                            </Div>
                            <Div class="col">
                                <Button class="button" value="B2" onClick={event => this.onClickSeatChosen(event)} />
                                <Button class="button" value="A2" onClick={event => this.onClickSeatChosen(event)} />
                            </Div>
                        </Div>
                        <Div class="bawah">
                            <Div class="col">
                                <Button class="button" value="D1" onClick={event => this.onClickSeatChosen(event)} />
                                <Button class="button" value="C1" onClick={event => this.onClickSeatChosen(event)} />
                            </Div>
                            <Div class="col">
                                <Button class="button" value="B1" onClick={event => this.onClickSeatChosen(event)} />
                                <Button class="button" value="A1" onClick={event => this.onClickSeatChosen(event)} />
                            </Div>
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
                <Confirm title="Simpan Posisi Duduk!" question="Apakah Anda ingin menyimpan posisi tempat duduk yang dipilih?" changeSaveConfirm={this.changeSaveConfirm} />
            </React.Fragment>
         );
    }
}
 
export default Vip;