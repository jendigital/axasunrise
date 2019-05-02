import React, { Component } from 'react';

import MainLayout from '../../layouts/default';

import './index.css';

export default class Scheduled extends Component {
    render() {
        return (
            <MainLayout active={'scheduled'} section_active={'notmanagement'}>
                <div id='scheduled'>
                    
                </div>
            </MainLayout>
        )
    }
}