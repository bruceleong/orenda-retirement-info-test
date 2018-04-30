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
                            <h1>Welcome to the {localStorage.getItem('company')} Retirement Plan Portal Page
                            </h1>
                            <div>
                                <Link className="links" to="/YourAccount" style={{ textDecoration: 'none'}}><button className="companyHomeButtons" type="button">&#9673; Your Account</button></Link>
                            </div>
                            <div>
                                <a className="links" target="_blank" rel="noopener noreferrer" href={this.state.spd}><button className="companyHomeButtons" type="button">&#9673; Plan Documents</button></a>
                            </div>
                            <div>
                                <Link className="links" to="/Forms"><button className="companyHomeButtons" type="button">&#9673; Forms & Notices</button></Link>
                            </div>
                            <div>
                                <Link className="links" to="/News"><button className="companyHomeButtons" type="button">&#9673; News</button></Link>
                            </div>
                            <div>
                                <Link className="links" to="/Contact"><button className="companyHomeButtons" type="button">&#9673; Contact</button></Link>
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
