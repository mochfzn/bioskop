import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import './style.css';
import Navigation from '../navigation';
import film from '../../../images';

class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            detail: false
         }
    }

    componentDidMount() {
        document.body.classList.remove("background");
    }

    toDetail = () => {
        this.setState({
            detail: true
        });
    }

    render() { 
        if(this.state.detail === true) {
            return <Redirect to="/customer/detail" />
        }

        return ( 
            <React.Fragment>
                <Navigation />
                <div class="pelanggan">
                    <div class="movie">
                        <img src={film[0].image} alt="demon-slayer-the-movie-mugen-train-kimetsu-no-yaiba-mugen" class="image" />
                        <div class="middle">
                            <input type="button" class="button" value="Lihat" onClick={this.toDetail} />
                        </div>
                    </div>
                    <div class="movie">
                        <img src={film[1].image} alt="dreambuilders-drammebyggerne-2020" class="image" />
                        <div class="middle">
                            <input type="button" class="button" value="Lihat" onClick={this.toDetail} />
                        </div>
                    </div>
                    <div class="movie">
                        <img src={film[2].image} alt="legend-of-deification-jiang-ziya-2020" class="image" />
                        <div class="middle">
                            <input type="button" class="button" value="Lihat" />
                        </div>
                    </div>
                    <div class="movie">
                        <img src={film[3].image} alt="norm-of-the-north-family-vacation-2020" class="image" />
                        <div class="middle">
                            <input type="button" class="button" value="Lihat" />
                        </div>
                    </div>
                    <div class="movie">
                        <img src={film[4].image} alt="onward-2020" class="image" />
                        <div class="middle">
                            <input type="button" class="button" value="Lihat" />
                        </div>
                    </div>
                    <div class="movie">
                        <img src={film[5].image} alt="scooby-doo-the-sword-and-the-scoob-2021" class="image" />
                        <div class="middle">
                            <input type="button" class="button" value="Lihat" />
                        </div>
                    </div>
                    <div class="movie">
                        <img src={film[6].image} alt="soul-2020" class="image" />
                        <div class="middle">
                            <input type="button" class="button" value="Lihat" />
                        </div>
                    </div>
                    <div class="movie">
                        <img src={film[7].image} alt="the-croods-a-new-age-2020" class="image" />
                        <div class="middle">
                            <input type="button" class="button" value="Lihat" />
                        </div>
                    </div>
                    <div class="movie">
                        <img src={film[8].image} alt="the-lego-star-wars-holiday-special-2020" class="image" />
                        <div class="middle">
                            <input type="button" class="button" value="Lihat" />
                        </div>
                    </div>
                    <div class="movie">
                        <img src={film[9].image} alt="tom-and-jerry-2021" class="image" />
                        <div class="middle">
                            <input type="button" class="button" value="Lihat" />
                        </div>
                    </div>
                    <div class="movie">
                        <img src={film[10].image} alt="xicos-journey-el-camino-de-xico-2020" class="image" />
                        <div class="middle">
                            <input type="button" class="button" value="Lihat" />
                        </div>
                    </div>
                    <div class="movie">
                        <img src={film[11].image} alt="batman-soul-of-the-dragon-2021" class="image" />
                        <div class="middle">
                            <input type="button" class="button" value="Lihat" />
                        </div>
                    </div>
                    <div class="halaman">
                        <div class="pagination">
                            <a href="/#">&laquo;</a>
                            <a href="/#">1</a>
                            <a class="active" href="/#">2</a>
                            <a href="/#">3</a>
                            <a href="/#">4</a>
                            <a href="/#">5</a>
                            <a href="/#">6</a>
                            <a href="/#">&raquo;</a>
                        </div>
                    </div>
                </div>
            </React.Fragment>
         );
    }
}
 
export default Dashboard;