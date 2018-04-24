import React, { Component } from 'react'
import { Route, Switch, withRouter, Router } from 'react-router-dom'
import Home from './Home'
import Transamerica from './Transamerica'
import About from './About'
import Login from './Login'
import Norms from './Home-Norms'
import PlanDetails from './PlanDetails'
import CompanyHome from './CompanyHome'
import AdminLogin from './AdminLogin'
import AddEditMedia from './AddEditMedia'
import { connect } from 'react-redux'
import history from './history'
import AppDrawerLoggedOut from './AppDrawerLoggedOut'
import AppDrawerLoggedIn from './AppDrawerLoggedIn'

// Material UI
import AppBar from 'material-ui/AppBar'


import News from './News'
import Forms from './Forms'
import { getAllCompaniesData } from '../store'

class Routes extends Component {
  constructor() {
    super();
    this.state = {
      logged: true,
      open: false,
      authed: false,
    }
  }
  componentDidMount() {
    this.props.loadInitialData()

  }

  handleChange = (event, logged) => this.setState({ logged: logged })
  handleClose = () => this.setState({ open: false })
  handleToggle = () => this.setState({ open: !this.state.open })

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
            title="Side By Side Financials"
            onLeftIconButtonClick={this.handleToggle}
            style={{ backgroundColor: 'green' }}
          />
          <Switch>
            <Route path="/" exact component={Home} />
            <Route
              exact path="/Login"
              component={Login}
            />
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
                      exact path="/PlanDetails"
                      component={PlanDetails}
                    />
                    <Route
                      exact path="/AudioInteriors"
                      component={Transamerica}
                    />
                    <Route
                      exact path="/Norms"
                      component={Norms}
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
    allCompanies: state.allCompanies,
    selectedCompany: state.company,
    isLoggedIn: Boolean(state.company)
  }
}


const mapDispatch = (dispatch) => {
  return {
    loadInitialData() {
      dispatch(getAllCompaniesData())
    }
  }
}


export default connect(mapState, mapDispatch)(Routes)
