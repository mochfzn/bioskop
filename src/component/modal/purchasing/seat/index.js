import React, { Component } from 'react';

import './style.css';
import { Div, Button, Label, Select, Option } from '../../../index';

class Seat extends Component {
    constructor(props) {
        super(props);
        this.state = { }
    }

    render() { 
        return ( 
            <Div id="seat" class="modal-content">
                <Div class="modal-header">
                    <span className="close" onClick={this.props.close}>&times;</span>
                    Beli Tiket
                </Div>
                <Div class="modal-body">
                    <Div class="row">
                        <Label>Jumlah Kursi :</Label>
                        <Select name="kursi" class="select" value={this.props.seatAmount} onChange={this.props.onChangeSeatAmount}>
                            <Option value="" disabled="disabled">Jumlah Kursi</Option>
                            <Option value="1">1 Kursi</Option>
                            <Option value="2">2 Kursi</Option>
                            <Option value="3">3 Kursi</Option>
                            <Option value="4">4 Kursi</Option>
                            <Option value="5">5 Kursi</Option>
                        </Select>
                        <span id="notification">Jumlah kursi tidak boleh kosong!</span>
                    </Div>
                    <Div id="total" class="total">
                        <Label class="judul">Total</Label>
                        <Div class="jumlah">{"Rp. " + this.props.total.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ".")}</Div>
                    </Div>
                </Div>
                <Div class="modal-footer">
                    <Button name="tombol" class="button" value="Kembali" onClick={this.props.backToSchedule} />
                    <Button name="tombol" class="button" value="Simpan" onClick={this.props.onClickSaveSeat} />
                </Div>
            </Div>
         );
    }
}
 
export default Seat;