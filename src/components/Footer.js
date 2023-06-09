/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import { scrollToElement } from './Functions';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';

const Footer = () => {
  return (
        <footer id="footer">
            <section>
                <img className="Logo_footer" src="Logos/LOGO.png" alt="logo" />
            </section>
            <section className="mainNavButtons" style={{width: '20%'}}>
                <NavLink to="/" style={{textDecoration: 'none', color:'white'}}>Home Page</NavLink> <br/>
                <NavLink to="CompareCars" style={{textDecoration: 'none', color:'white'}}>Compare Cars</NavLink> <br/>
                <a onClick={() => scrollToElement('nav')} style={{cursor: 'pointer', textDecoration: 'none', color:'white'}}>Back to Top</a><br/>

            </section>
            <section className="icons">
                <p><FontAwesomeIcon icon={faEnvelope} />
                <span>&nbsp;Contact Us:</span></p>
                <p>+961 1 234 567</p>
                <p>royalmotorslb@gmail.com</p>
            </section>
            <section className="HQ">
                    <p style={{fontWeight: '600'}}>Location </p>
                    <p>Clemenceau St. Hamra, Beirut</p>
            </section>
        </footer>
  )
}

export default Footer