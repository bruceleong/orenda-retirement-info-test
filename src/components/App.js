import React, { Component } from 'react'
import IconButton from 'material-ui/IconButton'
import IconMenu from 'material-ui/IconMenu'
import MenuItem from 'material-ui/MenuItem'
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert'
import './App.css';
import Routes from './Routes'
import AppDrawerLoggedOut from './AppDrawerLoggedOut';
import AppDrawerLoggedIn from './AppDrawerLoggedIn';

// Material UI
import AppBar from 'material-ui/AppBar';
import { BrowserRouter } from 'react-router-dom';

import { connect } from 'react-redux'


const Logged = (props) => (
  <IconMenu
    {...props}
    iconButtonElement={
      <IconButton><MoreVertIcon /></IconButton>
    }
    targetOrigin={{ horizontal: 'right', vertical: 'top' }}
    anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
  >
    <MenuItem primaryText="Refresh" />
    <MenuItem primaryText="Help" />
    <MenuItem primaryText="Sign out" />
  </IconMenu>
);

Logged.muiName = 'IconMenu';

class App extends Component {
  constructor() {
    super()

    this.state = {
      logged: true,
      open: false,
      authed: false,

    };

  }


  handleChange = (event, logged) => this.setState({ logged: logged });
  handleClose = () => this.setState({ open: false });
  handleToggle = () => this.setState({ open: !this.state.open });



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
              style={styles.navBarStyle}
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
    );
  }
}

const styles = {
  navBarStyle: {
    backgroundColor: 'green',
  }
}

const mapState = (state) => {
  return {
    allCompanies: state.allCompanies,
    selectedCompany: state.company,
    isLoggedIn: Boolean(state.company)
  }
}


const mapDispatch = (dispatch) => {
  return {
    loadInitialData() {
      //dispatch(getAllCompaniesData());
    }
  }
}

export default connect(mapState, mapDispatch)(App);
