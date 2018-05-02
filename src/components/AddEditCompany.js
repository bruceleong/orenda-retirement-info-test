import React, { Component } from 'react'
import { db } from '../config/constants'
import EditForm from './EditForm.jsx'
import SplashScreen from './SplashScreen'
import firebase from 'firebase'
require('firebase/firestore')

export default class AddEditCompany extends Component {
    constructor(props) {
        super(props)
        this.state = {
            dynamicCompanyName: '',
            companyProvider: '',
            companyData: [],
            spd: '',
            companyFormName: '',
            companyFormUrl: '',
            changesSubmitted: false,
            providerWebsite: '',
            adding: true,
            staticCompanyName: this.props.company,
            loading: true,
            allCompanies: []
        }
        this.updateCompanyData()
    }

    componentDidMount() {
        this.updateCompanyData()
        this.getAllCompanies()
    }

    editForm = (form, url) => {
        this.setState({ formToUpdate: form, formURL: url })
    }

    removeFormToUpdate = () => {
        this.setState({ formToUpdate: '' })
        this.updateCompanyData()
    }

    handleChange = evt => {
        this.setState({ [evt.target.name]: evt.target.value })
    }

    validFirestoreDocNameCheck = (field, proposedName) => {
        if (proposedName.search(/[\~\*\/\[\]]/g)){
          alert(`${field} can't contain any '~' '*', '/', '[', or ']'`)
          return false
        }
        return true
    }

    formHandleSubmit = evt => {
        evt.preventDefault()

        if (this.validFirestoreDocNameCheck('Form Name', evt.target.companyFormName.value)){

            let url = evt.target.companyFormUrl.value
            if (url.startsWith('https://') === false && url.startsWith('http://') === false) url = 'https://' + url

            db.collection('companies').doc(this.state.dynamicCompanyName).collection('Forms')
                .doc('formDoc')
                .set({ [evt.target.companyFormName.value]: url }, { merge: true })
            this.setState({
                companyFormName: '',
                companyFormUrl: ''
            })
            this.updateCompanyData()
        }
    }

    updateCompanyProfile = (evt) => {
        evt.preventDefault()
        if (this.state.staticCompanyName === this.state.dynamicCompanyName) {
            evt.preventDefault()
            db.collection('companies').doc(this.state.staticCompanyName)
                .set({ providerName: this.state.companyProvider, spd: this.state.spd, name: this.state.dynamicCompanyName, providerWebsite: this.state.providerWebsite }, { merge: true })
                .then(() => this.updateCompanyData())
            this.setState({ staticCompanyName: evt.target.dynamicCompanyName.value })
            alert('Success')
        } else if (this.state.allCompanies.includes(this.state.dynamicCompanyName)) {
            alert("That company name already exists, try changing your company name or going to the 'Edit Company Page'. Thank you!")
        } else  if (this.validFirestoreDocNameCheck('Company Name', this.state.dynamicCompanyName)){

            let newCompanyRef = db.collection('companies').doc(this.state.dynamicCompanyName)
            
            newCompanyRef
                .set({ providerName: this.state.companyProvider, spd: this.state.spd, name: this.state.dynamicCompanyName, providerWebsite: this.state.providerWebsite }, { merge: true })
                .then(() => {

                    let obj = {}
                    this.state.companyData.forEach((ele) => {
                        obj[ele[0]] = ele[1]
                    })
                    newCompanyRef.collection('Forms').doc('formDoc').set(obj)

                })
            db.collection('companies').doc(this.state.staticCompanyName).delete()

            this.setState({ staticCompanyName: evt.target.dynamicCompanyName.value, loading: false, changesSubmitted: !this.state.changesSubmitted, adding: false })

            if (localStorage.company === this.state.staticCompanyName) localStorage.company = evt.target.dynamicCompanyName.value
            
            alert('Success')
            
        }
    }

    updateCompanyData = () => {
        if (this.state.staticCompanyName !== 'newCompany') {

            let companyRef = db.collection('companies').doc(this.state.staticCompanyName)

            companyRef.collection('Forms').doc('formDoc')
                .get()
                .then(doc => {
                    let formObj = doc.data(),
                        companyData = []
                    if (formObj) {
                        Object.keys(formObj).forEach(key => {
                            companyData.push([key, formObj[key]])
                        })
                    }
                    return { companyData, dynamicCompanyName: this.state.staticCompanyName }

                })
                .then(data => {
                    companyRef
                        .get()
                        .then(doc => {
                            let spd = doc.data().spd
                            this.setState({ companyData: data.companyData, dynamicCompanyName: data.dynamicCompanyName, companyProvider: doc.data().providerName, providerWebsite: doc.data().providerWebsite, spd, adding: false, loading: false })
                        })
                })
        } else {
            this.setState({ loading: false })
        }
    }

