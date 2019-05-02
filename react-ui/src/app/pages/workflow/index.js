import React, { Component } from 'react';

import MainLayout from '../../layouts/default';

import './index.css';

export default class Workflow extends Component {
    render() {
        return (
            <MainLayout active={'workflow'} section_active={'notmanagement'}>
                <div id='workflow'>
                    
                </div>
            </MainLayout>
        )
    }
}