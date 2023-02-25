import React, { useEffect, useState } from "react";
import DataTable from 'react-data-table-component';

import "./Questions.css";
import 'react-dropdown/style.css';
import cross from '../images/cross.png'
import Header from "./Header";

function Questions() {
  const [searched, setSearched] = useState("");
  const [searchval, setSearchVal] = useState("");
  const [enableSearch, setEnableSearch] = useState(false);

  const [difficultyVal, setDifficultyVal] = useState("");
  const [selected, setSelected] = useState();

  const [categoryVal, setCategoryVal] = useState("");

  const [data, setData] = useState();
  const url = 'http://localhost:8000/question'

  // colums of the table
  const columns = [
    {
      name: <div style={{ fontSize: 15, fontWeight: 800 }}>#</div>,
      selector: row => row.id,
      cell: row => <div style={{ fontSize: 15 }}>{row.uniqueId}</div>,
      sortable: true
    },
    {
      name: <div style={{ fontSize: 15, fontWeight: 800 }}>Question Name</div>,
      selector: row => row.que,
      cell: row => <div style={{ fontSize: 15, color: "#0378a6", fontWeight: 600, cursor: "pointer" }}>{row.title}</div>,
      width: "300px",
      sortable: true
    },
    {
      name: <div style={{ fontSize: 15, fontWeight: 800 }}>Difficulty</div>,
      selector: row => row.difficulty,
      cell: row => <div style={{ fontSize: 15, backgroundColor: "#04b521", borderRadius: 11, padding: 3, color: "white" }}>{row.difficulty}</div>,
      sortable: true
    },
    {
      name: <div style={{ fontSize: 15, fontWeight: 800 }}>Accept</div>,
      selector: row => row.accept,
      cell: row => <div style={{ fontSize: 15 }}>{(row.accepted / row.submission) * 100}</div>,
      sortable: true
    },
    {
      name: <div style={{ fontSize: 15, fontWeight: 800 }}>Status</div>,
      selector: row => row.score,
      cell: row => <div style={{ fontSize: 15, backgroundColor: "#021775", borderRadius: 11, padding: 3, color: "white" }}>{row.score}</div>,
      sortable: true
    }
  ];

  const fetchQuestions = async () => {
    const data = await fetch(`${url}/getallquestions`);
    const res = await data.json();
    console.log(res);
    setData(res);
  }

  const fetchCatAndDiffQues = async (categoryVal, difficultyVal) => {
    const data = await fetch(`${url}/getquestions/difficultycategory/${categoryVal}/${difficultyVal}`)
    const res = await data.json();
    console.log(res);
    setSearched(res);
  }
  const fetchCatQues = async (categoryVal) => {
    const data = await fetch(`${url}/getquestions/category/${categoryVal}`)
    const res = await data.json();
    setSearched(res);
  }
  const fetchDiffQues = async (difficultyVal) => {
    const data = await fetch(`${url}/getquestions/difficulty/${difficultyVal}`)
    const res = await data.json();
    setSearched(res)
  }

  useEffect(() => {
    if (categoryVal.length > 0 && difficultyVal.length > 0) {
      fetchCatAndDiffQues(categoryVal, difficultyVal);
    } else if (categoryVal.length > 0) {
      fetchCatQues(categoryVal);
    } else if (difficultyVal.length > 0) {
      fetchDiffQues(difficultyVal);
    } else {
      fetchQuestions();
    }
  }, [categoryVal, difficultyVal,enableSearch,searchval])

  // search questions
  const matched = [];
  const searchHandler = (e) => {
    if (e.target.value == '') {
      setEnableSearch(false);
    }else{
      setEnableSearch(true);
    }
    setSearchVal(e.target.value);
    const val = e.target.value;
    console.log(val);
    if (categoryVal.length < 1 && difficultyVal.length < 1) {
      data.forEach((user) => {
        const value = user.title.toLowerCase().includes(val.toLowerCase());
        if (value) {
          matched.push(user);
        }
      })
      console.log(matched);
      setSearched(matched)
    } else if (categoryVal.length > 0 || difficultyVal.length > 0) {
      searched.forEach((user) => {
        console.log(user,"userrr");
        const value = user.title.toLowerCase().includes(val.toLowerCase());
        if (value) {
          matched.push(user);
        }
      })
      console.log(matched);
      setSelected(matched)
    }
  }

  const handleCross = (value) => {
    if (value == 'difficult') {
      setDifficultyVal('');
    } else if (value == 'category') {
      setCategoryVal('');
    }
  }

  return (
    <>
    <Header/>
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
              value={searchval}
              onChange={searchHandler}
              placeholder="Search questions..."
              className="search"
            />
          </div>
          <div className="any">
            <select name="type" required style={{ border: 'none' }} >
              <option value="none" selected disabled hidden>
                Type
              </option>
              <option value="free">Free</option>
              <option value="paying">Paying</option>
            </select>

            <select name="category" required style={{ border: 'none' }} onChange={(e) => setCategoryVal(e.target.value)}>
              <option value="none" selected disabled hidden>
                Category
              </option>
              <option value="Brainteasers">Brainteasers</option>
              <option value="Derivatives">Derivatives</option>
              <option value="Finance">Finance</option>
              <option value="Math">Math</option>
              <option value="NonQuant">NonQuant</option>
            </select>

            <select name="gender" required style={{ border: 'none' }} onChange={(e) => setDifficultyVal(e.target.value)}>
              <option value="none" selected disabled hidden>
                Difficulty
              </option>
              <option value="medium">Medium</option>
              <option value="easy">Easy</option>
              <option value="hard">Hard</option>
            </select>

            <select name="gender" required style={{ border: 'none' }}>
              <option value="none" selected disabled hidden>
                Scoring
              </option>
              <option value="auto">Auto</option>
              <option value="self">Self</option>
            </select>
          </div>
        </div>
        {
          (categoryVal && difficultyVal) &&
          <>
            <div className="category-class">
              <img src={cross} alt="" srcset="" onClick={() => handleCross('category')} />
              {categoryVal}
            </div>
            <div className="difficulty-class">
              <img src={cross} alt="" srcset="" onClick={() => handleCross('difficult')} />
              {difficultyVal}
            </div>
          </>
        }
        {
          (categoryVal && !difficultyVal) &&
          <>
            <div className="category-class">
              <img src={cross} alt="" srcset="" onClick={() => handleCross('category')} />
              {categoryVal}
            </div>
          </>
        }
        {
          (difficultyVal && !categoryVal) &&
          <>
            <div className="category-class">
              <img src={cross} alt="" srcset="" onClick={() => handleCross('difficult')} />
              {difficultyVal}
            </div>
          </>
        }
        <div className="border1"></div>
        <div className="div3">
          {
            !difficultyVal && !categoryVal && !enableSearch &&
            <DataTable
              columns={columns}
              data={data}
              striped={true}
              highlightOnHover={true}
              responsive={true}
              pagination={true}
              paginationDefaultPage={1}
              paginationPerPage={10}
            />
          }
          {
            (enableSearch && (categoryVal.length<1 && difficultyVal.length<1)) &&
            <DataTable
              columns={columns}
              data={searched}
              striped={true}
              highlightOnHover={true}
              responsive={true}
              pagination={true}
              paginationDefaultPage={1}
              paginationPerPage={10}
            />
          }
          {
            ((categoryVal.length>0 || difficultyVal.length>0) && !enableSearch) &&
            <DataTable
              columns={columns}
              data={searched}
              striped={true}
              highlightOnHover={true}
              responsive={true}
              pagination={true}
              paginationDefaultPage={1}
              paginationPerPage={10}
            />
          }
          {
            (categoryVal.length>0 || difficultyVal.length>0) && enableSearch  &&
            <DataTable
              columns={columns}
              data={selected}
              striped={true}
              highlightOnHover={true}
              responsive={true}
              pagination={true}
              paginationDefaultPage={1}
              paginationPerPage={10}
            />
          }
        </div>
      </div>
    </div>
    </>
  )
}

export default Questions;