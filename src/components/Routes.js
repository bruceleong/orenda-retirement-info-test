import React, { Fragment, Component } from 'react'
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
import orendaLogo from '../images/orenda.png'
import { getCompanyData } from '../store'
import AppBar from 'material-ui/AppBar'
import News from './News'
import Forms from './Forms'

class Routes extends Component {
  constructor() {
    super()
    this.state = {
      open: false,
    }
  }

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
            id="appBar"
            title={<div onClick={this.handleToggle} />}
            iconElementRight={<div><img style={{ height: '40px', margin: '3px' }} alt="logo" src={orendaLogo} /></div>}
            onLeftIconButtonClick={this.handleToggle}
          />
          <Switch>
            <Route
              path="/"
              exact component={Home} />
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
                  <Fragment>
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
                  </Fragment>
                )
            }
            {
              !localStorage.getItem('admin')
                ? null
                : (
                  <Fragment>
                    <Route
                      exact path="/AddEditMedia"
                      component={AddEditMedia}
                    />
                  </Fragment>
                )
            }
            <Route render={() => <h3>Page Not Found</h3>} />
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
