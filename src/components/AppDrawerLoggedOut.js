import Drawer from "material-ui/Drawer";
import { List, ListItem } from "material-ui/List";
import Divider from "material-ui/Divider";
import { Link, HashRouter } from "react-router-dom";

import React, { Component } from "react";

export default class AppDrawerLoggedOut extends Component {
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
                <ListItem primaryText="SBSF Home" onClick={this.props.handleClose} />
                </Link>
            </List>
        </Drawer>
      </div>
    );
  }
}

// <Link to={"/NormsRestaurant"} style={{textDecoration: "none"}}>
// <ListItem primaryText="Norms Restaurant (test)" onClick={this.props.handleClose} />
// </Link>
