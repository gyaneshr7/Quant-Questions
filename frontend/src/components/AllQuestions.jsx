import React, { useEffect, useState } from "react";
import { FiLogOut } from "react-icons/fi";
import { FaList } from "react-icons/fa";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { FaUserCircle } from "react-icons/fa";
import { MdLibraryAdd } from "react-icons/md";
import { Link } from "react-router-dom";
import { FiEdit } from "react-icons/fi";
import { MdDelete } from "react-icons/md";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Multiselect from "multiselect-react-dropdown";
import "./AllQuestions.css";
import ModalResource from "./ModalResource";
import { slice } from "lodash";

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
  const [explanation, setExplanation] = useState();
  const [searchVal, setSearchVal] = useState();
  const [enableSearch, setEnableSearch] = useState(false);
  const [selected, setSelected] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [show, setShow] = useState(false);
  const [loginModalShow, setLoginModalShow] = useState(false);
  const [firms, setFirms] = useState([]);
  const [positions, setPositions] = useState([]);
  const [divisions, setDivisions] = useState([]);
  const [tags, setTags] = useState([]);

  const [option1, setOption1] = useState("");
  const [option2, setOption2] = useState("");
  const [option3, setOption3] = useState("");
  const [option4, setOption4] = useState("");
  const [categories, setCategories] = useState();
  const [deletebtn, setDeleteBtn] = useState(false);
  const [quesId, setQuesId] = useState();
  const [categoryData, setCategoryData] = useState();
  const [loading, setLoading] = useState(false);
  const [loading2, setLoading2] = useState(false);

  const [removedFirm, setRemovedFirm] = useState([]);
  const [removedDivision, setRemovedDivision] = useState([]);
  const [removedPosition, setRemovedPosition] = useState([]);
  const [removedTag, setRemovedTag] = useState([]);

  // states for handling pagination
  const [searchActive, setsearchActive] = useState(false);
  const [startIndex, setstartIndex] = useState(0);
  const [endIndex, setendIndex] = useState(10);
  const [prevPage, setPrevPage] = useState(1);

  let tableData;
  searchActive
    ? (tableData = selected.slice(0, 10))
    : (tableData = selected.slice(startIndex, endIndex));

  const [all, setAll] = useState({
    ttl: title,
    que: ques,
    answ: answer,
    exp: explanation,
    opt1: option1,
    opt2: option2,
    opt3: option3,
    opt4: option4,
  });
  const [editId, setEditId] = useState("");

  const url = "http://localhost:8000/question";
  const category_url = "http://localhost:8000/category";

  // Pagination
  const itemsPerPage = 10;

  function goToPrev() {
    if (startIndex >= 10) {
      setstartIndex(startIndex - 10);
    }
    setendIndex(endIndex - 10);
    setCurrentPage((page) => page - 1);
    setPrevPage((page) => page - 1);
    // setCurrentPage(currentPage - 1);

    // handleClick(startIndex+10,0);
  }

  function goToNext() {
    setCurrentPage((page) => page + 1);
    setPrevPage((page) => page + 1);
    setstartIndex(startIndex + 10);
    setendIndex(endIndex + 10);
    // setCurrentPage(currentPage);

    // handleClick(startIndex,0);
  }

  const totalPages = Math.ceil(selected && selected.length / itemsPerPage);

  // Firms, divisions, categories and tags names
  let firmNames = [],
    divisionNames = [],
    positionNames = [],
    tagNames = [];

  categories &&
    categories.firms.length > 0 &&
    categories.firms.map((data) => {
      firmNames.push(data.name);
    });
  categories &&
    categories.divisions.length > 0 &&
    categories.divisions.map((data) => {
      divisionNames.push(data.name);
    });
  categories &&
    categories.positions.length > 0 &&
    categories.positions.map((data) => {
      positionNames.push(data.name);
    });
  categories &&
    categories.tags.length > 0 &&
    categories.tags.map((data) => {
      tagNames.push(data.name);
    });

  const handleLogout = () => {
    localStorage.setItem("quantuser", null);
    window.location.href = "/";
  };

  // This will open add questions section
  const handleAdd = () => {
    setCss(false);
  };

  const fetchCategories = async () => {
    const data = await fetch(`${category_url}/getcategories`);
    const res = await data.json();
    setCategories(res);
  };

  const fetchQuestions = async () => {
    const data = await fetch(`${url}/getallquestions`);
    const res = await data.json();
    setData(res);
    setSelected(res);
  };

  useEffect(() => {
    fetchQuestions();
    fetchCategories();
    setLoading(false);
  }, [loading, startIndex, endIndex]);

  const setClicked = (id) => {
    setOpen(true);
    setId(id);
    setEdit(true);
  };

  const setCancel = () => {
    setOpen(false);
    setEdit(false);
  };

  const handleClick = (i, id1) => {
    setClicked(i);
    setEditId(id1);
    setAll({
      ...all,
      ttl: tableData[i].title,
      que: tableData[i].question,
      answ: tableData[i].answer,
      exp: tableData[i].explanation,
      opt1: tableData[i].options[0],
      opt2: tableData[i].options[1],
      opt3: tableData[i].options[2],
      opt4: tableData[i].options[3],
    });

    setAnsType("");
  };

  const handleUpdate = async (id, catArray, options) => {
    setLoading2(true);
    let value = {};
    if (all.que) {
      value.question = all.que;
    }
    if (all.ttl) {
      value.title = all.ttl;
    }
    if (category) {
      value.category = category;
    }
    if (difficulty) {
      value.difficulty = difficulty;
    }
    if (ansType) {
      value.answerType = ansType;
    }
    if (all.answ) {
      value.answer = all.answ;
    }
    if (all.exp) {
      value.explanation = all.exp;
    }
    if (all.opt1 || all.opt2 || all.opt3 || all.opt4) {
      let array = [];
      if (all.opt1) {
        array.push(all.opt1);
      } else {
        array.push(all.opt1);
      }
      if (all.opt2) {
        array.push(all.opt2);
      } else {
        array.push(all.opt2);
      }
      if (all.opt3) {
        array.push(all.opt3);
      } else {
        array.push(all.opt3);
      }
      if (all.opt4) {
        array.push(all.opt4);
      } else {
        array.push(all.opt4);
      }
      value.options = array;
    }

    if (removedFirm.length > 0 && firms.length > 0) {
      value.firms = firms;
    } else if (firms.length > 0) {
      value.firms = firms;
    } else if (removedFirm.length > 0) {
      let fval = [];
      catArray.firmArray.map((firm) => {
        if (!removedFirm.includes(firm)) {
          fval.push(firm);
        }
      });
      value.firms = fval;
    }

    if (removedDivision.length > 0 && divisions.length > 0) {
      value.divisions = divisions;
    } else if (divisions.length > 0) {
      value.divisions = divisions;
    } else if (removedDivision.length > 0) {
      let dval = [];
      catArray.divisionsArray.map((div) => {
        if (!removedDivision.includes(div)) {
          dval.push(div);
        }
      });
      value.divisions = dval;
    }

    if (removedPosition.length > 0 && positions.length > 0) {
      value.position = positions;
    } else if (positions.length > 0) {
      value.position = positions;
    } else if (removedPosition.length > 0) {
      let pval = [];
      catArray.positionsArray.map((pos) => {
        if (!removedPosition.includes(pos)) {
          pval.push(pos);
        }
      });
      value.position = pval;
    }

    if (removedTag.length > 0 && tags.length > 0) {
      value.tags = tags;
    } else if (tags.length > 0) {
      value.tags = tags;
    } else if (removedTag.length > 0) {
      let tval = [];
      catArray.tagsArray.map((tag) => {
        if (!removedTag.includes(tag)) {
          tval.push(tag);
        }
      });
      value.tags = tval;
    }

    const updatedata = await fetch(
      `http://localhost:8000/question/update/questions/${id}`,
      {
        method: "PUT",
        body: JSON.stringify(value),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }
    );
    const resup = await updatedata.json();

    let fdec = [],
      finc = [];
    if (removedFirm.length > 0 && firms.length > 0) {
      firmNames.map((firm) => {
        if (removedFirm.includes(firm) && firms.includes(firm)) {
        } else if (
          removedFirm.includes(firm) &&
          catArray.firmArray.includes(firm)
        ) {
          fdec.push(firm);
        } else if (firms.includes(firm) && !catArray.firmArray.includes(firm)) {
          finc.push(firm);
        }
      });
    } else if (removedFirm.length > 0) {
      firmNames.map((firm) => {
        if (removedFirm.includes(firm)) {
          fdec.push(firm);
        }
      });
    } else if (firms.length > 0) {
      firmNames.map((firm) => {
        if (firms.includes(firm) && !catArray.firmArray.includes(firm)) {
          finc.push(firm);
        }
      });
    }

    let ddec = [],
      dinc = [];
    if (removedDivision.length > 0 && divisions.length > 0) {
      divisionNames.map((div) => {
        if (removedDivision.includes(div) && divisions.includes(div)) {
        } else if (
          removedDivision.includes(div) &&
          catArray.divisionsArray.includes(div)
        ) {
          ddec.push(div);
        } else if (
          divisions.includes(div) &&
          !catArray.divisionsArray.includes(div)
        ) {
          dinc.push(div);
        }
      });
    } else if (removedDivision.length > 0) {
      divisionNames.map((div) => {
        if (removedDivision.includes(div)) {
          ddec.push(div);
        }
      });
    } else if (divisions.length > 0) {
      divisionNames.map((div) => {
        if (divisions.includes(div) && !catArray.divisionsArray.includes(div)) {
          dinc.push(div);
        }
      });
    }

    let pdec = [],
      pinc = [];
    if (removedPosition.length > 0 && positions.length > 0) {
      positionNames.map((pos) => {
        if (removedPosition.includes(pos) && positions.includes(pos)) {
        } else if (
          removedPosition.includes(pos) &&
          catArray.positionsArray.includes(pos)
        ) {
          pdec.push(pos);
        } else if (
          positions.includes(pos) &&
          !catArray.positionsArray.includes(pos)
        ) {
          pinc.push(pos);
        }
      });
    } else if (removedPosition.length > 0) {
      positionNames.map((pos) => {
        if (removedPosition.includes(pos)) {
          pdec.push(pos);
        }
      });
    } else if (positions.length > 0) {
      positionNames.map((pos) => {
        if (positions.includes(pos) && !catArray.positionsArray.includes(pos)) {
          pinc.push(pos);
        }
      });
    }

    let tdec = [],
      tinc = [];
    if (removedTag.length > 0 && tags.length > 0) {
      tagNames.map((tag) => {
        if (removedTag.includes(tag) && tags.includes(tag)) {
        } else if (
          removedTag.includes(tag) &&
          catArray.tagsArray.includes(tag)
        ) {
          tdec.push(tag);
        } else if (tags.includes(tag) && !catArray.tagsArray.includes(tag)) {
          tinc.push(tag);
        }
      });
    } else if (removedTag.length > 0) {
      tagNames.map((tag) => {
        if (removedTag.includes(tag)) {
          tdec.push(tag);
        }
      });
    } else if (tags.length > 0) {
      tagNames.map((tag) => {
        if (tags.includes(tag) && !catArray.tagsArray.includes(tag)) {
          tinc.push(tag);
        }
      });
    }

    const data = await fetch("http://localhost:8000/category/getcategories");
    const res = await data.json();
    let firmscount = [],
      divisionscount = [],
      positionscount = [],
      tagscount = [];
    res.firms.map((data) => {
      if (fdec.length > 0) {
        if (fdec.includes(data.name)) {
          let val = {
            name: data.name,
            count: data.count - 1,
          };
          firmscount.push(val);
        }
      }
      if (finc.length > 0) {
        if (finc.includes(data.name)) {
          let val = {
            name: data.name,
            count: data.count + 1,
          };
          firmscount.push(val);
        }
      }
    });

    res.divisions.map((data) => {
      if (ddec.length > 0) {
        if (ddec.includes(data.name)) {
          let val = {
            name: data.name,
            count: data.count - 1,
          };
          divisionscount.push(val);
        }
      }
      if (dinc.length > 0) {
        if (dinc.includes(data.name)) {
          let val = {
            name: data.name,
            count: data.count + 1,
          };
          divisionscount.push(val);
        }
      }
    });

    res.positions.map((data) => {
      if (pdec.length > 0) {
        if (pdec.includes(data.name)) {
          let val = {
            name: data.name,
            count: data.count - 1,
          };
          positionscount.push(val);
        }
      }
      if (pinc.length > 0) {
        if (pinc.includes(data.name)) {
          let val = {
            name: data.name,
            count: data.count + 1,
          };
          positionscount.push(val);
        }
      }
    });

    res.tags.map((data) => {
      if (tdec.length > 0) {
        if (tdec.includes(data.name)) {
          let val = {
            name: data.name,
            count: data.count - 1,
          };
          tagscount.push(val);
        }
      }
      if (tinc.length > 0) {
        if (tinc.includes(data.name)) {
          let val = {
            name: data.name,
            count: data.count + 1,
          };
          tagscount.push(val);
        }
      }
    });

    const val = {
      firmscount,
      divisionscount,
      tagscount,
      positionscount,
    };

    const dataa = await fetch(
      "http://localhost:8000/category/updatecategory/firms",
      {
        method: "PUT",
        body: JSON.stringify(val),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }
    );
    const response = await dataa.json();

    setLoading(true);
    setOpen(false);
    setEdit(false);
    setLoading2(false);
  };

  const handleDelete = (id) => {
    setQuesId(id);
    setDeleteBtn(true);
  };

  const handleDeleteQuestion = async () => {
    // console.log(quesId);
    const dataa = await fetch("http://localhost:8000/category/getcategories");
    const resp = await dataa.json();
    let firmscount = [],
      divisionscount = [],
      positionscount = [],
      tagscount = [];
    resp.firms.map((data) => {
      if (categoryData.firmArray.includes(data.name)) {
        let val = {
          name: data.name,
          count: data.count - 1,
        };
        firmscount.push(val);
      }
    });
    resp.divisions.map((data) => {
      if (categoryData.divisionsArray.includes(data.name)) {
        let val = {
          name: data.name,
          count: data.count - 1,
        };
        divisionscount.push(val);
      }
    });
    resp.positions.map((data) => {
      if (categoryData.positionsArray.includes(data.name)) {
        let val = {
          name: data.name,
          count: data.count - 1,
        };
        positionscount.push(val);
      }
    });
    resp.tags.map((data) => {
      if (categoryData.tagsArray.includes(data.name)) {
        let val = {
          name: data.name,
          count: data.count - 1,
        };
        tagscount.push(val);
      }
    });
    const value = {
      firmscount,
      divisionscount,
      tagscount,
      positionscount,
    };
    const deletedata = await fetch(`http://localhost:8000/question/${quesId}`, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });
    const deleted = await deletedata.json();
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
    setDeleteBtn(false);
    setLoading(true);
    setOpen(false);
    setEdit(false);
  };

  // search questions
  const matched = [];
  const searchHandler = (e) => {
    if (e.target.value !== "") {
      let val = e.target.value;

      setsearchActive(true);
      setOpen(false);

      mydata.forEach((ques) => {
        const value = ques.title.toLowerCase().includes(val.toLowerCase());
        if (value) {
          matched.push(ques);
        }
      });
      let uniquematched = [];
      matched.map((item) => {
        var findItem = uniquematched.find((x) => x._id === item._id);
        if (!findItem) uniquematched.push(item);
      });
      setSelected(uniquematched);
      setCurrentPage(1);
    } else {
      setSelected(mydata);
      setsearchActive(false);
      setOpen(false);
      setCurrentPage(prevPage);
    }
  };

  const handleTitleChange = (e) => {
    const { name, value } = e.target;

    setAll({
      ...all,
      [name]: value,
    });
  };

  return (
    <>
      <div className="dash">
        {/* admin sidebar */}
        <div className="dash-left">
          <div className="dash-head">Admin Panel</div>
          <div className="side-que">
            <div
              style={{ display: "flex", flexDirection: "column", gap: "13px" }}
            >
              {/* it will redirect to Dashboard.jsx */}
              <Link to="/dashboard" className="add-que" onClick={handleAdd}>
                <MdLibraryAdd className="icon-side" />
                Add Questions
              </Link>

              <div className={css ? "add-que-hover" : "add-que"}>
                <FaList className="icon-side" />
                All Questions
              </div>

              <div
                onClick={() => {
                  setLoginModalShow(true);
                  setCss(false);
                }}
                className={css ? "add-que" : "add-que-hover"}
              >
                <MdLibraryAdd className="icon-side" />
                Add Resources
              </div>
            </div>

            <ModalResource
              show={loginModalShow}
              close={() => {
                setLoginModalShow(false);
                setCss(true);
              }}
            />

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

          {/* search bar */}
          <div className="admin-func">
            <div className="disp-all-ques">
              <div className="search-all">
                <input
                  type="text"
                  value={searchVal}
                  onChange={searchHandler}
                  placeholder="Search questions..."
                  className="search-in"
                />
              </div>
              {tableData &&
                tableData.map((data, index) => (
                  <div key={index}>
                    <div
                      className={
                        edit && index === id ? "all-edit-drop" : "all-ques-drop"
                      }
                    >
                      <div>
                        <div className="ques1-drop">
                          <div>{data.title}</div>

                          <div className="additionals">
                            <FiEdit
                              onClick={() => handleClick(index, data._id)}
                              size="20"
                            />
                            <MdDelete
                              size="20"
                              onClick={() => {
                                setCategoryData({
                                  firmArray: data.firms,
                                  divisionsArray: data.divisions,
                                  positionsArray: data.position,
                                  tagsArray: data.tags,
                                });
                                handleDelete(data._id);
                              }}
                            />
                          </div>
                        </div>
                      </div>

                      {open && index === id && (
                        <div>
                          {/* {data.answerType === "Text" ? ( */}
                          <div>
                            <div className="detail-ques">
                              <div className="ques-d">
                                <span className="span-tag">Title:</span>

                                <textarea
                                  className="quest1"
                                  type="text"
                                  value={all.ttl}
                                  name="ttl"
                                  onChange={handleTitleChange}
                                />
                              </div>
                              <div>
                                <span className="span-tag span-ques">
                                  Question:
                                </span>
                                <textarea
                                  className="quest1"
                                  type="text"
                                  value={all.que}
                                  name="que"
                                  onChange={handleTitleChange}
                                />{" "}
                              </div>
                              <div>
                                <span className="span-tag">Category : </span>
                                <select
                                  name="category"
                                  className="opt-font selection"
                                  required
                                  onChange={(e) => setCategory(e.target.value)}
                                >
                                  <option value="none" selected disabled hidden>
                                    {data.category}
                                  </option>
                                  {categories &&
                                    categories.category.map((category, i) => (
                                      <option key={i} value={category.name}>
                                        {category.name}
                                      </option>
                                    ))}
                                </select>
                              </div>

                              <div>
                                <span className="span-tag">Difficulty: </span>
                                <select
                                  name="difficulty"
                                  className="opt-font selection"
                                  required
                                  onChange={(e) =>
                                    setDifficulty(e.target.value)
                                  }
                                >
                                  <option value="none" selected disabled hidden>
                                    {data.difficulty}
                                  </option>
                                  <option value="easy">Easy</option>
                                  <option value="medium">Medium</option>
                                  <option value="hard">Hard</option>
                                </select>
                              </div>

                              <div>
                                <span className="span-tag">Answer Type: </span>
                                <select
                                  name="answerType"
                                  className="opt-font selection"
                                  required
                                  onChange={(e) => setAnsType(e.target.value)}
                                >
                                  <option value="none" selected disabled hidden>
                                    {data.answerType}
                                  </option>
                                  {categories &&
                                    categories.answerType.map((ans, i) => (
                                      <option key={i} value={ans.name}>
                                        {ans.name}
                                      </option>
                                    ))}
                                </select>
                              </div>

                              {ansType == "Mcq" && data.answerType != "Mcq" && (
                                <>
                                  <div>
                                    <span className="span-tag">Option 1:</span>
                                    <input
                                      type="text"
                                      name="opt1"
                                      value={all.opt1}
                                      onChange={handleTitleChange}
                                    />
                                  </div>
                                  <div>
                                    <span className="span-tag">Option 2:</span>
                                    <input
                                      type="text"
                                      name="opt2"
                                      value={all.opt2}
                                      onChange={handleTitleChange}
                                    />
                                  </div>
                                  <div>
                                    <span className="span-tag">Option 3:</span>
                                    <input
                                      type="text"
                                      name="opt3"
                                      value={all.opt3}
                                      onChange={handleTitleChange}
                                    />
                                  </div>
                                  <div>
                                    <span className="span-tag">Option 4:</span>
                                    <input
                                      type="text"
                                      name="opt4"
                                      value={all.opt4}
                                      onChange={handleTitleChange}
                                    />
                                  </div>
                                </>
                              )}
                              {data.answerType == "Mcq" && (
                                <div>
                                  <span className="span-tag">Option 1:</span>
                                  <input
                                    type="text"
                                    name="opt1"
                                    value={all.opt1}
                                    onChange={handleTitleChange}
                                  />
                                </div>
                              )}
                              {data.answerType == "Mcq" && (
                                <div>
                                  <span className="span-tag">Option 2:</span>
                                  <input
                                    type="text"
                                    name="opt2"
                                    value={all.opt2}
                                    onChange={handleTitleChange}
                                  />
                                </div>
                              )}
                              {data.answerType == "Mcq" && (
                                <div>
                                  <span className="span-tag">Option 3:</span>
                                  <input
                                    type="text"
                                    name="opt3"
                                    value={all.opt3}
                                    onChange={handleTitleChange}
                                  />
                                </div>
                              )}
                              {data.answerType == "Mcq" && (
                                <div>
                                  <span className="span-tag">Option 4:</span>
                                  <input
                                    type="text"
                                    name="opt4"
                                    value={all.opt4}
                                    onChange={handleTitleChange}
                                  />
                                </div>
                              )}
                              <div>
                                <span className="span-tag">Answer:</span>
                                <input
                                  type="text"
                                  value={all.answ}
                                  name="answ"
                                  onChange={handleTitleChange}
                                />{" "}
                              </div>
                              <div>
                                <span className="span-tag">Explanation:</span>
                                <textarea
                                  type="text"
                                  value={all.exp}
                                  name="exp"
                                  onChange={handleTitleChange}
                                />{" "}
                              </div>
                              <div>
                                <span className="span-tag">Firms:</span>
                                <div className="form-outline flex-fill mb-0">
                                  <Multiselect
                                    placeholder="Select Firms"
                                    displayValue=""
                                    isObject={false}
                                    onKeyPressFn={function noRefCheck() {}}
                                    onSearch={function noRefCheck() {}}
                                    onSelect={(name) => setFirms(name)}
                                    onRemove={(name, removedItem) => {
                                      setRemovedFirm((arr) => [
                                        ...arr,
                                        removedItem,
                                      ]);
                                    }}
                                    options={firmNames}
                                    selectedValues={data.firms}
                                  />
                                </div>
                              </div>

                              <div>
                                <span className="span-tag">Division:</span>
                                <Multiselect
                                  placeholder="Select Divisions"
                                  displayValue=""
                                  isObject={false}
                                  onKeyPressFn={function noRefCheck() {}}
                                  onRemove={(name, removedItem) => {
                                    setRemovedDivision((arr) => [
                                      ...arr,
                                      removedItem,
                                    ]);
                                  }}
                                  onSearch={function noRefCheck() {}}
                                  onSelect={(name) => setDivisions(name)}
                                  options={divisionNames}
                                  selectedValues={data.divisions}
                                />
                              </div>
                              <div>
                                <span className="span-tag">Position:</span>
                                <Multiselect
                                  placeholder="Select Positions"
                                  displayValue=""
                                  isObject={false}
                                  onKeyPressFn={function noRefCheck() {}}
                                  onRemove={(name, removedItem) => {
                                    setRemovedPosition((arr) => [
                                      ...arr,
                                      removedItem,
                                    ]);
                                  }}
                                  onSearch={function noRefCheck() {}}
                                  onSelect={(name) => setPositions(name)}
                                  options={positionNames}
                                  selectedValues={data.position}
                                />
                              </div>
                              <div>
                                <span className="span-tag">Tags:</span>
                                <Multiselect
                                  placeholder={data.tags}
                                  displayValue=""
                                  isObject={false}
                                  onKeyPressFn={function noRefCheck() {}}
                                  onRemove={(name, removedItem) => {
                                    setRemovedTag((arr) => [
                                      ...arr,
                                      removedItem,
                                    ]);
                                  }}
                                  onSearch={function noRefCheck() {}}
                                  onSelect={(name) => setTags(name)}
                                  options={tagNames}
                                  selectedValues={data.tags}
                                />
                              </div>
                            </div>
                            <div className="add-ons">
                              <button className="add-btn-save">
                                {
                                loading2 ? (
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
                                  </div>
                                ) : (
                                  <div
                                    onClick={() =>
                                      handleUpdate(
                                        data._id,
                                        {
                                          firmArray: data.firms,
                                          divisionsArray: data.divisions,
                                          positionsArray: data.position,
                                          tagsArray: data.tags,
                                        },
                                        data.options
                                      )
                                    }
                                  >
                                    Save
                                  </div>
                                )}
                              </button>

                              <button
                                className="add-btn-save"
                                onClick={setCancel}
                              >
                                Cancel
                              </button>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}

              {tableData.length > 0 ? (
                <nav className="d-flex justify-content-center">
                  <ul className="pagination">
                    <button
                      onClick={goToPrev}
                      className="prev"
                      disabled={currentPage === 1}
                    >
                      <IoIosArrowBack fontSize={20} />
                      Prev
                    </button>
                    <p className="nums">
                      {selected && selected.length > 0
                        ? `${currentPage}/${totalPages}`
                        : "0/0"}
                    </p>
                    <button
                      onClick={goToNext}
                      className="next"
                      disabled={currentPage >= totalPages}
                    >
                      Next
                      <IoIosArrowForward fontSize={20} />
                    </button>
                  </ul>
                </nav>
              ) : (
                <div className="d-flex justify-content-center">
                  No Data Found
                </div>
              )}
            </div>
          </div>

          {deletebtn && (
            <Modal show={deletebtn} onHide={() => setDeleteBtn(false)}>
              <Modal.Header closeButton>
                <Modal.Title>Are you sure?</Modal.Title>
              </Modal.Header>
              <Modal.Body className="">
                Do you really want to delete this question? This process cannot
                be undone.
              </Modal.Body>
              <Modal.Footer>
                <Button variant="danger" onClick={handleDeleteQuestion}>
                  Delete
                </Button>
                <Button variant="light" onClick={() => setDeleteBtn(false)}>
                  Cancel
                </Button>
              </Modal.Footer>
            </Modal>
          )}
        </div>
      </div>
    </>
  );
}

export default AllQuestions;
