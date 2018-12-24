import React from 'react'
import { Link } from 'react-router-dom'

const About = (props) => (
    <div>
        <div className="contactHeader" />
        <div className="companyPages">
            <h2 className="spacingMarginHeader">Contact us today
            </h2>
            <p className="contactText">
                It is never too early to get started on your investment plans. Tell us more about your goals, and we will get you started on a plan to achieve them.
            </p>
            <br />
            <a className="linkStyling" href="mailto:hcox@orendaretirement.com?Subject=Inquiry" target="_top"><h4>Heather Cox</h4></a>
            <p>Administrator</p>
            <a className="linkStyling" href="mailto:lcarpenter@orendaretirement.com?Subject=Inquiry" target="_top"><h4>Linda Carpenter</h4>
            </a>
            <p>401k Payroll Processor</p>
            <h4>You can contact us directly at:</h4>
            <h4>
                <a className="linkStyling" href="tel:2125642464">+1 212-564-2464</a>
            </h4>
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
                                    type="button" id="marginTopButton">
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
                        type="button" id="noMarginBottom"
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
