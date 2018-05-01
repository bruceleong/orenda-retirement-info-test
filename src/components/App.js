import React, { Component } from 'react'
import './App.css';
import Routes from './Routes'


export default class App extends Component {

  render() {
    return (
      <div className="App">
          <div>
            <Routes />
          </div>
        <div id="footer">
          <p>© 2018 · Side By Side Financials · All Rights Reserved.</p>
        </div>
      </div>
    )
  }
}