    getAllCompanies = () => {

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
        return this.state.loading === true
            ? (<SplashScreen />)
            : (
                !this.state.formToUpdate
                    ?
                    <div>
                        <div className="page">
                            {!this.state.adding
                                ?
                                (<div>
                                    <h2>{this.state.staticCompanyName} Company Info</h2>
                                    <h3>Company Name: {this.state.staticCompanyName}</h3>
                                    <h3>Company Provider: {this.state.companyProvider}</h3>
                                    <h3>Company Provider Website: {this.state.providerWebsite}</h3>
                                    <a target="_blank" rel="noopener noreferrer" href={this.state.spd}>
                                        <h3>Summary Plan Description:  {this.state.spd}</h3>
                                    </a>
                                 </div>
                                )
                                : <h2>Enter your New Company's Info</h2>
                            }

                            <form onSubmit={this.updateCompanyProfile}>
                                <label style={{ display: 'block', margin: '10px' }} htmlFor="companyName">Company Name:<input
className="buttonInput"
                                    name="dynamicCompanyName" value={this.state.dynamicCompanyName}
                                    required
                                    onChange={this.handleChange} />
                                </label>
                                <label style={{ display: 'block', margin: '10px' }} htmlFor="companyProvider">Company Provider:<input
className="buttonInput"
                                    name="companyProvider" value={this.state.companyProvider}
                                    required
                                    onChange={this.handleChange} />
                                </label>
                                <label style={{ display: 'block', margin: '10px' }} htmlFor="providerWebsite">Company Provider Website:<input
className="buttonInput"
                                    name="providerWebsite" value={this.state.providerWebsite}
                                    required
                                    onChange={this.handleChange} />
                                </label>
                                <label style={{ display: 'block', margin: '10px' }} htmlFor="companyProvider">Summary Plan Description:<input
                                    className="buttonInput"
                                    name="spd" value={this.state.spd}
                                    required
                                    onChange={this.handleChange} />
                                </label>

                                <button className="buttons" type="submit" style={{ display: 'block', margin: '0 auto' }}>
                                    Submit Changes
                                </button>


                            </form>
                        </div>
                        {
                            this.state.adding
                                ? null
                                :
                                (
                                    <div className="page">
                                        <h2>Company Forms:</h2>
                                        <form onSubmit={this.formHandleSubmit}>
                                            <h3>Add new Forms</h3>
                                            <div>
                                                <label htmlFor="companyFormName">Name of form: </label><input
                                                    className="buttonInput"
                                                    name="companyFormName" onChange={this.handleChange}
                                                    required
                                                    value={this.state.companyFormName} />
                                            </div>
                                            <div>
                                                <label htmlFor="companyFormUrl">Website of form: </label><input
                                                    className="buttonInput"
                                                    name="companyFormUrl" onChange={this.handleChange}
                                                    required
                                                    value={this.state.companyFormUrl} />
                                            </div>
                                            <input className="buttons" type="submit" />
                                        </form>
                                        <h3>Current Forms:</h3>
                                        <div>
                                            {
                                                this.state.companyData.map((ele, idx) => (
                                                    <div className="companyPages" key={ele[0]}>
                                                        <br />
                                                        <p>{'Name of form: '}
                                                            <a target="_blank" href={ele[1]} style={{ display: 'inline' }}>
                                                                {ele[0]}
                                                            </a>
                                                        </p>
                                                        <p>{'Link of form: '}
                                                            <a target="_blank" href={ele[1]} style={{ display: 'inline' }}>
                                                                {ele[1]}
                                                            </a>
                                                        </p>
                                                        <button className="buttons" type="button" onClick={() => this.editForm(ele[0], ele[1])}>
                                                            Edit Link
                                                        </button>
                                                        <button
                                                            className="buttons"
                                                            type="button"
                                                            onClick={
                                                                () => {
                                                                    db.collection('companies').doc(this.state.dynamicCompanyName).collection('Forms')
                                                                        .doc('formDoc')
                                                                        .update({
                                                                            [ele[0]]: firebase.firestore.FieldValue.delete()
                                                                        })
                                                                    this.updateCompanyData()
                                                                }
                                                            }>Delete Form
                                                        </button>
                                                        <br />
                                                        <br />
                                                    </div>
                                                ))
                                            }
                                        </div>
                                    </div>
                                )
                        }
                        <button className="buttons" type="button" onClick={() => { this.props.returnLink() }}>Back to Admin Home</button>
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
                    :
                    (
                        <EditForm formToUpdate={this.state.formToUpdate} formURL={this.state.formURL} company={this.state.dynamicCompanyName} returnLink={this.props.returnLink} returnToSelectedCompany={this.props.returnToSelectedCompany} removeFormToUpdate={this.removeFormToUpdate} history={this.props.history} />
                    )
            )
    }
}
