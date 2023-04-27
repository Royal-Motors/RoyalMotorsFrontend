/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import { scrollToElement } from './Functions' 


const Navigation = () => {
  return (
    <div>
        <nav id="nav">
            <img className="Logo" src={process.env.PUBLIC_URL + "Logos/LOGO.png" } alt="logo"/>
            <a href="HomePage" style={{textDecoration: 'none'}} >Home Page</a>
            <a href="CompareCars" style={{textDecoration: 'none'}}>Compare Cars</a>
            <a onClick={() => scrollToElement('footer')}style={{textDecoration: 'none'}}>Contact us</a>
            <img className="icon" src="Logos/user.png" alt=""/>
        </nav>
    </div>
  )
}

export default Navigation