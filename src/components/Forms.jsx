import React, { Component } from 'react'
import { db } from '../config/constants'
import { Link } from 'react-router-dom'
import SplashScreen from './SplashScreen'
import circle from './circle.png'

class Forms extends Component {
  constructor(props) {
    super(props)
    this.state = {
      companyName: '',
      companyProvider: '',
      companyData: [],
      spd: '',
      companyProviderWebsite: '',
      loading: true
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
                this.setState({ companyData: data.companyData, companyName: data.companyName, /*companyProvider: providerDoc.data().name,*/ companyProviderWebsite: providerWebsite, spd, loading: false })

              })
          })
      })
  }


  render() {
    return this.state.loading === true
      ? (<SplashScreen />)
      : (
        <div>
        <div className="loggedInHeader" />
        <div className="companyPages">
          <div>
            <h1>{this.state.companyName} Forms & Notices</h1>
            <h2>Here you can find forms for commonly requested items:</h2>
            <p>Click to download</p>
            <div>
              <div>
                {
                  this.state.companyData.map(form => {
                    return (
                      <div key={form[0]}>
                          <a className="links" target="_blank" rel="noopener noreferrer" href={form[1]}>&#9673;{form[0]}</a>
                      </div>
                    )
                  })
                }
              </div>
              <br />
              <Link to="/CompanyHome" style={{ textDecoration: 'none' }}>
                <button
                  className="buttons"
                  type="button">
                  Back to {this.state.companyName} Home
                </button>
              </Link>
              <br />
              <button
                className="buttons"
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
        </div>
      )
  }
}

export default Forms
