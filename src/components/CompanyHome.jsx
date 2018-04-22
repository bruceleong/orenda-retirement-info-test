import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { db } from '../config/constants'


class CompanyHome extends Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    componentDidMount() {
        let company = localStorage.getItem('company')
        db.collection('companies').doc(company).collection('Forms')
            .get()
            .then(snapshot => {
                let companyData = []
                snapshot.forEach(doc => {
                    companyData.push(doc.data())
                });
                this.setState({ companyData })
            })
            .catch(error => {
                console.log(error)
            })
    }

    render() {
        let result, company;
        if (this.state.companyData) {
            result = Object.keys(this.state.companyData[0]).map(data => ({ [data]: this.state.companyData[0][data] }))
            company = localStorage.getItem('company')
        }

        return (
            <div>
                {
                    !localStorage.getItem('company')
                        ? 'Wrong Page'
                        :
                        <div>
                            <h1>Welcome to the {company} portal page</h1>
                            <br />
                            <p>On this website you can get more information on forms, notices and etc</p>
                            <p>Click on the navigation on the top left or click below to go to each page</p>
                            <br /><br />
                            <Link to="/PlanDetails" style={{ textDecoration: 'none' }}>Plan Details</Link>
                            <br /><br />
                            <Link to="/News" style={{ textDecoration: 'none' }}>News</Link>
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
