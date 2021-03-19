import React, { Component } from 'react';

import './style.css';
import { Div, Button, Label, Select, Option } from '../../../index';

class Seat extends Component {
    constructor(props) {
        super(props);
        this.state = {
            restSeats: []
         }
    }

    componentDidMount() {
        this.setState({
            restSeats: this.props.restSeats
        });
    }

    render() { 
        let option = [];
        for(let i = 1; i <= this.state.restSeats; i++)
        {
            option.push(<Option key={i} value={i}>{i} Kursi</Option>); 
        }

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
                            {
                                option.map(value => {
                                    return value;
                                })
                            }
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