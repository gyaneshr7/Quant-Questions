import React,{useState} from 'react'
import logo2 from '../images/logo2.png'
import './Login.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEye,
  faEyeSlash
} from "@fortawesome/free-solid-svg-icons";
import Header from './Header';

function Login() {
  const [eye, setEye] = useState(true);
  const[name,setName]=useState("");
  const[password,setPassword]=useState("");

  return (
    <>
    <Header/>
    <div className='login-page'>
      <div className='box'>
      <div className='login'>
      <img src={logo2} className="login-logo" alt=""/>
      <input className='inputBox' value={name} autoComplete="off" onChange={(e)=>setName(e.target.value)} type="text" placeholder='Username'/>
      <div className='passwordfield'>
      <input className='inputBox' type={eye ? "password" : "text"} autoComplete="off" value={password} onChange={(e)=>setPassword(e.target.value)} placeholder='Password'/>
      <div className="eyePassword" onClick={() => setEye(!eye)}>
                        {eye ? (
                          <FontAwesomeIcon icon={faEyeSlash} />
                        ) : (
                          <FontAwesomeIcon icon={faEye} />
                        )}
      </div>
      </div>
      
      <button type="button" className='logbtn'>Log In</button>
      </div>
      <div className='last-block'>
        <a href="/" className='forgot'>Forgot Password</a>
        <a href="/signup" className='sign'>Sign Up</a>
      </div>
      </div>
    
    </div>
    </>
  )
}

export default Login
