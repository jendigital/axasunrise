import React, { Component } from 'react';
import { Table } from 'react-bootstrap';
import { connect } from 'react-redux';

import MainLayout from '../../layouts/default';

import './index.css';

import { userActions } from '../../../actions';
import { groupActions } from '../../../actions';
import { authorizationActions } from '../../../actions';


class Authorizations extends Component {
    constructor(props) {
        super(props);
        
        this.props.dispatch(groupActions.list())
        this.props.dispatch(userActions.getAll())
        this.props.dispatch(authorizationActions.list())
    }

    render() {
        const { user, users, groups, authorizations } = this.props;
        console.log(users)
        console.log(groups)
        console.log(authorizations);
        const user_authorizations = authorizations && authorizations.map((authorization, index) => {
            const User = users && users.find(user => {
                return user.id === authorization.userId
            })

            const Group = groups && groups.find(group => {
                return group.id === authorization.groupId
            })

            return (
                <tr key={'Authorization' + index}>
                    <td>{User && User.firstName}</td>
                    <td>{User && User.lastName}</td> 
                    <td>{User && User.login}</td>
                    <td>{Group && Group.name}</td>
                </tr>
            )

        })
        return (
            <MainLayout active={'management'} section_active={'authorisation'} right={user && user.role}>
                <div id='authorizations'>
                    <div id='authorization_users'>
                        <Table responsive bordered condensed hover>
                            <thead>
                                <tr>
                                    <th>First Name</th>
                                    <th>Last Name</th> 
                                    <th>Login</th>
                                    <th>Groups</th>
                                </tr>
                            </thead>
                            <tbody>
                                {user_authorizations}
                            </tbody>
                        </Table>
                    </div>
                    <div id='authorization'>
                        <div id='title'>
                            Authorizations :
                        </div>
                        <div className='sections'>
                            <div className='columns'>
                                <div className='section'>Model</div>
                                <div className='authorization'>
                                    <p><input type='checkbox' /> Create Model</p>
                                    <p><input type='checkbox' /> Delete Model</p>
                                    <p><input type='checkbox' /> Edit Model</p>
                                    <p><input type='checkbox' /> Version Model</p>
                                    <p><input type='checkbox' /> Export Model</p>
                                    <p><input type='checkbox' /> Import Model</p>
                                    <p><input type='checkbox' /> Add History</p>
                                    <p><input type='checkbox' /> Remove History</p>
                                    <p><input type='checkbox' /> Edit History</p>
                                </div>
                            </div>
                            <div className='columns'>
                                <div className='section'>Code</div>
                                <div className='authorization'>
                                    <p><input type='checkbox' /> Read Code</p>
                                    <p><input type='checkbox' /> Edit Code</p>
                                    <p><input type='checkbox' /> Submit Code</p>
                                </div>
                            </div>
                            <div className='columns'>
                                <div className='section'>Data Source</div>
                                <div className='authorization'>
                                    <p><input type='checkbox' /> Add Data Source</p>
                                    <p><input type='checkbox' /> Add Data Source attribute</p>
                                    <p><input type='checkbox' /> Remove Data Source</p>
                                    <p><input type='checkbox' /> Remove Data Source attribute</p>
                                    <p><input type='checkbox' /> Edit Data Source Property</p>
                                    <p><input type='checkbox' /> Edit Data Source's attributes Property</p>
                                </div>
                            </div>
                            <div className='columns'>
                                <div className='section'>Assumption</div>
                                <div className='authorization'>
                                    <p><input type='checkbox' /> Add Assumption</p>
                                    <p><input type='checkbox' /> Add Assumption attribute</p>
                                    <p><input type='checkbox' /> Remove Assumption</p>
                                    <p><input type='checkbox' /> Remove Assumption attribute</p>
                                    <p><input type='checkbox' /> Edit Assumption Property</p>
                                    <p><input type='checkbox' /> Edit Assumption's attributes Property</p>
                                </div>
                            </div>
                            <div className='columns'>
                                <div className='section'>Scenario</div>
                                <div className='authorization'>
                                    <p><input type='checkbox' /> Add Scenario</p>
                                    <p><input type='checkbox' /> Add Scenario attribute</p>
                                    <p><input type='checkbox' /> Remove Scenario</p>
                                    <p><input type='checkbox' /> Remove Scenario attribute</p>
                                    <p><input type='checkbox' /> Edit Scenario Property</p>
                                    <p><input type='checkbox' /> Edit Scenario's attributes Property</p>
                                </div>
                            </div>
                            <div className='columns'>
                                <div className='section'>Data</div>
                                <div className='authorization'>
                                    <p><input type='checkbox' /> Add Data</p>
                                    <p><input type='checkbox' /> Add Data attribute</p>
                                    <p><input type='checkbox' /> Remove Data</p>
                                    <p><input type='checkbox' /> Remove Data attribute</p>
                                    <p><input type='checkbox' /> Edit Data Property</p>
                                    <p><input type='checkbox' /> Edit Data's attributes Property</p>
                                </div>
                            </div>
                            <div className='columns'>
                                <div className='section'>Data Link</div>
                                <div className='authorization'>
                                    <p><input type='checkbox' /> Add Link</p>
                                    <p><input type='checkbox' /> Remove Event Link</p>
                                    <p><input type='checkbox' /> Edit Event Link Property</p>
                                </div>
                            </div>
                            <div className='columns'>
                                <div className='section'>Output</div>
                                <div className='authorization'>
                                    <p><input type='checkbox' /> Add Output</p>
                                    <p><input type='checkbox' /> Remove Output Link</p>
                                    <p><input type='checkbox' /> Edit Output Link Property</p>
                                </div>
                            </div>
                            <div className='columns'>
                                <div className='section'>Service</div>
                                <div className='authorization'>
                                    <p><input type='checkbox' /> Add Service</p>
                                    <p><input type='checkbox' /> Add Service attribute</p>
                                    <p><input type='checkbox' /> Add Service function</p>
                                    <p><input type='checkbox' /> Remove Service</p>
                                    <p><input type='checkbox' /> Remove Service attribute</p>
                                    <p><input type='checkbox' /> Remove Service function</p>
                                    <p><input type='checkbox' /> Edit Service Property</p>
                                    <p><input type='checkbox' /> Edit Service's attributes Property</p>
                                    <p><input type='checkbox' /> Edit Service's function Property</p>
                                </div>
                            </div>
                            <div className='columns'>
                                <div className='section'>Data Loader</div>
                                <div className='authorization'>
                                    <p><input type='checkbox' /> Add Data Loader</p>
                                    <p><input type='checkbox' /> Add Data Loader data</p>
                                    <p><input type='checkbox' /> Remove Data Loader</p>
                                    <p><input type='checkbox' /> Remove Data Loader data</p>
                                    <p><input type='checkbox' /> Edit Data Loader Property</p>
                                </div>
                            </div>
                            <div className='columns'>
                                <div className='section'>Event Sequencer</div>
                                <div className='authorization'>
                                    <p><input type='checkbox' /> Add Event Sequencer</p>
                                    <p><input type='checkbox' /> Remove Event Sequencer</p>
                                    <p><input type='checkbox' /> Edit Event Sequencer Property</p>
                                    <p><input type='checkbox' /> Delete Event Sequencer code version</p>
                                </div>
                            </div>
                            <div className='columns'>
                                <div className='section'>Others</div>
                                <div className='authorization'>
                                    <p><input type='checkbox' /> Use Run Manager</p>
                                    <p><input type='checkbox' /> Use Workflow Manager</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </MainLayout>
        )
    }
}

function mapStateToProps(state) {
    const { authorizations, users, groups, auth } = state;
    const { user } = auth;

    return {
        user,
        users: users.data,
        groups: groups.data,
        authorizations: authorizations.data
    };
}

export default connect(mapStateToProps)(Authorizations)
