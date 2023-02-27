import React,{useState} from 'react'
import Header from './Header';
import { FaLock } from 'react-icons/fa';
import './ChangePassword.css';

function ChangePassword() {
    const[current,setCurrent]=useState("");
    const[newpass,setNewPass]=useState("");
    const[again,setAgain]=useState("");
  return (
    <div>
      <Header/>
      <div className='login-page'>
      <div className='box'>
      <div className='password'>
        <h3 className='change'>Change Password</h3>
      <div className='lock'>
      <div className='set-lock'><div className='locked'><FaLock size={20} className='icon-lock'/></div><input className='inputPass' value={current} autoComplete="off" onChange={(e)=>setCurrent(e.target.value)} type="password" placeholder='Current Password'/></div>
      <div className='set-lock'><div className='locked'><FaLock size={20} className='icon-lock'/></div><input className='inputPass' value={newpass} autoComplete="off" onChange={(e)=>setNewPass(e.target.value)} type="password" placeholder='New Password'/></div>
      <div className='set-lock'><div className='locked'><FaLock size={20} className='icon-lock'/></div><input className='inputPass' value={again} autoComplete="off" onChange={(e)=>setAgain(e.target.value)} type="password" placeholder='New Password(again)'/></div>
      </div>

      
      <button type="button" className='passbtn'>Change Password</button>
      </div>
      </div>
    
    </div>
    </div>
  )
}

export default ChangePassword
