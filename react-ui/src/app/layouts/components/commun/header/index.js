import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import './index.css';

import Sunrise from '../../../../assets/img/logo.png';
import Help from '../../../../assets/img/help.png'
import Info from '../../../../assets/img/info.png'
import User from '../../../../assets/img/user.png'

export default class Header extends Component {
    constructor(props) {
        super(props);

        this.state = {date: new Date()};
    }

    componentDidMount() {
        this.timerID = setInterval(
          () => this.tick(),
          1000
        );
    }

    componentWillUnmount() {
        clearInterval(this.timerID);
    }

    tick() {
        this.setState({
          date: new Date()
        });
    }

    day() {
        let options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        let day = this.state.date.toLocaleDateString('fr-FR', options);

        day = day.charAt(0).toUpperCase() + day.slice(1);
        return day;
    }

    render() {
        return (
            <div className='header'>
                <Link to='/management'><img alt='Sunrise' className='logo' src={Sunrise} /></Link>
                <Link to='/management'>
                    <div className={this.props.active === 'management' ? 'tabs active' : 'tabs'}>
                        Management
                    </div>
                </Link>
                <Link to='/tablist'>
                    <div className={this.props.active === 'modeling' ? 'tabs active' : 'tabs'}>
                        Modeling
                    </div>
                </Link>
                <Link to='/workflow'>
                    <div className={this.props.active === 'workflow' ? 'tabs active' : 'tabs'}>
                        Workflow
                    </div>
                </Link>
                <Link to='/projection'>
                    <div className={this.props.active === 'projection' ? 'tabs active' : 'tabs'}>
                        Projection
                    </div>
                </Link>
                <Link to='/scheduled'>
                    <div className={this.props.active === 'scheduled' ? 'tabs active' : 'tabs'}>
                        Scheduled Projection
                    </div>
                </Link>
                <div className='info'>
                    <Link to='/user'>
                        <div className={this.props.active === 'user' ? 'tabs active' : 'tabs'}>
                            <img className='user' alt='user' src={User} /> User 
                        </div>
                    </Link>
                    <Link to='/about'>
                        <img alt='about' src={Info} />
                    </Link>
                    <Link to='/help'>
                        <img alt='help' src={Help} />
                    </Link>
                </div>
                <div className='datetime'>
                    <span className='date'>{this.day()}</span>
                    <p className='time'>{this.state.date.toLocaleTimeString()}</p>
                </div>
            </div>
        );
    }
}