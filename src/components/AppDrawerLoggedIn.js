import Drawer from "material-ui/Drawer"
import { List, ListItem } from "material-ui/List"
import { Link } from "react-router-dom"
import AppDrawerLoggedOut from "./AppDrawerLoggedOut"

import React, { Component } from "react"

export default class AppDrawerLoggedIn extends Component {
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
                <Link to="/" style={{textDecoration: "none"}}>
                <ListItem primaryText="Home" onClick={this.props.handleClose} />
                </Link>
            </List>
          :
          <List>
            <Link to="/" style={{ textDecoration: "none" }}>
              <ListItem primaryText="Home" onClick={this.props.handleClose} />
            </Link>
            <Link to={"/Norms"} style={{ textDecoration: "none" }}>
              <ListItem primaryText="Norm's Restaurant (test)" onClick={this.props.handleClose} />
            </Link>
            <Link to={"/CompanyHome"} style={{ textDecoration: "none" }}>
              <ListItem primaryText="Company Home" onClick={this.props.handleClose} />
            </Link>
            <a target='_blank' rel="noopener noreferrer" href='https://www.transamerica.com' style={{ textDecoration: "none" }}>
              <ListItem primaryText="401k Plan Details" onClick={this.props.handleClose} />
            </a>
            <a target='_blank' rel="noopener noreferrer" href='https://drive.google.com/open?id=17lT5REEVzmZPVSJrUVzyRS8rUh1KS9wt' style={{ textDecoration: "none" }}>
              <ListItem primaryText="Summary Plan Description" onClick={this.props.handleClose} />
            </a>
            <Link to="/News" style={{ textDecoration: "none" }}>
              <ListItem primaryText="News" onClick={this.props.handleClose} />
            </Link>
            <Link to="/Forms" style={{ textDecoration: "none" }}>
              <ListItem primaryText="Forms" onClick={this.props.handleClose} />
            </Link>
            <Link to="/Contact" style={{ textDecoration: "none" }}>
              <ListItem primaryText="About" onClick={this.props.handleClose} />
            </Link>
            <Link to="/Admin" style={{ textDecoration: "none" }}>
              <ListItem primaryText="Admin" onClick={this.props.handleClose} />
            </Link>
            <Link to="/" style={{textDecoration: "none"}}>
            <ListItem primaryText="Logout" onClick={() => {
              localStorage.clear()
            }} />
            </Link>
          </List>
        }
        </Drawer>
      </div>
    );
  }
}

// <Link to={"/Login"} style={{textDecoration: "none"}}>
// <ListItem primaryText="Login" onClick={this.props.handleClose} />
// </Link>

// <Link to={"/NormsRestaurant"} style={{textDecoration: "none"}}>
// <ListItem primaryText="Norms Restaurant (test)" onClick={this.props.handleClose} />
// </Link>

// <a href='http://www.localhost:3000'>
// <ListItem primaryText="Logout" onClick={() => {
//   localStorage.clear()
// }} />
// </a>

// <Link to="/" style={{textDecoration: "none"}}>
// <ListItem primaryText="Logout" onClick={() => {
//   localStorage.clear()
// }} />
// </Link>