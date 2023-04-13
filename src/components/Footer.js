/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import { useLocation } from 'react-router-dom';
import { scrollToElement } from './Functions';

const Footer = () => {
    const location = useLocation();
  return (
    <div>
        <footer>
            <section>
                <img className="Logo_footer" src="Logos/LOGO.png" alt="logo" />
            </section>
            <section className="mainNavButtons" style={{width: '20%'}}>
                <a href="HomePage" style={{textDecoration: 'none', color:'white'}}>Home Page</a> <br/>
                <a href="CompareCars" style={{textDecoration: 'none', color:'white'}}>Compare Cars</a> <br/>
                <a onClick={() => scrollToElement('nav')} style={{cursor: 'pointer', textDecoration: 'none', color:'white'}}>Go Back Up</a> <br/>
                {location.pathname === '/CarListing' && (
                    <a href="hh" style={{textDecoration: 'none', color:'white'}}>Test Drive</a>
                )}<br />

            </section>
            <section className="icons">
                <p><span className="fa fa-user-o" aria-hidden="true"></span>
                <span>&nbsp;Log in / Sign Up</span><br/>
                <i className="fa fa-envelope-o" aria-hidden="true"></i>
                <span>&nbsp;Contact Us</span></p>
            </section>
            <section className="HQ">
                    <p style={{fontWeight: '600'}}>Location </p>
                    <p>Clemenceau St. Hamra, Beirut</p>
                    <p className="padding" >Subscribe to our mailing list
                    <input type="email" name="email" placeholder="example@domain.com" /></p>
            </section>
        </footer>
    </div>
  )
}

export default Footer