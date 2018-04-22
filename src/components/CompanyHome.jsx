import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { db } from '../config/constants'


class CompanyHome extends Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    componentDidMount() {
        this.updateCompanyData()
    }

    updateCompanyData = () => {
        let companyRef = db.collection('companies').doc(localStorage.getItem('company'))

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

    render() {
        console.log(this.state)
        return (
            <div>
                {
                    !localStorage.getItem('company')
                        ? 'Wrong Page'
                        :
                        <div>
                            <h1>Welcome to the {localStorage.getItem('company')} portal page</h1>
                            <br />
                            <p>On this website you can get more information on forms, notices and etc</p>
                            <p>Click on the navigation on the top left or click below to go to each page</p>
                            <br /><br />
                            <Link to="/PlanDetails" style={{ textDecoration: 'none' }}>Plan Details</Link>
                            <br /><br />
                            <Link to="/News" style={{ textDecoration: 'none' }}>News</Link>
                            <br /><br />
                            <a target="_blank" rel="noopener noreferrer" href={this.state.spd} style={{ textDecoration: 'none' }}>Summary Plan Description</a>
                            <br /><br />
                            <Link to="/Forms" style={{ textDecoration: 'none' }}>Forms & Notices</Link>
                            <br /><br />
                            <Link to="/Contact" style={{ textDecoration: 'none' }}>Contact</Link>
                            <br /><br />
                            <button
                                type="button" onClick={() => {
                                    localStorage.removeItem('company')
                                    this.props.history.push(
                                        '/'
                                    )
                                }}>Logout
                            </button>
                        </div>
                }
            </div>
        )
    }
}

export default CompanyHome
