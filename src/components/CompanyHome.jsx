import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { db } from '../config/constants'


export default class CompanyHome extends Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    componentDidMount() {
        this.updateCompanyData()
    }

    //Look Bruce

    updateCompanyData = () => {

        db.collection('companies').doc(localStorage.getItem('company'))
        .get()
        .then(doc => {
            this.setState({ spd: doc.data().spd })
        })
    }


        // let companyRef = db.collection('companies').doc(localStorage.getItem('company'))

        // companyRef.collection('Forms').doc('formDoc')
        //     .get()
        //     .then(doc => {
        //         let formObj = doc.data(),
        //             companyData = []
        //         Object.keys(formObj).forEach(key => {
        //             if (key) {
        //                 companyData.push([key, formObj[key]])
        //             }
        //         })
        //         return { companyData, companyName: this.props.company }

        //     })
        //     .then(data => {
        //         companyRef
        //             .get()
        //             .then(doc => {
        //                 let spd = doc.data().spd
        //                 db.collection('providers').doc(doc.data().providerName)
        //                     .get()
        //                     .then(providerDoc => {
        //                         this.setState({ companyData: data.companyData, companyName: data.companyName, companyProvider: providerDoc.data().name, spd })
        //                     })
        //             })
        //     })
    // }

    render() {
        return (
            <div>
                {
                    !localStorage.getItem('company')
                        ? 'Wrong Page'
                        :
                        <div>
                            <h1 style={{marginBottom: '10px'}}>Welcome to the {localStorage.getItem('company')} portal page</h1>
                            <p>On this website you can get more information on forms, notices and etc</p>
                            <p>Click on the navigation on the top left or click below to go to each page</p>
                            <Link to="/PlanDetails" style={{ textDecoration: 'none', margin: '10px', display: 'block' }}>Plan Details</Link>
                            <Link to="/News" style={{ textDecoration: 'none', margin: '10px', display: 'block' }}>News</Link>
                            <a target="_blank" rel="noopener noreferrer" href={this.state.spd} style={{ textDecoration: 'none', margin: '10px', display: 'block' }}>Summary Plan Description</a>
                            <Link to="/Forms" style={{ textDecoration: 'none', margin: '10px', display: 'block' }}>Forms & Notices</Link>
                            <Link to="/Contact" style={{ textDecoration: 'none', margin: '10px', display: 'block' }}>Contact</Link>
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
