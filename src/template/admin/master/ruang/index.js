import React, { Component } from 'react';

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
            search: ""
         }
        this.tableHeader = ["ID", "Nama Ruang", "Jenis Ruang", "Harga", "Aksi"];
        this.searchOption = ["ID", "Nama Ruang", "Harga"];
        this.valueSubmit = "Simpan";
        this.valueSelect = "";
    }

    componentDidMount() {
        document.body.classList.remove("background");
        this.getAllData();
    }

    getAllData = () => {
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
            this.setState({ data: json })
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
    }

    onChangeSearch = el => {
        const value = el.target.value;
        this.setState({search: value});

        if((this.valueSelect === "") || (this.state.search === ""))
        {
            this.getAllData();
        }
        else if(this.valueSelect === "ID")
        {
            this.searchById(this.state.search);
        }
        else if(this.valueSelect === "Nama Ruang")
        {
            this.searchByName(this.state.search);
        }
        else if(this.valueSelect === "Harga")
        {
            this.searchByPrize(this.state.search);
        }
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

    searchById = value => {
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
            this.setState({ data: json })
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
            this.setState({ data: json })
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
            this.setState({ data: json })
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
    
    render() { 
        const { nama, jenis, harga } = this.state.ruang;

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
                <Table tableHeader={this.tableHeader} searchOption={this.searchOption} searchText={this.state.search} onChangeSelect={this.onChangeSelect} onChangeSearch={this.onChangeSearch}>
                    {
                        this.state.data.map((value, index) => {
                            return (
                                <TableRow key={index}>
                                    <TableData>{value.id}</TableData>
                                    <TableData>{value.nama}</TableData>
                                    <TableData>{(value.jenis === 1) ? "Regular" : "VIP"}</TableData>
                                    <TableData>{"Rp. " + value.harga.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ".")}</TableData>
                                    <TableData>
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
 
export default Ruang;