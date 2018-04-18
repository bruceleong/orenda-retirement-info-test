import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { db } from '../config/constants'


class CompanyHome extends Component {
    constructor(props) {
        super(props)
        // this.handleSubmit = this.handleSubmit.bind(this)
        this.state = {
        }
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
    }

    render() {
        let result;
        if (this.state.companyData) {
            result = Object.keys(this.state.companyData[0]).map(data => ({ [data]: this.state.companyData[0][data] }))
        }
        console.log(result, 'results')
        console.log(this.props, 'props')
        console.log(this.state, 'current state')
        return (
            <div>
                {
                    !localStorage.getItem('company')
                        ? 'Wrong Page'
                        :
                        <div>
                            <h1>{localStorage.getItem('company')} Home</h1>
                            {
                                !this.state.companyData
                                    ? ''
                                    :
                                    result.map(data => {
                                        return (
                                            <div key={Object.keys(data)}>
                                            <a href={Object.values(data)}>
                                            {Object.keys(data)}
                                            </a>
                                            </div>
                                        )
                                    })
                            }
                            <button onClick={() => {
                                localStorage.clear()
                                this.props.history.push(
                                    '/'
                                )
                            }}>Logout</button>
                        </div>
                }
            </div>
        )
    }
}

// const mapState = (state) => {
//     return {
//         allCompanies: state.allCompanies,
//         company: state.company
//     }
// }

// const mapDispatch = (dispatch) => ({
//     loadCompanyData(company) {
//         console.log('typeof', typeof getCompanyData)
//         dispatch(getCompanyData(company))
//     }
// })

// export default CompanyHome

export default (CompanyHome)
