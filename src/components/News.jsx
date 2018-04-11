import React, { Component } from 'react'
import { Link } from 'react-router-dom'
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
  }

  render() {
    return (
      <div>
      <Link to="/">Home</Link>
      <h1>Tips on Retirement Planning</h1>
      <iframe width="450" title="News video" height="205" src="https://www.youtube.com/embed/tP4zWCS4dMM" frameBorder="0" allow="autoplay; encrypted-media" allowFullScreen />
      <h1>Latest Financial News</h1>
        <div className="articles">
          {!this.state.articles ?
            <h2>There is no content</h2>
            : this.state.articles.map(article => {
              return (
                <div key={article.title} className="article">
                  <div className="articleContainer">
                    <a href={article.url}>
                      <img src={article.urlToImage} alt="article" width="160px" className="images" />
                      <h4><b>{article.title}</b></h4>
                    </a>
                    <p>{article.description}</p>
                    <a href={article.url}>
                      <p><strong>More Info</strong></p>
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
