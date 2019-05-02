import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'

import App from './app'
import { store } from './utils'
import './index.css'
// setup fake backend
// import { configureFakeBackend } from './utils';
// configureFakeBackend();

ReactDOM.render(
    <Provider store={ store }>
        <App/>
    </Provider>,
    document.getElementById('app')
);
