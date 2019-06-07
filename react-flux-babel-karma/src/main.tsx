import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';

import App from './components/App';
import Log from './components/Log';

ReactDOM.render(<App />, document.getElementById('content'));

ReactDOM.render(<Log />, document.getElementById("logs"));
