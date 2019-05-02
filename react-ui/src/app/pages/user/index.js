import React, { Component } from 'react';

import MainLayout from '../../layouts/default';

import './index.css';

export default class User extends Component {
    render() {
        return (
            <MainLayout active={'user'}>
                <div id='user'>
                    
                </div>
            </MainLayout>
        )
    }
}