import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import './style.css';
import Navigation from '../../navigation';
import { Alert, Div, Button, Table, Text, Select, Option, Label, TableRow, TableData, ModalDetail, Paragraph } from '../../../../component';
import film from '../../../../images';

class Film extends Component {
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
            modal: {
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
            data: [],
            alert: "",
            image: "",
            search: ""
         }
        this.tableHeader = ["ID", "Judul", "Peringkat Sensor", "Bahasa", "Durasi", "Aksi"];
        this.searchOption = ["ID", "Judul"];
        this.valueSubmit = "Simpan";
        this.valueSelect = "";
    }

    componentDidMount() {
        document.body.classList.remove("background");
        this.getAllData();
    }

    getAllData = () => {
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
            this.setState({ data: json })
        })
        .catch((e) => {
            this.setState({alert: "Gagal mengambil data! ", e});
            alert.style.display = "block";
        });
    }

    onChangeText = (el, attribut) => {
        let newFilm = this.state.film;
        newFilm[attribut] = el.target.value;

        this.setState({
            film: newFilm
        });
    }

    onChangeSelect = el => {
        this.valueSelect = el.target.value;
    }

    onChangeSearch = el => {
        const value = el.target.value;
        this.setState({search: value});

        if((this.valueSelect === "") || (value === ""))
        {
            this.getAllData();
        }
        else if(this.valueSelect === "ID")
        {
            this.searchById(value);
        }
        else if(this.valueSelect === "Judul")
        {
            this.searchByTitle(value);
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

        const newFilm = {
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
        };

        newFilm.id = objek.id;
        newFilm.judul = objek.judul;
        newFilm.produser = objek.produser;
        newFilm.direktur = objek.direktur;
        newFilm.sensor = objek.sensor;
        newFilm.bahasa = objek.bahasa;
        newFilm.judulTambahan = objek.judulTambahan;
        newFilm.durasi = objek.durasi;
        newFilm.genre = objek.genre;
        newFilm.deskripsi = objek.deskripsi;

        this.setState({
            film: newFilm
        });
    }

    onClickDetail = object => {
        // variable
        let image;

        // alert
        const modal = document.getElementById("modal-rincian");
        modal.style.display = "block";

        // logic
        const newFilm = {
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
        };

        newFilm.id = object.id;
        newFilm.judul = object.judul;
        newFilm.produser = object.produser;
        newFilm.direktur = object.direktur;
        newFilm.sensor = object.sensor;
        newFilm.bahasa = object.bahasa;
        newFilm.judulTambahan = object.judulTambahan;
        newFilm.durasi = object.durasi;
        newFilm.genre = object.genre;
        newFilm.deskripsi = object.deskripsi;

        image = this.getImage(newFilm.judul);

        this.setState({
            modal: newFilm,
            image: image
        });
    }

    onChangeCheckbox = (event) => {
        let film = this.state.film;
        let genre = film.genre;
        let checked = event.target.checked;

        if(checked === true)
        {
            genre.push(event.target.value);
            film.genre = genre;
        }
        else if(checked === false)
        {
            let newGenre = genre.filter(value => {
                return value !== event.target.value;
            });
            film.genre = newGenre;
        }

        this.checkValue(event);
        this.setState({film});
      }

    validation = () => {
        const alert = document.getElementById("alert");

        if(this.state.film.judul === "")
        {
            this.setState({alert: "Judul film tidak boleh kosong!"});
            alert.style.display = "block";
            return false;
        }

        if(this.state.film.sensor === "")
        {
            this.setState({alert: "Sensor film tidak boleh kosong!"});
            alert.style.display = "block";
            return false;
        }

        if(this.state.film.bahasa === "")
        {
            this.setState({alert: "Bahasa film tidak boleh kosong!"});
            alert.style.display = "block";
            return false;
        }

        if(this.state.film.judulTambahan === "")
        {
            this.setState({alert: "Judul tambahan tidak boleh kosong!"});
            alert.style.display = "block";
            return false;
        }

        if(this.state.film.judul.length > 100)
        {
            this.setState({alert: "Judul film tidak boleh lebih dari 100 karakter!"});
            alert.style.display = "block";
            return false;
        }

        if(this.state.film.produser !== "")
        {
            if(this.state.film.produser.length > 50)
            {
                this.setState({alert: "Produser tidak boleh lebih dari 50 karakter!"});
                alert.style.display = "block";
                return false;
            }
        }

        if(this.state.film.direktur !== "")
        {
            if(this.state.film.direktur.length > 50)
            {
                this.setState({alert: "Direktur tidak boleh lebih dari 50 karakter!"});
                alert.style.display = "block";
                return false;
            }
        }

        if(this.state.film.bahasa.length > 50)
        {
            this.setState({alert: "Bahasa film tidak boleh lebih dari 50 karakter!"});
            alert.style.display = "block";
            return false;
        }

        if(this.state.film.judulTambahan.length > 50)
        {
            this.setState({alert: "Judul tambahan tidak boleh lebih dari 50 karakter!"});
            alert.style.display = "block";
            return false;
        }

        return true;
    }

    save = () => {
        const alert = document.getElementById("alert");

        if(this.validation() === true)
        {
            fetch('http://localhost:8080/bioskop/film/', {
                method: "post",
                headers: {
                    "Content-Type": "application/json; ; charset=utf-8",
                    "Access-Control-Allow-Headers": "Authorization, Content-Type",
                    "Access-Control-Allow-Origin": "*"
                },
                body: JSON.stringify(this.state.film)
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
                    this.setState({alert: "Film " + this.state.film.judul + " berhasil disimpan."});
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
            fetch('http://localhost:8080/bioskop/film/', {
                method: "put",
                headers: {
                    "Content-Type": "application/json; ; charset=utf-8",
                    "Access-Control-Allow-Headers": "Authorization, Content-Type",
                    "Access-Control-Allow-Origin": "*"
                },
                body: JSON.stringify(this.state.film)
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
                    this.setState({alert: "Film " + this.state.film.judul + " berhasil diubah."});
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

        fetch('http://localhost:8080/bioskop/film/id/' + value, {
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

    searchByTitle = value => {
        const alert = document.getElementById("alert");

        if(value === "") 
        {
            value = "&nbsp;";
        }

        fetch('http://localhost:8080/bioskop/film/judul/' + value, {
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

        const newFilm = {
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
        };

        this.setState({
            film: newFilm
        });
    }

    checkValue = event => {
        let result = false;

        this.state.film.genre.forEach(value => {
            if(value === event.target.value)
            {
                result = true;
            }
        });

        return result;
    }

    getImage = judul => {
        let imageObject;

        imageObject = film.find(value => {
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
    
    render() { 
        const { judul, produser, direktur, sensor, bahasa, judulTambahan, durasi, genre, deskripsi } = this.state.film;
       
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
                <Div class="film">
                    <Div class="judul">
                        Master Ruang
                    </Div>
                    <Div class="form">
                        <Div class="col-1">
                            <Text name="nama" class="input" placeholder="Judul" value={judul} onChange={el => this.onChangeText(el, "judul")} />
                            <Text name="nama" class="input" placeholder="Produser" value={produser} onChange={el => this.onChangeText(el, "produser")} />
                            <Text name="nama" class="input" placeholder="Direktur" value={direktur} onChange={el => this.onChangeText(el, "direktur")} />
                            <Select name="sensor" class="select" value={sensor} onChange={el => this.onChangeText(el, "sensor")}>
                                <Option value="" disabled="disabled">Peringkat Sensor</Option>
                                <Option value="1">Semua umur</Option>
                                <Option value="2">13 keatas</Option>
                                <Option value="3">17 keatas</Option>
                            </Select>
                            <Text name="nama" class="input" placeholder="Bahasa" value={bahasa} onChange={el => this.onChangeText(el, "bahasa")} />
                            <Text name="nama" class="input" placeholder="Judul Tambahan" value={judulTambahan} onChange={el => this.onChangeText(el, "judulTambahan")} />
                            <input type="time" name="nama" className="input" placeholder="Durasi" step="1" value={durasi} onChange={el => this.onChangeText(el, "durasi")} />
                        </Div>
                        <Div class="col-2">
                            <textarea name="deskripsi" className="textarea" placeholder="Deskripsi" value={deskripsi} onChange={el => this.onChangeText(el, "deskripsi")}></textarea>
                        </Div>
                        <Div class="col-3">
                            <Label class="judul">Genre :</Label>
                            <Div class="checkbox">
                                <input type="checkbox" id="aksi" name="aksi" value="Aksi" onChange={this.onChangeCheckbox} checked={(genre.indexOf("Aksi") === -1) ? false : true} /> <Label for="aksi">Aksi</Label>
                            </Div>
                            <Div class="checkbox">
                                <input type="checkbox" id="perang" name="perang" value="Perang" onChange={this.onChangeCheckbox} checked={(genre.indexOf("Perang") === -1) ? false : true} /> <Label for="perang">Perang</Label>
                            </Div>
                            <Div class="checkbox">
                                <input type="checkbox" id="pertualangan" name="pertualangan" value="Pertualangan" onChange={this.onChangeCheckbox} checked={(genre.indexOf("Pertualangan") === -1) ? false : true} /> <Label for="pertualangan">Pertualangan</Label>
                            </Div>
                            <Div class="checkbox">
                                <input type="checkbox" id="romantis" name="romantis" value="Romantis" onChange={this.onChangeCheckbox} checked={(genre.indexOf("Romantis") === -1) ? false : true} /> <Label for="romantis">Romantis</Label>
                            </Div>
                            <Div class="checkbox">
                                <input type="checkbox" id="komedi" name="komedi" value="Komedi" onChange={this.onChangeCheckbox} checked={(genre.indexOf("Komedi") === -1) ? false : true} /> <Label for="komedi">Komedi</Label>
                            </Div>
                            <Div class="checkbox">
                                <input type="checkbox" id="fantasi" name="fantasi" value="Fantasi" onChange={this.onChangeCheckbox} checked={(genre.indexOf("Fantasi") === -1) ? false : true} /> <Label for="fantasi">Fantasi</Label>
                            </Div>
                            <Div class="checkbox">
                                <input type="checkbox" id="kriminal" name="kriminal" value="Kriminal" onChange={this.onChangeCheckbox} checked={(genre.indexOf("Kriminal") === -1) ? false : true} /> <Label for="kriminal">Kriminal</Label>
                            </Div>
                            <Div class="checkbox">
                                <input type="checkbox" id="menegangkan" name="menegangkan" value="Menegangkan" onChange={this.onChangeCheckbox} checked={(genre.indexOf("Menegangkan") === -1) ? false : true} /> <Label for="menegangkan">Menegangkan</Label>
                            </Div>
                            <Div class="checkbox">
                                <input type="checkbox" id="drama" name="drama" value="Drama" onChange={this.onChangeCheckbox} checked={(genre.indexOf("Drama") === -1) ? false : true} /> <Label for="drama">Drama</Label>
                            </Div>
                            <Div class="checkbox">
                                <input type="checkbox" id="misteri" name="misteri" value="Misteri" onChange={this.onChangeCheckbox} checked={(genre.indexOf("Misteri") === -1) ? false : true} /> <Label for="misteri">Misteri</Label>
                            </Div>
                            <Div class="checkbox">
                                <input type="checkbox" id="epik" name="epik" value="Epik" onChange={this.onChangeCheckbox} checked={(genre.indexOf("Epik") === -1) ? false : true} /> <Label for="epik">Epik</Label>
                            </Div>
                            <Div class="checkbox">
                                <input type="checkbox" id="barat" name="barat" value="Barat" onChange={this.onChangeCheckbox} checked={(genre.indexOf("Barat") === -1) ? false : true} /> <Label for="barat">Barat</Label>
                            </Div>
                            <Div class="checkbox">
                                <input type="checkbox" id="fiksi-ilmiah" name="fiksi-ilmiah" value="Fiksi Ilmiah" onChange={this.onChangeCheckbox} checked={(genre.indexOf("Fiksi Ilmiah") === -1) ? false : true} /> <Label for="fiksi-ilmiah">Fiksi Ilmiah</Label>
                            </Div>
                            <Div class="checkbox">
                                <input type="checkbox" id="kejahatan" name="kejahatan" value="Kejahatan" onChange={this.onChangeCheckbox} checked={(genre.indexOf("Kejahatan") === -1) ? false : true} /> <Label for="kejahatan">Kejahatan</Label>
                            </Div>
                            <Div class="checkbox">
                                <input type="checkbox" id="horor" name="horor" value="Horor" onChange={this.onChangeCheckbox} checked={(genre.indexOf("Horor") === -1) ? false : true} /> <Label for="horor">Horor</Label>
                            </Div>
                            <Div class="checkbox">
                                <input type="checkbox" id="animasi" name="animasi" value="Animasi" onChange={this.onChangeCheckbox} checked={(genre.indexOf("Animasi") === -1) ? false : true} /> <Label for="animasi">Animasi</Label>
                            </Div>
                            <Div class="checkbox">
                                <input type="checkbox" id="jagal" name="jagal" value="Jagal" onChange={this.onChangeCheckbox} checked={(genre.indexOf("Jagal") === -1) ? false : true} /> <Label for="jagal">Jagal</Label>
                            </Div>
                            <Div class="checkbox">
                                <input type="checkbox" id="musikal" name="musikal" value="Musikal" onChange={this.onChangeCheckbox} checked={(genre.indexOf("Musikal") === -1) ? false : true} /> <Label for="musikal">Musikal</Label>
                            </Div>
                        </Div>
                    </Div>
                    <Div class="tombol">
                        <Button name="tombol" class="button-batal" value="Batal" onClick={this.reset} />
                        <Button name="tombol" class="button-simpan" value={this.valueSubmit} onClick={this.onClickSubmit} />
                    </Div>
                </Div>
                <Table tableHeader={this.tableHeader} searchOption={this.searchOption} searchText={this.state.search} onChangeSelect={this.onChangeSelect} onChangeSearch={this.onChangeSearch}>
                    {
                        this.state.data.map((value, index) => {
                            let sensor;
                            switch(value.sensor)
                            {
                                case 1:
                                    sensor = "Semua Umur";
                                    break;
                                case 2: 
                                    sensor = "13 tahun keatas";
                                    break;
                                case 3:
                                    sensor = "17 tahun keatas";
                                    break;
                                default:
                                    sensor = "-";
                                    break;
                            }

                            return (
                                <TableRow key={index}>
                                    <TableData>{value.id}</TableData>
                                    <TableData>{value.judul}</TableData>
                                    <TableData>{sensor}</TableData>
                                    <TableData>{value.bahasa}</TableData>
                                    <TableData>{value.durasi}</TableData>
                                    <TableData class="center">
                                        <Button id="rincian" name="rincian" class="button" value="Rincian" onClick={() => this.onClickDetail(value)} />
                                        <Button id="update" name="update" class="button" value="Ubah" onClick={() => this.onClickUpdate(value)} />
                                    </TableData>
                                </TableRow>
                            )
                        })
                    }
                </Table>
                <ModalDetail>
                    <Div class="id">
                        <Label class="judul">ID Film :</Label>
                        <Label class="isi">{this.state.modal.id}</Label>
                    </Div>
                    <img src={this.state.image} alt="demon-slayer-the-movie-mugen-train-kimetsu-no-yaiba-mugen" className="image" />
                    <Div class="judul">
                        <Label>{this.state.modal.judul}</Label>
                        <span>{this.readSensor(this.state.modal.sensor)}</span>
                    </Div>
                    <Div class="rincian">
                        <Div class="field">
                            <i className="far fa-clock"></i> <Label>{this.state.modal.durasi}</Label>
                        </Div>
                        <Div class="field">
                            <i className="fas fa-language"></i> <Label>{this.state.modal.bahasa}</Label>
                        </Div>
                        <Div class="field">
                            <i className="fa fa-comments"></i> <Label>{this.state.modal.judulTambahan}</Label>
                        </Div>
                        <Div class="field">
                            <Label class="judul">Produser :</Label>
                            <Label class="isi">{this.state.modal.produser}</Label>
                        </Div>
                        <Div class="field">
                            <Label class="judul">Direktur :</Label>
                            <Label class="isi">{this.state.modal.direktur}</Label>
                        </Div>
                        <Div class="field">
                            <Label class="judul">Genre :</Label>
                            <Label class="isi">{this.readGenre(this.state.modal.genre)}</Label>
                        </Div>
                    </Div>
                    <Div class="deskripsi">
                        <Label class="judul">Deskripsi :</Label>
                        <Paragraph class="isi">
                            {this.state.modal.deskripsi}
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

export default connect(mapStateToProps)(Film);