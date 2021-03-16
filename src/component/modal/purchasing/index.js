import React, { Component } from 'react';
import './style.css';

class Purchasing extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return ( 
            <div id="modal-pesan">
                <div class="notification">
                    <span>Masukkan nama pengguna!</span>
                    <span>&times;</span>
                </div>
                <div class="modal-content">
                    <div class="modal-header">
                        <span id="close" class="close">&times;</span>
                        Beli Tiket
                    </div>
                    <div class="modal-body">
                        <div class="row">
                            <label>Waktu :</label>
                            <select name="tanggal" class="select">
                                <option>Tanggal</option>
                                <option>05-03-2021</option>
                                <option>06-03-2021</option>
                                <option>07-03-2021</option>
                            </select>
                            <select name="jam" class="select">
                                <option>Jam</option>
                                <option>10:00</option>
                                <option>12:00</option>
                                <option>19:00</option>
                            </select>
                        </div>
                        <div class="row">
                            <label>Tipe Ruangan :</label>
                            <div class="radio-group">
                                <input type="radio" id="regular" name="gender" class="radio" value="regular" /><label for="regular">Regular</label>
                                <input type="radio" id="vip" name="gender" class="radio" value="vip" /><label for="vip">VIP</label>
                            </div>
                        </div>
                        <div class="row">
                            <label>Harga :</label>
                            <label>Rp. 50.000,-</label>
                        </div>
                        <div class="row">
                            <label>Jumlah Kursi :</label>
                            <select name="kursi" class="select">
                                <option>Jumlah Kursi</option>
                                <option>1</option>
                                <option>2</option>
                                <option>3</option>
                                <option>4</option>
                                <option>5</option>
                            </select>
                        </div>
                        <div class="total">
                            <label class="judul">Total</label>
                            <div class="jumlah">Rp. 79.000,-</div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <input type="button" id="simpan" name="tombol" class="button" value="Simpan" />
                    </div>
                </div>
            </div>
         );
    }
}
 
export default Purchasing;