import React, { useEffect, useState } from "react";
import "./Questions.css";
import cross from "../images/cross.png";
import Header from "./Header";
import { Link } from "react-router-dom";
import DataTable from "react-data-table-component";
import { IoMdArrowDropdown } from "react-icons/io";
import { ImCross } from 'react-icons/im';
import { GrNotes } from "react-icons/gr";
import { FaUsers } from "react-icons/fa";
import { GrUserManager } from "react-icons/gr";
import { FaTags } from "react-icons/fa";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import progressimg from "../images/progress.png";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

function Questions() {
  const [searched, setSearched] = useState("");
  const [searchval, setSearchVal] = useState("");
  const [enableSearch, setEnableSearch] = useState(false);
  const [difficultyVal, setDifficultyVal] = useState("");
  const [selected, setSelected] = useState();
  const [userData, setUserData] = useState();
  const [categoryVal, setCategoryVal] = useState("");
  let [random, setRandom] = useState();
  const [data, setData] = useState();
  const url = "http://localhost:8000/question";
  const user = JSON.parse(localStorage.getItem("quantuser"));

  const [firmData, setFirmData] = useState();
  const [firmVal, setFirmVal] = useState('');
  const [divisionVal, setDivisionVal] = useState('');
  const [positionVal, setPositionVal] = useState('');
  const [tagVal, setTagVal] = useState('');
  const [reset, setReset] = useState(false);

  const correct = [], wrong = [];
  userData && userData.currentAttempted.map((data) => {
    if (data.status == 'correct') {
      correct.push(data);
    } else {
      wrong.push(data);
    }
  })

  const easy = [], medium = [], hard = [];
  data && data.map((ques) => {
    if (ques.difficulty == 'easy') {
      easy.push(ques);
    } else if (ques.difficulty == 'medium') {
      medium.push(ques);
    } else {
      hard.push(ques);
    }
  })

  const firms = ['Tower Research Capital', 'Global Atlantic', 'Nomura', 'RBC', 'Bank',
    'Tower Research Capital', 'Global Atlantic', 'Nomura', 'RBC', 'Bank',
    'Tower Research Capital', 'Global Atlantic', 'Nomura', 'RBC', 'Bank',
    'Tower Research Capital', 'Global Atlantic', 'Nomura', 'RBC', 'Bank']
  const divisions = ['Technology', 'Risk Management', 'Sales', 'Analytics'];
  const positions = ['Trader', 'Develop', 'Analyst', 'Intern']
  const tags = ['c++', 'C', 'java', 'Javascript'];

  // colums of the table
  const columnlogin = [
    {
      name: <div style={{ fontSize: 15, fontWeight: 800 }}>#</div>,
      selector: (row) => row.id,
      cell: (row) => <div style={{ fontSize: 15 }}>{row.uniqueId}</div>,
      sortable: true,
    },
    {
      name: <div style={{ fontSize: 15, fontWeight: 800 }}>Question Name</div>,
      selector: (row) => row.que,
      cell: (row) => (
        <Link to="/quedetail" state={{ id: row.uniqueId }}>
          <div
            style={{
              fontSize: 15,
              color: "#0378a6",
              fontWeight: 600,
              cursor: "pointer",
              textAlign: "left"
            }}
          >
            {row.title}
          </div>
        </Link>
      ),
      width: "300px",
      sortable: true,
    },
    {
      name: <div style={{ fontSize: 15, fontWeight: 800 }}>Difficulty</div>,
      selector: (row) => row.difficulty,
      cell: (row) => (

        <div
          className={
            row.difficulty === "easy" ? "success1" : row.difficulty === 'hard' ? "danger1" : "medium1"
          }
        >
          {row.difficulty}
        </div>
      ),
      sortable: true,
    },
    {
      name: <div style={{ fontSize: 15, fontWeight: 800 }}>Accept</div>,
      selector: (row) => row.accept,
      cell: (row) => (
        <div style={{ fontSize: 15 }}>
          {
            !isNaN((row.accepted / row.submission) * 100) ? ((row.accepted / row.submission) * 100).toFixed(0, 2) : '---'
          }
          {
            !isNaN((row.accepted / row.submission) * 100) ? '%' : '---'
          }
        </div>
      ),
      sortable: true,
    },
    {
      name: <div style={{ fontSize: 15, fontWeight: 800 }}>Status</div>,
      selector: (row) => row.score,
      cell: (row) => (
        <div
          style={{
            fontSize: 15,
            backgroundColor: "#021775",
            borderRadius: 11,
            padding: 3,
            color: "white",
          }}
        >
          {
            userData && userData.currentAttempted.some(data => data.questionId == row._id) ?
              userData && userData.currentAttempted.map((data) => (
                data.questionId == row._id &&
                data.status
              ))
              : 'unsolved'
          }
        </div>
      ),
      sortable: true,
    },
  ];

  const columnlogout = [
    {
      name: <div style={{ fontSize: 15, fontWeight: 800 }}>#</div>,
      selector: (row) => row.id,
      cell: (row) => <div style={{ fontSize: 15 }}>{row.uniqueId}</div>,
      sortable: true,
    },
    {
      name: <div style={{ fontSize: 15, fontWeight: 800 }}>Question Name</div>,
      selector: (row) => row.que,
      cell: (row) => (
        <Link to="/quedetail" state={{ id: row.uniqueId }}>
          <div
            style={{
              fontSize: 15,
              color: "#0378a6",
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            {row.title}
          </div>
        </Link>
      ),
      width: "300px",
      sortable: true,
    },
    {
      name: <div style={{ fontSize: 15, fontWeight: 800 }}>Difficulty</div>,
      selector: (row) => row.difficulty,
      cell: (row) => (
        <div
          style={{
            fontSize: 15,
            backgroundColor: "#04b521",
            borderRadius: 11,
            padding: 3,
            color: "white",
          }}
        >
          {row.difficulty}
        </div>
      ),
      sortable: true,
    },
    {
      name: <div style={{ fontSize: 15, fontWeight: 800 }}>Accept</div>,
      selector: (row) => row.accept,
      cell: (row) => (
        <div style={{ fontSize: 15 }}>
          {
            !isNaN((row.accepted / row.submission) * 100) ? ((row.accepted / row.submission) * 100).toFixed(0, 2) : '---'
          }
          {
            !isNaN((row.accepted / row.submission) * 100) ? '%' : '---'
          }
        </div>
      ),
      sortable: true,
    },
  ];

  // Mobile view

  const columnmobile = [
    {
      name: <div style={{ fontSize: 10, fontWeight: 700 }}>#</div>,
      selector: (row) => row.id,
      cell: (row) => <div style={{ fontSize: 15 }}>{row.id}</div>,
      sortable: true,
    },
    {
      name: <div style={{ fontSize: 10, fontWeight: 700 }}>Question Name</div>,
      selector: (row) => row.title,
      cell: (row) => (
        <Link to="/quedetail" state={{ id: row.uniqueId }}>
          <div
            style={{
              fontSize: 15,
              color: "#0378a6",
              fontWeight: 600,
              cursor: "pointer",
              textAlign: "left"
            }}
          >
            {row.title}
          </div>
        </Link>
      ),
      width: "300px",
      sortable: true,
    },
    {
      name: <div style={{ fontSize: 10, fontWeight: 700 }}>Difficulty</div>,
      selector: (row) => row.difficulty,
      cell: (row) => (

        <div
          className={
            row.difficulty === "easy" ? "success1" : row.difficulty === 'hard' ? "danger1" : "medium1"
          }
        >
          {row.difficulty}
        </div>
      ),
      sortable: true,
    },
    {
      name: <div style={{ fontSize: 10, fontWeight: 700 }}>Accept</div>,
      selector: (row) => row.accept,
      cell: (row) => (
        <div>{row.accept}</div>
      ),

      sortable: true,
    },
    {
      name: <div style={{ fontSize: 10, fontWeight: 700 }}>Status</div>,
      selector: (row) => row.status,
      cell: (row) => (
        <div
          style={{
            fontSize: 15,
            backgroundColor: "#021775",
            borderRadius: 11,
            padding: 3,
            color: "white",
          }}
        >
          {row.status}
        </div>
      ),
      sortable: true,
    },
  ];

  const tableData = [
    {
      id: "1",
      title: "Two Drawers with Black and White Balls",
      difficulty: "easy",
      accept: "11",
      status: "unsolved"
    },
    {
      id: "2",
      title: "Forwards vs Futures",
      difficulty: "hard",
      accept: "14",
      status: "unsolved"
    },
    {
      id: "3",
      title: "First Ace",
      difficulty: "easy",
      accept: "13",
      status: "solved"
    },
    {
      id: "4",
      title: "Mental Math 2-Digit Squared",
      difficulty: "easy",
      accept: "17",
      status: "unsolved"
    }
  ]

  const fetchQuestions = async () => {
    const data = await fetch(`${url}/getallquestions`);
    const res = await data.json();
    random = res && Math.floor(Math.random() * res.length);
    setRandom(random);
    setData(res);
  };

  const fetchUser = async () => {
    const data = await fetch(`http://localhost:8000/user/${user.id}`);
    const res = await data.json();
    setUserData(res);
  }
  const handleFilters = () => {
    const array = [];
    if (firmVal.length > 0 && divisionVal.length > 0 && positionVal.length > 0 && tagVal.length > 0) {
      data.map((ques) => {
        if (ques.firms.includes(firmVal) && ques.divisions.includes(divisionVal) && ques.position.includes(positionVal) && ques.tags.includes(tagVal)) {
          array.push(ques);
        }
      })
      setFirmData(array)
    } else if ((positionVal.length > 0 && divisionVal.length > 0 && firmVal.length > 0)) {
      data.map((ques) => {
        if (ques.position.includes(positionVal) && ques.divisions.includes(divisionVal) && ques.firms.includes(firmVal)) {
          array.push(ques);
        }
      })
      setFirmData(array)
    } else if (positionVal.length > 0 && firmVal.length > 0 && tagVal.length > 0) {
      data.map((ques) => {
        if (ques.position.includes(positionVal) && ques.firms.includes(firmVal) && ques.tags.includes(tagVal)) {
          array.push(ques);
        }
      })
      setFirmData(array)
    } else if (positionVal.length > 0 && divisionVal.length > 0 && tagVal.length > 0) {
      data.map((ques) => {
        if (ques.position.includes(positionVal) && ques.divisions.includes(divisionVal) && ques.tags.includes(tagVal)) {
          array.push(ques);
        }
      })
      setFirmData(array)
    } else if (divisionVal.length > 0 && firmVal.length > 0 && tagVal.length > 0) {
      data.map((ques) => {
        if (ques.firms.includes(firmVal) && ques.divisions.includes(divisionVal) && ques.tags.includes(tagVal)) {
          array.push(ques);
        }
      })
      setFirmData(array)
    } else if (positionVal.length > 0 && divisionVal.length > 0) {
      data.map((ques) => {
        if (ques.position.includes(positionVal) && ques.divisions.includes(divisionVal)) {
          array.push(ques);
        }
      })
      setFirmData(array)
    } else if (positionVal.length > 0 && firmVal.length > 0) {
      data.map((ques) => {
        if (ques.position.includes(positionVal) && ques.firms.includes(firmVal)) {
          array.push(ques);
        }
      })
      setFirmData(array)
    } else if (positionVal.length > 0 && tagVal.length > 0) {
      data.map((ques) => {
        if (ques.position.includes(positionVal) && ques.tags.includes(tagVal)) {
          array.push(ques);
        }
      })
      setFirmData(array)
    } else if (divisionVal.length > 0 && firmVal.length > 0) {
      data.map((ques) => {
        if (ques.firms.includes(firmVal) && ques.divisions.includes(divisionVal)) {
          array.push(ques);
        }
      })
      setFirmData(array)
    } else if (divisionVal.length > 0 && tagVal.length > 0) {
      data.map((ques) => {
        if (ques.divisions.includes(divisionVal) && ques.tags.includes(tagVal)) {
          array.push(ques);
        }
      })
      setFirmData(array)
    } else if (firmVal.length > 0 && tagVal.length > 0) {
      data.map((ques) => {
        if (ques.firms.includes(firmVal) && ques.tags.includes(tagVal)) {
          array.push(ques);
        }
      })
      setFirmData(array)
    } else if (firmVal.length > 0 || divisionVal.length > 0 || positionVal.length > 0 || tagVal.length > 0) {
      data.map((ques) => {
        if (ques.firms.includes(firmVal) || ques.divisions.includes(divisionVal) || ques.position.includes(positionVal) || ques.tags.includes(tagVal)) {
          array.push(ques);
        }
      })
      setFirmData(array);
    }
  }

  const handleCategoryAndDifficulty = () => {
    let array = [];
    if (categoryVal.length > 0 && difficultyVal.length > 0) {
      data.map((ques) => {
        if (ques.category == categoryVal && ques.difficulty == difficultyVal) {
          array.push(ques);
        }
      })
      setSearched(array);
    } else if (categoryVal.length > 0) {
      data.map((ques) => {
        if (ques.category == categoryVal) {
          array.push(ques);
        }
      })
      setSearched(array);
    } else if (difficultyVal.length > 0) {
      data.map((ques) => {
        if (ques.difficulty == difficultyVal) {
          array.push(ques);
        }
      })
      setSearched(array);
    }
  }

  useEffect(() => {
    if (categoryVal.length > 0 && difficultyVal.length > 0) {
      handleCategoryAndDifficulty();
    } else if (categoryVal.length > 0) {
      handleCategoryAndDifficulty();
    } else if (difficultyVal.length > 0) {
      handleCategoryAndDifficulty();
    } else {
      fetchQuestions();
      fetchUser();
    }
    if (firmVal.length > 0 || divisionVal.length > 0 || positionVal.length > 0 || tagVal.length > 0) {
      handleFilters();
      if (categoryVal.length > 0 || difficultyVal.length > 0) {
        setReset(true);
      } else {
        setReset(false)
      }
      setDifficultyVal('');
      setCategoryVal('');
      setSearchVal('');
      setEnableSearch(false);
    }
    // if (reset) {
    //   setFirmVal('');
    // }
  }, [categoryVal, difficultyVal, searchval, reset, firmVal, divisionVal, positionVal, tagVal]);

  // search questions
  const matched = [];
  const searchHandler = (e) => {
    if (e.target.value == "") {
      setEnableSearch(false);
    } else {
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
      });
      setSearched(matched);
    } else if (categoryVal.length > 0 || difficultyVal.length > 0) {
      searched.forEach((user) => {
        console.log(user, "userrr");
        const value = user.title.toLowerCase().includes(val.toLowerCase());
        if (value) {
          matched.push(user);
        }
      });
      setSelected(matched);
    }
  };

  const handleCross = (value) => {
    if (value == "difficult") {
      setDifficultyVal("");
    } else if (value == "category") {
      setCategoryVal("");
    } else if (value == 'firm') {
      setFirmVal("");
    } else if (value == 'division') {
      setDivisionVal("");
    } else if (value == 'position') {
      setPositionVal("");
    } else if (value == 'tag') {
      setTagVal("");
    }
  };

  ChartJS.register(ArcElement, Tooltip, Legend);
  const piedata = {
    labels: ['Todo', 'Solved', 'Attempted'],
    datasets: [
      {
        label: '',
        data: [data && data.length, correct.length, wrong.length],
        backgroundColor: [
          '#66c2a5',
          '#8da0cb',
          'rgb(81, 80, 80)'
        ],
        borderWidth: 1,
      },
    ],
  };



  return (
    <>
      <Header />
      <div className="web-view">
        <div className="quest-two">
          <div className="quest-block">
            <div className="div1">
              <div className="first-left">
                <div className="solved">{correct.length > 0 && correct.length}/{data && data.length} Solved</div>
                <div className="easy">Easy {easy.length > 0 && easy.length}</div>
                <div className="mymedium">Medium {medium.length > 0 && medium.length}</div>
                <div className="hard">Hard {hard.length > 0 && hard.length}</div>
              </div>
              <div className="random-side">
                <Link
                  to="/quedetail"
                  state={{ id: random && data[random].uniqueId }}
                >
                  <button className="random">Random Q</button>
                </Link>
              </div>
            </div>

            <hr style={{ height: "0.7px", borderwidth: "0", color: "rgb(148, 148, 148)", backgroundcolor: "rgb(148, 148, 148)", marginTop: "15px" }} />

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
                <select
                  name="category"
                  required
                  style={{ border: "none", width: "90px" }}
                  onChange={(e) => setCategoryVal(e.target.value)}
                  value="Category"
                >
                  <option value="Category" selected disabled hidden>
                    Category
                  </option>
                  <option value="Brainteasers">Brainteasers</option>
                  <option value="Derivatives">Derivatives</option>
                  <option value="Finance">Finance</option>
                  <option value="Math">Math</option>
                  <option value="NonQuant">NonQuant</option>
                </select>

                <select
                  name="difficulty"
                  required
                  style={{ border: "none" }}
                  onChange={(e) => setDifficultyVal(e.target.value)}
                  value="Difficulty"
                >
                  <option value="Difficulty" selected disabled hidden>
                    Difficulty
                  </option>
                  <option value="medium">Medium</option>
                  <option value="easy">Easy</option>
                  <option value="hard">Hard</option>
                </select>

              </div>
            </div>
            {categoryVal && difficultyVal &&
              <div className="same-line-categ">
                <div className="category-class">

                  <ImCross size={15} className="crossed-khushi" onClick={() => handleCross("category")} color="white" />
                  {categoryVal}
                </div>
                <div className="category-class">

                  <ImCross size={15} className="crossed-khushi" onClick={() => handleCross("difficult")} color="white" />
                  {difficultyVal}
                </div>
              </div>
            }
            {categoryVal && !difficultyVal &&
              // <div className="same-line-categ">
              <div className="category-class">
                <ImCross size={15} className="crossed-khushi" onClick={() => handleCross("category")} color="white" />

                {categoryVal}
              </div>
              // </div>
            }
            {difficultyVal && !categoryVal && (
              <div className="same-line-categ">
                <div className="category-class">

                  <ImCross size={15} className="crossed-khushi" onClick={() => handleCross("difficult")} color="white" />
                  {difficultyVal}
                </div>
              </div>
            )}

            <div className="same-line-firm">
              {
                firmVal &&
                <div className="category-class">
                  <ImCross size={15} className="crossed-khushi" onClick={() => handleCross("firm")} color="white" />
                  {firmVal}
                </div>
              }
              {
                divisionVal &&
                <div className="category-class">
                  <ImCross size={15} className="crossed-khushi" onClick={() => handleCross("division")} color="white" />
                  {divisionVal}
                </div>
              }
              {
                positionVal &&
                <div className="category-class">
                  <ImCross size={15} className="crossed-khushi" onClick={() => handleCross("position")} color="white" />
                  {positionVal}
                </div>
              }{
                tagVal &&
                <div className="same-line-categ">
                  <div className="category-class">
                    <ImCross size={15} className="crossed-khushi" onClick={() => handleCross("tag")} color="white" />
                    {tagVal}
                  </div>
                </div>
              }
              {
                reset && <p>bhgughjbjhvygf</p>
              }
            </div>


            <hr style={{ height: "0.5px", borderwidth: "0", color: "rgb(148, 148, 148)", backgroundcolor: "rgb(148, 148, 148)", marginTop: "15px" }} />

            <div className="div3">
              {!difficultyVal && !categoryVal && !enableSearch && !firmVal.length > 0 && !divisionVal.length > 0 && !positionVal.length > 0 && !tagVal.length > 0 && (
                <DataTable
                  columns={user ? columnlogin : columnlogout}
                  data={data}
                  striped={true}
                  highlightOnHover={true}
                  responsive={true}
                  paginationPerPage={10}
                  pagination={true}
                  paginationDefaultPage={1}
                  paginationRowsPerPageOptions={[2, 5, 10, 20]}
                />
              )}
              {enableSearch &&
                categoryVal.length < 1 &&
                difficultyVal.length < 1 && (
                  <DataTable
                    columns={user ? columnlogin : columnlogout}
                    data={searched}
                    striped={true}
                    highlightOnHover={true}
                    responsive={true}
                    pagination={true}
                    paginationDefaultPage={1}
                    paginationPerPage={10}
                    paginationRowsPerPageOptions={[2, 5, 10, 20]}
                  />
                )}
              {(categoryVal.length > 0 || difficultyVal.length > 0) &&
                !enableSearch && (
                  <DataTable
                    columns={user ? columnlogin : columnlogout}
                    data={searched}
                    striped={true}
                    highlightOnHover={true}
                    responsive={true}
                    pagination={true}
                    paginationDefaultPage={1}
                    paginationPerPage={10}
                    paginationRowsPerPageOptions={[2, 5, 10, 20]}
                  />
                )}
              {(categoryVal.length > 0 || difficultyVal.length > 0) &&
                enableSearch && (
                  <DataTable
                    columns={user ? columnlogin : columnlogout}
                    data={selected}
                    striped={true}
                    highlightOnHover={true}
                    responsive={true}
                    pagination={true}
                    paginationDefaultPage={1}
                    paginationRowsPerPageOptions={[2, 5, 10, 20]}
                    paginationPerPage={10}
                  />
                )}
              {(firmVal.length > 0 || divisionVal.length > 0 || positionVal.length > 0 || tagVal.length > 0) &&
                <DataTable
                  columns={user ? columnlogin : columnlogout}
                  data={firmData}
                  striped={true}
                  highlightOnHover={true}
                  responsive={true}
                  pagination={true}
                  paginationDefaultPage={1}
                  paginationPerPage={10}
                  paginationRowsPerPageOptions={[2, 5, 10, 20]}
                />
              }
            </div>
          </div>

          <div className="quest-right-block">
            <div className="quest-progress-head">
              <img src={progressimg} alt="" />
              <div className="first-prog">Progress</div>
            </div>

            <div className="progress-chart">
              <Pie data={piedata} />
              <hr style={{ height: "1px", borderwidth: "0", color: "gray", backgroundcolor: "gray", marginTop: "15px" }} />
              <div className="prog-define">
                <div className="define-prog prog1 prog-text">
                  <p>Todo</p>
                  <p style={{ textAlign: "center" }}>{data && data.length}</p>
                </div>

                <div className="define-prog prog2 prog-text">
                  <p>Solved</p>
                  <p style={{ textAlign: "center" }}>{correct.length}</p>
                </div>

                <div className="define-prog prog3 prog-text">
                  <p>Attempted</p>
                  <p style={{ textAlign: "center" }}>{wrong.length}</p>
                </div>
              </div>
            </div>
            <div className="firms-block">
              <div className="firm-head">
                <GrNotes />
                <div className="myfirm">Firms</div>
              </div>

              <div className="main-firms">
                {firms.map((item) => (
                  <div className="all-firms" value={item} onClick={() => setFirmVal(item)}>
                    <div className="firm-item">{item}<span className="num-firm">56</span></div>
                  </div>
                ))}
              </div>
            </div>

            <div className="firms-block">
              <div className="firm-head">
                <FaUsers />
                <div className="myfirm">Divisions</div>
              </div>

              <div className="main-firms">
                {divisions.map((item) => (
                  <div className="all-firms" onClick={() => setDivisionVal(item)}>
                    <div className="firm-item">{item}<span className="num-firm">56</span></div>
                  </div>
                ))}
              </div>
            </div>

            <div className="firms-block">
              <div className="firm-head">
                <GrUserManager />
                <div className="myfirm">Positions</div>
              </div>

              <div className="main-firms">
                {positions.map((item) => (
                  <div className="all-firms" onClick={() => setPositionVal(item)}>
                    <div className="firm-item">{item}<span className="num-firm">56</span></div>
                  </div>
                ))}
              </div>
            </div>

            <div className="firms-block">
              <div className="firm-head">
                <FaTags />
                <div className="myfirm">Tags</div>
              </div>

              <div className="main-firms">
                {tags.map((item) => (
                  <div className="all-firms" onClick={() => setTagVal(item)}>
                    <div className="firm-item">{item}<span className="num-firm">56</span></div>
                  </div>
                ))}
              </div>
            </div>


          </div>
        </div>

      </div>

      <div className="mobile-view">
        <div className="quest-two">
          <div className="quest-block">
            {/* <div className="div1">
              <div className="first-left">
                <div className="solved">0/83 Solved</div>
                <div className="easy">Easy 0</div>
                <div className="mymedium">Medium 0</div>
                <div className="hard">Hard 0</div>
              </div>
              <div className="random-side">
                <Link
                  to="/quedetail"
                  state={{ id: random && data[random].uniqueId }}
                >
                  <button className="random">Random Q</button>
                </Link>
              </div>
            </div> */}

            {/* <hr style={{ height: "0.7px", borderwidth: "0", color: "rgb(148, 148, 148)", backgroundcolor: "rgb(148, 148, 148)", marginTop: "15px" }} /> */}

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
                <select
                  name="category"
                  required
                  style={{ border: "none", width: "86px" }}
                  onChange={(e) => setCategoryVal(e.target.value)}
                  value="Category"
                >
                  <option value="Category" selected disabled hidden>
                    Category
                  </option>
                  <option value="Brainteasers">Brainteasers</option>
                  <option value="Derivatives">Derivatives</option>
                  <option value="Finance">Finance</option>
                  <option value="Math">Math</option>
                  <option value="NonQuant">NonQuant</option>
                </select>

                <select
                  name="difficulty"
                  required
                  style={{ border: "none" }}
                  onChange={(e) => setDifficultyVal(e.target.value)}
                  value="Difficulty"
                >
                  <option value="Difficulty" selected disabled hidden>
                    Difficulty
                  </option>
                  <option value="medium">Medium</option>
                  <option value="easy">Easy</option>
                  <option value="hard">Hard</option>
                </select>

              </div>

              <div className="any">
                <select
                  name="category"
                  required
                  style={{ border: "none", width: "63px" }}
                  onChange={(e) => setCategoryVal(e.target.value)}
                  value="Category"
                >
                  <option value="Category" selected disabled hidden>
                    Firms
                  </option>
                  {firms.map((item) => (
                    <option value={item} onClick={() => setFirmVal(item)}>
                      <div className="firm-item">{item}<span className="num-firm">56</span></div>
                    </option>
                  ))}

                </select>

                <select
                  name="category"
                  required
                  style={{ border: "none", width: "90px" }}
                  onChange={(e) => setCategoryVal(e.target.value)}
                  value="Category"
                >
                  <option value="Category" selected disabled hidden>
                    Divisions
                  </option>
                  {divisions.map((item) => (
                    <option value={item} onClick={() => setDivisionVal(item)}>
                      <div className="firm-item">{item}<span className="num-firm">56</span></div>
                    </option>
                  ))}
                </select>

                <select
                  name="category"
                  required
                  style={{ border: "none", width: "90px" }}
                  onChange={(e) => setCategoryVal(e.target.value)}
                  value="Category"
                >
                  <option value="Category" selected disabled hidden>
                    Positions
                  </option>
                  {positions.map((item) => (
                    <option value={item} onClick={() => setPositionVal(item)}>
                      <div className="firm-item">{item}<span className="num-firm">56</span></div>
                    </option>
                  ))}
                </select>

                <select
                  name="category"
                  required
                  style={{ border: "none", width: "56px" }}
                  onChange={(e) => setCategoryVal(e.target.value)}
                  value="Category"
                >
                  <option value="Category" selected disabled hidden>
                    Tags
                  </option>
                  {tags.map((item) => (
                    <option value={item} onClick={() => setTagVal(item)}>
                      <div className="firm-item">{item}<span className="num-firm">56</span></div>
                    </option>
                  ))}
                </select>

              </div>


            </div>

            {categoryVal && difficultyVal &&
              <div className="same-line-categ">
                <div className="category-class">

                  <ImCross size={15} className="crossed-khushi" onClick={() => handleCross("category")} color="white" />
                  {categoryVal}
                </div>
                <div className="category-class">

                  <ImCross size={15} className="crossed-khushi" onClick={() => handleCross("difficult")} color="white" />
                  {difficultyVal}
                </div>
              </div>
            }
            {categoryVal && !difficultyVal &&
              <div className="same-line-categ">
                <div className="category-class">
                  <ImCross size={15} className="crossed-khushi" onClick={() => handleCross("category")} color="white" />

                  {categoryVal}
                </div>
              </div>
            }
            {difficultyVal && !categoryVal && (
              <div className="same-line-categ">
                <div className="category-class">

                  <ImCross size={15} className="crossed-khushi" onClick={() => handleCross("difficult")} color="white" />
                  {difficultyVal}
                </div>
              </div>
            )}

            <div className="same-line-firm">
              {
                firmVal &&
                <div className="category-class">
                  <ImCross size={15} className="crossed-khushi" onClick={() => handleCross("firm")} color="white" />
                  {firmVal}
                </div>
              }
              {
                divisionVal &&
                <div className="category-class">
                  <ImCross size={15} className="crossed-khushi" onClick={() => handleCross("division")} color="white" />
                  {divisionVal}
                </div>
              }
              {
                positionVal &&
                <div className="category-class">
                  <ImCross size={15} className="crossed-khushi" onClick={() => handleCross("position")} color="white" />
                  {positionVal}
                </div>
              }{
                tagVal &&
                <div className="category-class">
                  <ImCross size={15} className="crossed-khushi" onClick={() => handleCross("tag")} color="white" />
                  {tagVal}
                </div>
              }
              {
                reset && <p>hvgfdtfcbvvhghg</p>
              }
            </div>


            <hr style={{ height: "0.5px", borderwidth: "0", color: "rgb(148, 148, 148)", backgroundcolor: "rgb(148, 148, 148)", marginTop: "15px" }} />

            <div className="div3">
              {!difficultyVal && !categoryVal && !enableSearch && !firmVal.length > 0 && !divisionVal.length > 0 && !positionVal.length > 0 && !tagVal.length > 0 && (
                <DataTable
                  columns={user ? columnmobile : columnmobile}
                  data={tableData}
                  striped={true}
                  highlightOnHover={true}
                  pagination={true}
                  paginationDefaultPage={1}
                  paginationPerPage={10}
                />
              )}
              {/* {enableSearch &&
                categoryVal.length < 1 &&
                difficultyVal.length < 1 && (
                  <DataTable
                    columns={user ? columnlogin : columnlogout}
                    data={searched}
                    striped={true}
                    highlightOnHover={true}
                    responsive={true}
                    pagination={true}
                    paginationDefaultPage={1}
                    paginationPerPage={10}
                  />
                )} */}
              {/* {(categoryVal.length > 0 || difficultyVal.length > 0) &&
                !enableSearch && (
                  <DataTable
                    columns={user ? columnlogin : columnlogout}
                    data={searched}
                    striped={true}
                    highlightOnHover={true}
                    responsive={true}
                    pagination={true}
                    paginationDefaultPage={1}
                    paginationPerPage={10}
                  />
                )} */}
              {/* {(categoryVal.length > 0 || difficultyVal.length > 0) &&
                enableSearch && (
                  <DataTable
                    columns={user ? columnlogin : columnlogout}
                    data={selected}
                    striped={true}
                    highlightOnHover={true}
                    responsive={true}
                    pagination={true}
                    paginationDefaultPage={1}
                    paginationPerPage={10}
                  />
                )} */}
              {/* {(firmVal.length > 0 || divisionVal.length > 0 || positionVal.length > 0 || tagVal.length > 0) &&
                <DataTable
                  columns={user ? columnlogin : columnlogout}
                  data={firmData}
                  striped={true}
                  highlightOnHover={true}
                  responsive={true}
                  pagination={true}
                  paginationDefaultPage={1}
                  paginationPerPage={10}
                />
              } */}
            </div>
          </div>

          <div className="quest-right-block">
            <div className="quest-progress-head">
              <img src={progressimg} alt="" />
              <div className="first-prog">Progress</div>
            </div>

            <div className="progress-chart">
              <Pie data={piedata} />
              <hr style={{ height: "1px", borderwidth: "0", color: "gray", backgroundcolor: "gray", marginTop: "15px" }} />
              <div className="prog-define">
                <div className="define-prog prog1 prog-text">
                  <p>Todo</p>
                  <p style={{ textAlign: "center" }}>{data && data.length}</p>
                </div>

                <div className="define-prog prog2 prog-text">
                  <p>Solved</p>
                  <p style={{ textAlign: "center" }}>{correct.length}</p>
                </div>

                <div className="define-prog prog3 prog-text">
                  <p>Attempted</p>
                  <p style={{ textAlign: "center" }}>{wrong.length}</p>
                </div>
              </div>
            </div>
            <div className="firms-block">
              <div className="firm-head">
                <GrNotes />
                <div className="myfirm">Firms</div>
              </div>

              <div className="main-firms">
                {firms.map((item) => (
                  <div className="all-firms" value={item} onClick={() => setFirmVal(item)}>
                    <div className="firm-item">{item}<span className="num-firm">56</span></div>
                  </div>
                ))}
              </div>
            </div>

            <div className="firms-block">
              <div className="firm-head">
                <FaUsers />
                <div className="myfirm">Divisions</div>
              </div>

              <div className="main-firms">
                {divisions.map((item) => (
                  <div className="all-firms" onClick={() => setDivisionVal(item)}>
                    <div className="firm-item">{item}<span className="num-firm">56</span></div>
                  </div>
                ))}
              </div>
            </div>

            <div className="firms-block">
              <div className="firm-head">
                <GrUserManager />
                <div className="myfirm">Positions</div>
              </div>

              <div className="main-firms">
                {positions.map((item) => (
                  <div className="all-firms" onClick={() => setPositionVal(item)}>
                    <div className="firm-item">{item}<span className="num-firm">56</span></div>
                  </div>
                ))}
              </div>
            </div>

            <div className="firms-block">
              <div className="firm-head">
                <FaTags />
                <div className="myfirm">Tags</div>
              </div>

              <div className="main-firms">
                {tags.map((item) => (
                  <div className="all-firms" onClick={() => setTagVal(item)}>
                    <div className="firm-item">{item}<span className="num-firm">56</span></div>
                  </div>
                ))}
              </div>
            </div>


          </div>
        </div>

      </div>
    </>
  );
}

export default Questions;
