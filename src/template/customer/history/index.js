import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import './style.css';
import Navigation from '../navigation';
import { Table, TableRow, TableData, Alert, Button, ModalDetail, Div, Label, Paragraph } from '../../../component';
import GambarFilm from '../../../images';

class History extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            data: [],
            modal: {
                id: "",
                jumlahTiket: "",
                total: "",
                tanggal: "",
                jadwal: {
                    id: "",
                    tanggal: "",
                    jam: "",
                    ruang: {
                        id: "",
                        nama: "",
                        jenis: "",
                        harga: ""
                    },
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
                    }
                },
                pengguna: {
                    id: "",
                    nama: "",
                    telepon: "",
                    email: "",
                    username: "",
                    password: "",
                    hakAkses: "",
                    alamat: ""
                },
                tempatDuduk: []
            },
            alert: "",
            search: "",
            image: "",
            showButtonSearch: false
         }
        this.tableHeader = ["Kode Tiket", "Film", "Tanggal", "Tipe", "Jumlah Tiket", "Aksi"];
        this.searchOption = ["Kode Tiket", "Film", "Tanggal"];
    }

    componentDidMount() {
        document.body.classList.remove("background");
        this.getTransaction();
    }

    getTransaction = () => {
        const alert = document.getElementById("alert");

        fetch('http://localhost:8080/bioskop/pembelian/pengguna/' + this.props.idUser, {
            method: "get",
            headers: {
                 "Content-Type": "application/json; ; charset=utf-8",
                 "Access-Control-Allow-Headers": "Authorization, Content-Type",
                 "Access-Control-Allow-Origin": "*"
            }
        })
        .then(response => response.json())
        .then(json => {
            this.setState({ data: json })
        })
        .catch((e) => {
            this.setState({alert: "Gagal mengambil data! ", e});
            alert.style.display = "block";
        });
    }

    onChangeSelect = el => {
        this.valueSelect = el.target.value;

        if(this.valueSelect === "Tanggal")
        {
            this.setState({showButtonSearch: true});
        }
        else
        {
            this.setState({showButtonSearch: false});
        }
    }

    onChangeSearch = el => {
        const value = el.target.value;
        this.setState({search: value});

        if((this.valueSelect === "") || (value === ""))
        {
            this.getTransaction();
        }
        else if(this.valueSelect === "Kode Tiket")
        {
            this.searchById(value);
        }
        else if(this.valueSelect === "Film")
        {
            this.searchByFilm(value);
        }
    }

    onClickDetail = object => {
        // variable
        let image;

        // modal
        const modal = document.getElementById("modal-rincian");
        modal.style.display = "block";

        // logic
        image = this.getImage(object.jadwal.film.judul);

        this.setState({ 
            modal: object,
            image: image
        });
    }

    onClickSearch = () => {
        const alert = document.getElementById("alert");

        if(this.state.search === "") 
        {
            this.setState({search: "&nbsp;"});
        }

        fetch('http://localhost:8080/bioskop/pembelian/tanggal/' + this.state.search + "/customer/" + this.props.idUser, {
            method: "get",
            headers: {
                 "Content-Type": "application/json; ; charset=utf-8",
                 "Access-Control-Allow-Headers": "Authorization, Content-Type",
                 "Access-Control-Allow-Origin": "*"
            }
        })
        .then(response => response.json())
        .then(json => {
            this.setState({ data: json })
        })
        .catch((e) => {
            this.setState({alert: "Gagal mengambil data! ", e});
            alert.style.display = "block";
        });
    }

    getImage = judul => {
        let imageObject;

        imageObject = GambarFilm.find(value => {
            return value.title === judul;
        });

        return imageObject.image;
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

    searchById = value => {
        const alert = document.getElementById("alert");

        if(value === "") 
        {
            value = "&nbsp;";
        }

        fetch('http://localhost:8080/bioskop/pembelian/id/' + value + "/customer/" + this.props.idUser, {
            method: "get",
            headers: {
                 "Content-Type": "application/json; ; charset=utf-8",
                 "Access-Control-Allow-Headers": "Authorization, Content-Type",
                 "Access-Control-Allow-Origin": "*"
            }
        })
        .then(response => response.json())
        .then(json => {
            this.setState({ data: json })
        })
        .catch((e) => {
            this.setState({alert: "Gagal mengambil data! ", e});
            alert.style.display = "block";
        });
    }

    searchByFilm = value => {
        const alert = document.getElementById("alert");

        if(value === "") 
        {
            value = "&nbsp;";
        }

        fetch('http://localhost:8080/bioskop/pembelian/film/' + value + "/customer/" + this.props.idUser, {
            method: "get",
            headers: {
                 "Content-Type": "application/json; ; charset=utf-8",
                 "Access-Control-Allow-Headers": "Authorization, Content-Type",
                 "Access-Control-Allow-Origin": "*"
            }
        })
        .then(response => response.json())
        .then(json => {
            this.setState({ data: json })
        })
        .catch((e) => {
            this.setState({alert: "Gagal mengambil data! ", e});
            alert.style.display = "block";
        });
    }
    
    render() { 
        if(this.props.login === false)
        {
            return <Redirect to="/" />
        }
        else if(this.props.role === 0)
        {
            return <Redirect to="/admin" />
        }
        
        return ( 
            <React.Fragment>
                <Navigation />
                <Alert>{this.state.alert}</Alert>
                <Table tableHeader={this.tableHeader} searchOption={this.searchOption} searchText={this.state.search} onChangeSelect={this.onChangeSelect}
                 onChangeSearch={this.onChangeSearch} showButton={this.state.showButtonSearch} onClickSearch={this.onClickSearch}>
                    {
                        this.state.data.map((value, index) => {
                            return (
                                <TableRow key={index}>
                                    <TableData>{value.id}</TableData>
                                    <TableData>{value.jadwal.film.judul}</TableData>
                                    <TableData>{value.tanggal}</TableData>
                                    <TableData>{(value.jadwal.ruang.jenis === 1) ? "Regular" : "VIP"}</TableData>
                                    <TableData>{value.tempatDuduk.length + " buah"}</TableData>
                                    <TableData class="center">
                                        <Button id="rincian" name="rincian" class="button" value="Rincian" onClick={() => this.onClickDetail(value)} />
                                    </TableData>
                                </TableRow>
                            )
                        })
                    }
                </Table>
                <ModalDetail>
                    <Div class="id">
                        <Label class="judul">ID Transaksi :</Label>
                        <Label class="isi">{this.state.modal.id}</Label>
                    </Div>
                    <img src={this.state.image} alt={this.state.modal.jadwal.film.judul} className="image" />
                    <Div class="judul">
                        <Label>{this.state.modal.jadwal.film.judul}</Label>
                        <span>{this.readSensor(this.state.modal.jadwal.film.sensor)}</span>
                    </Div>
                    <Div class="rincian">
                        <Div class="field">
                            <i className="far fa-clock"></i> <Label>{this.state.modal.jadwal.film.durasi}</Label>
                        </Div>
                        <Div class="field">
                            <i className="fas fa-language"></i> <Label>{this.state.modal.jadwal.film.bahasa}</Label>
                        </Div>
                        <Div class="field">
                            <i className="fa fa-comments"></i> <Label>{this.state.modal.jadwal.film.judulTambahan}</Label>
                        </Div>
                        <Div class="field">
                            <Label class="judul">Produser :</Label>
                            <Label class="isi">{this.state.modal.jadwal.film.produser}</Label>
                        </Div>
                        <Div class="field">
                            <Label class="judul">Direktur :</Label>
                            <Label class="isi">{this.state.modal.jadwal.film.direktur}</Label>
                        </Div>
                        <Div class="field">
                            <Label class="judul">Genre :</Label>
                            <Label class="isi">{this.readGenre(this.state.modal.jadwal.film.genre)}</Label>
                        </Div>
                        <hr />
                        <table>
                            <tr>
                                <td>
                                    Tanggal Tayang
                                </td>
                                <td>
                                    :
                                </td>
                                <td>
                                    {this.state.modal.jadwal.tanggal + " " + this.state.modal.jadwal.jam.substring(0,5)}
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    Jumlah Tiket
                                </td>
                                <td>
                                    :
                                </td>
                                <td>
                                    {this.state.modal.jumlahTiket + " buah"}
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    Tipe
                                </td>
                                <td>
                                    :
                                </td>
                                <td>
                                    {(this.state.modal.jadwal.ruang.jenis === 1) ? "Regular" : "VIP"}
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    Harga
                                </td>
                                <td>
                                    :
                                </td>
                                <td>
                                    {"Rp. " + this.state.modal.jadwal.ruang.harga.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ".")}
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    Total
                                </td>
                                <td>
                                    :
                                </td>
                                <td>
                                    {"Rp. " + this.state.modal.total.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ".")}
                                </td>
                            </tr>
                        </table>
                        {/* <Div class="field">
                            <Label class="judul">Tanggal Tayang :</Label>
                            <Label class="isi">{this.state.modal.jadwal.tanggal + this.state.modal.jadwal.jam}</Label>
                        </Div>
                        <Div class="field">
                            <Label class="judul">Jumlah Tiket :</Label>
                            <Label class="isi">{this.readGenre(this.state.modal.jadwal.film.genre)}</Label>
                        </Div>
                        <Div class="field">
                            <Label class="judul">Tipe :</Label>
                            <Label class="isi">{this.readGenre(this.state.modal.jadwal.film.genre)}</Label>
                        </Div>
                        <Div class="field">
                            <Label class="judul">Harga :</Label>
                            <Label class="isi">{this.readGenre(this.state.modal.jadwal.film.genre)}</Label>
                        </Div>
                        <Div class="field">
                            <Label class="judul">Total :</Label>
                            <Label class="isi">{this.readGenre(this.state.modal.jadwal.film.genre)}</Label>
                        </Div> */}
                    </Div>
                    <Div class="deskripsi">
                        <Label class="judul">Deskripsi :</Label>
                        <Paragraph class="isi">
                            {this.state.modal.jadwal.film.deskripsi}
                        </Paragraph>
                    </Div>
                </ModalDetail>
            </React.Fragment>
            
         );
    }
}

const mapStateToProps = state => {
    return {
        login: state.login,
        role: state.role,
        idUser: state.user
    }
}
 
export default connect(mapStateToProps)(History);