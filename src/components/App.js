import React from 'react'
import './App.css'
import Routes from './Routes'


const App = () => (
  <div className="App">
    <div>
      <Routes />
    </div>
    <div id="footer">
      <p>© 2019 · Orenda Retirement · All Rights Reserved.</p>
      <a style={{ textDecoration: 'none', fontSize: '.75em' , color: 'white'}} href="mailto:brucewleong@gmail.com?Subject=Issue with Orenda Retirement" target="_top">Report an Issue</a>
      <br />
      <br />
    </div>
  </div>

)

export default App
