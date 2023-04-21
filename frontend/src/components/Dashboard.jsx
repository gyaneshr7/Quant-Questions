import React, { useEffect, useState } from "react";
import "./Dashboard.css";
import { FiLogOut } from "react-icons/fi";
import { IoMdAddCircle } from "react-icons/io";
import { IoIosRemoveCircle } from "react-icons/io";
import { FaList } from "react-icons/fa";
import { FaUserCircle } from "react-icons/fa";
import { MdLibraryAdd } from "react-icons/md";
import { ChromePicker } from "react-color";
import { Link, useLocation } from "react-router-dom";
import Multiselect from 'multiselect-react-dropdown';
import { CategoryScale } from "chart.js";
import ModalResource from "./ModalResource";

function Dashboard() {
  const [color, setColor] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const [title, setTitle] = useState("");
  const [question, setQuestion] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [category, setCategory] = useState("");
  const [anstype, setAnsType] = useState("");
  const [opt1, setOpt1] = useState("");
  const [opt2, setOpt2] = useState("");
  const [opt3, setOpt3] = useState("");
  const [opt4, setOpt4] = useState("");
  const [answer, setAnswer] = useState([]);
  const [allCategories, setallCategories] = useState();

  const [firms, setFirms] = useState([]);
  const [divisions, setDivisions] = useState([]);
  const [positions, setPositions] = useState([]);
  const [tags, setTags] = useState([]);
  const [categories, setCategories] = useState([]);
  const [answerTypes, setAnswerTypes] = useState([]);

  const [firmEdit, setFirmEdit] = useState(false);
  const [divisionEdit, setDivisionEdit] = useState(false);
  const [positionEdit, setPositionEdit] = useState(false);
  const [tagEdit, setTagEdit] = useState(false);
  const [answerTypeEdit, setAnswerTypeEdit] = useState(false);
  const [categoryEdit, setCategoryEdit] = useState(false);

  const [firmVal, setFirmVal] = useState();
  const [divisionVal, setDivisionVal] = useState();
  const [positionVal, setPositionVal] = useState();
  const [tagVal, setTagVal] = useState();
  const [answerTypeVal, setAnswerTypeVal] = useState();
  const [categoryVal, setCategoryVal] = useState();
  const [explanation, setExplanation] = useState();

  const [firmsArray, setFirmsArray] = useState();
  const [divisionsArray, setDivisionsArray] = useState();
  const [positionsArray, setPositionsArray] = useState();
  const [tagsArray, setTagsArray] = useState();
  const [css, setCss] = useState(true);
  const [loading, setLoading] = useState(false);
  const [loginModalShow, setLoginModalShow] = useState(false);

  let firmNames = [],
    divisionNames = [],
    positionNames = [],
    tagNames = [],
    categoryNames = [],
    answerTypeNames = [];
  firms.length > 0 &&
    firms.map((data) => {
      firmNames.push(data.name);
    });
  divisions &&
    divisions.map((data) => {
      divisionNames.push(data.name);
    });
  positions &&
    positions.map((data) => {
      positionNames.push(data.name);
    });
  tags &&
    tags.map((data) => {
      tagNames.push(data.name);
    });
  categories &&
    categories.map((data) => {
      categoryNames.push(data.name);
    });
  answerTypes &&
    answerTypes.map((data) => {
      answerTypeNames.push(data.name);
    });

  window.history.pushState(null, null, location.href);
  window.onpopstate = function (event) {
    window.history.go(1);
  };

  // add questions to db
  const submitHandler = async () => {
    let val = '';
    const questions = await fetch(`http:///localhost:8000/question/getallquestions`);
    const quesres = await questions.json();
    // console.log(quesres.length, "length");
    if (title != '' && question != '' && answer != '' && difficulty != '' && category != '' && anstype != '' && firms != '' && divisions != '' && positions != '' && tags !== '') {
      if (anstype === 'Mcq') {
        val = {
          uniqueId: quesres.length + 1,
          title: title,
          question: question,
          answer: answer,
          difficulty: difficulty,
          category: category,
          answerType: anstype,
          options: [opt1, opt2, opt3, opt4],
          firms: firmsArray,
          divisions: divisionsArray,
          position: positionsArray,
          tags: tagsArray,
          explanation: explanation
        };
      } else {
        val = {
          uniqueId: quesres.length + 1,
          title: title,
          question: question,
          answer: answer,
          difficulty: difficulty,
          category: category,
          answerType: anstype,
          firms: firmsArray,
          divisions: divisionsArray,
          position: positionsArray,
          tags: tagsArray,
          explanation: explanation
        };
      }
      // console.log(val);

      // make post request for saving question in database
      await fetch("http://localhost:8000/question/add", {
        method: "POST",
        body: JSON.stringify(val),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }).then(() => alert("question added Successfully"))
        .then(() => {
          setAnsType("");
          setAnswer("");
          setTitle("");
          setQuestion("");
          setCategory("");
          setDifficulty("");
          setExplanation("");
        })
        .catch((err)=>{
          alert(err)
        });
      // const res = await data.json();
      // console.log(res);

    } else {
      alert("Enter value in all fields...")
    }

    const dataa = await fetch("http://localhost:8000/category/getcategories");
    const resp = await dataa.json();
    let firmscount = [],
      divisionscount = [],
      positionscount = [],
      tagscount = [];
    resp.firms.map((data) => {
      if (firmsArray.includes(data.name)) {
        let val = {
          name: data.name,
          count: data.count + 1,
        };
        firmscount.push(val);
      }
    });
    resp.divisions.map((data) => {
      if (divisionsArray.includes(data.name)) {
        let val = {
          name: data.name,
          count: data.count + 1,
        };
        divisionscount.push(val);
      }
    });
    resp.positions.map((data) => {
      if (positionsArray.includes(data.name)) {
        let val = {
          name: data.name,
          count: data.count + 1,
        };
        positionscount.push(val);
      }
    });
    resp.tags.map((data) => {
      if (tagsArray.includes(data.name)) {
        // console.log(data);
        let val = {
          name: data.name,
          count: data.count + 1,
        };
        tagscount.push(val);
      }
    });
    // console.log(firmscount,divisionscount,tagscount,positionscount);
    const value = {
      firmscount,
      divisionscount,
      tagscount,
      positionscount,
    };
    // console.log(value);
    const data = await fetch(
      "http://localhost:8000/category/updatecategory/firms",
      {
        method: "PUT",
        body: JSON.stringify(value),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }
    );
    const res = await data.json();
    window.location.href = '/dashboard'
  };

  useEffect(() => {
    const fetchcategories = async () => {
      const data = await fetch("http://localhost:8000/category/getcategories");
      const res = await data.json();
      setallCategories(res);
      setFirms(res.firms);
      setDivisions(res.divisions);
      setPositions(res.positions);
      setTags(res.tags);
      setCategories(res.category);
      setAnswerTypes(res.answerType);
    };
    fetchcategories();
    setLoading(false)
  }, [firmEdit, divisionEdit, positionEdit, tagEdit, loading]);

  const selectedFirms = (name) => {
    setFirmsArray(name);
  };
  const selectedDivisions = (name) => {
    setDivisionsArray(name);
  };
  const selectedPositions = (name) => {
    setPositionsArray(name);
  };
  const selectedTags = (name) => {
    setTagsArray(name);
  };

  const handleLogout = () => {
    localStorage.setItem("quantuser", null);
    window.location.href = "/";
    setCss(true);
  };

  const handleQues = () => {
    // window.location.href = "/all-ques";
    setCss(false);
  };

  // send data to backend
  const addcategory = async (name, val) => {
    // console.log(name, val);
    const data = await fetch(
      `http://localhost:8000/category/addcategory/${name}`,
      {
        method: "PUT",
        body: JSON.stringify(val),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }
    );
    const res = await data.json();
    // console.log(res);
    setLoading(true);
  };

  const submitCategory = async (name) => {
    let val;
    if (name == "firms") {
      if (firmVal) {
        val = {
          value: firmVal,
        };
        addcategory(name, val);
        setFirmEdit(false);
        setFirmVal("");
      }
    } else if (name == "divisions") {
      if (divisionVal) {
        val = {
          value: divisionVal,
        };
        addcategory(name, val);
        setDivisionEdit(false);
        setDivisionVal("");
      }
    } else if (name == "positions") {
      if (positionVal) {
        val = {
          value: positionVal,
        };
        addcategory(name, val);
        setPositionEdit(false);
        setPositionVal("");
      }
    } else if (name == "tags") {
      if (tagVal) {
        val = {
          value: tagVal,
        };
        addcategory(name, val);
        setTagEdit(false);
        setTagVal("");
      }
    } else if (name == "category") {
      if (categoryVal) {
        // console.log(name, categoryVal, color);
        val = {
          value: categoryVal,
          color: color
        }
        addcategory(name, val)
        setCategoryEdit(false);
        setCategoryVal("");
        setIsOpen(false);
        setColor('');
      }
    } else if (name == "answerType") {
      if (answerTypeVal) {
        val = {
          value: answerTypeVal,
        };
        addcategory(name, val);
        setAnswerTypeEdit(false);
        setAnswerTypeVal("");
      }
    }
  };

  return (
    <div>
      <div className="dash">

        {/* admin sidebar */}
        <div className="dash-left">
          <div className="dash-head">Admin Panel</div>
          <div className="side-que">

            <div style={{ display: "flex", flexDirection: "column", gap: "13px" }}>
              <div className={css ? "add-que-hover" : "add-que"}>
                <MdLibraryAdd className="icon-side" />
                Add Questions
              </div>

              <Link to="/all-ques" className="add-que" onClick={handleQues}>
                <FaList className="icon-side" />
                All Questions
              </Link>

              <div onClick={() => { setLoginModalShow(true); setCss(false); }} className={css ? "add-que" : "add-que-hover"}>
                <MdLibraryAdd className="icon-side" />
                Add Resources
              </div>
            </div>

            <ModalResource show={loginModalShow} close={() => { setLoginModalShow(false); setCss(true) }} />

            <div style={{ paddingLeft: "25px" }}>
              <div className="add-que" onClick={handleLogout}>
                <FiLogOut className="icon-side" />
                Logout
              </div>
            </div>

          </div>
        </div>

{/* admin nav */}
        <div className="dash-right">
          <div className="ad-nav">
            <div className="admin-name">
              Khushi Agrawal
              <FaUserCircle className="" size="25" />
            </div>
          </div>
          <div className="admin-func">
            <div className="dash-disp1">
              <div className="first-row">
                <div className="title">
                  <label className="disp-title">Category</label>
                  <div className="categ-edit">
                    {!categoryEdit && (
                      <select
                        name="category"
                        className="opt-font"
                        style={{
                          width: "194px",
                          padding: "5px",
                          borderRadius: "5px",
                          border: "1px solid rgb(199, 198, 198)",
                        }}
                        required
                        onChange={(e) => setCategory(e.target.value)}
                      >
                        <option value="Category" selected disabled hidden>
                          Category
                        </option>
                        {categoryNames.length > 0 &&
                          categoryNames.map((category, i) => (
                            <option key={i} value={category}>{category}</option>
                          ))}
                      </select>
                    )}
                    {categoryEdit && (
                      <input
                        type="text"
                        className="quest-input"
                        placeholder="Add Category"
                        onChange={(e) => setCategoryVal(e.target.value)}
                      />
                    )}
                    {!categoryEdit && (
                      <IoMdAddCircle
                        className="add-icon-img"
                        size="25"
                        onClick={() => {
                          setCategoryEdit(true);
                        }}
                      />
                    )}
                    {categoryEdit && (
                      <button
                        className="add"
                        onClick={() => submitCategory("category")}
                      >
                        Add
                      </button>
                    )}

                    {categoryEdit && <button className="add" onClick={() => setIsOpen(!isOpen)}>
                      Choose Color
                    </button>}
                    {isOpen && (
                      <div style={{ height: "50px", width: "50px", zIndex: 999 }}>
                        <ChromePicker
                          color={color}
                          onChange={(updatedColor) => setColor(updatedColor.hex)}
                        />
                      </div>
                    )}
                    {categoryEdit && color.length > 0 && <div style={{ backgroundColor: color, width: "30px", height: "30px", borderRadius: "5px" }}></div>}

                    {categoryEdit && (
                      <IoIosRemoveCircle
                        className="cross-icon-img"
                        size="25"
                        onClick={() => {
                          setCategoryEdit(false); setIsOpen(false)
                        }}
                      />
                    )}
                  </div>
                </div>

                <div className="title">
                  <label className="disp-title">Difficulty</label>
                  <div className="categ-edit">
                    <select
                      name="difficulty"
                      className="opt-font"
                      style={{
                        width: "194px",
                        padding: "5px",
                        borderRadius: "5px",
                        border: "1px solid rgb(199, 198, 198)",
                      }}
                      required
                      onChange={(e) => setDifficulty(e.target.value)}
                    >
                      <option value="Category" selected disabled hidden>
                        Difficulty
                      </option>
                      <option value="medium">Medium</option>
                      <option value="easy">Easy</option>
                      <option value="hard">Hard</option>
                    </select>
                  </div>
                </div>

                <div className="title">
                  <label className="disp-title">Answer Type</label>
                  <div className="categ-edit">
                    {!answerTypeEdit && (
                      <select
                        name="anstype"
                        className="opt-font"
                        style={{
                          width: "194px",
                          padding: "5px",
                          borderRadius: "5px",
                          border: "1px solid rgb(199, 198, 198)",
                        }}
                        required
                        onChange={(e) => setAnsType(e.target.value)}
                      >
                        <option value="none" selected disabled hidden>
                          Answer Type
                        </option>
                        {answerTypeNames.length > 0 &&
                          answerTypeNames.map((ans, i) => (
                            <option key={i} value={ans}>{ans}</option>
                          ))}
                      </select>
                    )}
                    {answerTypeEdit && (
                      <input
                        type="text"
                        className="quest-input"
                        placeholder="Add Answer Type"
                        onChange={(e) => setAnswerTypeVal(e.target.value)}
                      />
                    )}
                    {!answerTypeEdit && (
                      <IoMdAddCircle
                        className="add-icon-img"
                        size="25"
                        onClick={() => {
                          setAnswerTypeEdit(true);
                        }}
                      />
                    )}
                    {answerTypeEdit && (
                      <button
                        className="add"
                        onClick={() => submitCategory("answerType")}
                      >
                        Add
                      </button>
                    )}
                    {answerTypeEdit && (
                      <IoIosRemoveCircle
                        className="cross-icon-img"
                        size="25"
                        onClick={() => {
                          setAnswerTypeEdit(false);
                        }}
                      />
                    )}
                  </div>
                </div>
              </div>

              <div className="second-row">
                <div className="title">
                  <label className="disp-title">Firms</label>
                  <div className="wrapper">
                    <div className="d-flex flex-row align-items-center mb-2 multi-placeholder">
                      {!firmEdit && (
                        <div className="form-outline flex-fill mb-0">
                          <Multiselect
                            placeholder="Firms"
                            displayValue=""
                            isObject={false}
                            onKeyPressFn={function noRefCheck() { }}
                            onRemove={function noRefCheck() { }}
                            onSearch={function noRefCheck() { }}
                            onSelect={selectedFirms}
                            options={firmNames}
                            selectedValues={{}}
                          />
                        </div>
                      )}
                      {firmEdit && (
                        <input
                          type="text"
                          className="quest-input"
                          placeholder="Add Firm"
                          onChange={(e) => setFirmVal(e.target.value)}
                        />
                      )}
                    </div>
                    {!firmEdit && (
                      <IoMdAddCircle
                        className="add-firm-img"
                        size="25"
                        onClick={() => {
                          setFirmEdit(true);
                        }}
                      />
                    )}
                    {firmEdit && (
                      <button
                        className="add"
                        onClick={() => submitCategory("firms")}
                      >
                        Add
                      </button>
                    )}
                    {firmEdit && (
                      <IoIosRemoveCircle
                        className="cross-icon-img"
                        size="25"
                        onClick={() => {
                          setFirmEdit(false);
                        }}
                      />
                    )}
                  </div>
                </div>

                <div className="title">
                  <label className="disp-title">Divisions</label>
                  <div className="wrapper">
                    <div className="d-flex flex-row align-items-center mb-2 multi-placeholder">
                      {!divisionEdit && (
                        <div className="form-outline flex-fill mb-0">
                          <Multiselect
                            placeholder="Divisions"
                            displayValue=""
                            isObject={false}
                            onKeyPressFn={function noRefCheck() { }}
                            onRemove={function noRefCheck() { }}
                            onSearch={function noRefCheck() { }}
                            onSelect={selectedDivisions}
                            options={divisionNames}
                            selectedValues={{}}
                          />
                        </div>
                      )}
                      {divisionEdit && (
                        <input
                          type="text"
                          className="quest-input"
                          placeholder="Add Division"
                          onChange={(e) => setDivisionVal(e.target.value)}
                        />
                      )}
                    </div>
                    {!divisionEdit && (
                      <IoMdAddCircle
                        className="add-firm-img"
                        size="25"
                        onClick={() => {
                          setDivisionEdit(true);
                        }}
                      />
                    )}
                    {divisionEdit && (
                      <button
                        className="add"
                        onClick={() => submitCategory("divisions")}
                      >
                        Add
                      </button>
                    )}
                    {divisionEdit && (
                      <IoIosRemoveCircle
                        className="cross-icon-img"
                        size="25"
                        onClick={() => {
                          setDivisionEdit(false);
                        }}
                      />
                    )}
                  </div>
                </div>

                <div className="title">
                  <label className="disp-title">Positions</label>
                  <div className="wrapper">
                    <div className="d-flex flex-row align-items-center mb-2 multi-placeholder">
                      {!positionEdit && (
                        <div className="form-outline flex-fill mb-0">
                          <Multiselect
                            placeholder="Position"
                            displayValue=""
                            isObject={false}
                            onKeyPressFn={function noRefCheck() { }}
                            onRemove={function noRefCheck() { }}
                            onSearch={function noRefCheck() { }}
                            onSelect={selectedPositions}
                            options={positionNames}
                            selectedValues={{}}
                          />
                        </div>
                      )}
                      {positionEdit && (
                        <input
                          type="text"
                          className="quest-input"
                          placeholder="Add Position"
                          onChange={(e) => setPositionVal(e.target.value)}
                        />
                      )}
                    </div>
                    {!positionEdit && (
                      <IoMdAddCircle
                        className="add-firm-img"
                        size="25"
                        onClick={() => {
                          setPositionEdit(true);
                        }}
                      />
                    )}
                    {positionEdit && (
                      <button
                        className="add"
                        onClick={() => submitCategory("positions")}
                      >
                        Add
                      </button>
                    )}
                    {positionEdit && (
                      <IoIosRemoveCircle
                        className="cross-icon-img"
                        size="25"
                        onClick={() => {
                          setPositionEdit(false);
                        }}
                      />
                    )}
                  </div>
                </div>

                <div className="title">
                  <label className="disp-title">Tags</label>
                  <div className="wrapper">
                    <div className="d-flex flex-row align-items-center mb-2 multi-placeholder">
                      {!tagEdit && (
                        <div className="form-outline flex-fill mb-0">
                          <Multiselect
                            placeholder="Tags"
                            displayValue=""
                            isObject={false}
                            onKeyPressFn={function noRefCheck() { }}
                            onRemove={function noRefCheck() { }}
                            onSearch={function noRefCheck() { }}
                            onSelect={selectedTags}
                            options={tagNames}
                            selectedValues={{}}
                          />
                        </div>
                      )}
                      {tagEdit && (
                        <input
                          type="text"
                          className="quest-input"
                          placeholder="Add Tag"
                          onChange={(e) => setTagVal(e.target.value)}
                        />
                      )}
                    </div>
                    {!tagEdit && (
                      <IoMdAddCircle
                        className="add-firm-img"
                        size="25"
                        onClick={() => {
                          setTagEdit(true);
                        }}
                      />
                    )}
                    {tagEdit && (
                      <button
                        className="add"
                        onClick={() => submitCategory("tags")}
                      >
                        Add
                      </button>
                    )}
                    {tagEdit && (
                      <IoIosRemoveCircle
                        className="cross-icon-img"
                        size="25"
                        onClick={() => {
                          setTagEdit(false);
                        }}
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="quest-row">
              <div className="title">
                <label className="disp-title">Question Title</label>
                <input
                  className="quest-input"
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Add Title..."
                />
              </div>

              <div className="title">
                <label className="disp-title">Add Question</label>
                <textarea
                  className="quest-input"
                  type="text"
                  placeholder="Enter Question"
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                />
              </div>

              {/* <div className="que"> */}
              {anstype === "Text" && (
                <div className="title">
                  <label className="disp-title">Answer</label>
                  <textarea
                    type="text"
                    className="quest-input"
                    placeholder="Enter Answer"
                    value={answer}
                    onChange={(e) => setAnswer(e.target.value)}
                  />
                </div>
              )}

              {anstype === "Mcq" && (
                <div className="radio-type">
                  <label className="disp-title">Answer</label>
                  <input
                    type="text"
                    className="quest-input"
                    placeholder="Option1"
                    value={opt1}
                    onChange={(e) => setOpt1(e.target.value)}
                  />

                  <input
                    type="text"
                    className="quest-input"
                    placeholder="Option2"
                    value={opt2}
                    onChange={(e) => setOpt2(e.target.value)}
                  />

                  <input
                    type="text"
                    className="quest-input"
                    placeholder="Option3"
                    value={opt3}
                    onChange={(e) => setOpt3(e.target.value)}
                  />

                  <input
                    type="text"
                    className="quest-input"
                    placeholder="Option4"
                    value={opt4}
                    onChange={(e) => setOpt4(e.target.value)}
                  />

                  <input
                    type="text"
                    className="quest-input"
                    placeholder="Correct Answer"
                    value={answer}
                    onChange={(e) => setAnswer(e.target.value)}
                  />
                </div>
              )}

              {(anstype === "Mcq" || anstype === "Text") &&
                (
                  <div className="title">
                    <label className="disp-title">Add Explanation</label>
                    <textarea
                      className="quest-input"
                      type="text"
                      placeholder="Enter Explanation"
                      value={explanation}
                      onChange={(e) => setExplanation(e.target.value)}
                    />
                  </div>
                )}


              <div className="add-btn-admin">
                <button className="add-btn" onClick={submitHandler}>
                  Add Question
                </button>


              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
