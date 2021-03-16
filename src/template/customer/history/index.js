import React, { Component } from 'react';
import './style.css';
import Navigation from '../navigation';
import Table from '../../../component/table';

class History extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }

    componentDidMount() {
        document.body.classList.remove("background");
    }
    
    render() { 
        return ( 
            <React.Fragment>
                <Navigation />
                <Table />
            </React.Fragment>
            
         );
    }
}
 
export default History;