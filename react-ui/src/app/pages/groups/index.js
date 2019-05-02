import React, { Component } from 'react';
import { Table } from 'react-bootstrap';
import { connect } from 'react-redux';

import MainLayout from '../../layouts/default';
import GroupActions from './layouts/groupactions';

import './index.css';

import { groupActions } from '../../../actions';

class Groups extends Component {
    constructor(props) {
        super(props);
        
        this.props.dispatch(groupActions.list())
    }

    render() {
        const { user, groups } = this.props;
        
        const group_list = groups && groups.map(group => {
            const date = new Date(group.lastModificationAuditInfo.date);
            const lastmodificationdate = date.toLocaleDateString('fr-FR') + ' ' +  date.toLocaleTimeString('fr-FR');
            return (
                <tr key={'group'+group.id}>
                    <td>{group.name}</td>
                    <td>{group.description}</td>
                    <td className='normal-column'>{group.lastModificationAuditInfo.author}</td>
                    <td className='normal-column'>{lastmodificationdate}</td>
                </tr>
            )
        })
        return (
            <MainLayout active={'management'} section_active={'groups'} right={user && user.role}>
                <div id='groups'>
                    <GroupActions/>
                    <div id='group_list'>
                        <Table responsive bordered condensed hover>
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Description</th>
                                    <th className='normal-column'>Last User</th>
                                    <th className='normal-column'>Last Modification</th>
                                </tr>
                            </thead>
                            <tbody>
                                {group_list}
                            </tbody>
                        </Table>
                    </div>
                </div>
            </MainLayout>
        )
    }
}

function mapStateToProps(state) {
    const { groups, auth } = state;
    const { user } = auth;

    return {
        user,
        groups: groups.data
    };
}

export default connect(mapStateToProps)(Groups)
