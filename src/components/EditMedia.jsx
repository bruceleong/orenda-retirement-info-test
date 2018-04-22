import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { db } from '../config/constants'
import firebase from 'firebase'

export default class EditMedia extends Component {
  constructor(props) {
    super(props)
    this.state = {
      changesSubmitted: false
    }
  }

  componentWillReceiveProps(newProps) {
    console.log(newProps, 'newProps from component')
    this.setState({
      mediaType: newProps.mediaType,
      mediaTitle: newProps.mediaTitle,
      mediaLink: newProps.mediaLink,
    })
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
    this.setState({ [evt.target.name]: evt.target.value })
  }

  handleSubmit = evt => {
    evt.preventDefault()

    if (this.props.mediaType === 'video') {
      db.collection('videos').doc('videoData')
        .set({ [this.props.mediaTitle]: this.state.mediaLink }, { merge: true })
    } else {
      db.collection('articles').doc('newsArticles')
        .set({ [this.props.mediaTitle]: this.state.mediaLink }, { merge: true })
    }
  }

  render() {
    console.log(this.props, '------------- props --------')
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
              <form onSubmit={this.handleSubmit}>
                <div>
                  <label>{media} URL: </label>
                  <input name="mediaLink" value={this.state.mediaLink} onChange={this.handleChange} style={{ width: '25vw', height: 'auto' }} />
                </div>
                <div>
                <a target="_blank" href={this.props.mediaLink} style={{ display: 'inline' }}> <p>Click to test Link: <br /> {this.props.mediaLink}</p></a>
                </div>
                <div>
                { !this.state.changesSubmitted
                  ?
                <button type="button" onClick={() => { this.setState({ changesSubmitted: !this.state.changesSubmitted }) }}>Submit Changes</button>

                  :
                  <div>
                  <button type="button" onClick={() => { this.setState({ changesSubmitted: !this.state.changesSubmitted }) }}>Make Additional Changes</button>
                    <h2>Your changes were submitted</h2>
                  </div>
                }
                </div>
              </form>
            </div>
        }
        <button type="button" onClick={() => { this.props.returnToSelectedCompany(this.props.company); this.props.removeFormToUpdate() }}>Back to Company Home</button>
        <button type="button" onClick={() => { this.props.returnLink() }}>Back to Admin Home</button>
        <button onClick={() => {
          localStorage.removeItem('admin')
          this.props.history.push(
              '/'
          )
      }}>Logout of Admin</button>
      </div>
    )
  }
}
