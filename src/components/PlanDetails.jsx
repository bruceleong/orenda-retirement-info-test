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
                                    <div className="companyPages">
                                        <h2 className="spacingMarginHeader">{`For additional information on your
                                        ${localStorage.getItem('company')} retirement plan:
                            `}          <a target="_blank" rel="noopener noreferrer" href={this.state.companyProviderWebsite} className="linkStyling">
                                                <h3 className="spacingMarginText">Click Here</h3>
                                            </a>
                                        </h2>
                                        <p>
                                            *You will be redirected to the financial provider's website and be prompted to log on.
                                        </p>
                                        <br />
                                        <Link to="/CompanyHome" style={{ textDecoration: 'none' }}>
                                            <button
                                                className="buttons"
                                                type="button" id="marginTopButton">
                                                Back to {localStorage.getItem('company')} Home
                                            </button>
                                        </Link>
                                        <br />
                                        <button
                                            className="buttons"
                                            id="noMarginBottom"
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
                }
            </div>
        )
    }
}

export default PlanDetails
