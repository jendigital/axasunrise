import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import CreateModel from '../../modals/createmodel'
import EditModel from '../../modals/editmodel'
import DeleteModel from '../../modals/deletemodel'
import CompareModel from '../../modals/comparemodel'
import ImportModel from '../../modals/import'
import ExportModel from '../../modals/export'
import VersionModel from '../../modals/version'

import { models } from '../../../../../utils/models.js'

import './index.css';

import Refresh from '../../../../assets/img/refresh.png';

export default class ModelActions extends Component {

    modeling(model) {
        let modelsOpened = models();
        if(modelsOpened.length === 0 || !modelsOpened.some(modelToAdd => modelToAdd.id === model.id)) {
            let modelToAdd = {
                id: model.id,
                title: model.name,
                type: 'model',
                content: ''
            }

            modelsOpened.push(modelToAdd);
            localStorage.setItem('models', JSON.stringify(modelsOpened));

            let currentTab = model.id;
            console.log(currentTab)
            localStorage.setItem('currentTab', currentTab);
        }
    }

    render() {
        return (
            <div id='model_edition'>
                <div id='crud'>
                    <Link to='/management' >
                        <div className={this.props.active==='list' ? 'active model_action' : 'model_action'} >
                            MODELS
                        </div>
                    </Link>
                    {
                        this.props.model !== null &&
                        <Link to={{pathname:'/tablist'}} >
                            <div className='model_action' onClick={() => this.modeling(this.props.model)}>
                                OPEN
                            </div>
                        </Link>
                    }
                    <CreateModel active={this.props.active} />
                    <EditModel active={this.props.active} />
                    <DeleteModel active={this.props.active} />
                    <div className='model_action'>
                        <img src={Refresh} />
                    </div>
                    <CompareModel active={this.props.active} />
                    <Link to='/tablist'>
                        <div className={this.props.active==='hierarchie' ? 'active model_action' : 'model_action'}>
                            HIERARCHY
                        </div>
                    </Link>
                    <Link to='/tablist'>
                        <div className={this.props.active==='logs' ? 'active model_action' : 'model_action'}>
                            LOGS
                        </div>
                    </Link>
                </div>
                <div id='transfer'>
                    <ExportModel active={this.props.active} />
                    <ImportModel active={this.props.active} />
                    <VersionModel active={this.props.active} />
                </div>
            </div>
        )
    }
}
