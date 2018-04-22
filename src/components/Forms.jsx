import React, { Component } from 'react'
import { db } from '../config/constants'
import { Link } from 'react-router-dom'

class Forms extends Component {
  constructor(props) {
    super(props)
    this.state = {
      companyName: '',
      companyProvider: '',
      companyData: [],
      spd: '',
      companyProviderWebsite: ''
    }
  }

  componentDidMount() {
    this.fetchFormData()
  }

  fetchFormData() {
    let companyRef = db.collection('companies').doc(localStorage.getItem('company'))

    companyRef.collection('Forms').doc('formDoc')
      .get()
      .then(doc => {
        let formObj = doc.data(),
          companyData = []

        Object.keys(formObj).forEach(key => {
          companyData.push([key, formObj[key]])
        })

        return { companyData, companyName: localStorage.getItem('company') }
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
                this.setState({ companyData: data.companyData, companyName: data.companyName, companyProvider: providerDoc.data().name, companyProviderWebsite: providerWebsite, spd })
              })
          })
      })
  }


  render() {
    return (
      <div>
        <div>
          <h1>{this.state.companyName} Forms & Notices</h1>
          <h2>Here you can find forms for commonly requested items</h2>
          <p>To view and download the form, click on the links</p>
          <div>
            {
              this.state.companyData.map(form => {
                return (
                  <div key={form[0]}>
                    <a target="_blank" rel="noopener noreferrer" href={form[1]} style={{ textDecoration: 'none' }}><li>{form[0]}</li></a>
                  </div>
                )
              })
            }
            <br />
            <Link to="/CompanyHome" style={{ textDecoration: 'none' }}>
              Back to {this.state.companyName} Home
            </Link>
            <br />
            <Link to="/" style={{ textDecoration: 'none' }}>
              Back to SBSF Home
            </Link>
            <br />
            <br />
            <button
              type="button"
              onClick={() => {
                localStorage.removeItem('company')
                this.props.history.push(
                  '/'
                )
              }}>
              Logout
            </button>
          </div>
        </div>
      </div>
    )
  }
}

export default Forms
