import React,{useState} from "react";
import "./Admin.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEye,
  faEyeSlash
} from "@fortawesome/free-solid-svg-icons";
function Admin() {
  const [eye, setEye] = useState(true);
  const[name,setName]=useState("");
  const[password,setPassword]=useState("");

  return (
    <div>
      <div className="myadmin">
        <div className="admin-head">Admin Panel</div>

        <div className="mybox">
        <div className="login">
          <input
            className="inputAdd"
            value={name}
            autoComplete="off"
            onChange={(e) => setName(e.target.value)}
            type="text"
            placeholder="Username"
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

          <button type="button" className="logbtn">
            Log In
          </button>
        </div>
        </div>
      </div>
    </div>
  );
}

export default Admin;
