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
import {connect} from 'react-redux'


export default class Home extends Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(evt) {
        this.setState({ [evt.target.name]: evt.target.value })
    }

    render() {
        return (
            <div>
                <h1>Hey Participant! Welcome to your Employee Resource</h1>
                <h2>The SBSF Perspective</h2>
                <li><strong>Approaching retirement:</strong> Compare your estimated expenses in retirement against your current expenses. Plan for essential, discretionary, and emergency expenses.</li>
                <li><strong>Living well into retirement:</strong> Combine dependable income for everyday expenses with other income to cover unexpected costs.</li>
                <br />
                <br />
                <br />
                <h2>Checkout our top picks for retirement planning today:</h2>
                <div id="homeContent">
                    <div className="articles">
                        <div className="article">
                            <div className="articleContainer">
                                <a href='https://www.fedsmith.com/2018/03/12/common-sense-need-plan-retirement/'>
                                    <img src='https://www.fedsmith.com/wp-content/uploads/2018/03/whats-your-plan-for-retirement.jpg' alt="article" width="160px" className="images" />
                                    <h4><b>Is Common Sense All You Need to Plan Your Retirement?</b></h4>
                                </a>
                                <p>Have you done all your planning? Are you ready?</p>
                                <a href='https://www.fedsmith.com/2018/03/12/common-sense-need-plan-retirement/'>
                                    <p><strong>More Info</strong></p>
                                </a>
                            </div>
                        </div>
                        <div className="article">
                            <div className="articleContainer">
                                <a href='https://www.nytimes.com/2017/07/21/your-money/retirement-planning-advice.html'>
                                    <img src='https://static01.nyt.com/images/2017/07/23/business/23RETIRINGArt/23RETIRINGArt-master768.jpg' alt="article" width="160px" className="images" />
                                    <h4><b>Three Things I Should Have Said About Retirement Planning
                                </b></h4>
                                </a>
                                <p>I have put an addendum on the retirement advice I give to people: “And no matter how much money you think you are going to need, save another 15 percent, just in case.”</p>
                                <a href='https://www.nytimes.com/2017/07/21/your-money/retirement-planning-advice.html'>
                                    <p><strong>More Info</strong></p>
                                </a>
                            </div>
                        </div>
                        <div className="article">
                            <div className="articleContainer">
                            </div>
                            <a href='https://www.fool.com/retirement/2018/02/21/2018-guide-to-retirement-planning.aspx'>
                                <img src='https://g.foolcdn.com/editorial/images/473596/mid-aged-man-with-glasses-smiling_gettyimages-825083248_large.jpg' alt="article" width="160px" className="images" />
                                <h4><b>2018 Guide to Retirement Planning
                                </b></h4>
                            </a>
                            <p>Ready to secure your financial future? Here's what you need to know.
                            </p>
                            <a href='https://www.fool.com/retirement/2018/02/21/2018-guide-to-retirement-planning.aspx'>
                                <p><strong>More Info</strong></p>
                            </a>
                        </div>
                    </div>
            </div>
            <br />
            <br />
            <br />
            <div>
                <h4>Login for more details on your retirement plan: <Link to={'/Login'}>Login Here</Link></h4>

            </div>
            </div >
        )
    }
}

const mapState = (state) => ({
    user: state.user
})

export default connect(mapState)(Home);


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
