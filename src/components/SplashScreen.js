import React from 'react'
import CircularProgress from 'material-ui/CircularProgress'
import { red900 } from 'material-ui/styles/colors'

const SplashScreen = () => {
  return (
    <div className="splashScreen">
      <CircularProgress size={100} thickness={25} color={red900} />
    </div>
  )
}

export default SplashScreen
