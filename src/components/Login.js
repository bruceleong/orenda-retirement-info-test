import React, { Component } from 'react';
import { Link } from 'react-router-dom'

import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import {connect} from 'react-redux'
import getFormData from '../store'

class Login extends Component {

  handleSubmit = e => {
    e.preventDefault();

    // this.setState({companyName: `${this.state.companyName}@gmail.com`});
    // console.log('did companyName update?', this.state.companyName);

    // login(this.state.companyName, this.state.password).catch(error => {
    //   this.setState(setErrorMsg('Invalid username/password.'));
    // });
  };
  resetPassword = () => {
    // resetPassword(this.state.companyName)
    //   .then(() =>
    //     this.setState(
    //       setErrorMsg(`Password reset companyName sent to ${this.state.companyName}.`)
    //     )
    //   )
    //   .catch(error => this.setState(setErrorMsg(`Company Name address not found.`)));
  };

  setCompany = (bool) => {
    //let name = bool ? 'Audio Interiors' : 'Norm\'s Restaurant';
    // if (bool) this.props.getUsers('Audio Interiors');
    // else this.props.getUsers('Norm\'s Restaurant');

  }
  render() {
    return (
      <div>
      <form
        style={style.container}
        onSubmit={event => this.handleSubmit(event)}
      >
        <TextField
          hintText="Enter your Company Name"
          floatingLabelText="Company Name"
          underlineFocusStyle={styles.underlineStyle}
          floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
          onChange={(event, newValue) => this.setState({ companyName: newValue })}
        />
        <br />
        <TextField
          type="password"
          hintText="Enter your Password"
          floatingLabelText="Password"
          underlineFocusStyle={styles.underlineStyle}
          floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
          onChange={(event, newValue) => this.setState({ password: newValue })}
        />
        <br />
        {this.state.loginMessage && (
          <div className="alert alert-danger" role="alert">
            <span
              className="glyphicon glyphicon-exclamation-sign"
              aria-hidden="true"
            />
            <span className="sr-only">Error:</span>
            &nbsp;{this.state.loginMessage}{' '}
            <a href="/" onClick={this.resetPassword} className="alert-link">
              Forgot Password?
            </a>
          </div>
        )}
        <RaisedButton
          backgroundColor="green"
          labelColor="white"
          color="white"
          label="Login"
          style={style.raisedBtn}
          type="submit"
        />
        <br />
        <Link to={'/Norms'}>Norms</Link>
        <div> OR </div>
        <Link to={'/AudioInteriors'}>AudioI</Link>
      </form>
      <div id='Audio Interiors' onClick={this.setCompany(true)}>
        <img src='https://drive.google.com/uc?export=download&id=1kFe7pR-18rEZbQGn1TCfk65XCt5XNFqV' alt='Audio Interiors logo' />
      <h4>Audio Interiors</h4>
      </div>
      <div id='norm' onClick={this.setCompany(false)}>
        <img src='https://drive.google.com/uc?export=download&id=1QAatpWyoftrYmgCQs6E39OJ2V7g7KQrM' alt='Norms Restaurant logo' />
        <h4>Norm's Restaurant</h4>
      </div>
      </div>
    );
  }
}

const raisedBtn = {
  margin: 15,
};

const container = {
  textAlign: 'center',
  marginTop: '1rem'
};

const style = {
  raisedBtn,
  container
};

const styles = {
  floatingLabelFocusStyle: {
    color: 'green',
  },
  underlineStyle: {
    borderColor: 'green'
  }

}

const mapState = (state) => ({
  user: state.user,
  forms: state.forms
})
const mapDispatch = (dispatch) => () => ({
  getForms(providerName) {
    dispatch(getFormData(providerName))
  },
  getUsers(clientName) {
    // dispatch(getUserData(clientName))
  }
})
export default connect(mapState, mapDispatch)(Login);
