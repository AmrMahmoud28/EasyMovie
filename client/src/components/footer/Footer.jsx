import React from 'react'
import { Link } from 'react-router-dom'
import "./footer.scss"

import bg from "../../assets/footer-bg.jpg"
import logo from "../../assets/main-logo.svg"

const Footer = () => {

  let newDate = new Date();
  let year = newDate.getFullYear();

  return (
    <div className='footer' style={{backgroundImage: `url(${bg})`}}>
      <div className="footer__content container">
        <div className="footer__content__logo">
          <div className="logo">
              <Link to="/"><img src={logo} alt="" /></Link>
          </div>
        </div>
        <div className="footer__content__menus">
          <div className='footer__content__menu'>
            <Link to="/">Home</Link>
            <Link to="/">Contact us</Link>
            <Link to="/">Term of services</Link>
            <Link to="/">About us</Link>
          </div>

          <div className='footer__content__menu'>
            <Link to="/">Live</Link>
            <Link to="/">FAQ</Link>
            <Link to="/">Premium</Link>
            <Link to="/">Privacy policy</Link>
          </div>

          <div className='footer__content__menu'>
            <Link to="/">You must watch</Link>
            <Link to="/">Recent release</Link>
            <Link to="/">Top IMDB</Link>
          </div>
        </div>
        <p className='rights'>© {year} EasyMovie from Amr Mahmoud</p>
      </div>
    </div>
  )
}

export default Footer