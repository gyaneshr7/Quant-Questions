import React, { useState } from 'react'
import Header from './Header';
import { FaLock } from 'react-icons/fa';
import './ChangePassword.css';

function ChangePassword() {
  const [current, setCurrent] = useState("");
  const [newpass, setNewPass] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const user = JSON.parse(localStorage.getItem("quantuser"));

  const ChangePasswordHandler = async () => {
    console.log(current, newpass, confirmPassword);
    if (newpass == confirmPassword) {
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
    }else{
      alert("Enter new password correctly....")
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
                <input className='inputPass' value={current} autoComplete="off" onChange={(e) => setCurrent(e.target.value)} type="password" placeholder='Current Password' />
              </div>
              <div className='set-lock'>
                <div className='locked'><FaLock size={20} className='icon-lock' /></div>
                <input className='inputPass' value={newpass} autoComplete="off" onChange={(e) => setNewPass(e.target.value)} type="password" placeholder='New Password' />
              </div>
              <div className='set-lock'>
                <div className='locked'><FaLock size={20} className='icon-lock' /></div>
                <input className='inputPass' value={confirmPassword} autoComplete="off" onChange={(e) => setConfirmPassword(e.target.value)} type="password" placeholder='Confirm Password' />
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
