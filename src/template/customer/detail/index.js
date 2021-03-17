import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import './style.css';
import Navigation from '../navigation';
import Gambar from '../../../images';
import { Div, Label, Button, ModalSchedule, Alert } from '../../../component';

class Detail extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            film: {
                id: "",
                judul: "",
                produser: "",
                direktur: "",
                sensor: "",
                bahasa: "",
                judulTambahan: "",
                durasi: "",
                genre: [],
                deskripsi: ""
            },
            schedules: [],
            alert: "",
            image: "",
            sensor: "",
            genre: ""
         }
    }

    componentDidMount() {
        document.body.classList.remove("background");
        let id = this.props.match.params.id;

        this.getFilm(id);
        this.getSchedules(id);
    }

    getFilm = id => {
        const alert = document.getElementById("alert");

        fetch('http://localhost:8080/bioskop/film/find/id/' + id, {
            method: "get",
            headers: {
                 "Content-Type": "application/json; ; charset=utf-8",
                 "Access-Control-Allow-Headers": "Authorization, Content-Type",
                 "Access-Control-Allow-Origin": "*"
            }
        })
        .then(response => response.json())
        .then(json => {
            this.setState({film: json});
        })
        .then(() => {
            let image = this.getImage(this.state.film.judul);
            let sensor = this.readSensor(this.state.film.sensor);
            let genre = this.readGenre(this.state.film.genre);

            this.setState({
                image, 
                sensor,
                genre
            });
        })
        .catch((e) => {
            this.setState({alert: "Gagal mengambil data! ", e});
            alert.style.display = "block";
        });
    }

    getSchedules = id => {
        const alert = document.getElementById("alert");

        fetch('http://localhost:8080/bioskop/jadwal/find/film/' + id, {
            method: "get",
            headers: {
                 "Content-Type": "application/json; ; charset=utf-8",
                 "Access-Control-Allow-Headers": "Authorization, Content-Type",
                 "Access-Control-Allow-Origin": "*"
            }
        })
        .then(response => response.json())
        .then(json => {
            this.setState({ schedules: json })
        })
        .catch((e) => {
            this.setState({alert: "Gagal mengambil data! ", e});
            alert.style.display = "block";
        });
    }

    showSchedules = () => {
        const modal = document.getElementById("modal");
        modal.style.display = "block";
    }

    getImage = title => {
        let imageObject;

        if(typeof title !== 'object')
        {
            imageObject = Gambar.find(value => {
                return value.title === title;
            });
    
            return imageObject.image;
        }
        
        return "";
    }

    readSensor = sensor => {
        let readSensor;
        switch(sensor)
        {
            case 1:
                readSensor = "Semua Umur";
                break;
            case 2: 
                readSensor = "13 tahun keatas";
                break;
            case 3:
                readSensor = "17 tahun keatas";
                break;
            default:
                readSensor = "-";
                break;
        }

        return readSensor;
    }

    readGenre = genre => {
        let readGenre = "";

        genre.forEach(value => {
            if(value === genre[0])
            {
                readGenre += value;
            }
            else
            {
                readGenre += ", ";
                readGenre += value;
            }
        });

        return readGenre;
    }
    
    render() { 
        const { judul, produser, direktur, bahasa, judulTambahan, durasi, deskripsi } = this.state.film;

        return ( 
            <React.Fragment>
                <Navigation />
                <Alert>{this.state.alert}</Alert>
                <Div class="detail-film">
                    <Div class="gambar">
                        <img src={this.state.image} alt={judul} className="image" />
                        <Button id="button-pesan" class="button" value="Lihat Jadwal" onClick={this.showSchedules} />
                    </Div>
                    <Div class="judul">
                        <Label>{judul}</Label>
                        <span>{this.state.sensor}</span>
                    </Div>
                    <Div class="keterangan">
                        <Div class="kiri">
                            <Div class="field">
                                <i class="far fa-clock"></i> <Label>{durasi}</Label>
                            </Div>
                            <Div class="field">
                                <i class="fas fa-language"></i> <Label>{bahasa}</Label>
                            </Div>
                            <Div class="field">
                                <i class="fa fa-comments"></i> <Label>{judulTambahan}</Label>
                            </Div>
                        </Div>
                        <Div class="kanan">
                            <Div class="field">
                                <Label class="judul">Produser :</Label> <Label>{produser}</Label>
                            </Div>
                            <Div class="field">
                                <Label class="judul">Direktur :</Label> <Label>{direktur}</Label>
                            </Div>
                            <Div class="field">
                                <Label class="judul">Genre :</Label> <Label>{this.state.genre}</Label>
                            </Div>
                        </Div>
                        <Div class="deskripsi">
                            <Label>Deskripsi :</Label>
                            <p>
                                {deskripsi}
                            </p>
                        </Div>
                        
                    </Div>
                </Div>
                <ModalSchedule>
                    <table>
                        <thead>
                            <tr>
                                <th>Tanggal</th>
                                <th>Jam</th>
                                <th>Tipe Ruangan</th>
                                <th>Harga</th>
                                <th>Aksi</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.schedules.map((value, index) => {
                                    return (
                                        <tr key={index}>
                                            <td>{value.tanggal}</td>
                                            <td>{value.jam.substring(0,5)}</td>
                                            <td>{(value.ruang.jenis === 1) ? "Regular" : "VIP"}</td>
                                            <td className="right">{"Rp. " + value.ruang.harga.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ".")}</td>
                                            <td className="center">
                                                <input type="button" class="button" value="Pesan" />
                                            </td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </ModalSchedule>
            </React.Fragment>
         );
    }
}
 
export default withRouter(Detail);