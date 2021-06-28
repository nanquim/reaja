import React from 'react'
import apiLogo from './newsapi.png'
import CircularProgress from '@material-ui/core/CircularProgress'

const progress = {
   position: 'absolute',
   top: '20%',
   left: '45%',
   margin: '0 auto',
   textAlign: 'center',
}

const Loader = () => {
    return(
        <div style={progress}>
          <div>
          <img 
            src={apiLogo} 
            alt="logo-newsapi"/>
            </div>
            <div>
          <CircularProgress/>
          </div>
      </div>
    )
}

export default Loader;
