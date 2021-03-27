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
            showButtonSearch: false,
            paging: {
                startRow: 1,
                maxRow: 5,
                page: 0,
                limit: 7,
                currPage: 1,
                offset: 0,
                amount: 0
            }
         }
        this.valueSelect = "";
        this.tableHeader = ["Kode Tiket", "Film", "Tanggal", "Tipe", "Jumlah Tiket", "Aksi"];
        this.searchOption = ["Kode Tiket", "Film", "Tanggal"];
    }

    componentDidMount() {
        document.body.classList.remove("background");
        this.countData();
    }

    countData = () => {
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
            let paging = this.state.paging;
            paging.amount = json.length;

            this.setState({ 
                paging: paging
            });
        })
        .then(() => {
            this.getTransaction();
        })
        .catch((e) => {
            this.setState({alert: "Gagal mengambil data! ", e});
            alert.style.display = "block";
        });
    }

    getTransaction = () => {
        const alert = document.getElementById("alert");

        fetch('http://localhost:8080/bioskop/pembelian/pengguna/' + this.props.idUser + '/limit/' + this.state.paging.limit + '/offset/' + this.state.paging.offset, {
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
        .then(() => {
            this.settingPaging();
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
            this.setState({
                showButtonSearch: true,
                search: ""
            });
        }
        else
        {
            this.getTransaction();
            this.setState({
                showButtonSearch: false,
                search: ""
            }, () => this.showTable());
        }
    }

    onChangeSearch = el => {
        const value = el.target.value;
        this.setState({search: value}, () => this.showTable());
    }

    onChangeLimit = event => {
        let paging = this.state.paging;
        paging.limit = Number(event.target.value);
        paging.currPage = 1;
        paging.offset = 0;

        this.setState({
            paging
        });

        this.showTable();
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
        let dateSearch;

        if(this.state.search === "") 
        {
            dateSearch = "&nbsp;";
        }
        else
        {
            let date = new Date(this.state.search);
            let hari = date.getDate();
            let bulan = date.getMonth() + 1;
            let tahun = date.getFullYear();

            if(bulan < 10)
                bulan = '0' + bulan.toString();
            if(hari < 10)
                hari = '0' + hari.toString();

            dateSearch = hari + "-" + bulan + "-" + tahun;
        }

        fetch('http://localhost:8080/bioskop/pembelian/tanggal/' + dateSearch + "/customer/" + this.props.idUser, {
            method: "get",
            headers: {
                 "Content-Type": "application/json; ; charset=utf-8",
                 "Access-Control-Allow-Headers": "Authorization, Content-Type",
                 "Access-Control-Allow-Origin": "*"
            }
        })
        .then(response => response.json())
        .then(json => {
            let paging = this.state.paging;
            paging.amount = json.length;

            this.setState({ 
                paging: paging
            });
        })
        .then(() => {
            this.searchByDate(dateSearch);
        })
        .catch((e) => {
            this.setState({alert: "Gagal mengambil data! ", e});
            alert.style.display = "block";
        });
    }

    searchByDate = dateSearch => {
        const alert = document.getElementById("alert");

        fetch('http://localhost:8080/bioskop/pembelian/tanggal/' + dateSearch + "/customer/" + this.props.idUser + '/limit/' + this.state.paging.limit + '/offset/' + this.state.paging.offset, {
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
        .then(() => {
            this.settingPaging();
        })
        .catch((e) => {
            this.setState({alert: "Gagal mengambil data! ", e});
            alert.style.display = "block";
        });
    }

    showTable = () => {
        if(this.state.search === "")
        {
            this.countData();
        }
        else if(this.valueSelect === "Kode Tiket")
        {
            this.countDataSearchById(this.state.search);
        }
        else if(this.valueSelect === "Film")
        {
            this.countDataSearchByFilm(this.state.search);
        }
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

    countDataSearchById = value => {
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
            let paging = this.state.paging;
            paging.amount = json.length;

            this.setState({ 
                paging: paging
            });
        })
        .then(() => {
            this.searchById(value);
        })
        .catch((e) => {
            this.setState({alert: "Gagal mengambil data! ", e});
            alert.style.display = "block";
        });
    }

    searchById = value => {
        const alert = document.getElementById("alert");

        if(value === "") 
        {
            value = "&nbsp;";
        }

        fetch('http://localhost:8080/bioskop/pembelian/id/' + value + "/customer/" + this.props.idUser + '/limit/' + this.state.paging.limit + '/offset/' + this.state.paging.offset, {
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
        .then(() => {
            this.settingPaging();
        })
        .catch((e) => {
            this.setState({alert: "Gagal mengambil data! ", e});
            alert.style.display = "block";
        });
    }

    countDataSearchByFilm = value => {
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
            let paging = this.state.paging;
            paging.amount = json.length;

            this.setState({ 
                paging: paging
            });
        })
        .then(() => {
            this.searchByFilm(value);
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

        fetch('http://localhost:8080/bioskop/pembelian/film/' + value + "/customer/" + this.props.idUser + '/limit/' + this.state.paging.limit + '/offset/' + this.state.paging.offset, {
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
        .then(() => {
            this.settingPaging();
        })
        .catch((e) => {
            this.setState({alert: "Gagal mengambil data! ", e});
            alert.style.display = "block";
        });
    }

    settingPaging = () => {
        let start, deff, paging, temp;
        paging = this.state.paging;
        start = 1;
        deff = Math.floor(paging.maxRow/2);

        if((paging.currPage - deff) <= 2)
        {
            start = 1;
        }
        else
        {
            temp = paging.currPage - deff;

            if((temp + (paging.maxRow - 1)) > paging.page)
            {
                start = paging.page - (paging.maxRow - 1);
            }
            else
            {
                start = temp;
            }
        }

        paging.page = Math.ceil(paging.amount/paging.limit);
        paging.startRow = start;

        this.setState({
            paging
        });
    }

    setCurrPage = currClick => {
        let paging = this.state.paging;
        paging.currPage = currClick;
        paging.offset = (currClick * paging.limit) - paging.limit;

        this.setState({
            paging
        }, () => this.settingPaging());

        this.showTable();
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
                 onChangeSearch={this.onChangeSearch} showButton={this.state.showButtonSearch} onClickSearch={this.onClickSearch} paging={this.state.paging}
                 onChangeLimit={this.onChangeLimit} limit={this.state.paging.limit} setCurrPage={this.setCurrPage} valueSelect={this.valueSelect}>
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
                            <tbody>
                                <TableRow>
                                    <TableData>
                                        Tanggal Tayang
                                    </TableData>
                                    <TableData>
                                        :
                                    </TableData>
                                    <TableData>
                                        {this.state.modal.jadwal.tanggal + " " + this.state.modal.jadwal.jam.substring(0,5)}
                                    </TableData>
                                </TableRow>
                                <TableRow>
                                    <TableData>
                                        Jumlah Tiket
                                    </TableData>
                                    <TableData>
                                        :
                                    </TableData>
                                    <TableData>
                                        {this.state.modal.jumlahTiket + " buah"}
                                    </TableData>
                                </TableRow>
                                <TableRow>
                                    <TableData>
                                        Tipe
                                    </TableData>
                                    <TableData>
                                        :
                                    </TableData>
                                    <TableData>
                                        {(this.state.modal.jadwal.ruang.jenis === 1) ? "Regular" : "VIP"}
                                    </TableData>
                                </TableRow>
                                <TableRow>
                                    <TableData>
                                        Harga
                                    </TableData>
                                    <TableData>
                                        :
                                    </TableData>
                                    <TableData>
                                        {"Rp. " + this.state.modal.jadwal.ruang.harga.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ".")}
                                    </TableData>
                                </TableRow>
                                <TableRow>
                                    <TableData>
                                        Total
                                    </TableData>
                                    <TableData>
                                        :
                                    </TableData>
                                    <TableData>
                                        {"Rp. " + this.state.modal.total.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ".")}
                                    </TableData>
                                </TableRow>
                            </tbody>
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