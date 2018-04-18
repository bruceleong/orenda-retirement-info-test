import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import {connect} from 'react-redux'
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
        db.collection('companies').doc(company).collection('forms')
            .get()
            .then(snapshot => {
                let companyData = []
                snapshot.forEach(doc => {
                    companyData.push(doc.data())
                });
                this.setState({companyData})
            })
    }

    render() {
        console.log(this.props, 'props')
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
                    this.state.companyData.map(data => {
                        return (
                            <h1>
                            {Object.keys(data)} -
                            {Object.values(data)}
                            </h1>
                        )
                    })
                }
                <button onClick={()=> {
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
