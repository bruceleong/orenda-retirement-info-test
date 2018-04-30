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
                        <div>
                            <h1>Welcome to the {localStorage.getItem('company')} Retirement Plan Portal Page
                            </h1>
                            <div className="companyHome">
                                <Link to="/YourAccount" style={{ textDecoration: 'none', margin: '10vh' }}>Your Account</Link>
                            </div>
                            <div className="companyHome">
                                <a target="_blank" rel="noopener noreferrer" href={this.state.spd} style={{ textDecoration: 'none' }}>Plan Documents</a>
                            </div>
                            <div className="companyHome">
                                <Link to="/Forms" style={{ textDecoration: 'none' }}>Forms & Notices</Link>
                            </div>
                            <div className="companyHome">
                                <Link to="/News" style={{ textDecoration: 'none' }}>News</Link>
                            </div>
                            <div className="companyHome">
                                <Link to="/Contact" style={{ textDecoration: 'none' }}>Contact</Link>
                            </div>
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
