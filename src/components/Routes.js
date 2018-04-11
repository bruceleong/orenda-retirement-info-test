import React, { Component } from 'react';
import { Router, Route, Switch, Redirect } from 'react-router-dom'
import Home from './Home';
import Principal from './Principal';
import history from './history'
import Transamerica from './Transamerica';
import About from './About';
import Login from './Login';
import Norms from './Home-Norms';

import News from './News';
import Forms from './Forms';

// function PrivateRoute({ component: Component, authed, user, ...rest }) {
//   return (<Route
//     {...rest} // these are props passed to Route
//     render={props => // "props" are passed to sub-component
//       (authed === true ? (
//         <Component {...props} user={user} /> // remember to declare what other props you need. i.e "user={user}"
//       ) : (
//           <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
//         ))} />
//   );
// }

// function PublicRoute({ component: Component, authed, ...rest }) {
//   return (<Route {...rest} render={props => (authed === false ? (<Component {...props} />) : (<Redirect to="/" />))} />);
// }

export default class Routes extends Component {

  render() {
    console.log(this.props, 'current props')
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

{/*<Switch>*/ }
{/* Routes placed here are available to all visitors */ }
{/*<Route exact path="/Contact" component={About} />
            <Route exact path="/" component={Home} />
            <Route exact path="/Principal" component={Principal} />
            <Route exact path="/Login" component={Login} />
            <Route exact path="/Transamerica" component={Transamerica} />
            <Route exact path="/News" component={News} />
  <Route exact path="/Forms" component={Forms} />*/}
