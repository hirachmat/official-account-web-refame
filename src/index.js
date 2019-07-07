import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import '../node_modules/uikit/dist/css/uikit.css'
import '../node_modules/uikit/dist/js/uikit.min.js'
import '../node_modules/uikit/dist/js/uikit-icons.js'

const store = configureStore();

ReactDOM.render(
    <Router>
        <Provider store={store}>
            <App />
        </Provider>
    </Router>, document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
