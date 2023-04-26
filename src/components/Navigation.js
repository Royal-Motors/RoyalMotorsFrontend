import React, { useState } from 'react';
import { scrollToElement } from './Functions' ;
import { useLocation, useMatch } from 'react-router-dom';
import AppSignIn from '../pages/sign-in'; 

const Navigation = () => {
  const [showSignIn, setShowSignIn] = useState(false);

  const handleProfileClick = () => {
    if(showSignIn==false){
    setShowSignIn(true);
    }
    else{
      setShowSignIn(false);
      }
  }

  return (
    <div>
      <nav id="nav">
        <img className="Logo" src={process.env.PUBLIC_URL + "Logos/LOGO.png" } alt="logo"/>
        <a href="HomePage" style={{textDecoration: 'none'}} >Home Page</a>
        <a href="CompareCars" style={{textDecoration: 'none'}}>Compare Cars</a>
        <img className="icon" src={process.env.PUBLIC_URL + "Logos/user.png" } alt="logo" onClick={handleProfileClick} />
        <img className="icon" src="Logos/contact us.png"  alt=""/>
      </nav>
      {showSignIn && <AppSignIn />} {}
    </div>
  )
}

export default Navigation
