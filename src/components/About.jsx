import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import dog from './RT.png'

export default class About extends Component {
    constructor(props) {
        super(props)

    }

    render() {
        return (
          <div>
          <h1>SBSF is where your money goes to grow....</h1>
          <h2>I love dogs</h2>
          <img src={dog} />
          <br />
          <Link to={'/'}>Home</Link>
          </div>
        )
    }
}
