import React from 'react'
import { Link } from 'react-router-dom'

const About = (props) => (
    <div>
        <div className="contactHeader" />
        <div className="companyPages">
            <h4>Heather Cox</h4>
            <p>Administrator</p>
            <a className="buttons" style={{ padding: '2px', textDecoration: 'none' }} href="mailto:hcox@orendaretirement.com?Subject=Inquiry" target="_top">Email Heather</a>
            <h4>Lindi Carpenter</h4>
            <p>401k Payroll Processor</p>
            <a className="buttons" style={{ padding: '2px', textDecoration: 'none'}} href="mailto:lcarpenter@orendaretirement.com?Subject=Inquiry" target="_top">Email Linda</a>
            <h4>You can contact us directly at:</h4>
            <h4>+1 212-564-2464</h4>
            <div>
                {
                    !localStorage.getItem('company')
                        ?
                        <div>
                            <Link to="/">
                                <button
                                    className="buttons"
                                    type="button"
                                >
                                    Return Home
                        </button>
                            </Link>
                        </div>
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
                            props.history.push(
                                '/'
                            )
                        }}>
                        Logout
                    </button>
                }
            </div>
        </div>
        <div className="contactHeaderMobile" />
    </div>
)

export default About
