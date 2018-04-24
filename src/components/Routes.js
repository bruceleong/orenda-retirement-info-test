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
        // iconElementRight={this.state.logged ? <Logged /> : <Login />}
        style={{backgroundColor: 'green'}}
      />
      <div className="container d-flex justify-content-center">
          <Switch>
            <Route path="/" exact component={Home} />
            <Route
              path="/Login"
              component={Login}
            />
            <Route
              path="/Contact"
              component={About}
            />
            <Route
              path="/Admin"
              component={AdminLogin}
            />
            {
              !localStorage.getItem('company')
                ? null
                : (
                  <div>
                    <Route
                      path="/PlanDetails"
                      component={PlanDetails}
                    />
                    <Route
                      path="/AudioInteriors"
                      component={Transamerica}
                    />
                    <Route
                      path="/Norms"
                      component={Norms}
                    />
                    <Route
                      path="/News"
                      component={News}
                    />
                    <Route
                      path="/Forms"
                      component={Forms}
                    />
                    <Route
                      path="/CompanyHome"
                      component={CompanyHome}
                    />
                    <Route
                      path="/Admin"
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
                      path="/AddEditMedia"
                      component={AddEditMedia}
                    />
                </div>
              )
            }
            <Route render={() => <h3>No Match</h3>} />
          </Switch>
      </div>
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
