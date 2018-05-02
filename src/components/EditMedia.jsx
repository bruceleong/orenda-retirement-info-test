import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { db } from '../config/constants'
import SplashScreen from './SplashScreen'

export default class EditMedia extends Component {
  constructor(props) {
    super(props)
    this.state = {
      changesSubmitted: false,
      mediaType: this.props.mediaType,
      mediaTitle: this.props.mediaTitle,
      mediaLink: this.props.mediaLink
    }
  }

  // getNewsData = () => {
  //   db.collection('articles').doc('newsArticles')
  //     .get()
  //     .then(snapshot => {
  //       let articles = snapshot.data(),
  //         articleData = []

  //       Object.keys(articles).forEach(key => {
  //         if (key) {
  //           articleData.push([key, articles[key]])
  //         }
  //       })
  //       this.setState({ articleData })
  //     })
  // }

  // getVideoData = () => {
  //   db.collection('videos').doc('videoData')
  //     .get()
  //     .then(snapshot => {
  //       let videos = snapshot.data(),
  //         videoData = []

  //       Object.keys(videos).forEach(key => {
  //         if (key) {
  //           videoData.push([key, videos[key]])
  //         }
  //       })
  //       this.setState({ videoData })
  //     })
  // }

  handleChange = evt => {
    this.setState({ [evt.target.name]: evt.target.value })
  }

  handleMediaSubmit = evt => {
    evt.preventDefault()

    if (this.state.mediaType === 'video') {
      db.collection('videos').doc('videoData')
        .set({ [this.state.mediaTitle]: this.state.mediaLink }, { merge: true })
    } else {
      db.collection('articles').doc('newsArticles')
        .set({ [this.state.mediaTitle]: this.state.mediaLink }, { merge: true })
    }
    alert('Success')
  }

  render() {
    let media
    if (this.props.mediaType === 'article') {
      media = 'Article'
    } else {
      media = 'Video'
    }
    return (
      <div>
        {
          !this.props.mediaType && !this.props.mediaTitle
            ? <SplashScreen />
            :
            <div>
              <h1>{`Edit ${media} "${this.props.mediaTitle}"`}</h1>
              <form onSubmit={this.handleMediaSubmit}>
                <div>
                  <label>{media} URL: </label>
                  <input className="buttonInput" name="mediaLink" value={this.state.mediaLink} onChange={this.handleChange} style={{ width: '25vw', height: 'auto' }} />
                </div>
                <div>
                  <a target="_blank" href={this.state.mediaLink} style={{ display: 'inline' }}> <p>Click to test Link: <br /> {this.state.mediaLink}</p></a>
                </div>
                <button className="buttons" type="submit" onClick={() => { this.setState({ changesSubmitted: !this.state.changesSubmitted }) }}>Submit Changes</button>
              </form>
            </div>
        }
        <button
          className="buttons"
          type="button"
          onClick={() => { this.props.returnToMediaHome() }}>Back to Media Home
        </button>
        <Link to="/Admin">
          <button
            className="buttons"
            type="button">Back to Admin Home
          </button>
        </Link>
        <button
          className="buttons"
          type="button"
          onClick={() => {
            localStorage.removeItem('admin')
            this.props.history.push(
              '/'
            )
          }}>Logout of Admin
        </button>
      </div>
    )
  }
}
