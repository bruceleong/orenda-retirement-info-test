import React, { Component } from 'react'
import './App.css';
import Routes from './Routes'
import AppDrawerLoggedOut from './AppDrawerLoggedOut'
import AppDrawerLoggedIn from './AppDrawerLoggedIn'

// Material UI
import AppBar from 'material-ui/AppBar'
import { BrowserRouter } from 'react-router-dom'


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
        <BrowserRouter>
          <div>
            {
              !localStorage.getItem('company')
                ? <AppDrawerLoggedOut
                  open={this.state.open}
                  handleClose={this.handleClose}
                  handleToggle={this.handleToggle}
                />
                : <AppDrawerLoggedIn
                  open={this.state.open}
                  handleClose={this.handleClose}
                  handleToggle={this.handleToggle}
                />
            }
            <AppBar
              title="Side By Side Financials"
              onLeftIconButtonClick={this.handleToggle}
              // iconElementRight={this.state.logged ? <Logged /> : <Login />}
              style={{backgroundColor: 'green'}}
            />
            <div id="header">
              <h1 id="title">Employee Resource</h1>
            </div>
            <Routes />
          </div>
        </BrowserRouter>
        <br />
        <div id="footer">
          <p>Side by Side Financials LLC. 2018</p>
        </div>
      </div>
    )
  }
}

