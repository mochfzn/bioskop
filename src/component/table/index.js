import React, { Component } from 'react';

import {Div, Label, Select, Option, Text, TableRow, Button, Tanggal} from '../index';
import './style.css';

class Table extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            header: [],
            option: [],
            paging: {
                startRow: 0,
                maxRow: 0,
                page: 0,
                limit: 0,
                currPage: 0,
                offset: 0,
                amount: 0
            }
         }
    }

    componentDidMount() {
        this.setState({
            header: this.props.tableHeader,
            option: this.props.searchOption
        });
    }

    static getDerivedStateFromProps(props, state) {
        return {paging: props.paging};
    }

    render() { 
        // variabel
        const { startRow, maxRow, page, currPage } = this.state.paging;
        let date, text, show, pages;

        // Inisialisasi
        date = 
            <React.Fragment>
                <Tanggal name="nama" class="input" id="tanggal-cari" placeholder="Tanggal" value={this.props.searchText} onChange={this.props.onChangeSearch} />
                <Button id="cari" name="cari" class="button" value="Cari" onClick={this.props.onClickSearch} />
            </React.Fragment>;
        text = <Text name="cari" class="input" placeholder="Cari" value={this.props.searchText} onChange={this.props.onChangeSearch} />;
        pages = [];

        if(this.props.showButton === true)
        {
            show = date;
        }
        else 
        {
            show = text;
        }

        for(let i = startRow; i < (maxRow + startRow); i++)
        {
            if(i <= page)
            {
                pages.push (
                    <Button key={i} class={(i === currPage) ? "button active" : "button"} onClick={() => this.props.setCurrPage(i)} value={i} />
                )
            }
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
                    <Select name="cari" class="select" onChange={this.props.onChangeLimit} value={this.props.limit}>
                        <Option value={3}>3 baris</Option>
                        <Option value={5}>5 baris</Option>
                        <Option value={7}>7 baris</Option>
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
                        {
                            (page > 1) ? 
                                <React.Fragment>
                                    {
                                        (this.state.paging.currPage > 1) ? <Button class="button" value="&laquo;" onClick={() => this.props.setCurrPage(this.state.paging.currPage - 1)} /> : ""
                                    }
                                    {pages}
                                    {
                                        (this.state.paging.currPage < this.state.paging.page) ? <Button class="button" value="&raquo;" onClick={() => this.props.setCurrPage(this.state.paging.currPage + 1)} /> : ""
                                    }
                                </React.Fragment> :
                                ""
                        }
                    </Div>
                </Div>
            </Div>
         );
    }
}
 
export default Table;