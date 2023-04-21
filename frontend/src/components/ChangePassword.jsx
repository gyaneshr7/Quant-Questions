import React, { useState } from 'react'
import Header from './Header';
import { FaLock } from 'react-icons/fa';
import './ChangePassword.css';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEye,
  faEyeSlash
} from "@fortawesome/free-solid-svg-icons";

function ChangePassword() {
  const [current, setCurrent] = useState("");
  const [newpass, setNewPass] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [eye, setEye] = useState(true);
  const [eye1, setEye1] = useState(true);
  const [eye2, setEye2] = useState(true);

  const user = JSON.parse(localStorage.getItem("quantuser"));

  const ChangePasswordHandler = async () => {
    // console.log(current, newpass, confirmPassword);
    if (newpass === confirmPassword) {
      const val = {
        currpass: current,
        newpass: newpass,
      }
      const data = await fetch(`http://localhost:8000/auth/change/password/${user.id}`, {
        method: "PUT",
        body: JSON.stringify(val),
        headers: {
          "Content-type": "application/json"
        }
      })
      const res = await data.json();
      alert(JSON.stringify(res));
      setConfirmPassword('');
      setCurrent('');
      setNewPass('');
      if(res==='Password Changed Successfully...'){
        localStorage.setItem("quantuser", null)
        window.location.href = '/login'
      }
    } else {
      alert("New Passwords doesn't match...")
    }
  }
  return (
    <div>
      <Header />
      <div className='login-page'>
        <div className='box'>
          <div className='password'>
            <h3 className='change'>Change Password</h3>
            <div className='lock'>
             
              <div className='set-lock'>
                <div className='locked'><FaLock size={20} className='icon-lock' /></div>

                <div className='mypasswordfield'>
                <input className='inputPass' value={current} autoComplete="off" onChange={(e) => setCurrent(e.target.value)} type={eye ? "password" : "text"} placeholder='Current Password' />
                <div className="pass-eye" onClick={() => setEye(!eye)}>
                  {eye ? (
                    <FontAwesomeIcon icon={faEyeSlash} />
                  ) : (
                    <FontAwesomeIcon icon={faEye} />
                  )}
                </div>
                </div>
              </div>
              
              <div className='set-lock'>
                <div className='locked'><FaLock size={20} className='icon-lock' /></div>
                <div className='mypasswordfield'>
                <input className='inputPass' value={newpass} autoComplete="off" onChange={(e) => setNewPass(e.target.value)} type={eye1 ? "password" : "text"} placeholder='New Password' />
                <div className="pass-eye" onClick={() => setEye1(!eye1)}>
                  {eye1 ? (
                    <FontAwesomeIcon icon={faEyeSlash} />
                  ) : (
                    <FontAwesomeIcon icon={faEye} />
                  )}
                </div>
                </div>
              </div>
             
              <div className='set-lock'>
                <div className='locked'><FaLock size={20} className='icon-lock' /></div>
                <div className='mypasswordfield'>
                <input className='inputPass' value={confirmPassword} autoComplete="off" onChange={(e) => setConfirmPassword(e.target.value)} type={eye2 ? "password" : "text"} placeholder='Confirm Password' />
                <div className="pass-eye" onClick={() => setEye2(!eye2)}>
                  {eye2 ? (
                    <FontAwesomeIcon icon={faEyeSlash} />
                  ) : (
                    <FontAwesomeIcon icon={faEye} />
                  )}
                </div>
                </div>
              </div>
            </div>
            <button type="button" className='passbtn' onClick={ChangePasswordHandler}>Change Password</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ChangePassword
