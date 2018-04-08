import React, {Component} from 'react';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import FlatButton from 'material-ui/FlatButton';
import Toggle from 'material-ui/Toggle';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import logo from './logo.svg';
import './App.css';
import {Routes} from './Routes'
import { db } from '../config/constants';


class Login extends Component {
  static muiName = 'FlatButton';

  render() {
    return (
      <FlatButton {...this.props} label="Login" />
    );
  }
}

const Logged = (props) => (
  <IconMenu
    {...props}
    iconButtonElement={
      <IconButton><MoreVertIcon /></IconButton>
    }
    targetOrigin={{horizontal: 'right', vertical: 'top'}}
    anchorOrigin={{horizontal: 'right', vertical: 'top'}}
  >
    <MenuItem primaryText="Refresh" />
    <MenuItem primaryText="Help" />
    <MenuItem primaryText="Sign out" />
  </IconMenu>
);

Logged.muiName = 'IconMenu';

class App extends Component {
  state = {
    logged: true,
    open: false,
    authed: false,

  };

  handleChange = (event, logged) => this.setState({logged: logged});
  handleClose = () => this.setState({ open: false });
  handleToggle = () => this.setState({ open: !this.state.open });


  componentDidMount() {
    this.removeListener = firebaseAuth().onAuthStateChanged(user => {
      if (user) {
        this.setState({
          authed: true,
          loading: false,
          user: user,
        });
      } else {
        this.setState({
          authed: false,
          loading: false,
          user: null,
        });
      }
    });
  }
  componentWillUnmount() {
    this.removeListener();
  }



  render() {

    const authButtons = this.state.authed ? (
      <FlatButton
        label="Logout"
        onClick={() => {
          logout();
        }}
        style={{ color: '#fff' }}
      />
    ) : (
      <span>
        <Link to="/login">
          <FlatButton label="Login" style={{ color: '#fff' }} />
        </Link>
        <Link to="/register">
          <FlatButton label="Register" style={{ color: '#fff' }} />
        </Link>
      </span>
    );

    
    return (
      <div className="App">
        <AppDrawer
            open={this.state.open}
            handleClose={this.handleClose}
            handleToggle={this.handleToggle}
        />
        {/*<Toggle
          label="Logged"
          defaultToggled={true}
          onToggle={this.handleChange}
          labelPosition="right"
          style={{margin: 20}}
        />*/}
        <AppBar
          title="SBSF"
          iconElementRight={this.state.logged ? <Logged /> : <Login />}
          style={styles.navBarStyle}
        />
        <Routes />
      </div>
    );
  }
}

const styles = {
  navBarStyle: {
      backgroundColor: 'green',
  }
}


// class App extends Component {
//   constructor(props) {
//     super(props);
//     //test connection to firestore
//     // db.collection('test').doc('vJfbQhx3gs0XsAwErxza').get()
//     // .then((doc) => {
//     //   console.log('doc data', doc.data().stuff);
//     // })
//   }

//   render() {
//     return (
//       <div className="App">
//       <AppBar
//           title="Title"
//           iconElementLeft={<IconButton><NavigationClose /></IconButton>}
//           iconElementRight={this.state.logged ? <Logged /> : <Login />}
//         />
//         {/*<AppBar
//                 title={<img src="/sbsf-cropped-logo.png" style={{height: '30px' }} alt="logo" />}
//                 onLeftIconButtonTouchTap={this.handleToggle}
//                 // iconElementRight={topbarButtons}
//                 //iconElementRight={authButtons}
//                 // children={tabs}
//                 iconStyleRight={{
//                   display: 'flex',
//                   alignItems: 'center',
//                   marginTop: '0'
//                 }}
//               />*/}
//         <Routes />
//       </div>
//     );
//   }
// }

export default App;
