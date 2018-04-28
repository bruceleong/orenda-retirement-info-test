import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { db } from '../config/constants'

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

  getNewsData = () => {
    db.collection('articles').doc('newsArticles')
      .get()
      .then(snapshot => {
        let articles = snapshot.data(),
          articleData = []

        Object.keys(articles).forEach(key => {
          if (key) {
            articleData.push([key, articles[key]])
          }
        })
        this.setState({ articleData })
      })
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

  handleChange = evt => {
    console.log('are you changing at least')
    this.setState({ [evt.target.name]: evt.target.value })
  }

  handleMediaSubmit = evt => {
    console.log('are you getting to handle submit')
    evt.preventDefault()

    if (this.state.mediaType === 'video') {
      console.log('am i hereererereraereaere video')
      db.collection('videos').doc('videoData')
        .set({ [this.state.mediaTitle]: this.state.mediaLink }, { merge: true })
    } else {
      console.log('am i here', this.state.mediaTitle, 'title', this.state.mediaLink, 'link')
      db.collection('articles').doc('newsArticles')
        .set({ [this.state.mediaTitle]: this.state.mediaLink }, { merge: true })
    }
  }

  render() {
    // console.log(this.props, '------------- props -------')
    console.log(this.state, 'current state in edit form')
    let media;
    if (this.props.mediaType === 'article') {
      media = 'Article'
    } else {
      media = 'Video'
    }
    return (
      <div>
        {
          !this.props.mediaType && !this.props.mediaTitle
            ? <h1>No media to edit</h1>
            :
            <div>
              <h1>{`Edit ${media} "${this.props.mediaTitle}"`}</h1>
              <form onSubmit={this.handleMediaSubmit}>
                <div>
                  <label>{media} URL: </label>
                  <input name="mediaLink" value={this.state.mediaLink} onChange={this.handleChange} style={{ width: '25vw', height: 'auto' }} />
                </div>
                <div>
                  <a target="_blank" href={this.state.mediaLink} style={{ display: 'inline' }}> <p>Click to test Link: <br /> {this.state.mediaLink}</p></a>
                </div>
                <button type="submit" onClick={() => { this.setState({ changesSubmitted: !this.state.changesSubmitted }) }}>Submit Changes</button>
                {
                  this.state.changesSubmitted &&
                  <div>
                    <br />
                    <button type="button" onClick={() => { this.setState({ changesSubmitted: !this.state.changesSubmitted }) }}>Click to make additional changes</button>
                    <br />

                    <h1>
                      Your changes were submitted
                    </h1>
                  </div>
                }
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
