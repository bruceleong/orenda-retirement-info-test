import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { db } from '../config/constants'
import firebase from 'firebase'
require('firebase/firestore');

export default class EditForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      company: this.props.company,
      formToUpdate: this.props.formToUpdate,
      formURL: this.props.formURL,
      companyData: [],
      changesSubmitted: false
    }
  }

  componentWillReceiveProps(newProps) {
    this.setState({
      company: newProps.company,
      formToUpdate: newProps.formToUpdate,
      formURL: newProps.formURL,
    })
  }

  updateCompanyData() {
    let companyRef = db.collection('companies').doc(this.state.company)

    companyRef.collection('Forms').doc('formDoc')
      .get()
      .then(doc => {
        let formObj = doc.data(),
          companyData = []

        Object.keys(formObj).forEach(key => {
          companyData.push([key, formObj[key]])
        })

        return { companyData }
      })
      .then(data => {
        companyRef
          .get()
          .then(doc => {
            let spd = doc.data().spd
            let providerWebsite = doc.data().providerWebsite
            db.collection('providers').doc(doc.data().providerName)
              .get()
              .then(providerDoc => {
                console.log('spd is', spd, 'companyProvider is', providerDoc.data().name, 'companyData is', data.companyData, 'companyName is', data.companyName)
                this.setState({ companyData: data.companyData })
                this.setState({ formURL: data.companyData[this.props.formToUpdate] })
              })
          })
      })
  }

  handleChange = evt => {
    this.setState({ [evt.target.name]: evt.target.value })
  }

  handleSubmit = evt => {
    evt.preventDefault()
    db.collection('companies').doc(this.state.company).collection('Forms')
      .doc('formDoc')
      .set({ [this.state.formToUpdate]: this.state.formURL }, { merge: true })
  }

  render() {
    console.log(this.props, 'current company data')
    console.log(this.state, 'current state in edit form')
    return (
      <div>
        {
          !this.props.company && !this.props.formToUpdate
            ? <h1>No forms to edit</h1>
            :
            <div>
              <h1>{`${this.state.company} Edit "${this.state.formToUpdate}"`}</h1>
              <form onSubmit={this.handleSubmit}>
                <div>
                  <label>Form URL: </label>
                  <input name="formURL" value={this.state.formURL} onChange={this.handleChange} style={{ width: '25vw', height: 'auto' }} />
                </div>
                <div>
                { !this.state.changesSubmitted
                  ?
                <button type="button" onClick={() => { this.setState({ changesSubmitted: !this.state.changesSubmitted }) }}>Submit Changes</button>

                  :
                  <div>
                  <button type="button" onClick={() => { this.setState({ changesSubmitted: !this.state.changesSubmitted }) }}>Make Additional Changes</button>
                    <h2>Your changes were submitted</h2>
                  </div>
                }
                </div>
              </form>
            </div>
        }
        <button type="button" onClick={() => { this.props.returnToSelectedCompany(this.props.company); this.props.removeFormToUpdate() }}>Back to Company Home</button>
        <button type="button" onClick={() => { this.props.returnLink() }}>Back to Admin Home</button>
      </div>
    )
  }
}
