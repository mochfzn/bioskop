import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import './style.css';
import Navigation from '../navigation';
import film from '../../../images';
import { Div, Tanggal, Button, Alert } from '../../../component';

class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            data: [],
            alert: "",
            detail: false,
            date: "",
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
    }

    componentDidMount() {
        document.body.classList.remove("background");
        document.getElementById("view-all").style.display = "none";

        this.countData();
    }

    onClickViewAll = () => {
        this.countData();
        this.setState({
            date: ""
        }, () => document.getElementById("view-all").style.display = "none");
    }

    onChangeDate = event => {
        this.setState({
            date: event.target.value
        }, () => {
            document.getElementById("view-all").style.display = "block";
            this.countDataSearchByDate();
        });
    }

    countData = () => {
        const alert = document.getElementById("alert");

        fetch('http://localhost:8080/bioskop/film/playing/', {
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
            this.getFilmIsPlaying();
        })
        .catch((e) => {
            this.setState({alert: "Gagal mengambil data! ", e});
            alert.style.display = "block";
        });
    }

    getFilmIsPlaying = () => {
        const alert = document.getElementById("alert");

        fetch('http://localhost:8080/bioskop/film/playing/limit/' + this.state.paging.limit + '/offset/' + this.state.paging.offset, {
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

    countDataSearchByDate = () => {
        const alert = document.getElementById("alert");
        let dateSearch;

        if(this.state.date === "") 
        {
            dateSearch = "&nbsp;";
        }
        else
        {
            let date = new Date(this.state.date);
            let hari = date.getDate();
            let bulan = date.getMonth() + 1;
            let tahun = date.getFullYear();

            if(bulan < 10)
                bulan = '0' + bulan.toString();
            if(hari < 10)
                hari = '0' + hari.toString();

            dateSearch = hari + "-" + bulan + "-" + tahun;
        }

        fetch('http://localhost:8080/bioskop/film/playing/tanggal/' + dateSearch, {
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

        fetch('http://localhost:8080/bioskop/film/playing/tanggal/' + value + '/limit/' + this.state.paging.limit + '/offset/' + this.state.paging.offset, {
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

    getImage = title => {
        let imageObject;

        imageObject = film.find(value => {
            return value.title === title;
        });

        return imageObject.image;
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
        const { startRow, maxRow, page, currPage } = this.state.paging;
        let pages = [];

        if(this.props.login === false)
        {
            return <Redirect to="/" />
        }
        else if(this.props.role === 0)
        {
            return <Redirect to="/admin" />
        }

        for(let i = startRow; i < (maxRow + startRow); i++)
        {
            if(i <= page)
            {
                pages.push (
                    <Button key={i} class={(i === currPage) ? "button active" : "button"} onClick={() => this.setCurrPage(i)} value={i} />
                )
            }
        }
        
        return ( 
            <React.Fragment>
                <Navigation />
                <Alert>{this.state.alert}</Alert>
                <Div class="pelanggan">
                    <Div class="tanggal">
                        <Tanggal name="nama" class="input" id="tanggal" placeholder="Tanggal" value={this.state.date} onChange={this.onChangeDate} min={"min"} />
                        <Button class="button" value="Lihat Semua" id="view-all" name="view-all" onClick={this.onClickViewAll} />
                    </Div>
                    <Div class="content">
                        {
                            this.state.data.map((value, index) => {
                                return(
                                    <Div class="movie" key={index}>
                                        <img src={this.getImage(value.judul)} alt={value.judul} className="image" />
                                        <Div class="middle">
                                            <Link to={"/customer/detail/" + value.id} className="button">Lihat</Link>
                                        </Div>
                                    </Div>
                                )
                            })
                        }
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
 
export default connect(mapStateToProps)(Dashboard);