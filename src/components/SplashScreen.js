import React from 'react';
import CircularProgress from 'material-ui/CircularProgress';
import { green400 } from 'material-ui/styles/colors';

const SplashScreen = () => {
  return (
    <div className="splashScreen">
      <CircularProgress size={100} thickness={25} color={green400} />
    </div>
  )
};

export default SplashScreen;
