import Drawer from "material-ui/Drawer";
import { List, ListItem } from "material-ui/List";
import Divider from "material-ui/Divider";
import { Link } from "react-router-dom";

import React, { Component } from "react";

export default class AppDrawer extends Component {
  render() {
    return (
      <div>
        <Drawer
          docked={false}
          width={275}
          open={this.props.open}
          onRequestChange={this.props.handleClose}
        >
          <List>
            <Link to="/">
              <ListItem primaryText="Home" onClick={this.props.handleClose} />
            </Link>
            <Link to="/Login">
              <ListItem primaryText="Login" onClick={this.props.handleClose} />
            </Link>
            <Link to="/Contact">
              <ListItem primaryText="About" onClick={this.props.handleClose} />
            </Link>
            <Link to="/Principal">
              <ListItem primaryText="Principal" onClick={this.props.handleClose} />
            </Link>
            <Link to="/Transamerica">
              <ListItem primaryText="Transamerica" onClick={this.props.handleClose} />
            </Link>
            <Link to="/News">
              <ListItem primaryText="News" onClick={this.props.handleClose} />
            </Link>
            <Link to="/Forms">
              <ListItem primaryText="Forms" onClick={this.props.handleClose} />
            </Link>
          </List>
        </Drawer>
      </div>
    );
  }
}
