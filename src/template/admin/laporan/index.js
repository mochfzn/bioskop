import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import Navigation from '../navigation';
import { Table, TableRow, TableData, Alert, Button, ModalDetail } from '../../../component';
import GambarFilm from '../../../images';

class Laporan extends Component {
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
        this.tableHeader = ["ID Tiket", "Pembeli", "Film", "Tanggal", "Aksi"];
        this.searchOption = ["ID Tiket","Pembeli", "Film", "Tanggal"];
    }

    componentDidMount() {
        document.body.classList.remove("background");
        this.countData();
    }

    countData = () => {
        const alert = document.getElementById("alert");

        fetch('http://localhost:8080/bioskop/pembelian/', {
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
            this.getAllTransaction();
        })
        .catch((e) => {
            this.setState({alert: "Gagal mengambil data! ", e});
            alert.style.display = "block";
        });
    }

    getAllTransaction = () => {
        const alert = document.getElementById("alert");

        fetch('http://localhost:8080/bioskop/pembelian/limit/' + this.state.paging.limit + '/offset/' + this.state.paging.offset, {
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
            this.getAllTransaction();
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

        fetch('http://localhost:8080/bioskop/pembelian/tanggal/' + dateSearch, {
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
            this.searchByDate();
        })
        .catch((e) => {
            this.setState({alert: "Gagal mengambil data! ", e});
            alert.style.display = "block";
        });
    }

    searchByDate = () => {
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

        fetch('http://localhost:8080/bioskop/pembelian/tanggal/' + dateSearch + '/limit/' + this.state.paging.limit + '/offset/' + this.state.paging.offset, {
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
        else if(this.valueSelect === "ID Tiket")
        {
            this.countDataSearchById(this.state.search);
        }
        else if(this.valueSelect === "Pembeli")
        {
            this.countDataSearchByCustomer(this.state.search);
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

    countDataSearchById = value => {
        const alert = document.getElementById("alert");

        if(value === "") 
        {
            value = "&nbsp;";
        }

        fetch('http://localhost:8080/bioskop/pembelian/id/' + value, {
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

        fetch('http://localhost:8080/bioskop/pembelian/id/' + value + '/limit/' + this.state.paging.limit + '/offset/' + this.state.paging.offset, {
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

    countDataSearchByCustomer = value => {
        const alert = document.getElementById("alert");

        if(value === "") 
        {
            value = "&nbsp;";
        }

        fetch('http://localhost:8080/bioskop/pembelian/pembeli/' + value, {
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
            this.searchByCustomer(value);
        })
        .catch((e) => {
            this.setState({alert: "Gagal mengambil data! ", e});
            alert.style.display = "block";
        });
    }

    searchByCustomer = value => {
        const alert = document.getElementById("alert");

        if(value === "") 
        {
            value = "&nbsp;";
        }

        fetch('http://localhost:8080/bioskop/pembelian/pembeli/' + value + '/limit/' + this.state.paging.limit + '/offset/' + this.state.paging.offset, {
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

        fetch('http://localhost:8080/bioskop/pembelian/film/' + value, {
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

        fetch('http://localhost:8080/bioskop/pembelian/film/' + value, {
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
        else if(this.props.role === 1)
        {
            return <Redirect to="/customer" />
        }
        
        return ( 
            <React.Fragment>
                <Navigation />
                <Alert>{this.state.alert}</Alert>
                <Table tableHeader={this.tableHeader} searchOption={this.searchOption} searchText={this.state.search} onChangeSelect={this.onChangeSelect}
                 onChangeSearch={this.onChangeSearch} showButton={this.state.showButtonSearch} onClickSearch={this.onClickSearch} paging={this.state.paging} 
                 onChangeLimit={this.onChangeLimit} limit={this.state.paging.limit} setCurrPage={this.setCurrPage}>
                    {
                        this.state.data.map((value, index) => {
                            return (
                                <TableRow key={index}>
                                    <TableData>{value.id}</TableData>
                                    <TableData>{value.pengguna.nama}</TableData>
                                    <TableData>{value.jadwal.film.judul}</TableData>
                                    <TableData>{value.tanggal}</TableData>
                                    <TableData class="center">
                                        <Button id="rincian" name="rincian" class="button" value="Rincian" onClick={() => this.onClickDetail(value)} />
                                    </TableData>
                                </TableRow>
                            )
                            
                        })
                    }
                </Table>
                <ModalDetail>
                    <table>
                        <tr>
                            <td>Kode Tiket</td>
                            <td>:</td>
                            <td>{this.state.modal.id}</td>
                            <td>&nbsp;</td>
                            <td>&nbsp;</td>
                            <td>&nbsp;</td>
                            <td>&nbsp;</td>
                        </tr>
                        <tr>
                            <td>Judul Film</td>
                            <td>:</td>
                            <td>{this.state.modal.jadwal.film.judul}</td>
                            <td>&nbsp;</td>
                            <td>Nama</td>
                            <td>:</td>
                            <td>{this.state.modal.pengguna.nama}</td>
                        </tr>
                        <tr>
                            <td>Jumlah Tiket</td>
                            <td>:</td>
                            <td>{this.state.modal.jumlahTiket + " buah"}</td>
                            <td>&nbsp;</td>
                            <td>Telepon</td>
                            <td>:</td>
                            <td>{this.state.modal.pengguna.telepon}</td>
                        </tr>
                        <tr>
                            <td>Total</td>
                            <td>:</td>
                            <td>{"Rp. " + this.state.modal.total.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ".")}</td>
                            <td>&nbsp;</td>
                            <td>Email</td>
                            <td>:</td>
                            <td>{this.state.modal.pengguna.email}</td>
                        </tr>
                        <tr>
                            <td>&nbsp;</td>
                            <td>&nbsp;</td>
                            <td>&nbsp;</td>
                            <td>&nbsp;</td>
                            <td>&nbsp;</td>
                            <td>&nbsp;</td>
                            <td>&nbsp;</td>
                        </tr>
                        <tr>
                            <td>Tanggal Tayang</td>
                            <td>:</td>
                            <td>{this.state.modal.jadwal.tanggal + " " + this.state.modal.jadwal.jam.substring(0,5)}</td>
                            <td>&nbsp;</td>
                            <td>Ruang</td>
                            <td>:</td>
                            <td>{this.state.modal.jadwal.ruang.nama}</td>
                        </tr>
                        <tr>
                            <td>Tipe</td>
                            <td>:</td>
                            <td>{(this.state.modal.jadwal.ruang.jenis === 1) ? "Regular" : "VIP"}</td>
                            <td>&nbsp;</td>
                            <td>Harga</td>
                            <td>:</td>
                            <td>{"Rp. " + this.state.modal.jadwal.ruang.harga.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ".")}</td>
                        </tr>
                    </table>
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
 
export default connect(mapStateToProps)(Laporan);