/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { scrollToElement } from './Functions' ;
import { useLocation } from 'react-router-dom';

const Navigation = () => {
    const location = useLocation();
  return (
    <div>
        <nav id="nav">
            <img className="Logo" src={process.env.PUBLIC_URL + "Logos/LOGO.png" } alt="logo"/>
            <a href="HomePage" style={{textDecoration: 'none'}} >Home Page</a>
            <a href="CompareCars" style={{textDecoration: 'none'}}>Compare Cars</a>
            {location.pathname === '/CarListing' && (
              <a  onClick={() => scrollToElement('SPECIFICATIONS')} style={{cursor: 'pointer', textDecoration: 'none'}}>Specifications</a>
            )}
            <img className="icon" src="Logos/user.png" alt=""/>
            <img className="icon" src="Logos/contact us.png"  alt=""/>
        </nav>
    </div>
  )
}

export default Navigation