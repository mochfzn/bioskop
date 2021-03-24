import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import './style.css';
import Navigation from '../../navigation';
import { Table, Alert, Div, TableRow, TableData, Select, Option, Button, Confirm, Tanggal } from '../../../../component';

class Jadwal extends Component {
    constructor(props) {
        super(props);
        this.state = { 
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
            data: [],
            ruang: [],
            film: [],
            alert: "",
            search: "",
            paging: {
                startRow: 1,
                maxRow: 5,
                page: 0,
                limit: 7,
                currPage: 1,
                offset: 0,
                amount: 0
            },
            showButtonSearch: false
         }
        this.tableHeader = ["No", "Tanggal", "Ruang", "Harga", "Film", "Jam"];
        this.searchOption = ["Tanggal", "Ruang", "Film"];
        this.valueSubmit = "Simpan";
        this.valueSelect = "";
        this.saveConfirm = false;
    }

    componentDidMount() {
        document.body.classList.remove("background");
        this.countData();
        this.getAllRuang();
        this.getAllFilm();
    }

    countData = () => {
        const alert = document.getElementById("alert");

        fetch('http://localhost:8080/bioskop/jadwal/', {
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
            this.getAllData();
        })
        .catch((e) => {
            this.setState({alert: "Gagal mengambil data! ", e});
            alert.style.display = "block";
        });
    }

