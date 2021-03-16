import React, { Component } from 'react';
import './style.css';
import Navigation from '../navigation';

import kimetsu from '../../../images/demon-slayer-the-movie-mugen-train.jpg';

class Detail extends Component {
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
                <div class="detail-film">
                    <div class="gambar">
                        <img src={kimetsu} alt="demon-slayer-the-movie-mugen-train-kimetsu-no-yaiba-mugen" class="image" />
                        <input type="button" id="button-pesan" class="button" value="Beli Tiket" />
                    </div>
                    <div class="judul">
                        <label>Demon Slayer: Kimetsu no Yaiba the Movie: Mugen Train</label>
                        <span>Semua Umur</span>
                    </div>
                    <div class="deskripsi">
                        <div class="kiri">
                            <div class="field">
                                <i class="far fa-clock"></i> <label>1 Jam 60 Menit</label>
                            </div>
                            <div class="field">
                                <i class="fas fa-language"></i> <label>Inggris</label>
                            </div>
                            <div class="field">
                                <i class="fa fa-comments"></i> <label>Indonesia</label>
                            </div>
                            <div class="field">
                                <i class="fas fa-ticket-alt"></i> <label>Rp. 45.000,-</label>
                            </div>
                            <div class="field">
                                <i class="far fa-gem"></i> <label>Rp. 65.000,-</label>
                            </div>
                        </div>
                        <div class="kanan">
                            <label class="judul">Produksi :</label>
                            <label class="isi">Isi Produksi</label>

                            <label class="judul">Direksi :</label>
                            <label class="isi">Isi Direksi</label>

                            <label class="judul">Genre :</label>
                            <label class="isi">isi Genre</label>

                            <label class="judul">Deskripsi :</label>
                            <p class="isi">
                                Tanjiro, Nezuko, Zenitsu, dan Inosuke naik kereta[N 1] untuk bertemu dengan Flame Hashira Kyōjurō Rengoku dan membantunya dalam misinya untuk berburu iblis yang telah membunuh lebih dari 40 pembunuh iblis di kereta. Segera setelah naik, mereka semua tertidur lelap, dan Enmu, Peringkat Satu Bawah dari Dua Belas Kizuki, menginstruksikan empat penumpang, semuanya menderita insomnia parah, menggunakan tali ajaib untuk memasuki mimpi para pembunuh iblis, dan menghancurkan inti spiritual mereka sehingga mereka tidak akan pernah bisa bangun lagi. Sebagai gantinya, Enmu akan memungkinkan mereka memiliki mimpi damai.

                                Selama tidur mereka, Tanjiro bermimpi untuk bersatu kembali dengan mendiang keluarganya, Zenitsu bermimpi berkencan dengan Nezuko, Inosuke bermimpi melakukan misi eksplorasi goa, dan Kyōjirō bermimpi bertemu dengan saudaranya. Tanjiro menyadari bahwa dia sedang bermimpi dan mencoba untuk bangun, berhasil setelah diperintahkan oleh visi ayahnya untuk bunuh diri di dalam mimpi. Di saat yang sama, Nezuko menggunakan kekuatannya untuk membakar tali, membangunkan penumpang. Karena takut pada Enmu, penumpang menyerang Tanjiro.

                                Sementara Nezuko membangunkan yang lain, Tanjiro menghadapi Enmu, dan akhirnya memenggal kepalanya. Namun, Enmu tidak mati dan mengungkapkan bahwa dia menyatukan kepalanya dengan kereta itu sendiri. Kyōjurō menginstruksikan Inosuke dan Tanjiro untuk mencari leher Enmu saat dia, Nezuko, dan Zenitsu tetap tinggal untuk melindungi penumpang lain. Tanjiro dan Inosuke menemukan tulang leher Enmu di ruang mesin dan Tanjiro memotongnya, membunuhnya dan menghentikan kereta.
                            </p>
                        </div>
                    </div>
                </div>
            </React.Fragment>
         );
    }
}
 
export default Detail;