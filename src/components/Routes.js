import React, { Component } from 'react'
import { Route, Switch, Router } from 'react-router-dom'
import Home from './Home'
import About from './About'
import PlanDetails from './PlanDetails'
import CompanyHome from './CompanyHome'
import AdminLogin from './AdminLogin'
import AddEditMedia from './AddEditMedia'
import { connect } from 'react-redux'
import history from './history'
import AppDrawerLoggedOut from './AppDrawerLoggedOut'
import AppDrawerLoggedIn from './AppDrawerLoggedIn'
import SBSFLogo from './sbsfLogo.png'
import { getCompanyData, getAllCompaniesData  } from '../store'

import AppBar from 'material-ui/AppBar'


import News from './News'
import Forms from './Forms'
import { IconButton } from 'material-ui';

class Routes extends Component {
  constructor() {
    super()
    this.state = {
      firstAttempt: true,
      logged: true,
      open: false,
      authed: false,
    }
  }

  handleChange = (event, logged) => this.setState({ logged: logged })
  handleClose = () => this.setState({ open: false })
  handleToggle = () => this.setState({ open: !this.state.open })

  handleInput = (evt) => {
    evt.preventDefault()
    let lowerCaseAllCompanies = this.props.allCompanies.map(ele => ele.toLowerCase())
    let idx = lowerCaseAllCompanies.indexOf(evt.target.inputField.value.toLowerCase())
    if (idx === -1) {
        this.setState({ firstAttempt: false })

    } else {
        this.props.loadCompanyData(this.props.allCompanies[idx])
        localStorage.setItem('company', this.props.allCompanies[idx])
        this.props.history.push(`/companyHome`)
    }
}
  componentDidMount = () => {
    //this is very hacky
    document.getElementById('appBar').firstChild.firstChild.firstChild.style.fill = 'black'
  }

 render() {
    return (
      <Router history={history}>
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
            id="appBar"
            title={<div onClick={this.handleToggle}></div>}
            iconElementRight={<div><img style={{ height: '40px', margin: '1vh' }} alt="logo" src={SBSFLogo} /></div>}
            onLeftIconButtonClick={this.handleToggle}
            style={{ backgroundColor: 'white' }}
          />
          <Switch>
            <Route path="/" exact component={Home} />
            <Route
              exact path="/Contact"
              component={About}
            />
            <Route
              exact path="/Admin"
              component={AdminLogin}
            />
            {
              !localStorage.getItem('company')
                ? null
                : (
                  <div>
                    <Route
                      exact path="/YourAccount"
                      component={PlanDetails}
                    />
                    <Route
                      exact path="/News"
                      component={News}
                    />
                    <Route
                      exact path="/Forms"
                      component={Forms}
                    />
                    <Route
                      exact path="/CompanyHome"
                      component={CompanyHome}
                    />
                    <Route
                      exact path="/Admin"
                      component={AdminLogin}
                    />
                  </div>
                )
            }
            {
              !localStorage.getItem('admin')
                ? null
                : (
                  <div>
                    <Route
                      exact path="/AddEditMedia"
                      component={AddEditMedia}
                    />
                  </div>
                )
            }
            <Route render={() => <h3>No Match</h3>} />
          </Switch>
        </div>

      </Router>

    )
  }
}

const mapState = (state) => {
  return {
    selectedCompany: state.company,
  }
}


const mapDispatch = (dispatch) => {
  return {
    loadCompanyData(company) {
      dispatch(getCompanyData(company))
  }
  }
}


export default connect(mapState, mapDispatch)(Routes)