    getAllData = () => {
        const alert = document.getElementById("alert");

        fetch('http://localhost:8080/bioskop/jadwal/limit/' + this.state.paging.limit + '/offset/' + this.state.paging.offset, {
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

    getAllRuang = () => {
        const alert = document.getElementById("alert");

        fetch('http://localhost:8080/bioskop/ruang/', {
            method: "get",
            headers: {
                 "Content-Type": "application/json; ; charset=utf-8",
                 "Access-Control-Allow-Headers": "Authorization, Content-Type",
                 "Access-Control-Allow-Origin": "*"
            }
        })
        .then(response => response.json())
        .then(json => {
            this.setState({ ruang: json });
        })
        .catch((e) => {
            this.setState({alert: "Gagal mengambil data! ", e});
            alert.style.display = "block";
        });
    }

    getAllFilm = () => {
        const alert = document.getElementById("alert");

        fetch('http://localhost:8080/bioskop/film/', {
            method: "get",
            headers: {
                 "Content-Type": "application/json; ; charset=utf-8",
                 "Access-Control-Allow-Headers": "Authorization, Content-Type",
                 "Access-Control-Allow-Origin": "*"
            }
        })
        .then(response => response.json())
        .then(json => {
            this.setState({ film: json })
        })
        .catch((e) => {
            this.setState({alert: "Gagal mengambil data! ", e});
            alert.style.display = "block";
        });
    }

    onChangeText = (el, attribut) => {
        let newSchedule;
        let ruang;
        let film;

        newSchedule = this.state.jadwal;

        if(attribut === "ruang")
        {
            ruang = this.state.ruang.find(value => {
                return value.id === el.target.value;
            });

            newSchedule["ruang"] = ruang;
        }
        else if(attribut === "film")
        {
            film = this.state.film.find(value => {
                return value.id === el.target.value;
            });

            newSchedule["film"] = film;
        }
        else
        {
            newSchedule[attribut] = el.target.value;
        }

        this.setState({
            jadwal: newSchedule
        });
    }

    onChangeSearchSelect = el => {
        this.valueSelect = el.target.value;

        if(this.valueSelect === "Tanggal")
        {
            this.setState({showButtonSearch: true});
        }
        else
        {
            this.setState({showButtonSearch: false});
            this.showTable();
        }

        if(this.valueSelect === "")
        {
            this.setState({search: ""});
            this.countData();
        }
    }

    onChangeSearchText = el => {
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

    onClickSubmit = () => {
        if(this.validation() === true)
        {
            this.showConfirm();
        }
    }

    onClickSearch = () => {
        const alert = document.getElementById("alert");

        if(this.state.search === "") 
        {
            this.setState({search: "&nbsp;"});
        }

        let tanggal = new Date(this.state.search);
        let hari = tanggal.getDate();
        let bulan = tanggal.getMonth() + 1;
        let tahun = tanggal.getFullYear();

        if(bulan < 10)
            bulan = '0' + bulan.toString();
        if(hari < 10)
            hari = '0' + hari.toString();

        let dateSearch = hari + "-" + bulan + "-" + tahun;

        fetch('http://localhost:8080/bioskop/jadwal/tanggal/' + dateSearch, {
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

    searchByDate = value => {
        const alert = document.getElementById("alert");

        if(this.state.search === "") 
        {
            this.setState({search: "&nbsp;"});
        }

        let tanggal = new Date(this.state.search);
        let hari = tanggal.getDate();
        let bulan = tanggal.getMonth() + 1;
        let tahun = tanggal.getFullYear();

        if(bulan < 10)
            bulan = '0' + bulan.toString();
        if(hari < 10)
            hari = '0' + hari.toString();

        let dateSearch = hari + "-" + bulan + "-" + tahun;

        fetch('http://localhost:8080/bioskop/jadwal/tanggal/' + dateSearch + '/limit/' + this.state.paging.limit + '/offset/' + this.state.paging.offset, {
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
        else if(this.valueSelect === "Ruang")
        {
            this.countDataSearchByRoom(this.state.search);
        }
        else if(this.valueSelect === "Film")
        {
            this.countDataSearchByFilm(this.state.search);
        }
    }

    validation = () => {
        const alert = document.getElementById("alert");

        if(this.state.jadwal.tanggal === "") 
        {
            this.setState({alert: "Tanggal tidak boleh kosong!"});
            alert.style.display = "block";
            return false;
        }

        if(this.state.jadwal.jam === "") 
        {
            this.setState({alert: "Jam tidak boleh kosong!"});
            alert.style.display = "block";
            return false;
        }

        if(this.state.jadwal.ruang.id === "") 
        {
            this.setState({alert: "Ruang tidak boleh kosong!"});
            alert.style.display = "block";
            return false;
        }

        if(this.state.jadwal.film.id === "") 
        {
            this.setState({alert: "Film tidak boleh kosong!"});
            alert.style.display = "block";
            return false;
        }

        return true;
    }

    save = () => {
        const alert = document.getElementById("alert");
        
        fetch('http://localhost:8080/bioskop/jadwal/', {
            method: "post",
            headers: {
                "Content-Type": "application/json; ; charset=utf-8",
                "Access-Control-Allow-Headers": "Authorization, Content-Type",
                "Access-Control-Allow-Origin": "*"
            },
            body: JSON.stringify(this.state.jadwal)
        })
        .then(response => response.json())
        .then(json => {
            if(typeof json.errorMessage !== 'undefined')
            {
                this.setState({alert: json.errorMessage});
                alert.style.display = "block";
            }
            else
            {
                this.setState({alert: "Jadwal berhasil disimpan."});
                alert.style.display = "block";
                this.getAllData();
                this.reset();
            }
        })
        .catch((e) => {
            this.setState({alert: "Gagal mengirimkan data! " + e});
            alert.style.display = "block";
        });
    }

    countDataSearchByRoom = value => {
        const alert = document.getElementById("alert");

        if(value === "") 
        {
            value = "&nbsp;";
        }

        fetch('http://localhost:8080/bioskop/jadwal/ruang/' + value, {
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
            this.searchByRoom(value);
        })
        .catch((e) => {
            this.setState({alert: "Gagal mengambil data! ", e});
            alert.style.display = "block";
        });
    }

    searchByRoom = value => {
        const alert = document.getElementById("alert");

        if(value === "") 
        {
            value = "&nbsp;";
        }

        fetch('http://localhost:8080/bioskop/jadwal/ruang/' + value + '/limit/' + this.state.paging.limit + '/offset/' + this.state.paging.offset, {
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

        fetch('http://localhost:8080/bioskop/jadwal/film/' + value, {
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

        fetch('http://localhost:8080/bioskop/jadwal/film/' + value + '/limit/' + this.state.paging.limit + '/offset/' + this.state.paging.offset, {
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

    reset = () => {
        const newSchedule = {
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
        };

        this.setState({
            jadwal: newSchedule
        });
    }

    showConfirm = () => {
        const confirm = document.getElementById("confirm");
        confirm.style.display = "block";
    }

    changeSaveConfirm = () => {
        this.save();

        const confirm = document.getElementById("confirm");
        confirm.style.display = "none";
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
        const { tanggal, ruang, film, jam } = this.state.jadwal;
        let incNumber = 1;

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
                <Div class="jadwal">
                    <Div class="judul">
                        Master Jadwal
                    </Div>
                    <Div class="form">
                        <Tanggal name="nama" class="input" id="tanggal" placeholder="Tanggal" value={tanggal} onChange={el => this.onChangeText(el, "tanggal")} min={"min"} />
                        <Select name="ruangan" class="select" value={ruang.id} onChange={el => this.onChangeText(el, "ruang")}>
                            <Option value="" disabled="disabled">Ruangan</Option>
                            {
                                this.state.ruang.map((value, index) => {
                                    return (
                                        <Option key={index} value={value.id}>{(value.jenis === 1) ? value.nama + " (Regular)" : value.nama + " (VIP)"}</Option>
                                    )
                                })
                            }
                        </Select>
                        <Select name="film" class="select" value={film.id} onChange={el => this.onChangeText(el, "film")}>
                            <Option value="" disabled="disabled">Film</Option>
                            {
                                this.state.film.map((value, index) => {
                                    return (
                                        <Option key={index} value={value.id}>{value.judul}</Option>
                                    )
                                })
                            }
                        </Select>
                        <Select name="jam" class="select" value={jam} onChange={el => this.onChangeText(el, "jam")}>
                            <Option value="" disabled="disabled">Jam</Option>
                            <Option value="10:00">10:00</Option>
                            <Option value="13:00">13:00</Option>
                            <Option value="16:00">16:00</Option>
                            <Option value="19:00">19:00</Option>
                        </Select>
                    </Div>
                    <Div class="tombol">
                        <Button name="tombol" class="button-batal" value="Batal" onClick={this.reset} />
                        <Button name="tombol" class="button-simpan" value="Simpan" onClick={this.onClickSubmit} />
                    </Div>
                </Div>
                <Table tableHeader={this.tableHeader} searchOption={this.searchOption} showButton={this.state.showButtonSearch} searchText={this.state.search} 
                    onChangeSelect={this.onChangeSearchSelect} onChangeSearch={this.onChangeSearchText} onClickSearch={this.onClickSearch} paging={this.state.paging}
                    onChangeLimit={this.onChangeLimit} limit={this.state.paging.limit} setCurrPage={this.setCurrPage}>
                    {
                        this.state.data.map((value, index) => {
                            return (
                                <TableRow key={index}>
                                    <TableData>{incNumber++}</TableData>
                                    <TableData>{value.tanggal}</TableData>
                                    <TableData>{value.ruang.nama}</TableData>
                                    <TableData class="right">{"Rp. " + value.ruang.harga.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ".")}</TableData>
                                    <TableData>{value.film.judul}</TableData>
                                    <TableData>{value.jam.substring(0,5)}</TableData>
                                </TableRow>
                            )
                        })
                    }
                </Table>
                <Confirm title="Simpan Jadwal!" question="Apakah Anda yakin ingin menyimpan jadwal film tersebut?" changeSaveConfirm={this.changeSaveConfirm}>
                    <table>
                        <tbody>
                            <tr>
                                <td>Tanggal</td>
                                <td>:</td>
                                <td>{tanggal}</td>
                            </tr>
                            <tr>
                                <td>Ruangan</td>
                                <td>:</td>
                                <td>{(ruang.jenis === 1) ? ruang.nama + " (Regular)" : ruang.nama + " (VIP)"}</td>
                            </tr>
                            <tr>
                                <td>Film</td>
                                <td>:</td>
                                <td>{film.judul}</td>
                            </tr>
                            <tr>
                                <td>Jam</td>
                                <td>:</td>
                                <td>{jam}</td>
                            </tr>
                        </tbody>
                    </table>
                </Confirm>
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

export default connect(mapStateToProps)(Jadwal);