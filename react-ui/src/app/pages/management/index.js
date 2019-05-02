import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import MainLayout from '../../layouts/default';
import ModelActions from './layouts/modelactions';
import ModelHistory from './layouts/modelhistory';

import './index.css';

import { modelActions } from '../../../actions';

class Management extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            histories: null,
            history_empty: false,
            model: null,
            modelId: null,
        }

        this.props.dispatch(modelActions.list())

        this.history_show = this.history_show.bind(this);
    }

    history_show(model, histories) {
        this.setState({
            modelId: model.id,
            model
        })

        if(histories.length === 0) {
            this.setState({
                histories: null,
                history_empty: true
            })
        } else {
            histories.sort((a,b) => {
                var dateA = new Date(a.lastModificationAuditInfo.date);
                var dateB = new Date(b.lastModificationAuditInfo.date);
                return dateA>dateB ? -1 : dateA<dateB ? 1 : 0;
            })
            this.setState({
                histories: histories,
                history_empty: false
            })
        }
    }

    render() {
        const { user, models } = this.props;

        models && Array.isArray(models) && models.sort(function(a, b) {
            var dateA, dateB;
            if(a.histories[0]) {
                dateA = new Date(a.histories[0].lastModificationAuditInfo.date);
            } else {
                dateA = new Date(a.auditInfo.date);
            }
            if(b.histories[0]) {
                dateB = new Date(b.histories[0].lastModificationAuditInfo.date);
            } else {
                dateB = new Date(b.auditInfo.date);
            }
            return dateA>dateB ? -1 : dateA<dateB ? 1 : 0;
        })

        const model_list = models && Array.isArray(models) && models.map(model => {
            let model_url=`/model/${model.id}`
            var lastmodificationby;
            var lastmodificationdate;
            var date;
            var version;
            if(model.histories[0]) {
                lastmodificationby = model.histories[0].lastModificationAuditInfo.author;
                date = new Date(model.histories[0].lastModificationAuditInfo.date);
            } else {
                lastmodificationby = model.auditInfo.author;
                date = new Date(model.auditInfo.date);
            }
            lastmodificationdate = date.toLocaleDateString('fr-FR') + ' ' +  date.toLocaleTimeString('fr-FR');
            version = model.version.major + '.' + model.version.medium + '.' + model.version.minor;
            return (
                <tr key={'mngt'+model.id} className={this.state.modelId === model.id  ? 'current_model': ''} onClick={() => this.history_show(model, model.histories)} >
                    <td>{model.name}</td>
                    <td className='small-column'>{version}</td> 
                    <td>{model.description}</td>
                    <td className='normal-column'>{model.userGroupName}</td>
                    <td className='normal-column'>{lastmodificationdate}</td>
                    <td className='normal-column'>{lastmodificationby}</td>
                </tr>
            )
        })

        const histories = this.state.histories && this.state.histories.map(history => {
            var date = new Date(history.lastModificationAuditInfo.date);
            var lastmodificationdate = date.toLocaleDateString('fr-FR') + ' ' +  date.toLocaleTimeString('fr-FR');

            return (
                <tr key={'history'+history.id} >
                    <td className='normal-column'>{history.type}</td>
                    <td>{history.name}</td>
                    <td>{history.description}</td>
                    <td className='normal-column'>{lastmodificationdate}</td>
                    <td className='normal-column'>{history.lastModificationAuditInfo.author}</td>
                </tr>
            )
        })

        const empty_history = 
            <tr key={'history1'}>
                <td className='normal-column'></td>
                <td></td>
                <td>Pas d'historique disponible sur ce modèle</td>
                <td className='normal-column'></td>
                <td className='normal-column'></td>
            </tr>

        return (
            <MainLayout active={'management'} section_active={'model'} right={user && user.role}>
                <div id='models'>
                    <ModelActions active='list' model={this.state.model} />
                    <div id='model_list'>
                        <Table responsive bordered condensed hover >
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th className='small-column'>Version</th> 
                                    <th>Description</th>
                                    <th className='normal-column'>Model Level</th>
                                    <th className='normal-column'>Last Modification Date</th>
                                    <th className='normal-column'>Last Modification by</th>
                                </tr>
                            </thead>
                            <tbody>
                                {model_list}
                            </tbody>
                        </Table>
                    </div>
                    

                    <ModelHistory />
                    <div id='history'>
                        <Table responsive bordered condensed hover>
                            <thead>
                                <tr>
                                    <th className='normal-column'>Type</th>
                                    <th>Title</th> 
                                    <th>Description</th>
                                    <th className='normal-column'>Last Modification Date</th>
                                    <th className='normal-column'>Last Modification by</th>
                                </tr>
                            </thead>
                            <tbody>
                                {histories}
                                {this.state.history_empty && empty_history}
                            </tbody>
                        </Table>
                    </div>
                </div>
            </MainLayout>
        )
    }
}

function mapStateToProps(state) {
    const { models, auth } = state;
    const { user } = auth;

    return {
        user,
        models: models.data
    };
}

export default connect(mapStateToProps)(Management)
