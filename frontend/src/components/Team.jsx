import React from "react";
import Header from "./Header";
import Anushka from "../images/Anushka.jpeg";
import Khushi from "../images/bday.jpeg";
import "./Team.css";

function Team() {
  return (
    <div>
      <Header />
      <h1 className="faq-head">Our Team</h1>

      <div className="designby">Developed & Designed By</div>
      <div className="teampage">
        <div className="teamcontainer">
          <img src={Anushka} alt="Avatar" />
          <div className="desig">Anushka Shah</div>
          <p>Frontend Developer</p>
        </div>

        <div className="teamcontainer">
          <img src={Khushi} alt="Avatar" />
          <div>Khushi Agrawal</div>
          <p>Backend Developer</p>
        </div>
        <div className="teamcontainer">
          <img src={Anushka} alt="Avatar" />
          <div>Parth Mathur</div>
          <p>Tech Lead</p>
        </div>

        <div className="teamcontainer">
          <img src={Anushka} alt="Avatar" />
          <p>Frontend Developer</p>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
        </div>

        <div className="teamcontainer">
          <img src={Anushka} alt="Avatar" />
          <p>Frontend Developer</p>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
        </div>

        <div className="teamcontainer">
          <img src={Anushka} alt="Avatar" />
          <p>Frontend Developer</p>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
        </div>
        
      </div>
    </div>
  );
}

export default Team;
