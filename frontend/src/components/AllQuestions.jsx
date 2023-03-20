import React, { useEffect, useState } from "react";
import { FiLogOut } from "react-icons/fi";
import { FaList } from "react-icons/fa";
import { FaUserCircle } from "react-icons/fa";
import { MdLibraryAdd } from "react-icons/md";
import { Link } from "react-router-dom";
import { FiEdit } from "react-icons/fi";
import { MdDelete } from "react-icons/md";
import "./AllQuestions.css";

function AllQuestions() {
  const [css, setCss] = useState(true);
  const [mydata, setData] = useState([]);
  const [open, setOpen] = useState(false);
  const [id, setId] = useState("");
  const [edit, setEdit] = useState(false);
  const [title, setTitle] = useState("");
  const [ques, setQues] = useState("");
  const [category, setCategory] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [ansType, setAnsType] = useState("");
  const [answer, setAnswer] = useState("");
  const [firms, setFirms] = useState("");
  const [position, setPosition] = useState("");
  const [division, setDivision] = useState("");
  const [tags, setTags] = useState("");
  const [option1, setOption1] = useState("");

  const handleLogout = () => {
    localStorage.setItem("quantuser", null);
    window.location.href = "/";
  };

  const handleAdd = () => {
    setCss(false);
  };

  const url = "http://localhost:8000/question";

  useEffect(() => {
    fetchQuestions();
  }, []);

  const fetchQuestions = async () => {
    const data = await fetch(`${url}/getallquestions`);
    const res = await data.json();
    console.log(res, "ressss");
    setData(res);
    console.log(mydata);
  };

  const setClicked = (id) => {
    setOpen(true);
    setId(id);
    setEdit(true);
    console.log(id);
  };

  const setCancel=()=>{
    setOpen(false);
    setEdit(false);
  }

  let ttl=mydata.title;
  console.log(ttl);
  
  return (
    <div>
      <div className="dash">
        <div className="dash-left">
          <div className="dash-head">Admin Panel</div>
          <div className="side-que">
            <Link to="/dashboard" className="add-que" onClick={handleAdd}>
              <MdLibraryAdd className="icon-side" />
              Add Questions
            </Link>

            <div className={css ? "add-que-hover" : "add-que"}>
              <FaList className="icon-side" />
              All Questions
            </div>

            <div className="add-que" onClick={handleLogout}>
              <FiLogOut className="icon-side" />
              Logout
            </div>
          </div>
        </div>

        <div className="dash-right">
          <div className="ad-nav">
            <div className="admin-name">
              Khushi Agrawal
              <FaUserCircle className="" size="25" />
            </div>
          </div>

          <div className="admin-func">
            <div className="disp-all-ques">
              {mydata.map((data, index) => (
                
                <div>
                <div className={edit && index===id ? "all-edit-drop":"all-ques-drop" }>
                  <div>
                    <div className="ques1-drop">
                      {edit && index===id ? (
                        <div className="ques-d">
                          <span className="span-tag">Title:</span>
                        
                          <textarea
                            className="quest1"
                            type="text"
                            // value={data.title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder={data.title}
                          />
                        </div>
                      ) : (
                        <div>{data.title}</div>
                      )}

                      <div className="additionals">
                        <FiEdit
                          onClick={() => setClicked(index)}
                          size="20"
                          className=""
                        />
                        <MdDelete size="20" />
                      </div>
                    </div>
                  </div>
                  {open && index === id && (
                    <div>
                      {data.answerType === "Text" ? (
                        <div>
                          <div className="detail-ques">
                            <div>
                              <span className="span-tag span-ques">
                                Question:
                              </span>
                              <textarea
                                className="quest1"
                                type="text"
                                value={ques}
                                onChange={(e) => setQues(e.target.value)}
                                placeholder={data.question}
                              />{" "}
                            </div>
                            <div>
                              <span className="span-tag">Category:</span>
                              <input
                                type="text"
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                                placeholder={data.category}
                              />{" "}
                            </div>
                            <div>
                              <span className="span-tag">Difficulty:</span>
                              <input
                                type="text"
                                value={difficulty}
                                onChange={(e) => setDifficulty(e.target.value)}
                                placeholder={data.difficulty}
                              />{" "}
                            </div>
                            <div>
                              <span className="span-tag">Answer Type:</span>
                              <input
                                type="text"
                                value={ansType}
                                onChange={(e) => setAnsType(e.target.value)}
                                placeholder={data.answerType}
                              />{" "}
                            </div>
                            <div>
                              <span className="span-tag">Answer:</span>
                              <input
                                type="text"
                                value={answer}
                                onChange={(e) => setAnswer(e.target.value)}
                                placeholder={data.answer}
                              />{" "}
                            </div>
                            <div>
                              <span className="span-tag">Firms:</span>
                              <input
                                type="text"
                                value={firms}
                                onChange={(e) => setFirms(e.target.value)}
                                placeholder={data.firms}
                              />{" "}
                            </div>
                            <div>
                              <span className="span-tag">Division:</span>
                              <input
                                type="text"
                                value={division}
                                onChange={(e) => setDivision(e.target.value)}
                                placeholder={data.divisions}
                              />
                            </div>
                            <div>
                              <span className="span-tag">Position:</span>
                              <input
                                type="text"
                                value={position}
                                onChange={(e) => setPosition(e.target.value)}
                                placeholder={data.position}
                              />{" "}
                            </div>
                            <div>
                              <span className="span-tag">Tags:</span>
                              <input
                                type="text"
                                value={tags}
                                onChange={(e) => setTags(e.target.value)}
                                placeholder={data.tags}
                              />{" "}
                            </div>
                            <div className="add-ons">
                            <button className="add-btn-save">Save</button>
                            <button
                              className="add-btn-save"
                              onClick={setCancel}
                            >
                              Cancel
                            </button>
                          </div>
                          </div>
                          
                        </div>
                      ) : (
                        <div>
                          <div className="detail-ques">
                            <div>
                              <span className="span-tag span-ques">
                                Question:
                              </span>
                              <textarea
                                className="quest1"
                                type="text"
                                value={ques}
                                onChange={(e) => setQues(e.target.value)}
                                placeholder={data.question}
                              />{" "}
                            </div>
                            <div>
                              <span className="span-tag">Category:</span>
                              <input
                                type="text"
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                                placeholder={data.category}
                              />{" "}
                            </div>
                            <div>
                              <span className="span-tag">Difficulty:</span>
                              <input
                                type="text"
                                value={difficulty}
                                onChange={(e) => setDifficulty(e.target.value)}
                                placeholder={data.difficulty}
                              />{" "}
                            </div>
                            <div>
                              <span className="span-tag">Answer Type:</span>
                              <input
                                type="text"
                                value={ansType}
                                onChange={(e) => setAnsType(e.target.value)}
                                placeholder={data.answerType}
                              />{" "}
                            </div>

                            {data.options.map((data, index) => (
                              <div>
                                <span className="span-tag">Option{index}:</span>
                                <input
                                  type="text"
                                  value={data}
                                  onChange={(e) => setOption1(e.target.value)}
                                  placeholder={data}
                                />{" "}
                              </div>
                            ))}
                            <div>
                              <span className="span-tag">Answer:</span>
                              <input
                                type="text"
                                value={answer}
                                onChange={(e) => setAnswer(e.target.value)}
                                placeholder={data.answer}
                              />{" "}
                            </div>
                            <div>
                              <span className="span-tag">Firms:</span>
                              <input
                                type="text"
                                value={firms}
                                onChange={(e) => setFirms(e.target.value)}
                                placeholder={data.firms}
                              />{" "}
                            </div>
                            <div>
                              <span className="span-tag">Division:</span>
                              <input
                                type="text"
                                value={division}
                                onChange={(e) => setDivision(e.target.value)}
                                placeholder={data.divisions}
                              />
                            </div>
                            <div>
                              <span className="span-tag">Position:</span>
                              <input
                                type="text"
                                value={position}
                                onChange={(e) => setPosition(e.target.value)}
                                placeholder={data.position}
                              />{" "}
                            </div>
                            <div>
                              <span className="span-tag">Tags:</span>
                              <input
                                type="text"
                                value={tags}
                                onChange={(e) => setTags(e.target.value)}
                                placeholder={data.tags}
                              />{" "}
                            </div>
                          </div>
                          <div className="add-ons">
                            <button className="add-btn-save">Save</button>
                            <button
                              className="add-btn-save"
                              onClick={setCancel}
                            >
                              Cancel
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
                {/* <hr style={{ height: "0.7px", borderwidth: "0", color: " rgb(163, 163, 163)", backgroundcolor: " rgb(163, 163, 163)", marginTop: "" }} /> */}
                </div>              
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AllQuestions;
