import React, { Component } from 'react'
import './App.css';
import Routes from './Routes'


export default class App extends Component {
  constructor() {
    super()

    this.state = {
      logged: true,
      open: false,
      authed: false,
    }

  }

  handleChange = (event, logged) => this.setState({ logged: logged })
  handleClose = () => this.setState({ open: false })
  handleToggle = () => this.setState({ open: !this.state.open })

  render() {
    return (
      <div className="App">
          <div>
            <div id="header">
              <h1 id="title">Employee Resource</h1>
            </div>
            <Routes />
          </div>
        <br />
        <div id="footer">
          <p>Side by Side Financials LLC. 2018</p>
        </div>
      </div>
    )
  }
}

