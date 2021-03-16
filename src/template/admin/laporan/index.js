import React, { Component } from 'react';
import Navigation from '../navigation';

class Laporan extends Component {
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
            </React.Fragment>
         );
    }
}
 
export default Laporan;