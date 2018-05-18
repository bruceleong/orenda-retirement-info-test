import React, { Component } from 'react'
import { db } from '../config/constants'
import firebase from 'firebase'
import EditMedia from './EditMedia'
import SplashScreen from './SplashScreen';

export default class AddEditMedia extends Component {
  constructor(props) {
    super(props)
    this.state = {
      mediaType: 'article',
      articleData: [],
      videoData: [],
      loading: true
    }
    // this.handleChange = this.handleChange.bind(this)
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
        this.setState({ videoData, loading: false })
      })
  }

  validFirestoreDocNameCheck = (field, proposedName) => {

    if (proposedName.search(/[~*/[\]]/g) !== -1) {
      alert(`${field} can't contain any '~' '*', '/', '[', or ']'`)
      return false
    }
    return true
  }

  mediaHandleSubmit = evt => {
    evt.preventDefault()

    if (this.validFirestoreDocNameCheck('Title', this.state.mediaTitle)) {

      let url = this.state.mediaLink
      if (url.startsWith('https://') === false && url.startsWith('http://') === false) url = 'https://' + url

      if (this.state.mediaType === 'video') {
        db.collection('videos').doc('videoData')
          .set({ [this.state.mediaTitle]: url }, { merge: true })
        this.setState({
          mediaTitle: '',
          mediaLink: ''
        })
        this.getNewsData()
        this.getVideoData()
      } else {
        db.collection('articles').doc('newsArticles')
          .set({ [this.state.mediaTitle]: url }, { merge: true })
        this.setState({
          mediaTitle: '',
          mediaLink: ''
        })
        this.getNewsData()
        this.getVideoData()
      }
      alert("Success")

    }
  }

  returnToMediaHome = () => {
    this.setState({ mediaToUpdate: '' })
    this.getNewsData()
    this.getVideoData()
  }

  handleChange = evt => {
    console.log(this, 'current this')
    // this.setState({ [evt.target.name]: evt.target.value })
  }

  // handleChange (evt) {
  //   console.log(this, 'current this')
  //   // this.setState({ [evt.target.name]: evt.target.value })
  // }

  editForm = (type, title, url) => {
    this.setState({ mediaType: type, mediaURL: url, mediaToUpdate: title })
  }

  render() {
    console.log(this.state, 'current state')
    return (
      !this.state.mediaToUpdate
        ?
        <div>
          <h1>Edit Media</h1>
          <form onSubmit={this.mediaHandleSubmit}>
            <h3>Add New Media</h3>
            <div>
              <label>Media Title:</label>
              <div>
                <input
                  className="buttonInput"
                  name="mediaTitle"
                  onChange={this.handleChange}
                  value={this.state.mediaTitle} />
              </div>
            </div>
            <div>
              <label>URL of media:</label>
              <div>
                <input
                  className="buttonInput"
                  name="mediaLink"
                  onChange={this.handleChange}
                  value={this.state.mediaLink} />
              </div>
            </div>
            <br />
            <div>
              <label>Type of Media: </label>
              <select
                className="buttonInput"
                name="mediaType"
                onChange={this.handleChange}>
                <option value="article">Article</option>
                <option value="video">Video</option>
              </select>
            </div>
            <br />
            <button className="buttons" type="submit">Add Media</button>
          </form>
          <h2>Articles</h2>
          {
            this.state.loading === true
              ? <SplashScreen />
              :
              <div>
                {
                  this.state.articleData.length === 0
                    ? <h3>There are no articles</h3>
                    : this.state.articleData.map(ele => (
                      <div className="companyPages" key={ele[0]}>
                        <p>Title: {ele[0]}</p>
                        <a target="_blank" href={ele[1]} style={{ display: 'inline' }}> <p>Link: {ele[1]}</p></a>
                        <button
                          type="button"
                          className="buttons"
                          onClick={() => this.editForm('article', ele[0], ele[1])}>Edit Link
                        </button>
                        <button
                          type="button"
                          className="buttons"
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
              </div>
          }
          <h2>Videos</h2>
          {
            this.state.loading === true
              ? <SplashScreen />
              :
              <div>
                {
                  this.state.videoData.length === 0
                    ? <h3>There are no videos</h3>
                    :
                    this.state.videoData.map(ele => (
                      <div className="companyPages" key={ele[0]} style={{ marginBottom: "5vh" }}>
                        <p>Title: {ele[0]}</p>
                        <a target="_blank" href={ele[1]} style={{ display: 'inline' }}> <p>Link: {ele[1]}</p></a>
                        <button
                          type="button"
                          className="buttons"
                          onClick={() => this.editForm('video', ele[0], ele[1])}>
                          Edit Link
                        </button>
                        <button
                          type="button"
                          className="buttons"
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
              </div>
          }
        </div>
        :
        (
          <div>
            <EditMedia history={this.props.history} mediaType={this.state.mediaType} mediaTitle={this.state.mediaToUpdate} mediaLink={this.state.mediaURL} returnToMediaHome={this.returnToMediaHome} />
          </div>
        )
    )
  }
}
