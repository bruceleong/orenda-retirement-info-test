import React, { Component } from 'react'
import { db } from '../config/constants'
import SplashScreen from './SplashScreen';

export default class EditForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      company: this.props.company,
      formToUpdate: this.props.formToUpdate,
      formURL: this.props.formURL,
      changesSubmitted: false
    }
  }

  validFirestoreDocNameCheck = (field, proposedName) => {
    if (proposedName.search(/[\~\*\/\[\]]/g)){
      alert(`${field} can't contain any '~' '*', '/', '[', or ']'`)
      return false
    }
    return true
  }

  updateCompanyData = () => {
    let companyRef = db.collection('companies').doc(this.props.company)
    companyRef.collection('Forms').doc('formDoc')
      .get()
      .then(doc => {
        let formObj = doc.data(),
          companyData = []
        Object.keys(formObj).forEach(key => {
          if (key === this.state.formToUpdate) {
            companyData.push([key, formObj[key]])
          }
        })
        this.setState({ [this.state.formURL]: companyData[1] })
      })
  }

  handleChange = evt => {
    this.setState({ [evt.target.name]: evt.target.value })
  }

  handleSubmit = evt => {
    console.log('where i want to check')
    evt.preventDefault()
    if (this.validFirestoreDocNameCheck('Form Name', this.state.formToUpdate)){
      db.collection('companies').doc(this.state.company).collection('Forms')
        .doc('formDoc')
        .set({ [this.state.formToUpdate]: this.state.formURL }, { merge: true })
        .then(() => {
        })
      this.updateCompanyData()
    }

  }

  render() {
    return (
      <div>
        {
          !this.props.company && !this.props.formToUpdate
            ? <SplashScreen />
            :
            <div>
              <h1>{`${this.state.company} Edit "${this.state.formToUpdate}"`}</h1>
              <form onSubmit={this.handleSubmit}>
                <div>
                  <label>Form URL: </label>
                  <input name="formURL" value={this.state.formURL} onChange={this.handleChange} style={{ width: '25vw', height: 'auto' }} />
                </div>
                <div>
                  <a target="_blank" href={this.state.formURL} style={{ display: 'inline' }}> <p>Click to test Link: <br /> {this.state.formURL}</p></a>
                </div>
                <button type="submit" onClick={() => { this.setState({ changesSubmitted: !this.state.changesSubmitted }) }}>Submit Changes</button>
                {
                  this.state.changesSubmitted &&
                  <div>
                    <br />
                    <button type="button" onClick={() => { this.setState({ changesSubmitted: !this.state.changesSubmitted }) }}>Click to make additional changes</button>
                    <br />

                    <h1>
                      Your changes were submitted
                    </h1>
                  </div>
                }
              </form>
            </div>
        }
        <button
          className="buttons"
          type="button"
          onClick={() => { this.props.returnToSelectedCompany(this.props.company); this.props.removeFormToUpdate() }}>Back to Company Home
        </button>
        <button
          className="buttons"
          type="button"
          onClick={() => { this.props.returnLink() }}>Back to Admin Home
        </button>
        <button
          className="buttons"
          type="button"
          onClick={() => {
            localStorage.removeItem('admin')
            this.props.history.push(
              '/'
            )
          }}>Logout of Admin
        </button>
      </div>
    )
  }
}
