import React, { Component } from 'react'
import { db } from '../config/constants'
import { connect } from 'react-redux'
import { getCompanyData } from '../store'
import SplashScreen from './SplashScreen'

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
                    <div>
                        {
                            !localStorage.getItem('company')
                                ?
                                <div id="title">
                                    <h4 style={{ width: '90%', margin: '3vh auto 2vh auto'}}>Dear Participant, enter your company name for more details on your retirement plan.
                                    </h4>
                                    <form onSubmit={this.handleInput}>
                                        <input className="buttonInput" type="text" name="inputField" />
                                        {
                                            this.state.firstAttempt
                                                ?
                                                <div>
                                                    <div style={{ height: '.85em'}} />
                                                </div>
                                                :
                                                <div>
                                                    <div style={{ color: 'blue',fontSize: '.75em'}}>Did not recognize company
                                                    </div>
                                                </div>
                                        }
                                        <br />
                                        <input className="buttons" type="submit" />
                                    </form>
                                </div>
                                :
                                <div id="title">
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
                                </div>
                        }
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

// <div>
//                     {
//                         this.state.loading === true
//                             ? <SplashScreen />
//                             :
//                             <div className="companyPages">
//                                 <h2>Our Favorite Videos and Articles</h2>
//                                 <div className="videos">
//                                     {
//                                         this.state.videoData.length === 0
//                                             ? <h2>We are updating this page, check back soon</h2>
//                                             :
//                                             this.state.videoData.map(video => (
//                                                 <div key={video[0]} className="video">
//                                                     <div className="videoContainer">
//                                                         <h2>{video[0]}</h2>
//                                                         <iframe width="310" title="News video" height="220" src={video[1]} frameBorder="0" allow="autoplay; encrypted-media" allowFullScreen />
//                                                     </div>
//                                                 </div>
//                                             ))
//                                     }
//                                 </div>
//                                 <div className="articles">
//                                     {
//                                         this.state.articleData === 0
//                                             ? <h2>We are updating this page, check back soon</h2>
//                                             :
//                                             this.state.articleData.map(article => (
//                                                 <div key={article[0]} className="article">
//                                                     <div className="articleContainer">
//                                                         <a target="_blank" rel="noopener noreferrer" href={article[1]}>
//                                                             <h4><b>{article[0]}</b></h4>
//                                                         </a>
//                                                         <a target="_blank" rel="noopener noreferrer" href={article[1]}>
//                                                             <p><strong>More Info</strong></p>
//                                                         </a>
//                                                     </div>
//                                                 </div>
//                                             ))
//                                     }
//                                 </div>
//                             </div>
//                     }
//                 </div>
