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
          <p>Side by Side Financials LLC. 2018</p>
        </div>
      </div>
    )
  }
}

