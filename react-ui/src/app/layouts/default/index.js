import React, { Component } from 'react';

import Header from '../components/commun/header';
import Menu from '../components/commun/menu';
import Footer from '../components/commun/footer';

import './index.css'

export default class MainLayout extends Component {
    render() {
        return (
            <div className="layout">
                <Header active={this.props.active} navigation={this.props} />
                <div className='main'>
                    <Menu active={this.props.section_active} right={this.props.right} section_name={this.props.section_name}  section_info={this.props.section_info} />
                    <div className="content" >
                        {this.props.children}
                    </div>
                </div>
                <Footer active={this.props.active} />
            </div>
        );
    }
}
