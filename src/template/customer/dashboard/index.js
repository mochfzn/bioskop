import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import './style.css';
import Navigation from '../navigation';
import film from '../../../images';
import { Div } from '../../../component';

class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            data: [],
            alert: "",
            detail: false
         }
    }

    componentDidMount() {
        document.body.classList.remove("background");
        this.getFilmIsPlaying();
    }

    getFilmIsPlaying = () => {
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
            this.setState({ data: json })
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

    render() { 
        return ( 
            <React.Fragment>
                <Navigation />
                <Div class="pelanggan">
                    {
                        this.state.data.map((value, index) => {
                            return(
                                <Div class="movie" key={index}>
                                    <img src={this.getImage(value.judul)} alt={value.judul} class="image" />
                                    <Div class="middle">
                                        <Link to={"/customer/detail/" + value.id} className="button">Lihat</Link>
                                    </Div>
                                </Div>
                            )
                        })
                    }
                    
                    <Div class="halaman">
                        <Div class="pagination">
                            <a href="/#">&laquo;</a>
                            <a href="/#">1</a>
                            <a class="active" href="/#">2</a>
                            <a href="/#">3</a>
                            <a href="/#">4</a>
                            <a href="/#">5</a>
                            <a href="/#">6</a>
                            <a href="/#">&raquo;</a>
                        </Div>
                    </Div>
                </Div>
            </React.Fragment>
         );
    }
}
 
export default Dashboard;