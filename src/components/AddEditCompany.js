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
        companyData: [],
        spd: ''
    }
    this.formHandleSubmit = this.formHandleSubmit.bind(this)
  }

  formHandleSubmit(evt){
      evt.preventDefault()

      // using company from props instead of from state because
      // state company will change with handleInput
      db.collection('companies').doc(this.props.company).collection('Forms')
      .doc('formDoc')
      .set({ [evt.target.companyFormName.value]: evt.target.companyFormUrl.value}, {merge: true})

  }

  componentDidMount() {
    if (this.props.company !== 'newCompany'){

        let companyRef = db.collection('companies').doc(this.props.company)

        companyRef.collection('Forms').doc('formDoc')
        .get()
        .then(doc => {
            let formObj = doc.data(),
                companyData = []

            Object.keys(formObj).forEach(key => {
                companyData.push([key, formObj[key]])
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
                    console.log('spd is', spd, 'companyProvider is', providerDoc.data().name, 'companyData is', data.companyData, 'companyName is', data.companyName)
                    this.setState({companyData: data.companyData, companyName: data.companyName, companyProvider: providerDoc.data().name, spd})
                })
            })
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
                <div>
                    <label htmlFor="companyProvider">Summary Plan Description:</label><input name="spd" value={this.state.spd} />
                </div>
            </form>
            <h2>Company Forms</h2>
            <form onSubmit={this.formHandleSubmit}>
                <h3>Add new Forms</h3>
                <div>
                    <label htmlFor="companyFormName">Name of form:</label><input name="companyFormName" />
                </div>
                <div>
                    <label htmlFor="companyFormUrl">Url of form:</label><input name="companyFormUrl" />
                </div>
                <input type="submit" />
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
