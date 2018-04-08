import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class About extends Component {
    constructor(props) {
        super(props)

    }

    render() {
        return (
          <div>
          <img src="https://sbsfinancials.com/wp-content/uploads/2017/03/cropped-Turtle-logo-MC-Final-with-tagline1200x527bluer-1.png" style={{width: '50vw', height: 'auto'}}/>
          <h2>Your Retirement Planning Team</h2>
          <h4>Ricky Tran</h4>
          <p>Director of Payroll Processing</p>
          <a href="mailto:rtran@sbsfinancials.com?Subject=Inquiry" target="_top">Contact</a>
          <br />
          <h4>Scott Tong</h4>
          <p>Director of Compliance</p>
          <a href="mailto:stong@sbsfinancials.com?Subject=Inquiry" target="_top">Contact</a>
          <br />
          <br />
          <Link to={'/'}>Back Home</Link>
          </div>
        )
    }
}
