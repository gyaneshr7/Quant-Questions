import React,{useState} from "react";
import "./Admin.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEye,
  faEyeSlash
} from "@fortawesome/free-solid-svg-icons";
function Admin() {
  const [eye, setEye] = useState(true);
  const[email,setEmail]=useState("");
  const[password,setPassword]=useState("");
  const [loading,setLoading]=useState(false);
  const URL = 'http://localhost:8000/auth'

  window.history.forward();
  function noBack() {
    window.history.forward();
  }

  const submitHandler=async ()=>{
    setLoading(true);
    const val={
      email:email,
      password:password,
      role:"admin"
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
      // console.log(user);
      if(user==='wrong email or password' ||  user=='Not a valid user!'){
        alert(user);
      }else{
        localStorage.setItem("quantuser",JSON.stringify(user));
        window.location.href='/dashboard'
      }
    } catch (error) {
      // console.log(error);
    }
    setLoading(false);
  }

  return (
    <div>
      <div className="myadmin">
        <div className="admin-head">Admin Panel</div>

        <div className="mybox">
        <div className="login">
          <input
            className="inputAdd"
            value={email}
            autoComplete="off"
            onChange={(e) => setEmail(e.target.value)}
            type="text"
            placeholder="Email Address"
          />
          <div className="passwordfield">
            <input
              className="inputAdd"
              type={eye ? "password" : "text"}
              autoComplete="off"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
            />
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
              </div>:
              <div onClick={submitHandler}>Log In</div>
              }
            </button>
          {/* <button type="button" className="logbtn" onClick={submitHandler}>
            Log In
          </button> */}
        </div>
        </div>
      </div>
    </div>
  );
}

export default Admin;
