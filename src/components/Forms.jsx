import React, { Component } from 'react'
import { db } from '../config/constants'


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
    let result;
    if (this.state.companyData) {
      result = Object.keys(this.state.companyData[0]).map(data => ({ [data]: this.state.companyData[0][data] }))
    }
    return (
      <div>
        {
          !localStorage.getItem('company')
            ? <h1>Wrong Page</h1>
            :
            <div>
              <h1>Forms</h1>
              <h2>Here you can find forms for commonly requested items</h2>
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
