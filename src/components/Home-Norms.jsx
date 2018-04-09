import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import FontIcon from 'material-ui/FontIcon';
import { red500, yellow500, blue500 } from 'material-ui/styles/colors';
import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import menu from './menu-alt-256.png';
const SBSF = 'https://drive.google.com/open?id=17lT5REEVzmZPVSJrUVzyRS8rUh1KS9wt';

export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state = { open: false };
    }

    render() {
        return (
            <div>
                <div className='Home-Norms-links-container'>
                    <a target='_blank' href='https://www.principal.com' style={{ textDecoration: 'none' }}>
                        <div className='Home-Norms-links'>
                            <img src='https://drive.google.com/uc?export=download&id=1QAatpWyoftrYmgCQs6E39OJ2V7g7KQrM' />
                            <div>
                                <h3>Norm's Restaurant 401k Plan</h3>
                            </div>
                        </div>
                    </a>
                    <a target='_blank' href={SBSF} style={{ textDecoration: 'none' }}>
                        <div className='Home-Norms-links'>
                            <img src='https://drive.google.com/uc?export=download&id=1QAatpWyoftrYmgCQs6E39OJ2V7g7KQrM' />
                            <div>
                                <h3>Summary Plan Description</h3>
                            </div>
                        </div>
                    </a>
                    <Link to={'/forms'} style={{ textDecoration: 'none' }}>
                        <div className='Home-Norms-links'>
                            <img src='https://drive.google.com/uc?export=download&id=1QAatpWyoftrYmgCQs6E39OJ2V7g7KQrM' />
                            <div>
                                <h3>Forms</h3>
                            </div>
                        </div>
                    </Link>
                    <Link to={'/news'} style={{ textDecoration: 'none' }}>
                        <div className='Home-Norms-links'>
                            <img src='https://drive.google.com/uc?export=download&id=1QAatpWyoftrYmgCQs6E39OJ2V7g7KQrM' />
                            <div>
                                <h3>News & Updates</h3>
                            </div>
                        </div>
                    </Link>
                    <Link to={'/contact'} style={{ textDecoration: 'none' }}>
                        <div className='Home-Norms-links'>
                            <img src='https://drive.google.com/uc?export=download&id=1QAatpWyoftrYmgCQs6E39OJ2V7g7KQrM' />
                            <div>
                                <h3>Staff Directory</h3>
                            </div>
                        </div>
                    </Link>
                </div>
            </div>
        )
    }
}
