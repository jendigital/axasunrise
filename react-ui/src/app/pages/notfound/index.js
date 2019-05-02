import React, { Component } from 'react';

import Sunrise from '../../assets/img/sunrise.png'

import './index.css';

export default class NotFound extends Component {
    render() {
        return (
            <div id='not-found'>
                <img alt='sunrise' src={Sunrise} />
                <h1>Désolé, <span>Sunrise n'a pas encore tracé cette route...</span></h1>
            </div>
        )
    }
}