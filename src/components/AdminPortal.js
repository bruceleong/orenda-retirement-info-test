import React, { Component } from 'react'
import { db } from '../config/constants'
import AddEditCompany from './AddEditCompany'


export default class AdminPortal extends Component {
    constructor() {
        super()
        this.state = {}
    }

    handleSubmit = evt => {
        evt.preventDefault()
        this.setState({ selectedCompany: evt.target.selectCompany.value })
    }

    onAdd = () => {
        this.setState({ selectedCompany: 'newCompany' })
    }

    onEdit = () => {
        this.setState({ edit: true })
    }

    returnButton = () => {
        this.setState({ selectedCompany: '' })
    }

    returnToSelectedCompany = company => {
        this.setState({ selectedCompany: company })
    }

    componentDidMount() {
        db.collection('companies')
            .get()
            .then(snapshot => {
                let allCompanies = []
                snapshot.forEach(doc => {
                    allCompanies.push(doc.data().name)
                })
                this.setState({ allCompanies })
            })
    }

    render() {
        console.log(this.state, 'current state')
        return (
            !this.state.selectedCompany
                ?
                (
                    <div>
                        <h1>Welcome Admin</h1>
                        {
                            !this.state.allCompanies
                                ? ''
                                :
                                <h3>Currently there are: {this.state.allCompanies.length} companies</h3>

                        }
                        <h1>Would you like to add a new company or edit an existing one?</h1>
                        <button type="button" onClick={this.onAdd}>Add Company</button>
                        <button type="button" onClick={this.onEdit}>Edit Company</button>
                        {
                            !this.state.edit
                                ? null
                                : (
                                    <div>
                                        <h1>What Company would you like to edit?</h1>
                                        <form onSubmit={this.handleSubmit}>
                                            <select name="selectCompany">
                                                {this.state.allCompanies.map(company => (
                                                    <option key={company} value={company}>{company}</option>
                                                ))}
                                            </select>
                                            <input type="submit" />
                                        </form>
                                    </div>
                                )
                        }
                    </div>
                )
                : (<AddEditCompany company={this.state.selectedCompany} returnLink={this.returnButton} returnToSelectedCompany={this.returnToSelectedCompany} />)
        )
    }
}
