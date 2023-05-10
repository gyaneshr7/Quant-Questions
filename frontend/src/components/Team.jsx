import React from "react";
import Header from "./Header";
import Anushka from "../images/bday.jpeg";
import Khushi from "../images/bday.jpeg";
import "./Team.css";

function Team() {
  return (
    <div>
      <Header />
      <h1 className="faq-head">Our Team</h1>

      <div className="designby">Developed & Designed By</div>
      <div className="teampage">
       <div className="team-member">
       <div className="teamcontainer">
          <img src={Anushka} alt="Avatar" />
          <div className="desig">Anushka Shah</div>
          <p>Frontend Developer</p>
        </div>

        <div className="teamcontainer">
          <img src={Khushi} alt="Avatar" />
          <div className="desig">Khushi Agrawal</div>
          <p>Backend Developer</p>
        </div>
        <div className="teamcontainer">
          <img src={Anushka} alt="Avatar" />
          <div className="desig">Parth Mathur</div>
          <p>Tech Lead</p>
        </div>

        <div className="teamcontainer">
          <img src={Anushka} alt="Avatar" />
          <div className="desig">Abdul Samad Hashmi</div>
          <p>Tech Co-Lead</p>
        </div>

        <div className="teamcontainer">
          <img src={Anushka} alt="Avatar" />
          <div className="desig">Tanishka Patwari</div>
          <p>Content Writer </p>
        </div>

       </div>
        
      </div>
    </div>
  );
}

export default Team;
