import React, { Component } from 'react';
import { Table } from 'react-bootstrap';
import { connect } from 'react-redux';


import MainLayout from '../../layouts/default';
import UserActions from './layouts/useractions';

import './index.css';

import { userActions } from '../../../actions';
import { groupActions } from '../../../actions';

class Users extends Component {
    constructor(props) {
        super(props);
        
        this.props.dispatch(groupActions.list())
        this.props.dispatch(userActions.getAll())
    }

    render() {
        const { user, users, groups } = this.props;

        const user_list = users && users.map(user => {
            const date = new Date(user.lastModificationAuditInfo.date);
            const lastmodificationdate = date.toLocaleDateString('fr-FR') + ' ' +  date.toLocaleTimeString('fr-FR');

            const UserGroups = user.userGroupIds.map(userGroupId => {
                return  groups && groups.find(group => {
                    return group.id === userGroupId;
                })
            })

            const listOfGroup = UserGroups && UserGroups.map(group => {
                return group && group.name
            }).join(', ');

            return (
                <tr key={'user'+user.id}>
                    <td>{user.firstName}</td>
                    <td>{user.lastName}</td>
                    <td>{user.login}</td>
                    <td>{listOfGroup}</td>
                    <td className='normal-column'>{user.lastModificationAuditInfo.author}</td>
                    <td className='normal-column'>{lastmodificationdate}</td>
                </tr>
            )
        })
        return (
            <MainLayout active={'management'} section_active={'users'} right={user && user.role}>
                <div id='users'>
                    <UserActions />
                    <Table responsive bordered condensed hover>
                        <thead>
                            <tr>
                                <th>First Name</th>
                                <th>Last Name</th> 
                                <th>Login</th>
                                <th>Groups</th>
                                <th className='normal-column'>Last Modification by</th>
                                <th className='normal-column'>Last Date Modification</th>
                            </tr>
                        </thead>
                        <tbody>
                            {user_list}
                        </tbody>
                    </Table>     
                </div>
            </MainLayout>
        )
    }
}

function mapStateToProps(state) {
    const { users, groups, auth } = state;
    const { user } = auth;

    return {
        user,
        users: users.data,
        groups: groups.data
    };
}

export default connect(mapStateToProps)(Users)
