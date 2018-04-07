import React, { Component } from 'react'
import { Link } from 'react-router-dom'
const SBSF = 'https://drive.google.com/open?id=17lT5REEVzmZPVSJrUVzyRS8rUh1KS9wt'

export default class Principal extends Component {
    constructor(props) {
        super(props)

    }

    render() {
        return (
            <div>
                <h1>Principal</h1>
                <p>principal is so amazing!</p>
                <a target='_blank' href={SBSF}><button>Download Summary Plan Description</button></a>
                <br />
                <Link to={'/'}>Home</Link>
            </div>
        )
    }
}
