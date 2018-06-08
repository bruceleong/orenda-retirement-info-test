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
                <div className="loggedInHeader" />
                {
                    !localStorage.getItem('company')
                        ? <splashScreen />
                        :
                        <div className="companyPages">
                            <h2>Welcome to the {localStorage.getItem('company')} Retirement Plan Portal Page
                            </h2>
                            <p style={{ textAlign: 'left' }}>On this page, you have access to your 401(k) account and can find comprehensive information about retirement planning.  Retirement Planning is an important phase in your life.  As you continue your working career, it is our hope to help provide you the tools and education you need to help reach your goals.</p>
                            <div className="companyHomeLinks" style={{ textAlign: 'left' }}>
                                <div>
                                    <Link className="links" to="/YourAccount" style={{ textDecoration: 'none' }}>&#9673; Your Account</Link>
                                </div>
                                <div style={{ width: '1vw' }} />
                                <div>
                                    <a className="links" target="_blank" rel="noopener noreferrer" href={this.state.spd}>&#9673; Plan Documents</a>
                                </div>
                                <div style={{ width: '1vw' }} />
                                <div>
                                    <Link className="links" to="/Forms">&#9673; Forms & Notices</Link>
                                </div>
                                <div style={{ width: '1vw' }} />
                                <div>
                                    <Link className="links" to="/News">&#9673; News & Videos</Link>
                                </div>
                                <div style={{ width: '1vw' }} />
                                <div>
                                    <Link className="links" to="/Contact">&#9673; Contact</Link>
                                </div>
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
