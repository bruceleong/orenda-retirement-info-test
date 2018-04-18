import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { getCompanyData } from '../store'


class Home extends Component {
    constructor(props) {
        super(props)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleInput = this.handleInput.bind(this)
        console.log('props are', props)
        this.state = {
            firstAttempt: true
        }
    }

    handleSubmit(evt) {
        evt.preventDefault()
        this.props.loadCompanyData(evt.target.selectCompany.value)

        this.props.history.push(`/companyHome`)

    }

    handleInput(evt) {
        evt.preventDefault()
        let lowerCaseAllCompanies = this.props.allCompanies.map(ele => ele.toLowerCase())
        let idx = lowerCaseAllCompanies.indexOf(evt.target.inputField.value.toLowerCase())

        if (idx === -1) {
            this.setState({ firstAttempt: false })

        } else {
            this.props.loadCompanyData(this.props.allCompanies[idx])
            console.log(this.props.allCompanies[idx], 'company.....')
            localStorage.setItem('company', this.props.allCompanies[idx])
            this.props.history.push(`/companyHome`)
        }
    }

    render() {
        return (
            <div>
                <h1>Hey Participant! Welcome to your Employee Resource</h1>
                <h2>The SBSF Perspective</h2>
                <li><strong>Approaching retirement:</strong> Compare your estimated expenses in retirement against your current expenses. Plan for essential, discretionary, and emergency expenses.</li>
                <li><strong>Living well into retirement:</strong> Combine dependable income for everyday expenses with other income to cover unexpected costs.</li>
                <br />
                <div>
                    {
                        !localStorage.getItem('company')
                            ?
                            <div>
                                <h4>Enter your company name for more details on your retirement plan:</h4>
                                <form onSubmit={this.handleInput}>
                                    <input type="text" name="inputField" />
                                    <input type="submit" />
                                </form>
                                {
                                    this.state.firstAttempt
                                        ? null
                                        : <p style={{ color: 'red' }}>That input didn't match any registered company</p>
                                }
                            </div>
                            :
                            <button onClick={() => {
                                localStorage.clear()
                                this.props.history.push(
                                    '/'
                                )
                            }}>Logout</button>
                    }
                </div>
                <br />
                <br />
                <h2>Checkout our top picks for retirement planning today:</h2>
                <div id="homeContent">
                    <div className="articles">
                        <div className="article">
                            <div className="articleContainer">
                                <a href="https://www.fedsmith.com/2018/03/12/common-sense-need-plan-retirement/">
                                    <img src="https://www.fedsmith.com/wp-content/uploads/2018/03/whats-your-plan-for-retirement.jpg" alt="article" width="160px" className="images" />
                                    <h4><b>Is Common Sense All You Need to Plan Your Retirement?</b></h4>
                                </a>
                                <p>Have you done all your planning? Are you ready?</p>
                                <a href="https://www.fedsmith.com/2018/03/12/common-sense-need-plan-retirement/">
                                    <p><strong>More Info</strong></p>
                                </a>
                            </div>
                        </div>
                        <div className="article">
                            <div className="articleContainer">
                                <a href="https://www.nytimes.com/2017/07/21/your-money/retirement-planning-advice.html">
                                    <img src="https://static01.nyt.com/images/2017/07/23/business/23RETIRINGArt/23RETIRINGArt-master768.jpg" alt="article" width="160px" className="images" />
                                    <h4>
                                        <b>Three Things I Should Have Said About Retirement Planning</b>
                                    </h4>
                                </a>
                                <p>I have put an addendum on the retirement advice I give to people: “And no matter how much money you think you are going to need, save another 15 percent, just in case.”</p>
                                <a href="https://www.nytimes.com/2017/07/21/your-money/retirement-planning-advice.html">
                                    <p><strong>More Info</strong></p>
                                </a>
                            </div>
                        </div>
                        <div className="article">

                            <a href="https://www.fool.com/retirement/2018/02/21/2018-guide-to-retirement-planning.aspx">
                                <img src="https://g.foolcdn.com/editorial/images/473596/mid-aged-man-with-glasses-smiling_gettyimages-825083248_large.jpg" alt="article" width="160px" className="images" />
                                <h4>
                                    <b>2018 Guide to Retirement Planning</b>
                                </h4>
                            </a>
                            <p>Ready to secure your financial future? Here's what you need to know.
                            </p>
                            <a href="https://www.fool.com/retirement/2018/02/21/2018-guide-to-retirement-planning.aspx">
                                <p><strong>More Info</strong></p>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapState = ({ allCompanies }) => ({
    allCompanies
})

const mapDispatch = (dispatch) => ({
    loadCompanyData(company) {
        console.log('typeof', typeof getCompanyData)
        dispatch(getCompanyData(company))
    }
})

export default connect(mapState, mapDispatch)(Home)
