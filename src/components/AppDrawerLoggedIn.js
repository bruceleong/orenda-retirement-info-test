import Drawer from "material-ui/Drawer"
import { List, ListItem } from "material-ui/List"
import { Link } from "react-router-dom"
import React, { Component } from "react"
import { db } from '../config/constants'

export default class AppDrawerLoggedIn extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  componentDidMount() {
    let company = localStorage.getItem('company')
    db.collection('companies').doc(company).collection('SPD')
    .get()
    .then(snapshot => {
      let companyData = []
      snapshot.forEach(doc => {
        companyData.push(doc.data())
      });
      this.setState({ companyData })
    })
  }

  render() {
    console.log(this.state, 'current app drawer state')

    let spdLink;

    if (this.state.companyData) {
      spdLink = Object.values(this.state.companyData[0])[0]
    }
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
                <Link to="/" style={{ textDecoration: "none" }}>
                  <ListItem primaryText="SBSF Home" onClick={this.props.handleClose} />
                </Link>
              </List>
              :
              <List>
                <Link to="/" style={{ textDecoration: "none" }}>
                  <ListItem primaryText="SBSF Home" onClick={this.props.handleClose} />
                </Link>
                <Link to="/CompanyHome" style={{ textDecoration: "none" }}>
                  <ListItem primaryText={localStorage.getItem('company') + ' Home'} onClick={this.props.handleClose} />
                </Link>
                <Link to="/PlanDetails" style={{ textDecoration: "none" }}>
                  <ListItem primaryText="Plan Details" onClick={this.props.handleClose} />
                </Link>
                <a target='_blank' rel="noopener noreferrer" href={spdLink} style={{ textDecoration: "none" }}>
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
                <Link to="/" style={{ textDecoration: "none" }}>
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

// <Link to={"/Norms"} style={{ textDecoration: "none" }}>
// <ListItem primaryText="Norm's Restaurant (test)" onClick={this.props.handleClose} />
// </Link>

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
