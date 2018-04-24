import React from 'react'
import { Link } from 'react-router-dom'

const About = () => (
    <div>
        <img src="https://sbsfinancials.com/wp-content/uploads/2017/03/cropped-Turtle-logo-MC-Final-with-tagline1200x527bluer-1.png" style={{width: '50vw', height: 'auto', marginTop: '30px'}} alt="SBSF logo" />
        <h2>Your Retirement Planning Team</h2>
        <h4>Ricky Tran</h4>
        <p>Director of Payroll Processing</p>
        <a href="mailto:rtran@sbsfinancials.com?Subject=Inquiry" target="_top">Contact</a>
        <h4>Scott Tong</h4>
        <p>Director of Compliance</p>
        <a href="mailto:stong@sbsfinancials.com?Subject=Inquiry" target="_top">Contact</a>
        <Link to="/" style={{display: 'block', margin: '10px'}}>Back Home</Link>
    </div>
)

export default About
