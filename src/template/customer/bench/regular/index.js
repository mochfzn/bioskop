import React, { Component } from 'react';

import '../style.css';
import Navigation from '../../navigation';
import { Div, Button } from '../../../../component';

class Regular extends Component {
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
                        <Div class="kiri">
                            <Button class="button" value="J5" />
                            <Button class="button" value="I5" />
                            <Button class="button" value="H5" />
                            <Button class="button" value="G5" />
                            <Button class="button" value="F5" />

                            <Button class="button" value="J4" />
                            <Button class="button" value="I4" />
                            <Button class="button" value="H4" />
                            <Button class="button" value="G4" />
                            <Button class="button" value="F4" />

                            <Button class="button" value="J3" />
                            <Button class="button" value="I3" />
                            <Button class="button" value="H3" />
                            <Button class="button" value="G3" />
                            <Button class="button" value="F3" />

                            <Button class="button" value="J2" />
                            <Button class="button" value="I2" />
                            <Button class="button" value="H2" />
                            <Button class="button" value="G2" />
                            <Button class="button" value="F2" />

                            <Button class="button" value="J1" />
                            <Button class="button" value="I1" />
                            <Button class="button" value="H1" />
                            <Button class="button" value="G1" />
                            <Button class="button" value="F1" />
                        </Div>
                        <Div class="kanan">
                            <Button class="button" value="E5" />
                            <Button class="button" value="D5" />
                            <Button class="button" value="C5" />
                            <Button class="button" value="B5" />
                            <Button class="button" value="A5" />

                            <Button class="button" value="E4" />
                            <Button class="button" value="D4" />
                            <Button class="button" value="C4" />
                            <Button class="button" value="B4" />
                            <Button class="button" value="A4" />

                            <Button class="button" value="E3" />
                            <Button class="button" value="D3" />
                            <Button class="button" value="C3" />
                            <Button class="button" value="B3" />
                            <Button class="button" value="A3" />

                            <Button class="button" value="E2" />
                            <Button class="button" value="D2" />
                            <Button class="button" value="C2" />
                            <Button class="button" value="B2" />
                            <Button class="button" value="A2" />

                            <Button class="button" value="E1" />
                            <Button class="button" value="D1" />
                            <Button class="button" value="C1" />
                            <Button class="button" value="B1" />
                            <Button class="button" value="A1" />
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
 
export default Regular;