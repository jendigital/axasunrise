import React, { Component } from 'react';

import MainLayout from '../../layouts/default';

import './index.css';

export default class Projection extends Component {
    render() {
        return (
            <MainLayout active={'projection'} section_active={'notmanagement'}>
                <div id='projection'>
                    
                </div>
            </MainLayout>
        )
    }
}