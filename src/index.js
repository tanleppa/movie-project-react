import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { faSearch, faCaretRight, faCaretLeft, faSpinner, faStar, faBars, faTimes, faCircle } from "@fortawesome/free-solid-svg-icons"
import { library } from '@fortawesome/fontawesome-svg-core';
library.add( faSearch, faCaretRight, faCaretLeft, faSpinner, faStar, faBars, faTimes, faCircle )

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
