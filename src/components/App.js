import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {Routes} from './Routes'
import { db } from '../config/constants';

class App extends Component {
  constructor(props) {
    super(props);
    //test connection to firestore
    // db.collection('test').doc('vJfbQhx3gs0XsAwErxza').get()
    // .then((doc) => {
    //   console.log('doc data', doc.data().stuff);
    // })
  }

  render() {
    return (
      <div className="App">
        <Routes />
      </div>
    );
  }
}

export default App;
