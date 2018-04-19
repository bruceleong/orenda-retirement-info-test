import React, { Component } from 'react'
import { db } from '../config/constants'
import AdminPortal from './AdminPortal'

export default class AdminLogin extends Component {
    constructor(){
        super()
        // what the state would originally be
        //this.state = {allAdmin: [], firstAttempt: true}

        // for testing purposes
        this.state = {
            allAdmin: ['qaz'],
            firstAttempt: true,
            adminLoggedIn: false
        }

    }
 
  handleSubmit = evt => {
    evt.preventDefault()

    let idx = this.state.allAdmin.indexOf(evt.target.inputField.value)

    if (idx === -1) {
        this.setState({ firstAttempt: false })

    } else {
        this.setState({adminLoggedIn: true})
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
        
        !this.state.adminLoggedIn
        ? (
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
        : <h1>Logged In</h1>
        
    )
  }
}
