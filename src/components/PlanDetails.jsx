import React, { Component } from 'react'
import { db } from '../config/constants'
import { Link } from 'react-router-dom'
import splashScreen from './SplashScreen'


class PlanDetails extends Component {
    constructor(props) {
        super(props)
        this.state = {
            companyName: '',
            companyProvider: '',
            companyData: [],
            spd: '',
            companyProviderWebsite: ''
        }
    }

    componentDidMount() {
        let companyRef = db.collection('companies').doc(localStorage.getItem('company'))

        companyRef.collection('Forms').doc('formDoc')
            .get()
            .then(doc => {
                let formObj = doc.data(),
                    companyData = []

                Object.keys(formObj).forEach(key => {
                    companyData.push([key, formObj[key]])
                })

                return { companyData, companyName: localStorage.getItem('company') }
            })
            .then(data => {
                companyRef
                    .get()
                    .then(doc => {
                        let spd = doc.data().spd
                        let providerWebsite = doc.data().providerWebsite
                        db.collection('providers').doc(doc.data().providerName)
                            .get()
                            .then(providerDoc => {

                                this.setState({ companyData: data.companyData, companyName: data.companyName, /*companyProvider: providerDoc.data().name,*/ companyProviderWebsite: providerWebsite, spd })
                            })
                    })
            })
    }

    render() {
        return (
            <div>
                {
                    !localStorage.getItem('company')
                        ? 'Wrong Page'
                        :
                        <div>
                            {
                                !this.state.companyData
                                    ? <splashScreen />
                                    :
                                    <div className="page">
                                        <h2>For additional information on your
                                        {localStorage.getItem('company')} retirement plan:
                                        <a target="_blank" rel="noopener noreferrer" href={this.state.companyProviderWebsite}>
                                                Click Here
                                        </a>
                                        </h2>
                                    </div>
                            }
                            <br />
                            <Link to="/CompanyHome" style={{ textDecoration: 'none' }}>
                                <button
                                    className="buttons"
                                    type="button">
                                    Back to {localStorage.getItem('company')} Home
                                </button>
                            </Link>
                            <br />
                            <button
                                className="buttons"
                                type="button"
                                onClick={() => {
                                    localStorage.removeItem('company')
                                    this.props.history.push(
                                        '/'
                                    )
                                }}>
                                Logout
                            </button>
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

export default PlanDetails
