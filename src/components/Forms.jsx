import React, { Component } from 'react'
import { db } from '../config/constants'
import { Link } from 'react-router-dom'
import SplashScreen from './SplashScreen'
import { tip } from '../helpers/global';

class Forms extends Component {
  constructor(props) {
    super(props)
    this.state = {
      companyName: '',
      companyData: [],
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
            db.collection('providers').doc(doc.data().providerName)
              .get()
              .then(() => {
                this.setState({ companyData: data.companyData, companyName: data.companyName, loading: false })

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
              <h2 className="spacingMarginHeader">{this.state.companyName} Forms & Notices</h2>
              <p className="spacingMarginText">Here you can find forms for commonly requested items. To fill out the form(s) online in Google Drive, click  “open with” and selected “DocHub” at the top of the page. Please make sure that your device has been installed with <strong>Google Drive</strong> and <strong>DocHub</strong> in advance. Alternatively, you can download and print the forms.
              </p>
              <p className="spacingMarginText">Click to open applicable forms</p>
              <div>
                <div className="companyHomeForms" style={{ textAlign: 'left' }}>
                  {
                    this.state.companyData.length === 0
                      ? <h3>There are currently no forms or notices.</h3>
                      : (
                        this.state.companyData.map(form => {
                          return (
                            <div key={form[0]}>
                              <a className="links" target="_blank" rel="noopener noreferrer" href={form[1]} /*onClick={() => { tip() }}*/>&#9673; {form[0]}</a>
                            </div>
                          )
                        })
                      )
                  }
                </div>
                <br />
                <p className="spacingMarginText">Can't find what your looking for? Reach out to us now by
                <a className="linkStyling" href="mailto:hcox@orendaretirement.com?   Subject=Inquiry" target="_top"> email.
                </a>
                </p>
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
                  type="button" id="noMarginButton"
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
