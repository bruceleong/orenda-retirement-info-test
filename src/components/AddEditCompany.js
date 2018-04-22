import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { db } from '../config/constants'
import EditForm from './EditForm.jsx'
import firebase from 'firebase'
require('firebase/firestore');

export default class AddEditCompany extends Component {
    constructor(props) {
        super(props)
        this.updateCompanyData()
        this.state = {
            companyName: '',
            companyProvider: '',
            companyData: [],
            spd: '',
            companyFormName: '',
            companyFormUrl: ''
        }
    }

    componentDidMount() {
        this.updateCompanyData()
    }

    editForm = (form, url) => {
        this.setState({ formToUpdate: form, formURL: url })
    }

    removeFormToUpdate = () => {
        this.setState({ formToUpdate: ''})
        this.updateCompanyData()
    }

    handleChange = evt => {
        this.setState({ [evt.target.name]: evt.target.value })
    }

    formHandleSubmit = evt => {
        evt.preventDefault()
        db.collection('companies').doc(this.props.company).collection('Forms')
            .doc('formDoc')
            .set({ [evt.target.companyFormName.value]: evt.target.companyFormUrl.value }, { merge: true })
        this.setState({
            companyFormName: '',
            companyFormUrl: ''
        })
        this.updateCompanyData()
    }

    updateCompanyData = () => {
        if (this.props.company !== 'newCompany') {

            let companyRef = db.collection('companies').doc(this.props.company)

            companyRef.collection('Forms').doc('formDoc')
                .get()
                .then(doc => {
                    let formObj = doc.data(),
                        companyData = []
                    Object.keys(formObj).forEach(key => {
                        if (key) {
                            companyData.push([key, formObj[key]])
                        }
                    })
                    return { companyData, companyName: this.props.company }

                })
                .then(data => {
                    companyRef
                        .get()
                        .then(doc => {
                            let spd = doc.data().spd
                            db.collection('providers').doc(doc.data().providerName)
                                .get()
                                .then(providerDoc => {
                                    this.setState({ companyData: data.companyData, companyName: data.companyName, companyProvider: providerDoc.data().name, spd })
                                })
                        })
                })
        }
    }
    render() {
        console.log(this.state, 'current state')
        return (
            !this.state.formToUpdate
                ?
                <div>
                    <h2>{this.state.companyName} Company Info</h2>
                    <form onClick={this.handleSubmit}>
                        <div>
                            <label htmlFor="companyName">Company Name:</label><input name="companyName" value={this.state.companyName} />
                        </div>
                        <div>
                            <label htmlFor="companyProvider">Company Provider:</label><input name="companyProvider" value={this.state.companyProvider} />
                        </div>
                        <div>
                            <label htmlFor="companyProvider">Summary Plan Description:</label><input name="spd" value={this.state.spd} />
                        </div>
                    </form>
                    <h2>Company Forms</h2>
                    <form onSubmit={this.formHandleSubmit}>
                        <h3>Add new Forms</h3>
                        <div>
                            <label htmlFor="companyFormName">Name of form:</label><input name="companyFormName" onChange={this.handleChange}
                                value={this.state.companyFormName} />
                        </div>
                        <div>
                            <label htmlFor="companyFormUrl">Url of form:</label><input name="companyFormUrl" onChange={this.handleChange}
                                value={this.state.companyFormUrl} />
                        </div>
                        <input type="submit" />
                    </form>
                    <h3>Current Forms:</h3>
                    <ul>
                        {
                            this.state.companyData.map((ele, idx) => (
                                <div key={ele[0]}>
                                    <br />
                                    <p>Name of form: <a target="_blank" href={ele[1]} style={{ display: 'inline' }}>
                                        {ele[0]}
                                    </a></p>
                                    <p>Link of form: <a target="_blank" href={ele[1]} style={{ display: 'inline' }}>
                                        {ele[1]}
                                    </a></p>
                                    <button
                                        type='button'
                                        onClick={() => this.editForm(ele[0], ele[1])}>Edit Link
                                    </button>
                                    <button
                                    type='button'
                                    onClick={
                                        () => {
                                            db.collection('companies').doc(this.state.companyName).collection('Forms').doc('formDoc').update({
                                                [ele[0]]: firebase.firestore.FieldValue.delete()
                                            })
                                            this.updateCompanyData()
                                        }
                                    }>Delete Form</button>
                                    <br />
                                    <br />
                                </div>
                            ))
                        }
                    </ul>
                    <button type="button" onClick={() => { this.props.returnLink() }}>Back to Admin Home</button>
                    <button onClick={() => {
                        localStorage.removeItem('admin')
                        this.props.history.push(
                            '/'
                        )
                    }}>Logout of Admin</button>
                </div>
                :
                (
                    <EditForm formToUpdate={this.state.formToUpdate} formURL={this.state.formURL} company={this.state.companyName} returnLink={this.props.returnLink} returnToSelectedCompany={this.props.returnToSelectedCompany} removeFormToUpdate={this.removeFormToUpdate} history={this.props.history} />
                )
        )
    }
}
