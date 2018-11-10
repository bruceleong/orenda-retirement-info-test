import React, { Component } from 'react'
import { db } from '../config/constants'
import { Link } from 'react-router-dom'
import SplashScreen from './SplashScreen'

export default class News extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: true,
      videoData: [],
      articleData: []
    }
  }

  componentDidMount() {
    this.getNewsData()
    this.getVideoData()
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

  getNewsData = () => {
    db.collection('articles').doc('newsArticles')
      .get()
      .then(snapshot => {
        let articles = snapshot.data(),
          articleData = []
        Object.keys(articles).forEach(key => {
          articleData.push([key, articles[key]])
        })
        this.setState({ articleData, loading: false })
      })
  }

  render() {
    return this.state.loading === true
      ? (<SplashScreen />)
      : (
        <div>
        <div className="loggedInHeader" />
          <div className="companyPages">
          <h2>On this page, you will find videos and tutorials and topics to help you prepare and get the most out of retirement.</h2>
          <div className="videos">
            {
              this.state.videoData.length === 0
                ? ''
                :
                this.state.videoData.map(video => (
                  <div key={video[0]} className="video">
                    <div className="videoContainer">
                      <h2>{video[0]}</h2>
                      <iframe width="320" title="News video" height="200" src={video[1]} frameBorder="0" allow="autoplay; encrypted-media" allowFullScreen />
                    </div>
                  </div>
                ))
            }
          </div>
          <div className="articles">
            {
              this.state.articleData.length === 0
                ? ''
                :

                this.state.articleData.map(article => (
                  <div key={article[0]} className="article">
                    <div className="articleContainer">
                      <a target="_blank" rel="noopener noreferrer" href={article[1]}>
                        <h4><b>{article[0]}</b></h4>
                      </a>
                      <a href={article[1]}>
                        <p><strong>More Info</strong></p>
                      </a>
                    </div>
                  </div>
                ))

            }
          </div>
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
        </div>
      )
  }
}
