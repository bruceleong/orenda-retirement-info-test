import React, { Component } from 'react'
import { db } from '../config/constants'


class PlanDetails extends Component {
    constructor(props) {
        super(props)
        // this.handleSubmit = this.handleSubmit.bind(this)
        this.state = {
        }
    }

    componentDidMount() {
        let company = localStorage.getItem('company')
        db.collection('companies').doc(company).collection('Provider')
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
                            {
                                !this.state.companyData
                                    ? ''
                                    :
                                    <h1>For additional information on your
                                    <br />
                                        {company} retirement plan:
                                    <br />
                                        <a target="_blank" rel="noopener noreferrer" href={this.state.companyData[0]['Provider Website']}>
                                            Click Here
                                        </a>
                                    </h1>
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

export default PlanDetails
