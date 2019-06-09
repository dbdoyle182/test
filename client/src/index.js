import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './app/layouts/App';
import * as serviceWorker from './serviceWorker';

const reactHook = document.getElementById('root');

const reactApp = (<App />);

ReactDOM.render(reactApp, reactHook);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
