import React, { Component } from 'react';

import '../style.css';
import Navigation from '../../navigation';
import { Div, Button } from '../../../../component';

class Vip extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }

    componentDidMount() {
        document.body.classList.remove("background");
    }
    
    render() { 
        return ( 
            <React.Fragment>
                <Navigation />
                <Div class="kursi">
                    <Div class="judul">Denah</Div>
                    <Div class="denah">
                        <Div class="atas">
                            <Div class="col">
                                <Button class="button" value="F1" />
                                <Button class="button" value="E1" />
                            </Div>
                            <Div class="col">
                                <Button class="button" value="D2" />
                                <Button class="button" value="C2" />
                            </Div>
                            <Div class="col">
                                <Button class="button" value="B2" />
                                <Button class="button" value="A2" />
                            </Div>
                        </Div>
                        <Div class="bawah">
                            <Div class="col">
                                <Button class="button" value="D1" />
                                <Button class="button" value="C1" />
                            </Div>
                            <Div class="col">
                                <Button class="button" value="B1" />
                                <Button class="button" value="A1" />
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
                            <span className="hitung">Pilih 5 bangku lagi.</span>
                        </Div>
                        <Div class="tombol">
                            <Button name="tombol" class="button-batal" value="Batal" />
                            <Button name="tombol" class="button-simpan" value="Simpan" />
                        </Div>
                    </Div>
                </Div>
            </React.Fragment>
         );
    }
}
 
export default Vip;