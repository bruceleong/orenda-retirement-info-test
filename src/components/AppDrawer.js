import Drawer from "material-ui/Drawer";
import { List, ListItem } from "material-ui/List";
import Divider from "material-ui/Divider";
import { Link, HashRouter } from "react-router-dom";

import React, { Component } from "react";

export default class AppDrawer extends Component {
  render() {
    return (

      <div>
        <Drawer
          docked={false}
          width={200}
          open={this.props.open}
          onRequestChange={this.props.handleClose}
        >
            <List>
                <Link to="/" style={{textDecoration: "none"}}>
                <ListItem primaryText="Home" onClick={this.props.handleClose} />
                </Link>
                <Link to={"/Login"} style={{textDecoration: "none"}}>
                <ListItem primaryText="Login" onClick={this.props.handleClose} />
                </Link>
                <Link to="/Contact" style={{textDecoration: "none"}}>
                <ListItem primaryText="About" onClick={this.props.handleClose} />
                </Link>
                <Link to={"/NormsRestaurant"} style={{textDecoration: "none"}}>
                <ListItem primaryText="Norms Restaurant (test)" onClick={this.props.handleClose} />
                </Link>
                <Link to={"/AudioInteriors"} style={{textDecoration: "none"}}>
                <ListItem primaryText="Audio Interiors (test)" onClick={this.props.handleClose} />
                </Link>
                <Link to="/News" style={{textDecoration: "none"}}>
                <ListItem primaryText="News" onClick={this.props.handleClose} />
                </Link>
                <Link to="/Forms" style={{textDecoration: "none"}}>
                <ListItem primaryText="Forms" onClick={this.props.handleClose} />
                </Link>
                <Link to="/Admin" style={{textDecoration: "none"}}>
                <ListItem primaryText="Admin" onClick={this.props.handleClose} />
                </Link>
            </List>
        </Drawer>
      </div>
    );
  }
}
