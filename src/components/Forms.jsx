import React, { Component } from 'react'
import { db } from '../config/constants'
import { Link } from "react-router-dom"

class Forms extends Component {
  constructor(props) {
    super(props);
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
    let result, company;
    if (this.state.companyData) {
      result = Object.keys(this.state.companyData[0]).map(data => ({ [data]: this.state.companyData[0][data] }))
      company = localStorage.getItem('company')
    }
    return (
      <div>
        {
          !localStorage.getItem('company')
            ? <h1>Wrong Page</h1>
            :
            <div>
              <h1>{company} Forms</h1>
              <h2>Here you can find forms for commonly requested items</h2>
              <p>To view and download the form, click on the links</p>
              {
                !localStorage.getItem('company')
                  ? 'Wrong Page'
                  :
                  <div>
                    {
                      !this.state.companyData
                        ? ''
                        :
                        result.map(data => {
                          return (
                            <div key={Object.keys(data)}>
                              <li>
                                <a href={Object.values(data)}>
                                  {Object.keys(data)}
                                </a>
                              </li>
                            </div>
                          )
                        })
                    }
                    <br />
                    <Link to="/CompanyHome" style={{ textDecoration: "none" }}>
                      back to {company} Home
                    </Link>
                    <br />
                    <Link to="/" style={{ textDecoration: "none" }}>
                      back to SBSF Home
                    </Link>
                    <br />
                    <br />
                    <button onClick={() => {
                      localStorage.clear()
                      this.props.history.push(
                        '/'
                      )
                    }}>Logout</button>
                  </div>
              }
            </div>
        }
      </div>
    )
  }
}

export default Forms;
