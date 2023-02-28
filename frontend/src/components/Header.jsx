import React, { useState, useEffect } from "react";
import logo from "../images/logo.png";
import "./Header.css";
import { Link } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";

function Header() {
  const [show, setShow] = useState(false);
  const [clicked, setClicked] = useState(false);
  const user = JSON.parse(localStorage.getItem("quantuser"));

  const loc = window.location.pathname;
  useEffect(() => {
    setClicked(false)
  }, [clicked])

  const logoutHandler = () => {
    localStorage.setItem("quantuser", null)
    window.location.href = '/login'
  }

  return (
    <div className="header">
      <div className="main">
        <div>
          <Link to="/">
            <img className="logo" src={logo} onClick={() => { setClicked(true) }} alt="" />
          </Link>
        </div>
        {
          user ?
            <>
              <div className='right'>
                <Link to='/login'><button className='que-btn' onClick={logoutHandler}>Logout</button></Link>
              </div>
              <div className='right'>
                <Link to='/progress'><button className='que-btn' >Progress</button></Link>
              </div>
              <div className='right'>
                <Link to='/change_password'><button className='que-btn' >Change Password</button></Link>
              </div>
              <div className='right'>
                <Link to='/submissions'><button className='que-btn' >submissions</button></Link>
              </div>
              <div className='right'>
                <Link to='/profile'><button className='que-btn' >profile</button></Link>
              </div>
            </>
            :
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
