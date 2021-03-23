import React, { Component } from 'react';

import {Div, Label, Select, Option, Text, TableRow, Button, Tanggal} from '../index';
import './style.css';

class Table extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            header: [],
            option: []
         }
    }

    componentDidMount() {
        this.setState({
            header: this.props.tableHeader,
            option: this.props.searchOption
        });
    }

    render() { 
        let date = 
            <React.Fragment>
                <Tanggal name="nama" class="input" id="tanggal-cari" placeholder="Tanggal" value={this.props.searchText} onChange={this.props.onChangeSearch} />
                <Button id="cari" name="cari" class="button" value="Cari" onClick={this.props.onClickSearch} />
            </React.Fragment>;
        let text = <Text name="cari" class="input" placeholder="Cari" value={this.props.searchText} onChange={this.props.onChangeSearch} />;
        let show;

        if(this.props.showButton === true)
        {
            show = date;
        }
        else 
        {
            show = text;
        }

        return ( 
            <Div class="data">
                <Div class="pengaturan">
                    <Label class="label">Cari :</Label>
                    <Select name="cari" class="select" onChange={this.props.onChangeSelect}>
                        <Option value="">Berdasarkan</Option>
                        {
                            this.state.option.map((value, index) => {
                                return <Option value={value} key={index}>{value}</Option>
                            })
                        }
                    </Select>
                    {show}
                    <Select name="cari" class="select">
                        <Option>Jumlah Baris</Option>
                        <Option>5</Option>
                        <Option>10</Option>
                        <Option>15</Option>
                        <Option>20</Option>
                    </Select>
                </Div>
                <Div class="tabel">
                    <table className="table">
                        <thead>
                            <TableRow>
                                {
                                    this.state.header.map((value, index) => {
                                        return (
                                            <th key={index}>{value}</th>
                                        )
                                    })
                                }
                            </TableRow>
                        </thead>
                        <tbody>
                            {this.props.children}
                        </tbody>
                    </table>
                </Div>
                <Div class="halaman">
                    <Div class="pagination">
                        <a href="/#">&laquo;</a>
                        <a href="/#">1</a>
                        <a className="active" href="/#">2</a>
                        <a href="/#">3</a>
                        <a href="/#">4</a>
                        <a href="/#">5</a>
                        <a href="/#">6</a>
                        <a href="/#">&raquo;</a>
                    </Div>
                </Div>
            </Div>
         );
    }
}
 
export default Table;