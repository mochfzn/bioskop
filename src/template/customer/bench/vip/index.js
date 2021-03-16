import React, { Component } from 'react';
import '../style.css';
import Navigation from '../../navigation';

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
                <div class="kursi">
                    <div class="judul">Denah</div>
                    <div class="denah">
                        <div class="atas">
                            <div class="col">
                                <input type="button" class="button" value="F1" />
                                <input type="button" class="button" value="E1" />
                            </div>
                            <div class="col">
                                <input type="button" class="button" value="D2" />
                                <input type="button" class="button" value="C2" />
                            </div>
                            <div class="col">
                                <input type="button" class="button" value="B2" />
                                <input type="button" class="button" value="A2" />
                            </div>
                        </div>
                        <div class="bawah">
                            <div class="col">
                                <input type="button" class="button" value="D1" />
                                <input type="button" class="button" value="C1" />
                            </div>
                            <div class="col">
                                <input type="button" class="button" value="B1" />
                                <input type="button" class="button" value="A1" />
                            </div>
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
 
export default Vip;