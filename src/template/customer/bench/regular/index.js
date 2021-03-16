import React, { Component } from 'react';
import '../style.css';
import Navigation from '../../navigation';

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
                <div class="kursi">
                    <div class="judul">Denah</div>
                    <div class="denah">
                        <div class="kiri">
                            <input type="button" class="button" value="J5" />
                            <input type="button" class="button" value="I5" />
                            <input type="button" class="button" value="H5" />
                            <input type="button" class="button" value="G5" />
                            <input type="button" class="button" value="F5" />

                            <input type="button" class="button" value="J4" />
                            <input type="button" class="button" value="I4" />
                            <input type="button" class="button" value="H4" />
                            <input type="button" class="button" value="G4" />
                            <input type="button" class="button" value="F4" />

                            <input type="button" class="button" value="J3" />
                            <input type="button" class="button" value="I3" />
                            <input type="button" class="button" value="H3" />
                            <input type="button" class="button" value="G3" />
                            <input type="button" class="button" value="F3" />

                            <input type="button" class="button" value="J2" />
                            <input type="button" class="button" value="I2" />
                            <input type="button" class="button" value="H2" />
                            <input type="button" class="button" value="G2" />
                            <input type="button" class="button" value="F2" />

                            <input type="button" class="button" value="J1" />
                            <input type="button" class="button" value="I1" />
                            <input type="button" class="button" value="H1" />
                            <input type="button" class="button" value="G1" />
                            <input type="button" class="button" value="F1" />
                        </div>
                        <div class="kanan">
                            <input type="button" class="button" value="E5" />
                            <input type="button" class="button" value="D5" />
                            <input type="button" class="button" value="C5" />
                            <input type="button" class="button" value="B5" />
                            <input type="button" class="button" value="A5" />

                            <input type="button" class="button" value="E4" />
                            <input type="button" class="button" value="D4" />
                            <input type="button" class="button" value="C4" />
                            <input type="button" class="button" value="B4" />
                            <input type="button" class="button" value="A4" />

                            <input type="button" class="button" value="E3" />
                            <input type="button" class="button" value="D3" />
                            <input type="button" class="button" value="C3" />
                            <input type="button" class="button" value="B3" />
                            <input type="button" class="button" value="A3" />

                            <input type="button" class="button" value="E2" />
                            <input type="button" class="button" value="D2" />
                            <input type="button" class="button" value="C2" />
                            <input type="button" class="button" value="B2" />
                            <input type="button" class="button" value="A2" />

                            <input type="button" class="button" value="E1" />
                            <input type="button" class="button" value="D1" />
                            <input type="button" class="button" value="C1" />
                            <input type="button" class="button" value="B1" />
                            <input type="button" class="button" value="A1" />
                        </div>
                        <div class="layar">Layar</div>
                        <div class="keterangan">
                            <div class="legend">
                                <div class="kotak-abu"></div><span>Tidak tersedia</span>
                                <div class="kotak-merah"></div><span>Sudah dipesan</span>
                                <div class="kotak-hijau"></div><span>Tersedia</span>
                                <div class="kotak-biru"></div><span>dipilih</span>
                            </div>
                            <span class="hitung">Pilih 5 bangku lagi.</span>
                        </div>
                        <div class="tombol">
                            <input type="button" name="tombol" class="button-batal" value="Batal" />
                            <input type="button" name="tombol" class="button-simpan" value="Simpan" />
                        </div>
                    </div>
                </div>
            </React.Fragment>
         );
    }
}
 
export default Regular;