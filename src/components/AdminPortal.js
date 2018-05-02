import React, { Component } from 'react'
import { db } from '../config/constants'
import AddEditCompany from './AddEditCompany'
import AddEditMedia from './AddEditMedia'
import SplashScreen from './SplashScreen'

export default class AdminPortal extends Component {
    constructor() {
        super()
        this.state = {
            allCompanies: [],
            articleData: [],
            videoData: [],
            showEditMedia: false,
            loading: true,
            selectedCompany: false
        }
    }

    handleSubmit = evt => {
        evt.preventDefault()
        this.setState({ selectedCompany: evt.target.selectCompany.value })
    }

    onAdd = () => {
        this.setState({ selectedCompany: 'newCompany', adding: true })
    }

    onEdit = () => {
        this.setState({ edit: true, action: 'edit' })
    }

    onDelete = () => {
        this.setState({ action: 'delete' })
    }

    returnButton = () => {
        this.getCompanies()
        this.setState({ selectedCompany: '' })
    }

    handleDelete = (evt) => {
        evt.preventDefault()
        if (window.confirm('Are you sure you want to delete this company?')) {
            if (localStorage.company === evt.target.selectCompany.value){
                localStorage.company = ''
            }
            db.collection('companies').doc(evt.target.selectCompany.value).delete()
            this.getCompanies()
        }
    }

    returnToSelectedCompany = company => {
        this.setState({ selectedCompany: company })
    }

    componentDidMount() {
        this.getCompanies()
        this.getNewsData()
        this.getVideoData()
        console.log('are you mounting - admin portal')
    }

    showEditMediaPage = () => {
        this.setState({ showEditMedia: !this.state.showEditMedia })
    }

    getCompanies = () => {
        db.collection('companies')
            .get()
            .then(snapshot => {
                let allCompanies = []
                snapshot.forEach(doc => {
                    allCompanies.push(doc.data().name)
                })
                console.log('about to set state', allCompanies)
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

    getVideoData = () => {
        db.collection('videos').doc('videoData')
            .get()
            .then(snapshot => {
                let videos = snapshot.data(),
                    videoData = []

                Object.keys(videos).forEach(key => {
                    videoData.push([key, videos[key]])
                })
                this.setState({ videoData, loading: false })
            })
    }

    render() {
        console.log('this state', this.state)
        return this.state.loading === true
            ? (<SplashScreen />)
            : (
                !this.state.selectedCompany
                    ?
                    (
                        <div>
                            <div className='companyPages'>
                                <h1>Welcome Admin</h1>
                                <p>In this portal you add/edit company data, media data, and more</p>
                            </div>
                            <div className="page">
                                <h2> Company Infomation: </h2>
                                <p>Here you can add/edit company information</p>
                                {
                                    this.state.loading === true
                                        ? <SplashScreen />
                                        :
                                        <div>
                                            {
                                                this.state.allCompanies.length === 0
                                                    ? <h3>Currently there are: no companies</h3>
                                                    :
                                                    <h3>Currently there are: {this.state.allCompanies.length} companies</h3>
                                            }
                                        </div>

                                }
                                <h2>Would you like to add, edit, or delete a company?</h2>
                                <button
                                    className="buttons"
                                    type="button"
                                    onClick={this.onAdd}>Add Company
                                </button>
                                <button
                                    className="buttons"
                                    type="button"
                                    onClick={this.onEdit}>Edit Company
                                </button>
                                <button
                                    className="buttons"
                                    type="button"
                                    onClick={this.onDelete}>Delete Company
                                </button>
                                {
                                    this.state.action === 'edit' || this.state.action === 'delete'
                                        ? (
                                            <div>
                                                <h1>What Company would you like to {this.state.action}?</h1>
                                                <form onSubmit={this.state.action === 'edit' ? this.handleSubmit : this.handleDelete}>
                                                    <select className="buttonInput" name="selectCompany">
                                                        {this.state.allCompanies.map(company => (
                                                            <option key={company} value={company}>{company}</option>
                                                        ))}
                                                    </select>
                                                    <input className="buttons" type="submit" value={this.state.action} />
                                                </form>
                                            </div>
                                        )
                                        : null
                                }
                            </div>
                            <div className="page">
                                <h2>Media Information: </h2>
                                <p>Here you can add/edit media information (news/videos)</p>
                                {
                                    this.state.loading === true
                                        ? <SplashScreen />
                                        :
                                        <div>
                                            {
                                                this.state.articleData.length === 0
                                                    ? <h3>Currently there are: no articles</h3>
                                                    :
                                                    <h3>Currently there are: {this.state.articleData.length} articles</h3>
                                            }
                                        </div>
                                }
                                {
                                    this.state.loading === true
                                        ? <SplashScreen />
                                        :
                                        <div>
                                            {
                                                this.state.videoData.length === 0
                                                    ? <h3>Currently there are: no videos</h3>
                                                    :
                                                    <h3>Currently there are: {this.state.videoData.length} articles</h3>
                                            }
                                        </div>

                                }
                                <button
                                    className="buttons"
                                    type="button"
                                    onClick={this.showEditMediaPage}>Edit Media
                                </button>
                                {
                                    this.state.showEditMedia &&
                                    <AddEditMedia />
                                }
                            </div>
                            <br />
                            <br />
                            <button
                                className="buttons"
                                type="button" onClick={() => {
                                    localStorage.removeItem('admin')
                                    this.props.history.push(
                                        '/'
                                    )
                                }}>Logout of Admin
                            </button>
                        </div>
                    )
                    : (<AddEditCompany company={this.state.selectedCompany} returnLink={this.returnButton} returnToSelectedCompany={this.returnToSelectedCompany} history={this.props.history} adding={this.state.adding} />)
            )
    }
}
