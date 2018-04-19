import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { db } from '../config/constants'


import RaisedButton from 'material-ui/RaisedButton'
import TextField from 'material-ui/TextField'
import {connect} from 'react-redux'
import getFormData from '../store'

export default class AdminLogin extends Component {
    constructor(){
        super()
        // what the state would originally be
        //this.state = {allAdmin: [], firstAttempt: true}

        // for testing purposes
        this.state = {
            allAdmin: ['qaz'],
            firstAttempt: true
        }

    }
 
  handleSubmit = evt => {
    evt.preventDefault()

    let idx = this.state.allAdmin.indexOf(evt.target.inputField.value)

    if (idx === -1) {
        this.setState({ firstAttempt: false })

    } else {
        localStorage.setItem('admin', 'true')
        this.props.history.push(`/Admin`)
 
    }

  }
  

  componentDidMount(){

    // what I'm guessing we'd need. Assuming we're just storing admin data in
    // firestore

    // db.collection('admin')
    // .get()
    // .then(snapshot => {
    //     let allAdmin = []
    //     snapshot.forEach(doc => {
    //         allAdmin.push(doc.data().code)
    //     })
    //     this.setState({ allAdmin })
    // })

  }

  render() {
    return (
        <div>
            <h4>Enter your admin code below:</h4>
            <form onSubmit={this.handleSubmit}>
                <input type="text" name="inputField" />
                <input type="submit" />
            </form>
            {
                this.state.firstAttempt
                    ? null
                    : <p style={{ color: 'red' }}>We have notified the authorities</p>
            }
        </div>
    )
  }
}
