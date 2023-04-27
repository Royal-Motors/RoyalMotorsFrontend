/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import { scrollToElement } from './Functions';

const Footer = () => {
  return (
    <div>
        <footer id="footer">
            <section>
                <img className="Logo_footer" src="Logos/LOGO.png" alt="logo" />
            </section>
            <section className="mainNavButtons" style={{width: '20%'}}>
                <a href="HomePage" style={{textDecoration: 'none', color:'white'}}>Home Page</a> <br/>
                <a href="CompareCars" style={{textDecoration: 'none', color:'white'}}>Compare Cars</a> <br/>
                <a onClick={() => scrollToElement('nav')} style={{cursor: 'pointer', textDecoration: 'none', color:'white'}}>Back to Top</a> <br/>

            </section>
            <section className="icons">
                <p style={{marginBottom:'1vw'}}><span className="fa fa-user-o" aria-hidden="true"></span>
                <span>&nbsp;Log in / Sign Up</span><br/></p>
                <p><i className="fa fa-envelope-o" aria-hidden="true"></i>
                <span>&nbsp;Contact Us:</span></p>
                <p>+961 1 234 567</p>
                <p>royalmotorslb@gmail.com</p>
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