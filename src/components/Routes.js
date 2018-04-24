import React, { Component } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom'
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


import News from './News'
import Forms from './Forms'
import { getAllCompaniesData } from '../store'
import AdminPortal from './AdminPortal';

class Routes extends Component {

  render() {

    return (
      <div className="container d-flex justify-content-center">
        <div className="row">
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
    )
  }

}


// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default Routes





{/*return (
      <div className="container d-flex justify-content-center">
        <div className="row">
          <Switch>
          {
            !localStorage.getItem('admin')
              ? null
              : (
                <div>
                  <Route
                    path="/AddEditMedia"
                    component={AddEditMedia}
                  />
                  <Route
                    component={AdminLogin}
                    />
                </div>
              )
          }
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
                  <Route
                    component={CompanyHome}
                    />
                </div>
              )
          }
            <Route path="/" component={Home} />
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
            <Route
              component={Home}
              />
          </Switch>
        </div>
      </div>
    )
}*/}

