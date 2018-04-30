import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import sbsfLogo from './sbsfLogo.png'

export default class About extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <div className="page">
                <img src={sbsfLogo} style={{ width: '30vw', height: 'auto', marginTop: '5vh' }} alt="SBSF logo" />
                <h2>Side by Side Financials</h2>
                <h2>Your Retirement Planning Team</h2>
                <h4>Ricky Tran</h4>
                <p>Director of Payroll Processing</p>
                <a href="mailto:rtran@sbsfinancials.com?Subject=Inquiry" target="_top">Contact</a>
                <h4>Scott Tong</h4>
                <p>Director of Compliance</p>
                <a href="mailto:stong@sbsfinancials.com?Subject=Inquiry" target="_top">Contact</a>
                <br />
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
        )
    }
}

