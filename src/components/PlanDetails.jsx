import React, { Component } from 'react'
import { db } from '../config/constants'
import { Link } from 'react-router-dom'
import splashScreen from './SplashScreen'


class PlanDetails extends Component {
    constructor(props) {
        super(props)
        this.state = {
            companyProviderWebsite: ''
        }
    }

    componentDidMount() {
        db.collection('companies').doc(localStorage.getItem('company'))
            .get()
            .then(doc => {
                db.collection('providers').doc(doc.data().providerName)
                    .get()
                    .then(() => {
                        this.setState({ companyProviderWebsite: doc.data().providerWebsite })
                    })
            })
    }

    render() {
        return (
            <div>
                <div className="loggedInHeader" />
                {
                    !localStorage.getItem('company')
                        ? 'Wrong Page'
                        :
                        <div>
                            {
                                this.state.loading === true
                                    ? <splashScreen />
                                    :
                                    <div className="companyPages" style={{marginTop: '20vh'}}>
                                        <h2>{`For additional information on your
                                        ${localStorage.getItem('company')} retirement plan:
                            `}          <a target="_blank" rel="noopener noreferrer" href={this.state.companyProviderWebsite} style={{textDecoration: 'none'}}>
                                                <h3>Click Here</h3>
                                        </a>
                                        </h2>
                                    </div>
                            }
                            <br />
                            <Link to="/CompanyHome" style={{ textDecoration: 'none' }}>
                                <button
                                    className="buttons"
                                    type="button">
                                    Back to {localStorage.getItem('company')} Home
                                </button>
                            </Link>
                            <br />
                            <button
                                className="buttons"
                                type="button"
                                onClick={() => {
                                    localStorage.removeItem('company')
                                    this.props.history.push(
                                        '/'
                                    )
                                }}>
                                Logout
                            </button>
                        </div>
                }
            </div>
        )
    }
}

export default PlanDetails
