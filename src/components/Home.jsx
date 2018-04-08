import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import FontIcon from 'material-ui/FontIcon';
import {red500, yellow500, blue500} from 'material-ui/styles/colors';
import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import menu from './menu-alt-256.png';

export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {open: false};
    }

    render() {
        return (
            <div>
                <h1>Hey Participant! Welcome to Employee Resource</h1>
                <p>where will i go</p>
                <br />
                <br />
                <Link to={'/Login'}>Login</Link>
                <Link to={'/About'}>About</Link>

                <p>super secret links</p>
                <Link to={'/Transamerica'}>Transamerica</Link>
                <br />
                <br />
                <Link to={'/Principal'}>Principal</Link>
            </div>
        )
    }
}


 {/*<div id='menu'>
            <IconMenu
            iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
            anchorOrigin={{horizontal: 'left', vertical: 'top'}}
            targetOrigin={{horizontal: 'left', vertical: 'top'}}
          >
          <Link to={'/News'} style={{textDecoration: 'none'}}><MenuItem primaryText="News" /></Link>
          <Link to={'/Forms'} style={{textDecoration: 'none'}}><MenuItem primaryText="Forms" /></Link>
          <Link to={'/Contact'} style={{textDecoration: 'none'}}><MenuItem primaryText="Contact" /></Link>
          </IconMenu>
        </div>*/} 
