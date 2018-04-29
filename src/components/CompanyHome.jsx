import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { db } from '../config/constants'
import splashScreen from './SplashScreen'


export default class CompanyHome extends Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    componentDidMount() {
        this.updateCompanyData()
    }

    updateCompanyData = () => {

        db.collection('companies').doc(localStorage.getItem('company'))
        .get()
        .then(doc => {
            this.setState({ spd: doc.data().spd })
        })
    }

    render() {
        return (
            <div>
                {
                    !localStorage.getItem('company')
                        ? <splashScreen />
                        :
                        <div className="page">
                            <h1 style={{marginBottom: '10px'}}>Welcome to the {localStorage.getItem('company')} Retirement Plan Portal Page</h1>
                            <p>On this website you can get more information on forms, notices and etc</p>
                            <p>Click on the navigation on the top left or click below to go to each page</p>
                            <Link to="/YourAccount" style={{ textDecoration: 'none', margin: '10px', display: 'block' }}>Your Account</Link>
                            <a target="_blank" rel="noopener noreferrer" href={this.state.spd} style={{ textDecoration: 'none', margin: '10px', display: 'block' }}>Plan Documents</a>
                            <Link to="/Forms" style={{ textDecoration: 'none', margin: '10px', display: 'block' }}>Forms & Notices</Link>
                            <Link to="/News" style={{ textDecoration: 'none', margin: '10px', display: 'block' }}>News</Link>
                            <Link to="/Contact" style={{ textDecoration: 'none', margin: '10px', display: 'block' }}>Contact</Link>
                            <button
                                className="buttons"
                                type="button" onClick={() => {
                                    localStorage.removeItem('company')
                                    this.props.history.push(
                                        '/'
                                    )
                                }}>Logout
                            </button>
                        </div>
                }
            </div>
        )
    }
}
