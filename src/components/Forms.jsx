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
          </div>
        )
    }
}

const mapState = (state) => ({
  user: state.user,
  forms: state.forms
})

export default connect(mapState)(Forms);
