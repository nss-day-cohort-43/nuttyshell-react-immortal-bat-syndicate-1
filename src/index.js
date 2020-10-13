import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from "react-router-dom";
import { Nutshell } from "./components/Nutshell"
import 'semantic-ui-css/semantic.min.css'
import './index.css';
import 'semantic-ui-css/semantic.min.css'

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Nutshell />
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);
