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
        db.collection('companies').doc(this.props.company).collection('forms')
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
        console.log(this.props, 'current props in CompanyHome')
        console.log(this.state, 'state')
        return (
            <div>
                <h1>Company home</h1>
                {
                    !this.state.companyData
                    ? ''
                    : this.state.companyData.map(data => {
                        return (
                            <h1>
                            {Object.keys(data)} -
                            {Object.values(data)}
                            </h1>
                        )
                    })
                }
            </div>
        )
    }
}

const mapState = (state) => {
    return {
        allCompanies: state.allCompanies,
        company: state.company
    }
}

// const mapDispatch = (dispatch) => ({
//     loadCompanyData(company) {
//         console.log('typeof', typeof getCompanyData)
//         dispatch(getCompanyData(company))
//     }
// })

// export default CompanyHome

export default connect(mapState)(CompanyHome)
