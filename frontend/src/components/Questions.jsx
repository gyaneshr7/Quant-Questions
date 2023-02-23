import React, { useState } from "react";
import "./Questions.css";
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
function Questions() {
  const [search, setSearch] = useState("");
  const options = [
    'one', 'two', 'three'
  ];
  const defaultOption = options[0];

  return (
    <div>
      <div className="quest-block">
        <div className="div1">
          <div className="first-left">
            <div className="solved">0/83 Solved</div>
            <div className="easy">Easy 0</div>
            <div className="medium">Medium 0</div>
            <div className="hard">Hard 0</div>
          </div>
          <div className="random-side">
            <button className="random">Random Q</button>
          </div>
        </div>

        <div className="border1"></div>

        <div className="div2">
          <div className="find">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search questions..."
            />
          </div>
          <div className="any">
            {/* <Dropdown options={options} onChange={this._onSelect} value={defaultOption} placeholder="Select an option" />; */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Questions;
