import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import Navigation from '../navigation';
import { Table, TableRow, TableData, Alert, Button } from '../../../component';

class Laporan extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            data: [],
            alert: "",
            search: ""
         }
        this.tableHeader = ["ID Tiket", "Pembeli", "Film", "Tanggal", "Aksi"];
        this.searchOption = ["ID Tiket", "Film", "Tanggal"];
    }

    componentDidMount() {
        document.body.classList.remove("background");
        this.getAllTransaction();
    }

    getAllTransaction = () => {
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
            this.setState({ data: json })
        })
        .catch((e) => {
            this.setState({alert: "Gagal mengambil data! ", e});
            alert.style.display = "block";
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
        else if(this.valueSelect === "ID Tiket")
        {
            this.searchById(value);
        }
        else if(this.valueSelect === "Film")
        {
            this.searchByTitle(value);
        }
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
                <Table tableHeader={this.tableHeader} searchOption={this.searchOption} searchText={this.state.search} onChangeSelect={this.onChangeSelect} onChangeSearch={this.onChangeSearch}>
                    {
                        this.state.data.map((value, index) => {
                            return (
                                <TableRow>
                                    <TableData>{value.id}</TableData>
                                    <TableData>{value.pengguna.nama}</TableData>
                                    <TableData>{value.jadwal.film.judul}</TableData>
                                    <TableData>{"tanggal"}</TableData>
                                    <TableData class="center">
                                        <Button id="rincian" name="rincian" class="button" value="Rincian" />
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
 
export default connect(mapStateToProps)(Laporan);