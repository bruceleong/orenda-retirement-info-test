import React, { Component } from 'react';
import { Router, Route, Switch } from 'react-router-dom'
import Home from './Home';
import Principal from './Principal';
import history from './history'
import Transamerica from './Transamerica';
import About from './About';
import Login from './Login';


export const Routes = () => {
  return (
    <Router history={history}>
        <Switch>
            {/* Routes placed here are available to all visitors */}
            <Route exact path="/About" component={About} />
            <Route exact path="/" component={Home} />
            <Route exact path="/Principal" component={Principal} />
            <Route exact path="/Login" component={Login} />
            <Route exact path="/Transamerica" component={Transamerica} />
        </Switch>
    </Router>
  )
}
