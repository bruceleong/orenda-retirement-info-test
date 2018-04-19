import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { getCompanyData } from '../store'


class AdminPortal extends Component {
    constructor(props) {
        super(props)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleInput = this.handleInput.bind(this)
        console.log('props are', props)
        this.state = {
            company: true
        }
    }

    handleSubmit(evt) {
        evt.preventDefault()
        this.props.loadCompanyData(evt.target.selectCompany.value)

        this.props.history.push(`/companyHome`)

    }

    handleInput(evt) {
        evt.preventDefault()
        let lowerCaseAllCompanies = this.props.allCompanies.map(ele => ele.toLowerCase())
        let idx = lowerCaseAllCompanies.indexOf(evt.target.inputField.value.toLowerCase())

        if (idx === -1) {
            this.setState({ firstAttempt: false })

        } else {
            this.props.loadCompanyData(this.props.allCompanies[idx])
            console.log(this.props.allCompanies[idx], 'company.....')
            localStorage.setItem('company', this.props.allCompanies[idx])
            this.props.history.push(`/companyHome`)
        }
    }

    render() {
        return (
            <div>
            </div>
            
        )
    }
}

const mapState = ({ allCompanies }) => ({
    allCompanies
})

const mapDispatch = (dispatch) => ({
    loadCompanyData(company) {
        console.log('typeof', typeof getCompanyData)
        dispatch(getCompanyData(company))
    }
})

export default connect(mapState, mapDispatch)(AdminPortal)