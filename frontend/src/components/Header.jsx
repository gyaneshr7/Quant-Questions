import React, { useEffect, useState } from 'react'
import logo from '../images/logo.png'
import './Header.css'
import {Link} from 'react-router-dom'
function Header() {
  const [clicked,setClicked] = useState(false); 
    console.log(window.location.pathname);
    const loc=window.location.pathname;
    useEffect(()=>{
      setClicked(false)
    },[clicked])
  return (
    <div className='header'>
       <div className='main'>
          <div>
          <Link to='/'><img className='logo' src={logo} alt="" onClick={()=>{setClicked(true)}}/></Link> 
          </div>
          {
            loc==='/login' || loc==='/signup' ?
            <div className='right'>
            <Link to='/signup'><button className='que-btn' onClick={()=>{setClicked(true)}}>Sign Up</button></Link>
            <Link to='/login'><button className='que-btn' onClick={()=>{setClicked(true)}}>Log In</button></Link>     
          </div> 
          :
          <div className='right'>
            <Link to='/questions'><button className='que-btn' onClick={()=>{setClicked(true)}}>Questions</button></Link>
            <Link to='/login'><button className='que-btn' onClick={()=>{setClicked(true)}}>Log In</button></Link>     
            </div>
          }
          
       </div>
    </div>
  )
}

export default Header
