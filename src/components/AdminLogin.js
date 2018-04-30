import React, { Component } from 'react'
import { db } from '../config/constants'
import AdminPortal from './AdminPortal'

export default class AdminLogin extends Component {
    constructor() {
        super()
        this.state = {
            firstAttempt: true,
            adminLoggedIn: false
        }
    }

    handleSubmit = evt => {
        evt.preventDefault()

        let un = evt.target.userName.value
        let pw = evt.target.password.value

        db.collection('admin').doc('admin')
            .get()
            .then(doc => {
                if (doc.data()[un] === pw) {
                    this.setState({ adminLoggedIn: true })
                    localStorage.setItem('admin', 'true')
                    this.props.history.push('/admin')
                } else {
                    this.setState({ firstAttempt: false })
                }
            })
    }

    render() {
        return (
                !localStorage.getItem('admin')
                ? (
                    <div>
                        <h4>Enter Login Details:</h4>
                        <form onSubmit={this.handleSubmit}>
                            <label style={{display: 'block', margin: '10px'}}>Username: <input type="text" name="userName" /></label>
                            <label style={{display: 'block', margin: '10px'}}>Password: <input type="password" name="password" /></label>
                            <button className="buttons" type="submit">Submit</button>
                            {
                                this.state.firstAttempt
                                    ? null
                                    : <p style={{ color: 'red' }}>We have notified the authorities</p>
                            }
                        </form>
                    </div>
                )
                : <AdminPortal history={this.props.history} />

        )
    }
}
