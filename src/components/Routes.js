import React, { Component } from 'react';
import {  Route, Switch } from 'react-router-dom'
import Home from './Home'
import Principal from './Principal'
import Transamerica from './Transamerica'
import About from './About'
import Login from './Login'
import Norms from './Home-Norms'
import CompanyHome from './CompanyHome'
import {connect} from 'react-redux'
import { HashRouter, BrowserRouter, withRouter } from 'react-router-dom';


import News from './News'
import Forms from './Forms'
import { getAllCompaniesData } from '../store'

class Routes extends Component{

  componentDidMount(){
    this.props.loadInitialData()

  }

  render(){
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
              path="/CompanyHome"
              component={CompanyHome}
            />
            <Route
              path="/NormsRestaurant"
              component={Principal}
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
            {/*recent add lumpSum route*/}
            <Route render={() => <h3>No Match</h3>} />
          </Switch>
        </div>
      </div>
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


const mapDispatch = (dispatch) =>  ({
    loadInitialData() {
      dispatch(getAllCompaniesData());
    }
  })


// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes))

