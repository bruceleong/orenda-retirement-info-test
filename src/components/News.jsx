import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { db } from '../config/constants'
import axios from 'axios'

export default class News extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  componentDidMount() {
    axios.get('https://newsapi.org/v2/top-headlines?sources=bloomberg&apiKey=3a5dd10ce9054e6ba869313942e848f0')
      .then(res => res.data)
      .then(news => {
        this.setState(news)
      })
      .catch(error => {
        console.log(error)
      })
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
        this.setState({ videoData })
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

  render() {
    return (
      <div>
        <Link to="/">Home</Link>
        <h1>Tips on Retirement Planning</h1>
        <h1>Our Favorite Videos</h1>
        <div className="videos">
          {
            !this.state.videoData
              ? <h2>'We are updating this page, check back soon'</h2>
              :
              this.state.videoData.map(video => (
                <div key={video[0]} className="video">
                  <div className="videoContainer">
                    <h2>{video[0]}</h2>
                    <iframe width="320" title="News video" height="auto" src={video[1]} frameBorder="0" allow="autoplay; encrypted-media" allowFullScreen />
                  </div>
                </div>
              ))
          }
        </div>
        <h1>Our Top Articles</h1>
        <div className="articles">
          {
            !this.state.articleData
              ? <h2>'We are updating this page, check back soon'</h2>
              :
              this.state.articleData.map(article => (
                <div key={article[0]} className="article">
                  <div className="articleContainer">
                    <a target="_blank" rel="noopener noreferrer" href={article[1]}>
                      <h4><b>{article[0]}</b></h4>
                    </a>
                    <a href={article[1]}>
                      <p><strong>Read Article Here</strong></p>
                    </a>
                  </div>
                </div>
              ))
          }
        </div>
        <h1>Latest Financial News</h1>
        <div className="articles">
          {
            !this.state.articles ?
              <h2>There is no content</h2>
              : this.state.articles.map(article => {
                return (
                  <div key={article.title} className="article">
                    <div className="articleContainer">
                      <a href={article.url}>
                        <h4><b>{article.title}</b></h4>
                      </a>
                      <a href={article.url}>
                        <p><strong>Read Article Here</strong></p>
                      </a>
                    </div>
                  </div>
                )
              })
          }
        </div>
      </div>
    )
  }
}
