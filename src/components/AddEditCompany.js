import React, { Component } from 'react'
import { db } from '../config/constants'

export default class AddEditCompany extends Component {
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
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit(){}

  componentDidMount() {
    if (this.props.company !== 'newCompany'){
        let company = localStorage.getItem('company')
        db.collection('companies').doc(company).collection('Forms')
        .get()
        .then(snapshot => {
            let companyData = []
            snapshot.forEach(doc => {
                let obj = doc.data()
                let keys = Object.keys(obj)
                keys.forEach(key => {
                    companyData.push([key, obj[key]])
                })

            })
            this.setState({ companyData, companyName: this.props.company })
        })
    }
  }

  render() {
    return (

    //still under construction
        <div>
            <h2>General Company Info</h2>
            <form onClick={this.handleSubmit}>
                {/*labels for each piece of company of data*/}
                <div>
                    <label htmlFor="companyName">Company Name:</label><input name="companyName" value={this.state.companyName} />
                </div>
                <div>
                    <label htmlFor="companyProvider">Company Provider:</label><input name="companyProvider" value={this.state.companyProvider} />
                </div>
            </form>
            <h2>Company Forms</h2>
            <form>
                <h3>Add new Forms</h3>
                <div>
                    <label htmlFor="companyForms">Name of form:</label><input name="companyForms" />
                </div>
                <div>
                    <label htmlFor="companyFormUrl">Url of form:</label><input name="companyFormUrl" />
                </div>
                <h3>Current Forms:</h3>
                <ul>
                    {this.state.companyData.map((ele) => (
                            <a target="_blank" href={ele[1]} style={{display: 'block'}} key={ele[0]}>
                                {ele[0]}
                            </a>
                    ))}
                </ul>
            </form>
        </div>  
    )
  }
}
