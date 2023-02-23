import React, { useState } from 'react'
import logo from '../images/logo.png'
import './Header.css'
import {Link} from 'react-router-dom'
function Header() {
    console.log(window.location.pathname);
    const loc=window.location.pathname;
  return (
    <div className='header'>
       <div className='main'>
          <div>
          <Link to='/'><img className='logo' src={logo} alt=""/></Link> 
          </div>
          {
            loc==='/login' ?
            <div className='right'>
            <Link to='/signup'><button className='que-btn'>Sign Up</button></Link>
            <Link to='/login'><button className='que-btn'>Log In</button></Link>     
          </div> 
          :
          <div className='right'>
            <Link to='/questions'><button className='que-btn'>Questions</button></Link>
            <Link to='/login'><button className='que-btn'>Log In</button></Link>     
            </div>
          }
          
       </div>
    </div>
  )
}

export default Header
