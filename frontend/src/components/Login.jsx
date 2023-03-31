import React, { useState } from 'react'
import logo2 from '../images/logo2.png'
import './Login.css'
import Footer from './Footer';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEye,
  faEyeSlash
} from "@fortawesome/free-solid-svg-icons";
import Header from './Header';

function Login() {
  const [eye, setEye] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const URL = 'http://localhost:8000/auth'

  window.history.forward();
  function noBack() {
    window.history.forward();
  }

  const handleLogin = async () => {
    const val = {
      email: email,
      password: password,
      role: "user"
    }
    try {
      const data = await fetch(`${URL}/login`, {
        method: "POST",
        body: JSON.stringify(val),
        headers: {
          "Content-type": "application/json; charset=UTF-8"
        }
      })
      const user = await data.json();
      console.log(user);

      if(!(email || password))
      {
        alert("All Input fields required");
      }
      else if (user == 'wrong email or password' || user == 'Not a valid user!') {
        alert(user);
      } 
      else {
        localStorage.setItem("quantuser", JSON.stringify(user));
        window.location.href = '/questions'
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <Header />
      <div className='login-page'>
        <div className='box'>
          <div className='login'>
            <img src={logo2} className="login-logo" alt="" />
            <input className='inputBox' value={email} required  onChange={(e) => setEmail(e.target.value)} type="text" placeholder='Email Address' />
            <div className='passwordfield'>
              <input className='inputBox' type={eye ? "password" : "text"} required autoComplete="new-password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Password' />
              <div className="eyePassword" onClick={() => setEye(!eye)}>
                {eye ? (
                  <FontAwesomeIcon icon={faEyeSlash} />
                ) : (
                  <FontAwesomeIcon icon={faEye} />
                )}
              </div>
            </div>

            <button type="button" className='logbtn' onClick={handleLogin}>Log In</button>
          </div>
          <div className='last-block'>
            <a href="/forgotpassword" className='forgot'>Forgot Password?</a>
            <a href="/signup" className='sign'>Sign Up</a>
          </div>
        </div>

      </div>
      {/* <Footer/> */}
    </>
  )
}

export default Login
