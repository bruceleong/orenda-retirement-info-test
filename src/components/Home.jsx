import React, { Component } from 'react'
import { db } from '../config/constants'
import { connect } from 'react-redux'
import { getCompanyData } from '../store'

class Home extends Component {
    constructor(props) {
        super(props)
        this.state = {
            firstAttempt: true,
            videoData: [],
            articleData: [],
            allCompanies: [],
            loading: true
        }
    }

    componentDidMount() {
        this.getNewsData()
        this.getVideoData()
        this.getAllCompanies()
    }

    getVideoData = () => {
        db.collection('videos').doc('videoData')
            .get()
            .then(snapshot => {
                let videos = snapshot.data(),
                    videoData = []

                Object.keys(videos).forEach(key => {
                    if (key) {
                        videoData.push([key, videos[key]])
                    }
                })
                this.setState({ videoData, loading: false })
            })
    }

    getAllCompanies = () => {

        db.collection('companies')
            .get()
            .then(snapshot => {
                let allCompanies = []
                snapshot.forEach(doc => {
                    allCompanies.push(doc.data().name)
                })
                this.setState({ allCompanies })
            })
    }

    getNewsData = () => {
        db.collection('articles').doc('newsArticles')
            .get()
            .then(snapshot => {
                let articles = snapshot.data(),
                    articleData = []
                Object.keys(articles).forEach(key => {
                    articleData.push([key, articles[key]])
                })
                this.setState({ articleData })
            })
    }

    handleInput = (evt) => {
        evt.preventDefault()
        let lowerCaseAllCompanies = this.state.allCompanies.map(ele => ele.toLowerCase())
        let idx = lowerCaseAllCompanies.indexOf(evt.target.inputField.value.toLowerCase())
        if (idx === -1) {
            this.setState({ firstAttempt: false })
        } else {
            this.props.loadCompanyData(this.state.allCompanies[idx])
            localStorage.setItem('company', this.state.allCompanies[idx])
            this.props.history.push(`/companyHome`)
        }
    }

    render() {
        return (
            <div>
                <div>
                    <div className="header" />
                    <div className="greySection">
                        {
                            !localStorage.getItem('company')
                                ?
                                <div id="title">
                                    <h4 id="header" style={{ margin: '3vh auto 2vh auto' }}>WELCOME TO THE PARTICIPANT CENTER
                                    </h4>
                                    <p className="homeText">
                                        Please enter your company name for more details on your retirement plan.
                                    </p>
                                    <form onSubmit={this.handleInput}>
                                        <input className="buttonInput" type="text" name="inputField" style={{ textAlign: 'center' }} />
                                        {
                                            this.state.firstAttempt
                                                ?
                                                <div>
                                                    <div style={{ height: '.85em' }} />
                                                </div>
                                                :
                                                <div>
                                                    <div style={{ color: 'blue', fontSize: '.75rem' }}>Did not recognize company
                                                    </div>
                                                </div>
                                        }
                                        <button className="buttons" type="submit">Login</button>
                                    </form>
                                    <p className="bold">
                                        In a hurry, or questions? Call us&nbsp;<a className="linkStyling" href="tel:2125642464">+1 212-564-2464</a>
                                    </p>
                                </div>
                                :
                                <div id="title">
                                    <h4 id="header" style={{ margin: '3vh auto 2vh auto' }}>WELCOME TO THE PARTICIPANT CENTER
                                    </h4>
                                    <h4>You are currently logged in</h4>
                                    <button
                                        className="buttons"
                                        type="button"
                                        onClick={() => {
                                            localStorage.removeItem('company')
                                            this.props.history.push(
                                                '/'
                                            )
                                        }}>Logout
                                    </button>
                                    <p className="bold">
                                        In a hurry, or questions? Call us&nbsp;<a className="linkStyling" href="tel:2125642464">+1 212-564-2464</a>
                                    </p>
                                </div>
                        }
                    </div>
                    <div className="whiteSection">
                        <h4 id="subHeader">
                            ORENDA RETIREMENT
                        </h4>
                        <p className="homeText" style={{fontSize: '1rem'}}>
                            Some label Orenda Retirement as a contemporary professional group, while others think of us as determined and loyal. Regardless of the label, it is our duty as retirement plan administrators,to bring our clients and partners a very personal experience that exceeds expectations. As a group, we strive to make sure that customer service is our top priority. With over 10 years of experience in retirement services, we understand the needs of the market. By building a close relationship with our clients, we are able to meet their every need.
                            At Orenda Retirement, LLC we provide Third Party Administration and ERISA 3(16) Plan Administration Services to qualified retirement plans for Plan Sponsors.
                        </p>
                        <br />
                    </div>
                    <div className="greySection">
                        <h4 id="subHeader">
                            CONTACT US
                        </h4>
                        <p className="contactText" style={{fontSize: '1rem'}}>
                            It is never too early to get started on your investment plans. Tell us more about your goals, and we will get you started on a plan to achieve them.
                        </p>
                        <br />
            <p>Orenda Retirement</p>
            <p>1670 McKendree Church Road, Bldg 50</p>
            <p>Lawrenceville, GA 30043</p>
                        <h4>You can contact us directly at:</h4>
                        <h4>
                            <a className="linkStyling" href="tel:2125642464">+1 212-564-2464</a>
                        </h4>
                        <br />
                    </div>
                </div>
            </div>
        )
    }
}

const mapDispatch = (dispatch) => ({
    loadCompanyData(company) {
        dispatch(getCompanyData(company))
    }
})

export default connect(null, mapDispatch)(Home)
