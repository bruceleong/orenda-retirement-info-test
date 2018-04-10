import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import {connect} from 'react-redux'


class Forms extends Component {
    constructor(props) {
        super(props)

    }

    render() {
        return (
          <div>
          <h1>Forms</h1>
          <h2>Here you can find forms for commonly requested items</h2>
          <a target='_blank'
          href='https://drive.google.com/open?id=1A5t11KrR5xE9-cfWpNClubo9sDie0xs1' style={{textDecoration: 'none'}}><h4>Principal Rollover IRA Form</h4>
          </a>
          <a target='_blank'
          href='https://drive.google.com/open?id=1Y-v89j-GtwabbGHjTAxrUKwAFVdk1FWZ' style={{textDecoration: 'none'}}><h4>Principal Distribution IRA Form</h4>
          </a>
          <a target='_blank'
          href='https://drive.google.com/open?id=1AxHLkEhf5FRb1Y7link5-NOFAjvOUxnu' style={{textDecoration: 'none'}}><h4>Transamerica Distribution 401k Form</h4>
          </a>
          <a target='_blank'
          href='https://drive.google.com/open?id=1OZuDOe4t5CtZ22pG0mC9I3Z-4es6RChU' style={{textDecoration: 'none'}}><h4>Transamerica Distribution IRA Form</h4>
          </a>
          </div>
        )
    }
}

const mapState = (state) => ({
  user: state.user,
  forms: state.forms
})

export default connect(mapState)(Forms);
