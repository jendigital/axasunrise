import React, { Component } from 'react';

import './index.css';
import Axa from '../../../../assets/img/axa.png'

class Footer extends Component {
    render() {
        return (
            <div id='footer'>
                { this.props.active === 'notmanagement' && <img alt='AXA' src={Axa} /> }
            </div>
        );
    }
}

export default Footer;
