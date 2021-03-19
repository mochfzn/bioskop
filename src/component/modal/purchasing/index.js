import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import './style.css';
import Seat from './seat';
import Table from './table';
import { Div } from '../../index';

class Purchasing extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            // Data
            purchasingBySchedule: [],
            total: "",
            seatBooked: [],
            restSeats: "",

            // Navigation
            toRegular: false,
            toVip: false,
            order: false,

            // Alert
            alert: ""
         }
    }

    close = () => {
        const modal = document.getElementById("modal");
        modal.style.display = "none";

        this.setState({order: false});
        this.props.setSchedule({});
        this.props.setSeat("");
    }

    saveSchedule = schedule => {
        this.props.setSchedule(schedule);
        this.getPurchasing(schedule);
    }

    backToSchedule = () => {
        this.props.setSchedule({});
        this.props.setSeat("");

        this.setState({
            order: false
        });
    }

    onClickSaveSeat = () => {

        if(this.validation() === true)
        {
            if(this.props.schedule.ruang.jenis === 1)
            {
                this.setState({
                    toRegular: true
                });
            }
            else if(this.props.schedule.ruang.jenis === 2)
            {
                this.setState({
                    toVip: true
                });
            }
    
            const modal = document.getElementById("modal");
            modal.style.display = "none";
        }
    }

    onChangeSeatAmount = event => {
        let amount = event.target.value;
        let total = amount * this.props.schedule.ruang.harga;

        this.props.setSeat(amount);
        this.setState({
            total: total
        });

        const totalDom = document.getElementById("total")
        totalDom.style.display = "block";
    }

    validation = () => {
        const alert = document.getElementById("notification");

        if(this.props.seatAmount === "")
        {
            alert.style.display = "block";
            return false;
        }

        return true;
    }

    getPurchasing = schedule => {
        //const alert = document.getElementById("alert");

        fetch('http://localhost:8080/bioskop/pembelian/jadwal/' + schedule.id, {
            method: "get",
            headers: {
                "Content-Type": "application/json; ; charset=utf-8",
                "Access-Control-Allow-Headers": "Authorization, Content-Type",
                "Access-Control-Allow-Origin": "*"
            }
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
                this.setState({
                    purchasingBySchedule: json
                });
            }
        })
        .then(() => {
            this.state.purchasingBySchedule.forEach(value => {
                value.tempatDuduk.forEach(value => {
                    let seat = this.state.seatBooked;
                    seat.push(value.posisi);
                    
                    this.setState({
                        seatBooked: seat
                    });
                });
            });

            this.props.setBenchChoice(this.state.seatBooked);
        })
        .then(() => {
            this.countRestSeats();

            this.setState({
                order: true
            });

            this.setState({
                seatBooked: []
            });
        })
        .catch((e) => {
            //this.setState({alert: "Gagal mengirimkan data! " + e});
            //alert.style.display = "block";

            console.log(e);
        });
    }

    countRestSeats = () => {
        let totalRegular = 50;
        let totalVip = 10;

        if(this.props.schedule.ruang.jenis === 1)
        {
            let totalSeatBooked = this.state.seatBooked.length;
            let rest = totalRegular - totalSeatBooked;

            this.setState({
                restSeats: rest
            });
        }
        else if(this.props.schedule.ruang.jenis === 2)
        {
            let totalSeatBooked = this.state.seatBooked.length;
            let rest = totalVip - totalSeatBooked;

            this.setState({
                restSeats: rest
            });
        }
    }

    render() { 
        let modal;

        if(this.state.toRegular === true)
        {
            return <Redirect to="/customer/bench/regular" />
        }
        else if(this.state.toVip === true)
        {
            return <Redirect to="/customer/bench/vip" />
        }

        if(this.state.order !== false)
        {
            modal = <Seat close={this.close} seatAmount={this.props.seatAmount} onChangeSeatAmount={this.onChangeSeatAmount} 
                        total={this.state.total} onClickSaveSeat={this.onClickSaveSeat} backToSchedule={this.backToSchedule}
                        purchasing={this.state.purchasingBySchedule} restSeats={this.state.restSeats} />;
        }
        else 
        {
            modal = <Table close={this.close} saveSchedule={this.saveSchedule} schedules={this.props.schedules} />;
        }

        return ( 
            <Div id="modal" class="modal">
                {modal}
            </Div>
         );
    }
}
 
export default Purchasing;