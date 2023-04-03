import React, { useState, useEffect } from "react";
import logo from "../images/logo.png";
import logo3 from "../images/logo3.png";
import "./Header.css";
import { Link } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import { FaUserCircle } from "react-icons/fa";
import { IoMdArrowDropdown } from "react-icons/io";
import { FaUser } from "react-icons/fa";
import { FaChartPie } from "react-icons/fa";
import { GrNotes } from "react-icons/gr";
import { FaExchangeAlt } from "react-icons/fa";
import { TbLogout } from "react-icons/tb";
import { FaQuestion } from "react-icons/fa";
import { GrResources } from "react-icons/gr";
import progress from "../images/progress.png";

function Header() {
  const [show, setShow] = useState(false);
  const [clicked, setClicked] = useState(false);
  const user = JSON.parse(localStorage.getItem("quantuser"));
  const[open,setOpen]=useState(false);

  const loc = window.location.pathname;
  useEffect(() => {
    setClicked(false)
  }, [clicked])

  const logoutHandler = () => {
    localStorage.setItem("quantuser", null)
    window.location.href = '/login'
  }

 
  
  return (
    <div className="header">
      <div className={user? "main-user":"main"}>
        <div className="logo-quant">
          <Link to="/questions">
            <img className="logo" src={logo3} onClick={() => { setClicked(true) }} alt="" />
          </Link>
        </div>
        {
          user ?
            <>
              <div className="right">
                { loc !== '/questions' && <Link to="/questions">
                  <button className="que-btn ques-user" onClick={() => { setClicked(true) }}>Questions</button>
                </Link>}
                
                <div className="show-my-user" onClick={()=>setOpen(!open)}>
                  <FaUserCircle className="curs" size="25"/>
                  <IoMdArrowDropdown className="curs" size="15"/>
                </div>
                {
                  open &&
                    <div className="user-block">
                       <Link to='/profile' className="mylinks"><div className="gap-user"><FaUser className="icon-user"/>{user.name}</div></Link>
                       <Link to='/progress' className="mylinks"><div className="gap-user"><FaChartPie className="icon-user"/>Progress</div></Link> 
                       <Link to='/submissions' className="mylinks"><div className="gap-user"><img className="icon-user my-sub" src={progress} alt=""/><div className="subm">Submissions</div></div></Link>
                       <Link to='/faq' className="mylinks"><div className="gap-user"><FaQuestion className="icon-user"/>FAQs</div></Link>
                       <Link to='/resources' className="mylinks"><div className="gap-user"><GrResources className="icon-user"/>Resources</div></Link>
                       <Link to='/change_password' className="mylinks"><div className="gap-user"><FaExchangeAlt className="icon-user"/>Change Password</div></Link>
                       <Link className="mylinks"><div className="gap-user" onClick={logoutHandler}><TbLogout className="icon-user"/>Logout</div></Link>
                    </div>
                }
              </div>
    
            </>
            :
            loc === '/login' || loc === '/signup' ?
              <div className='right'>
                <Link to='/signup'><button className='que-btn' onClick={() => { setClicked(true) }}>Sign Up</button></Link>
                <Link to='/login'><button className='que-btn' onClick={() => { setClicked(true) }}>Log In</button></Link>
              </div>
              :
              <div className='right'>
                <Link to='/questions'><button className='que-btn' onClick={() => { setClicked(true) }}>Questions</button></Link>
                <Link to='/login'><button className='que-btn' onClick={() => { setClicked(true) }}>Log In</button></Link>
              </div>
        }

        {
          user ?
          <div className="right user-right">
          { loc !== '/questions' && <Link style={{textDecoration:"none"}} to="/questions">
            <button className="que-btn ques-user ques-web" onClick={() => { setClicked(true) }}>Questions</button>
            <button className="ques-mobile"  onClick={() => { setClicked(true) }}>Questions</button>
          </Link>}
          
          <div onClick={()=>setOpen(!open)}>
            <FaUserCircle className="curs" size="25"/>
            <IoMdArrowDropdown className="curs" size="15"/>
          </div>
          {
            open && <div className="user-block">
                 <Link to='/profile' className="mylinks"><div className="gap-user"><FaUser className="icon-user"/>{user.name}</div></Link>
                 <Link to='/progress' className="mylinks"><div className="gap-user"><FaChartPie className="icon-user"/>Progress</div></Link> 
                 <Link to='/submissions' className="mylinks"><div className="gap-user"><img className="icon-user my-sub" src={progress} alt=""/><div className="subm">Submissions</div></div></Link>
                 <Link to='/faq' className="mylinks"><div className="gap-user"><FaQuestion className="icon-user"/>FAQs</div></Link>
                 <Link to='/resources' className="mylinks"><div className="gap-user"><GrResources className="icon-user"/>Resources</div></Link> 
                 <Link to='/change_password' className="mylinks"><div className="gap-user"><FaExchangeAlt className="icon-user"/>Change Password</div></Link>
                 <Link  className="mylinks"><div className="gap-user" onClick={logoutHandler}><TbLogout className="icon-user"/>Logout</div></Link>
              </div>
          }
        </div>:
         <div className="hamburger">
         <div className="ham-icon" onClick={() => setShow(!show)}><GiHamburgerMenu size="30" /></div>
         <div className={show ? 'show-menu' : 'hide-menu'}>
           {loc === "/login" ? (
             <div className="mobile-right">
               <Link to="/signup">
                 <button className="que-btn" onClick={() => { setClicked(true) }}>Sign Up</button>
               </Link>
               <Link to="/login">
                 <button className="que-btn" onClick={() => { setClicked(true) }}>Log In</button>
               </Link>
             </div>
           ) : (
             <div className="mobile-right">
               <Link to="/questions">
                 <button className="que-btn" onClick={() => { setClicked(true) }}>Questions</button>
               </Link>
               <Link to="/login">
                 <button className="que-btn" onClick={() => { setClicked(true) }}>Log In</button>
               </Link>
             </div>
           )}
         </div>
       </div>

        }

       

      </div>
    </div>
  );
}

export default Header;
