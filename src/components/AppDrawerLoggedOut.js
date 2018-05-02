import Drawer from 'material-ui/Drawer'
import { List, ListItem } from 'material-ui/List'
import { Link } from 'react-router-dom'

import React from 'react'

const AppDrawerLoggedOut = (props) => (
  <div>
    <Drawer
      docked={false}
      width={200}
      open={props.open}
      onRequestChange={props.handleClose}
    >
      <List>
        <Link to="/" style={{ textDecoration: 'none' }}>
          <ListItem primaryText="SBSF Home" onClick={props.handleClose} />
        </Link>
        <Link to="/Contact" style={{ textDecoration: 'none' }}>
          <ListItem primaryText="Contact" onClick={props.handleClose} />
        </Link>
      </List>
    </Drawer>
  </div>
)

export default AppDrawerLoggedOut
