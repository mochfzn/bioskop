import React, { Component } from 'react';

class Tanggal extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }

    componentDidMount() {
        this.setValidationDate();
    }

    setValidationDate = () => {
        let today = new Date();

        let month = today.getMonth() + 1;
        let day = today.getDate();
        let year = today.getFullYear();

        if(month < 10)
            month = '0' + month.toString();
        if(day < 10)
            day = '0' + day.toString();
        
        let maxDate = year + '-' + month + '-' + day;
        const text = document.getElementById(this.props.id);

        if(this.props.min === "min")
            text.setAttribute("min", maxDate);
        else if(this.props.max === "max")
            text.setAttribute("max", maxDate);
    }

    render() { 
        return ( 
            <input type="date" name={this.props.name} className={this.props.class} id={this.props.id} value={this.props.value} 
                defaultValue={this.props.defaultValue} placeholder={this.props.placeholder} onChange={this.props.onChange} onKeyDown={(e) => e.preventDefault()}
                disabled={this.props.disabled} />
         );
    }
}
 
export default Tanggal;