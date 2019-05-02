import React, { Component } from 'react';

import './index.css';

export default class ModelHistory extends Component {
    render() {
        return (
            <div id='model_history'>
                <div className='history_action' >
                    CREATE
                </div>
                <div className='history_action'>
                    EDIT
                </div>
                <div className='history_action'>
                    DELETE
                </div>
                <div className='history_title'>
                    HISTORY
                </div>
            </div>
        )
    }
}
