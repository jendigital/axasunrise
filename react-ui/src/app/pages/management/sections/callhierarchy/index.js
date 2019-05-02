import React, { Component } from 'react';

import MainLayout from '../../../../layouts/default';
import ModelActions from '../../layouts/modelactions'

import './index.css';

export default class CallHierarchie extends Component {
    render() {
        return (
            <MainLayout active={'management'} section_active={'model'}>
                <div id='models'>
                   HIERARCHY
                </div>
            </MainLayout>
        )
    }
}
