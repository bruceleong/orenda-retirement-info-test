import Drawer from 'material-ui/Drawer'
import { List, ListItem } from 'material-ui/List'
import { Link } from 'react-router-dom'
import React, { Component } from 'react'
import { db } from '../config/constants'

export default class AppDrawerLoggedIn extends Component {
  constructor(props) {
    super(props)
    this.state = {
      spd: '',
    }
  }

  componentDidMount() {
    db.collection('companies').doc(localStorage.getItem('company'))
      .get()
      .then(doc => {
        let spd = doc.data().spd
        this.setState({ spd })
      })
  }

  tip = () => {
    alert("To fill out the form/s online, click 'Open with' and selected 'DocHub' at the top middle of the page. Thank you!")
  }

  render() {
    return (
      <div>
        <Drawer
          docked={false}
          width={200}
          open={this.props.open}
          onRequestChange={this.props.handleClose}
        >
          {
            !localStorage.getItem('company')
              ?
              <List>
                <Link to="/" style={{ textDecoration: 'none' }}>
                  <ListItem primaryText="Home" onClick={this.props.handleClose} />
                </Link>
                <Link to="/Contact" style={{ textDecoration: 'none' }}>
                  <ListItem primaryText="Contact" onClick={this.props.handleClose} />
                </Link>
              </List>
              :
              <List>
                <Link to="/" style={{ textDecoration: 'none' }}>
                  <ListItem primaryText="Home" onClick={this.props.handleClose} />
                </Link>
                <Link to="/CompanyHome" style={{ textDecoration: 'none' }}>
                  <ListItem primaryText={`${localStorage.getItem('company')} Home`} onClick={this.props.handleClose} />
                </Link>
                <Link to="/YourAccount" style={{ textDecoration: 'none' }}>
                  <ListItem primaryText="Your Account" onClick={this.props.handleClose} />
                </Link>
                <a target="_blank" rel="noopener noreferrer" href={this.state.spd} style={{ textDecoration: 'none' }}>
                  <ListItem primaryText="Plan Documents" onClick={this.tip} />
                </a>
                <Link to="/Forms" style={{ textDecoration: 'none' }}>
                  <ListItem primaryText="Forms & Notices" onClick={this.props.handleClose} />
                </Link>
                <Link to="/News" style={{ textDecoration: 'none' }}>
                  <ListItem primaryText="News & Videos" onClick={this.props.handleClose} />
                </Link>
                <Link to="/Contact" style={{ textDecoration: 'none' }}>
                  <ListItem primaryText="Contact" onClick={this.props.handleClose} />
                </Link>
                <Link to="/" style={{ textDecoration: 'none' }}>
                  <ListItem
                    primaryText="Logout" onClick={() => {
                      localStorage.removeItem('company')
                    }} />
                </Link>
              </List>
          }
        </Drawer>
      </div>
    )
  }
}
