import React, { useState, useEffect } from "react";
import logo from "../images/logo.png";
import "./Header.css";
import { Link } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";

function Header() {
  const [show, setShow] = useState(false);
  const [clicked, setClicked] = useState(false);

  const loc = window.location.pathname;
  useEffect(() => {
    setClicked(false)
  }, [clicked])

  return (
    <div className="header">
        <div className="main">
          <div>
            <Link to="/">
              <img className="logo" src={logo} onClick={() => { setClicked(true) }} alt="" />
            </Link>
          </div>
          {
          loc === '/login' || loc === '/signup' ?
            <div className='right'>
              <Link to='/signup'><button className='que-btn' onClick={() => { setClicked(true) }}>Sign Up</button></Link>
              <Link to='/login'><button className='que-btn' onClick={() => { setClicked(true) }}>Log In</button></Link>
            </div>
            :
            <div className='right'>
              <Link to='/questions'><button className='que-btn' onClick={() => { setClicked(true) }}>Questions</button></Link>
              <Link to='/login'><button className='que-btn' onClick={() => { setClicked(true) }}>Log In</button></Link>
            </div>
        }

          <div className="hamburger">
            <div className="ham-icon" onClick={() => setShow(!show)}><GiHamburgerMenu /></div>
            <div className={show ? 'show-menu' : 'hide-menu'}>
              {loc === "/login" ? (
                <div className="mobile-right">
                  <Link to="/signup">
                    <button className="que-btn" onClick={() => { setClicked(true) }}>Sign Up</button>
                  </Link>
                  <Link to="/login">
                    <button className="que-btn" onClick={() => { setClicked(true) }}>Log In</button>
                  </Link>
                </div>
              ) : (
                <div className="mobile-right">
                  <Link to="/questions">
                    <button className="que-btn" onClick={() => { setClicked(true) }}>Questions</button>
                  </Link>
                  <Link to="/login">
                    <button className="que-btn" onClick={() => { setClicked(true) }}>Log In</button>
                  </Link>
                </div>
              )}
            </div>
          </div>

        </div>
      </div>
      );
}

      export default Header;
