import React, { Component } from 'react';

import './style.css';
import { Div, TableRow, TableData, Button } from '../../../index';

class Table extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return ( 
            <Div id="table" class="modal-content">
                <Div class="modal-header">
                    <span className="close" onClick={this.props.close}>&times;</span>
                    Jadwal Film
                </Div>
                <Div class="modal-body">
                    <table>
                        <thead>
                            <TableRow>
                                <th>Tanggal</th>
                                <th>Jam</th>
                                <th>Tipe Ruangan</th>
                                <th>Harga</th>
                                <th>Aksi</th>
                            </TableRow>
                        </thead>
                        <tbody>
                            {
                                this.props.schedules.map((value, index) => {
                                    return (
                                        <TableRow key={index}>
                                            <TableData>{value.tanggal}</TableData>
                                            <TableData>{value.jam.substring(0,5)}</TableData>
                                            <TableData>{(value.ruang.jenis === 1) ? "Regular" : "VIP"}</TableData>
                                            <TableData class="right">{"Rp. " + value.ruang.harga.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ".")}</TableData>
                                            <TableData class="center">
                                                <Button class="button" value="Pesan" onClick={() => this.props.saveSchedule(value)} />
                                            </TableData>
                                        </TableRow>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </Div>
                <Div class="modal-footer"></Div>
            </Div>
         );
    }
}
 
export default Table;