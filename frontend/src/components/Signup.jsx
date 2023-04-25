import React, { useState, useEffect } from 'react'
import logo2 from '../images/logo2.png'
import './Login.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { injectStyle } from "react-toastify/dist/inject-style";
import { ToastContainer, toast } from "react-toastify";
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
  const [phone, setPhone] = useState("");
  const [error, seterror] = useState("");
  const [loading,setLoading]=useState(false);
  const URL = 'http://localhost:8000/auth'

  function isValidEmail(email) {
    return /\S+@\S+\.\S+/.test(email);
  }
  function isValidPhone(phone){
    return phone.length===10;
  }
  if (typeof window !== "undefined") {
    injectStyle();
  }

const handleChange = (e) => {

  if(e.target.name==="email"){
    if(!isValidEmail(e.target.value)){
      seterror('Email is invalid');
    }
    else{
      seterror("");
    }
    setEmail(e.target.value)
    console.log(email)
  }
  if(e.target.name==="phone"){
    if(!isValidPhone(e.target.value)){
      seterror('Phone is invalid');
    }
    else{
      seterror("");
    }
    setPhone(e.target.value)
    console.log(phone)
  }
}

  const handlesignup = async () => {
    // console.log(name, email, password,phone);
  setLoading(true); 
  if(error===""){
    const val = {
      name: name,
      email: email,
      password: password,
      phoneNo:phone,
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
      setLoading(false);
      
      if(user==="Registered Successfully!"){
        toast.dark(user);
        setTimeout(()=>{
          window.location.href='/login'
        },5000);
      }
      else if(user==="User Already Exist. Please Login")
      {
        toast.info(user);
        setTimeout(()=>{
          window.location.href='/login'
        },6000);
      }
    } catch (error) {
      console.log(error);
    }
  }
  else{
    toast.warning("Please check Email and Phone number")
  }
  }

useEffect(() => {

}, [email, phone])

  return (
    <>
      <Header />
      <div className='signin-page'>
        <div className='box'>
          <div className='login'>
            <img src={logo2} className="login-logo" alt="" />
            <input className='signinputBox' required value={name} autoComplete="off" onChange={(e)=> setName(e.target.value)} type="text" placeholder='Full Name' name='name' />
            
            <input className='signinputBox' required value={email} autoComplete="new-password" onChange={(e)=> handleChange(e)} type="text" placeholder='E-mail address' name='email' />
            
            <input className='signinputBox' required value={phone} autoComplete="new-password" onChange={(e)=> handleChange(e)} type="number" placeholder='Contact Number' pattern={"[0-9]{10}"} title="please enter valid number" name='phone' />

            <div className='signpasswordfield'>
              <input className='signinputBox' required type={eye ? "password" : "text"} autoComplete="new-password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Password' />
              <div className="eyePassword" onClick={() => setEye(!eye)}>
                {eye ? (
                  <FontAwesomeIcon icon={faEyeSlash} />
                ) : (
                  <FontAwesomeIcon icon={faEye} />
                )}
              </div>
            </div>
            <button type="button" className='logbtn'>
              {
                loading ?
                <div
                className="spinner-border text-white"
                role="status"
                style={{
                  height: "15px",
                  width: "15px",
                  padding:"2px"
                }}
              >
                <span className="visually-hidden">
                  Loading...
                </span>
              </div>
              :
              <div onClick={handlesignup}>Sign Up</div>
              }
             </button>
          </div>
          <div className='last-block having'>
            <a href="/login" className='sign-pass'>Having an account ? Login</a>
          </div>
        </div>
        {error && <div style={{color:"red"}}>{error}</div>}
      </div>
      <ToastContainer/>
    </>
  )
}

export default Signup
