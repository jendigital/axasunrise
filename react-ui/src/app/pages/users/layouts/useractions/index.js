import React, { Component } from 'react';

import './index.css';

export default class UserActions extends Component {
    render() {
        return (
            <div id='users_actions'>
                <div className='user_action' style={{'borderLeft' : '#3F8C91 1px solid'}} >
                    CREATE
                </div>
                <div className='user_action'>
                    EDIT
                </div>
                <div className='user_action'>
                    DELETE
                </div>
            </div>
        )
    }
}
