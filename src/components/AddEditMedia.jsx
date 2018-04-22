import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { db } from '../config/constants'
import firebase from 'firebase'
import EditMedia from './EditMedia'

export default class AddEditMedia extends Component {
  constructor(props) {
    super(props)
    this.state = {
      mediaType: 'article'
    }
  }

  componentDidMount() {
    this.getNewsData()
    this.getVideoData()
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

  mediaHandleSubmit = evt => {
    evt.preventDefault()

    if (this.state.mediaType === 'video') {
      db.collection('videos').doc('videoData')
        .set({ [this.state.mediaTitle]: this.state.mediaLink }, { merge: true })
      this.setState({
        mediaType: 'article',
        mediaTitle: '',
        mediaLink: ''
      })
      this.getNewsData()
      this.getVideoData()
    } else {
      db.collection('articles').doc('newsArticles')
        .set({ [this.state.mediaTitle]: this.state.mediaLink }, { merge: true })
      this.setState({
        mediaType: 'article',
        mediaTitle: '',
        mediaLink: ''
      })
      this.getNewsData()
      this.getVideoData()
    }
  }

  handleChange = evt => {
    this.setState({ [evt.target.name]: evt.target.value })
  }

  editForm = (type, title, url) => {
    console.log(type, title, url)
    this.setState({ mediaType: type, mediaURL: url })
    this.setState({ mediaToUpdate: title })
  }

  render() {
    console.log(this.props, 'current company data')
    console.log(this.state, 'current state in edit form')
    return (
      !this.state.mediaToUpdate
        ?
        <div>
          <h1>Edit Media</h1>
          <h2>Add Media</h2>
          <form onSubmit={this.mediaHandleSubmit}>
            <h3>Add new Forms</h3>
            <div>
              <label>Name of form:</label><input
                name="mediaTitle"
                onChange={this.handleChange}
                value={this.state.mediaTitle} />
            </div>
            <div>
              <label>Url of media:</label><input
                name="mediaLink"
                onChange={this.handleChange}
                value={this.state.mediaLink} />
            </div>
            <br />
            <div>
              <label>Type of Media: </label>
              <select
                name="mediaType"
                onChange={this.handleChange}>
                <option value="article">Article</option>
                <option value="video">Video</option>
              </select>
            </div>
            <br />
            <button type="submit">Add Media</button>
          </form>
          <h2>Articles</h2>
          {
            !this.state.articleData
              ? <h3>There are no articles</h3>
              : this.state.articleData.map(ele => (
                <div key={ele[0]}>
                  <p>Title: {ele[0]}</p>
                  <a target="_blank" href={ele[1]} style={{ display: 'inline' }}> <p>Link: {ele[1]}</p></a>
                  <button
                    type="button"
                    onClick={() => this.editForm('article', ele[0], ele[1])}>Edit Link
                </button>
                  <button
                    type="button"
                    onClick={
                      () => {
                        db.collection('articles').doc('newsArticles').update({
                          [ele[0]]: firebase.firestore.FieldValue.delete()
                        })
                        this.getNewsData()
                      }
                    }>Delete Article
                </button>
                </div>
              ))
          }
          <h2>Videos</h2>
          {
            !this.state.videoData
              ? <h3>There are no videos</h3>
              : this.state.videoData.map(ele => (
                <div key={ele[0]}>
                  <p>Title: {ele[0]}</p>
                  <a target="_blank" href={ele[1]} style={{ display: 'inline' }}> <p>Link: {ele[1]}</p></a>
                  <button
                    type="button"
                    onClick={() => this.editForm('video', ele[0], ele[1])}>Edit Link
                </button>
                  <button
                    type="button"
                    onClick={
                      () => {
                        db.collection('videos').doc('videoData').update({
                          [ele[0]]: firebase.firestore.FieldValue.delete()
                        })
                        this.getVideoData()
                      }
                    }>Delete Video
                </button>
                </div>
              ))
          }
          <br />
          <br />
          <br />
          <br />
          <br />
          <Link to="/Admin"><button type="button">Back to Admin Home</button></Link>
        </div>
        :
        (
          <EditMedia history={this.props.history} mediaType={this.state.mediaType} mediaTitle={this.state.mediaToUpdate} mediaLink={this.state.mediaURL} />
        )
    )
  }
}
