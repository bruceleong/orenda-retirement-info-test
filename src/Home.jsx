import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class Home extends Component {
    constructor(props) {
        super(props)

    }

    render() {
        return (
          <div>
          <h1>Hey Participant! Welcome to my awesome site</h1>
          <h1>This site is so cool</h1>
            <br />
            <br />
          <Link to={'/About'}>About</Link>

          <p>super secret links</p>
          <Link to={'/Transamerica'}>Transamerica</Link>
          <br />
          <br />
          <Link to={'/Principal'}>Principal</Link>
          </div>
        )
    }
}
