import React, { Component } from 'react';

import './index.css';

export default class GroupActions extends Component {
    render() {
        return (
            <div id='groups_actions'>
                <div className='group_action' style={{'borderLeft' : '#3F8C91 1px solid'}} >
                    CREATE
                </div>
                <div className='group_action'>
                    EDIT
                </div>
                <div className='group_action'>
                    DELETE
                </div>
            </div>
        )
    }
}
