import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navigation from './Navigation';

ReactDOM.render(
  <React.StrictMode>
    <Navigation />
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

