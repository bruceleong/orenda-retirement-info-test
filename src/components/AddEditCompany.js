import React, { Component } from 'react'
import { db } from '../config/constants'

class AddEditCompany extends Component {
  constructor(props) {
    super(props)
    //state will be empty if new company, but if user is editing a company then
    // state will be filled with local data
    this.state = {
        companyName: '',
        companyProvider: '',
        companyProviderUrl: '',
        companyData: [],  
    }
    this.submit = this.submit.bind(this)
  }

  componentDidMount() {
    if (this.props.company !== 'newCompany'){
        let company = localStorage.getItem('company')
        db.collection('companies').doc(company).collection('Forms')
        .get()
        .then(snapshot => {
            let companyData = []
            snapshot.forEach(doc => {
            companyData.push(doc.data())
            })
            this.setState({ companyData, companyName: this.props.company })
        })
    }
  }

  render() {
    return (

    //still under construction
      <div>
        <form onClick={this.submit}>
            {/*labels for each piece of company of data*/}
            <label htmlFor="companyName">Company Name</label><input name="companyName" value={this.state.companyName} />
            <label htmlFor="companyProvider">Company Provider</label><input name="companyProvider" value={this.state.companyProvider} />
            <label htmlFor="companyForms">Add New Company Form</label><input name="companyForms" />
            <h3>Current Forms:</h3>
            <ul>
                {this.state.companyData.map((form) => (
                    <li key={Object.keys[form][0]}>{Object.keys[form][0]}</li>
                ))}
            </ul>
        </form>
      </div>
    )
  }
}

export default AddEditCompany
