import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import sbsfLogo from './sbsfLogo.png'
import { connect } from 'react-redux'
import { getCompanyData } from '../store'

class About extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstAttempt: true
        }
    }

    handleInput = (evt) => {
        evt.preventDefault()
        let lowerCaseAllCompanies = this.props.allCompanies.map(ele => ele.toLowerCase())
        let idx = lowerCaseAllCompanies.indexOf(evt.target.inputField.value.toLowerCase())
        if (idx === -1) {
            this.setState({ firstAttempt: false })

        } else {
            this.props.loadCompanyData(this.props.allCompanies[idx])
            localStorage.setItem('company', this.props.allCompanies[idx])
            this.props.history.push(`/companyHome`)
        }
    }

    render() {
        return (
            <div>
                <div className="header">
                    <div>
                        {
                            !localStorage.getItem('company')
                                ?
                                <div id="title">
                                    <h4>Dear Participant, enter your company name for more details on your retirement plan.
                                            </h4>
                                    <form onSubmit={this.handleInput}>
                                        <input className="buttonInput" type="text" name="inputField" />
                                        <input className="buttons" type="submit" />
                                    </form>
                                    {
                                        this.state.firstAttempt
                                            ? null
                                            : <p style={{ color: 'red' }}>That input didn't match any registered company</p>
                                    }
                                </div>
                                :
                                <div id="title">
                                    <h4>You are currently logged in</h4>
                                    <button
                                        className="buttons"
                                        type="button"
                                        onClick={() => {
                                            localStorage.removeItem('company')
                                            this.props.history.push(
                                                '/'
                                            )
                                        }}>Logout
                                            </button>
                                </div>
                        }
                    </div>
                </div>
                <div className="companyPages">
                    <img src={sbsfLogo} style={{ width: '30vw', height: 'auto', marginTop: '5vh' }} alt="SBSF logo" />
                    <h4>Heather Cox</h4>
                    <p>Administrator</p>
                    <a href="mailto:hcox@sbsfinancials.com?Subject=Inquiry" target="_top">Contact</a>
                    <h4>Lindi Carpenter</h4>
                    <p>401k Payroll processor</p>
                    <a href="mailto:lcarpenter@sbsfinancials.com?Subject=Inquiry" target="_top">Contact</a>
                    <h4>You also can contact us by directly phone number: +1 212-564-2464</h4>
                    <div>
                        {!localStorage.getItem('company')
                            ? ''
                            :
                            <div>
                                <Link to="/CompanyHome" style={{ textDecoration: 'none' }}>
                                    <button
                                        className="buttons"
                                        type="button">
                                        Back to {localStorage.getItem('company')} Home
                        </button>
                                </Link>
                                <br />
                            </div>
                        }
                    </div>
                    <Link to="/">
                        <button
                            className="buttons"
                            type="button"
                        >
                            Return to SBSF Home
            </button>
                    </Link>
                    <br />
                    <div>
                        {!localStorage.getItem('company')
                            ? ''
                            :
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
                        }
                    </div>
                </div>
            </div>
        )
    }
}

const mapState = ({ allCompanies }) => ({
    allCompanies
})

const mapDispatch = (dispatch) => ({
    loadCompanyData(company) {
        dispatch(getCompanyData(company))
    }
})

export default connect(mapState, mapDispatch)(About)
