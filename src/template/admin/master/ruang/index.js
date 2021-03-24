import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import './style.css';
import Navigation from '../../navigation';
import { Table, Alert, Div, TableRow, TableData, Text, Select, Option, Button } from '../../../../component';

class Ruang extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            ruang: {
                id: "",
                nama: "",
                jenis: "",
                harga: ""
            },
            data: [],
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
            }
         }
        this.tableHeader = ["ID", "Nama Ruang", "Jenis Ruang", "Harga", "Aksi"];
        this.searchOption = ["ID", "Nama Ruang", "Harga"];
        this.valueSubmit = "Simpan";
        this.valueSelect = "";
    }

    componentDidMount() {
        document.body.classList.remove("background");
        this.countData();
    }

    countData = () => {
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

        fetch('http://localhost:8080/bioskop/ruang/limit/' + this.state.paging.limit + '/offset/' + this.state.paging.offset, {
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

    onChangeText = (el, attribut) => {
        let newRoom = this.state.ruang;
        newRoom[attribut] = el.target.value;

        this.setState({
            ruang: newRoom
        });
    }

    onChangeSelect = el => {
        this.valueSelect = el.target.value;
        this.showTable();
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

    onClickSubmit = () => {
        if(this.valueSubmit === "Simpan")
        {
            this.save();
        }
        else if(this.valueSubmit === "Ubah")
        {
            this.update();
        }
    }

    onClickUpdate = objek => {
        this.valueSubmit = "Ubah";

        const newRoom = objek;
        this.setState({
            ruang: newRoom
        });
    }

    showTable = () => {
        if((this.valueSelect === "") || (this.state.search === ""))
        {
            this.countData();
        }
        else if(this.valueSelect === "ID")
        {
            this.countDataSearchById(this.state.search);
        }
        else if(this.valueSelect === "Nama Ruang")
        {
            this.countDataSearchByName(this.state.search);
        }
        else if(this.valueSelect === "Harga")
        {
            this.countDataSearchByPrize(this.state.search);
        }
    }

    validation = () => {
        const alert = document.getElementById("alert");

        if(this.state.ruang.nama === "")
        {
            this.setState({alert: "Nama ruang tidak boleh kosong!"});
            alert.style.display = "block";
            return false;
        }

        if(this.state.ruang.jenis === "")
        {
            this.setState({alert: "Jenis ruang tidak boleh kosong!"});
            alert.style.display = "block";
            return false;
        }

        if(this.state.ruang.harga === "")
        {
            this.setState({alert: "Harga tidak boleh kosong!"});
            alert.style.display = "block";
            return false;
        }

        if(this.state.ruang.nama.length > 50)
        {
            this.setState({alert: "Nama ruang tidak boleh lebih dari 50 karakter!"});
            alert.style.display = "block";
            return false;
        }

        if(isNaN(this.state.ruang.harga))
        {
            this.setState({alert: "Harga wajib angka!"});
            alert.style.display = "block";
            return false;
        }

        return true;
    }

    save = () => {
        const alert = document.getElementById("alert");

        if(this.validation() === true)
        {
            fetch('http://localhost:8080/bioskop/ruang/', {
                method: "post",
                headers: {
                    "Content-Type": "application/json; ; charset=utf-8",
                    "Access-Control-Allow-Headers": "Authorization, Content-Type",
                    "Access-Control-Allow-Origin": "*"
                },
                body: JSON.stringify(this.state.ruang)
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
                    this.setState({alert: "Ruang " + this.state.ruang.nama + " berhasil disimpan."});
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
    }

    update = () => {
        const alert = document.getElementById("alert");

        if(this.validation() === true)
        {
            fetch('http://localhost:8080/bioskop/ruang/', {
                method: "put",
                headers: {
                    "Content-Type": "application/json; ; charset=utf-8",
                    "Access-Control-Allow-Headers": "Authorization, Content-Type",
                    "Access-Control-Allow-Origin": "*"
                },
                body: JSON.stringify(this.state.ruang)
            })
            .then(response => response.json())
            .then(json => {
                if(typeof json.errorMessage !== 'undefined')
                {
                    if(json.errorMessage === "Duplicate entry '" + this.state.ruang.nama + "' for key 'nama'")
                    {
                        this.setState({alert: "Nama ruang sudah tersedia!"});
                    }
                    else
                    {
                        this.setState({alert: json.errorMessage});
                    }
                    
                    alert.style.display = "block";
                }
                else
                {
                    this.setState({alert: "Ruang " + this.state.ruang.nama + " berhasil diubah."});
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
    }

    countDataSearchById = value => {
        const alert = document.getElementById("alert");

        if(value === "") 
        {
            value = "&nbsp;";
        }

        fetch('http://localhost:8080/bioskop/ruang/id/' + value, {
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

        fetch('http://localhost:8080/bioskop/ruang/id/' + value + '/limit/' + this.state.paging.limit + '/offset/' + this.state.paging.offset, {
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

    countDataSearchByName = value => {
        const alert = document.getElementById("alert");

        if(value === "") 
        {
            value = "&nbsp;";
        }

        fetch('http://localhost:8080/bioskop/ruang/nama/' + value, {
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
            this.searchByName(value);
        })
        .catch((e) => {
            this.setState({alert: "Gagal mengambil data! ", e});
            alert.style.display = "block";
        });
    }

    searchByName = value => {
        const alert = document.getElementById("alert");

        if(value === "") 
        {
            value = "&nbsp;";
        }

        fetch('http://localhost:8080/bioskop/ruang/nama/' + value + '/limit/' + this.state.paging.limit + '/offset/' + this.state.paging.offset, {
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

    countDataSearchByPrize = value => {
        const alert = document.getElementById("alert");

        if(value === "") 
        {
            value = 0;
        }

        fetch('http://localhost:8080/bioskop/ruang/harga/' + value, {
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
            this.searchByPrize(value);
        })
        .catch((e) => {
            this.setState({alert: "Gagal mengambil data! ", e});
            alert.style.display = "block";
        });
    }

    searchByPrize = value => {
        const alert = document.getElementById("alert");

        if(value === "") 
        {
            value = 0;
        }

        fetch('http://localhost:8080/bioskop/ruang/harga/' + value + '/limit/' + this.state.paging.limit + '/offset/' + this.state.paging.offset, {
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
        this.valueSubmit = "Simpan";

        const newRoom = {
            id: "",
            nama: "",
            jenis: "",
            harga: ""
        };

        this.setState({
            ruang: newRoom
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
        const { nama, jenis, harga } = this.state.ruang;

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
                <Div class="ruang">
                    <Div class="judul">
                        Master Ruang
                    </Div>
                    <Div class="form">
                        <Text name="nama" class="input" placeholder="Nama" value={nama} onChange={el => this.onChangeText(el, "nama")} />
                        <Select name="jenis" class="select" value={jenis} onChange={el => this.onChangeText(el, "jenis")}>
                            <Option value="">Jenis</Option>
                            <Option value="1">Regular (50 Kursi)</Option>
                            <Option value="2">VIP (10 Kursi)</Option>
                        </Select>
                        <Text name="nama" class="input" placeholder="Harga" value={harga} onChange={el => this.onChangeText(el, "harga")} />
                    </Div>
                    <Div class="tombol">
                        <Button name="tombol" class="button-batal" value="Batal" onClick={this.reset} />
                        <Button name="tombol" class="button-simpan" value={this.valueSubmit} onClick={this.onClickSubmit} />
                    </Div>
                </Div>
                <Table tableHeader={this.tableHeader} searchOption={this.searchOption} searchText={this.state.search} onChangeSelect={this.onChangeSelect}
                    onChangeSearch={this.onChangeSearch} paging={this.state.paging} onChangeLimit={this.onChangeLimit} limit={this.state.paging.limit} 
                    setCurrPage={this.setCurrPage}>
                    {
                        this.state.data.map((value, index) => {
                            return (
                                <TableRow key={index}>
                                    <TableData>{value.id}</TableData>
                                    <TableData>{value.nama}</TableData>
                                    <TableData>{(value.jenis === 1) ? "Regular" : "VIP"}</TableData>
                                    <TableData class="right">{"Rp. " + value.harga.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ".")}</TableData>
                                    <TableData class="center">
                                        <input type="button" id="update" name="update" class="button" value="Ubah" onClick={() => this.onClickUpdate(value)} />
                                    </TableData>
                                </TableRow>
                            )
                        })
                    }
                </Table>
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

export default connect(mapStateToProps)(Ruang);