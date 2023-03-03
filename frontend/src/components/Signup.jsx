import React, { useState } from 'react'
import logo2 from '../images/logo2.png'
import './Login.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEye,
  faEyeSlash
} from "@fortawesome/free-solid-svg-icons";
import Header from './Header';

function Signup() {
  const [eye, setEye] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const URL = 'http://localhost:8000/auth'

  const handlesignup = async () => {
    console.log(name, email, password);
    const val = {
      name: name,
      email: email,
      password: password,
      role:"user"
    }
    try {
      const data = await fetch(`${URL}/register`, {
        method: "POST",
        body: JSON.stringify(val),
        headers: {
          "Content-type": "application/json; charset=UTF-8"
        }
      })
      const user = await data.json();
      alert(user);
      window.location.href='/login'
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
            <input className='inputBox' value={name} autoComplete="off" onChange={(e) => setName(e.target.value)} type="text" placeholder='Full Name' />
            <div className='passwordfield'>
              <input className='inputBox' type={eye ? "password" : "text"} autoComplete="new-password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Password' />
              <div className="eyePassword" onClick={() => setEye(!eye)}>
                {eye ? (
                  <FontAwesomeIcon icon={faEyeSlash} />
                ) : (
                  <FontAwesomeIcon icon={faEye} />
                )}
              </div>
            </div>
            <input className='inputBox' value={email} autoComplete="new-password" onChange={(e) => setEmail(e.target.value)} type="text" placeholder='E-mail address' />
            <button type="button" className='logbtn' onClick={handlesignup}>Sign Up</button>
          </div>
          <div className='last-block'>
            <a href="/" className='forgot'>Having an account ?</a>
            <a href="/login" className='sign'>Login</a>
          </div>
        </div>
      </div>
    </>
  )
}

export default Signup
