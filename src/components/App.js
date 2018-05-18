import React from 'react'
import './App.css'
import Routes from './Routes'


const App = () => (
  <div className="App">
      <div>
        <Routes />
      </div>
    <div id="footer">
      <p>© 2018 · Side By Side Financials · All Rights Reserved.</p>
      <a style={{textDecoration: 'none', fontSize: '.75em'}} href="mailto:stevendeverehere@gmail.com,brucewleong@gmail.com?Subject=Inquiry" target="_top">Report a bug</a>
      <br />
      <div style={{fontSize: '.75em'}}>
      <p>Design by <a style={{textDecoration: 'none',color: 'black'}}href="https://www.bruceleong.com" target="_blank" rel="noopener noreferrer" >Leong</a> & <a style={{textDecoration: 'none', color: 'black'}} href="https://devere-here.github.io/portfolioPage/" target="_blank" rel="noopener noreferrer" >Devere</a> Designs</p>
      </div>
    </div>
  </div>

)

export default App
