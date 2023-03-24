import React, { useEffect, useState } from "react";
import Header from "./Header";
import "./QueDetail.css";
import katex from 'katex';
import { IoIosArrowBack, IoIosArrowForward, IoMdArrowDropright } from "react-icons/io";
import { AiOutlineMail } from "react-icons/ai";
import { GrNote } from "react-icons/gr";
import { AiOutlineLike } from "react-icons/ai";
import { BsFillCalculatorFill } from "react-icons/bs";
import { DiJavascript1 } from "react-icons/di";
import { RiWindowLine } from "react-icons/ri";
import { RiLightbulbFlashLine } from "react-icons/ri";
import { AiOutlineDislike } from "react-icons/ai";
import { useLocation } from "react-router-dom";
import { IoMdArrowDropdown } from "react-icons/io";
import { MdFormatListBulleted } from "react-icons/md";
import { RiInformationFill } from "react-icons/ri";
import { FaTags } from "react-icons/fa";
import { GrNotes } from "react-icons/gr";
import ReactMarkdown from 'react-markdown';


function QueDetail() {
  const location = useLocation();
  const [userData, setUserData] = useState();
  const [currentQuestion, setCurrentQuestion] = useState();
  const [allQuestions, setAllquestions] = useState();
  const [showAns, setShowAns] = useState(false);
  const [answer, setAnswer] = useState();
  const [open1, setOpen1] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [open3, setOpen3] = useState(false);
  const [correctAns, setCorrectAns] = useState();
  const [wrongAns, setWrongAns] = useState();
  const [hide, setHide] = useState(false);
  const [checkBadge, setCheckBadge] = useState(false);
  const [categories, setCategories] = useState([]);
  const [categoryQuestions, setCategoryQuestions] = useState();
  const [chooseCategory, setChooseCategory] = useState(false);
  const [categoryCss, setCategoryCss] = useState();
  const user = JSON.parse(localStorage.getItem("quantuser"));

  const today = new Date();
  const yyyy = today.getFullYear();
  let mm = today.getMonth() + 1; // Months start at 0!
  let dd = today.getDate();
  if (dd < 10) dd = "0" + dd;
  if (mm < 10) mm = "0" + mm;
  const todaysdate = dd + "/" + mm + "/" + yyyy;

  const handlePreviousButtonClick = () => {
    setShowAns(false);
    setCorrectAns(false);
    setWrongAns(false);
    const previousQuestion = currentQuestion - 1;
    if (previousQuestion >= 0) {
      setCurrentQuestion(previousQuestion);
    }
  };

  const handleNextButtonClick = () => {
    setShowAns(false);
    setCorrectAns(false);
    setWrongAns(false);
    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < allQuestions.length) {
      setCurrentQuestion(nextQuestion);
    }
    let allRadio = document.querySelectorAll("#my-radio");
    allRadio.forEach((value) => (value.checked = false));
  };

  const isPreviousDisabled = currentQuestion === 0;
  const isNextDisabled = chooseCategory ? categoryQuestions && currentQuestion === categoryQuestions.length - 1
    : allQuestions && currentQuestion === allQuestions.length - 1;

  const fetchQuestions = async () => {
    const data = await fetch(`http://localhost:8000/question/getallquestions`);
    const res = await data.json();
    res &&
      res.map((ques, i) => {
        if (ques.uniqueId == location.state.id) {
          setCurrentQuestion(i);
        }
      });
    setAllquestions(res);
    let category = [];
    res.map((data) => {
      if (!category.includes(data.category)) {
        category.push(data.category)
      }
    })
    setCategories(category)
  };

  const fetchUser = async () => {
    const data = await fetch(`http://localhost:8000/user/${user.id}`);
    const res = await data.json();
    setUserData(res);
  };

  // const fetchCategories = async () => {
  //   const data = await fetch(`http://localhost:8000/category/getcategories`);
  //   const res = await data.json();
  //   setCategories(res.category);
  // };

  const fetchCategoryWiseQuestions = async (category) => {
    setCategoryCss(category);
    if (category == "All") {
      setCategoryQuestions(allQuestions);
      setCurrentQuestion(0);
      setChooseCategory(true);
    } else {
      const data = await fetch(`http://localhost:8000/question/getquestions/category/${category}`);
      const res = await data.json();
      setCategoryQuestions(res);
      setCurrentQuestion(0);
      setChooseCategory(true);
    }
  }

  useEffect(() => {
    fetchQuestions();
    fetchUser();
    // fetchCategories();
  }, []);

  const ansSubmitHandler = async () => {
    if (!user) {
      alert("Please login to practice!");
      window.location.href = "/login";
      return;
    }

    const a = await fetch(`http://localhost:8000/user/${user.id}`);
    const updateduser = await a.json();
    let score;

    if (chooseCategory ? categoryQuestions[currentQuestion].difficulty === "hard" : allQuestions[currentQuestion].difficulty === "hard") {
      score = 5;
    } else if (chooseCategory ? categoryQuestions[currentQuestion].difficulty === "medium" : allQuestions[currentQuestion].difficulty === "medium") {
      score = 3;
    } else {
      score = 2;
    }

    let quesSubmission = 0;
    let quesAcceptance = 0;
    let status;
    if (answer) {
      quesSubmission = 1;
      setShowAns(false);
      setAnswer("");
      let val;
      if (chooseCategory ? answer == categoryQuestions[currentQuestion].answer : answer == allQuestions[currentQuestion].answer) {
        setCorrectAns(true);
        setWrongAns(false);
        status = "correct";
        quesAcceptance = 1;
        console.log("correctanswer");

        val = {
          userId: updateduser._id,
          score: updateduser.score + score,
          totalSubmissions: updateduser.totalSubmissions + 1,
          correctAns: updateduser.correctAns + 1,
          wrongAns: updateduser.wrongAns,
          submittedQuestions: {
            question: chooseCategory ? categoryQuestions[currentQuestion]._id : allQuestions[currentQuestion]._id,
            correctAns: true,
            date: todaysdate,
          },
        };
        // update user with submission and correct answers data
        const data = await fetch(
          `http://localhost:8000/user/submittedans/${userData._id}`,
          {
            method: "PUT",
            body: JSON.stringify(val),
            headers: {
              "Content-type": "application/json",
            },
          }
        );
        const updateUser = await data.json();
        console.log(updateUser, "updateduser");
      } else {
        setCorrectAns(false);
        setWrongAns(true);
        status = "wrong";
        val = {
          userId: updateduser._id,
          totalSubmissions: updateduser.totalSubmissions + 1,
          score: updateduser.score,
          correctAns: updateduser.correctAns,
          wrongAns: updateduser.wrongAns + 1,
          submittedQuestions: {
            question: chooseCategory ? categoryQuestions[currentQuestion]._id : allQuestions[currentQuestion]._id,
            correctAns: false,
            date: todaysdate,
          },
        };
        // update details of user
        const data = await fetch(
          `http://localhost:8000/user/submittedans/${userData._id}`,
          {
            method: "PUT",
            body: JSON.stringify(val),
            headers: {
              "Content-type": "application/json",
            },
          }
        );
        const res = await data.json();
      }

      // set questions submission and accepted value
      const quesValue = {
        submission: chooseCategory ? categoryQuestions[currentQuestion].submission + quesSubmission : allQuestions[currentQuestion].submission + quesSubmission,
        accepted: chooseCategory ? categoryQuestions[currentQuestion].accepted + quesAcceptance : allQuestions[currentQuestion].accepted + quesAcceptance,
      };

      // update question for submissions and acceptance
      const updateQues = await fetch(
        `http://localhost:8000/question/updateans/${chooseCategory ? categoryQuestions[currentQuestion]._id : allQuestions[currentQuestion]._id}`,
        {
          method: "PUT",
          body: JSON.stringify(quesValue),
          headers: {
            "Content-type": "application/json",
          },
        }
      );
      const updatedResp = await updateQues.json();

      // update current question status
      const userUpdation = {
        questionId: chooseCategory ? categoryQuestions[currentQuestion]._id : allQuestions[currentQuestion]._id,
        category: chooseCategory ? categoryQuestions[currentQuestion].category : allQuestions[currentQuestion].category,
        status: status,
      };
      const updateUser = await fetch(
        `http://localhost:8000/user/update/ans/status/${userData._id}/${chooseCategory ? categoryQuestions[currentQuestion]._id : allQuestions[currentQuestion]._id}`,
        {
          method: "PUT",
          body: JSON.stringify(userUpdation),
          headers: {
            "Content-type": "application/json",
          },
        }
      );
      const updatedUserResp = await updateUser.json();
      console.log(updatedUserResp);

      // update badge status
      let count = 0;
      updatedUserResp.currentAttempted.map((ques) => {
        if (ques.status == 'correct') {
          count++;
        }
      })
      console.log(count,"countttttt");
      // let badgeval;
      // if (count >= Math.floor(allQuestions.length * 10) / 100) {
      //   badgeval = { bronze: true };
      //   console.log(count, Math.floor(allQuestions.length * 25) / 100);
      // } else {
      //   console.log("medal lost");
      // }

      // if (count >= Math.floor(allQuestions.length * 50) / 100) {
      //   badgeval = { silver: true };
      // } else if (count >= Math.floor(allQuestions.length * 75) / 100) {
      //   badgeval = { gold: true };
      // } else if (count >= Math.floor(allQuestions.length * 100) / 100) {
      //   badgeval = { platinum: true };
      // }

      // if (badgeval) {
      //   console.log("logged");
      // }

      // const updatebadge = await fetch(`http://localhost:8000/user/update/badge/status/${allQuestions[currentQuestion]._id}`, {
      //   method: "PUT",
      //   body: JSON.stringify(badgeval),
      //   headers: {
      //     "Content-type": "application/json"
      //   }
      // })
    }
  };

  const showMyAnswer = () => {
    setShowAns(!showAns);
    setHide(!hide);
  };

  // window.addEventListener('DOMContentLoaded',()=>{
  //   let mathOutput=document.querySelector('#explain-convert');
  //   mathOutput.innerHtml=katex.renderToString(`${allQuestions && allQuestions[currentQuestion].explanation}`)
  // })

  const explanation =
    "The digit 5 has two place values in the numeral, 5 * 105 = 50,000 and 5 * 101 = 50. ∴Required difference = 50000 - 50 = 49950";

  const openNav = () => {
    document.getElementById("mySidebar").style.width = "300px";
    document.getElementById("main").style.marginLeft = "300px";
  }

  const closeNav = () => {
    document.getElementById("mySidebar").style.width = "0";
    document.getElementById("main").style.marginLeft = "0";
  }


  return (
    <div>
      <Header />
      <div id="main" className="detail-side">
        <div className="que-side">
          <div className="detail-one">
            <div className="line-one">
              <div className="main-detail">
                <div className="detail-title">
                  {chooseCategory ? categoryQuestions[currentQuestion] && currentQuestion + 1 : allQuestions && currentQuestion + 1}.
                </div>
                <div className="detail-title">
                  {chooseCategory ? categoryQuestions[currentQuestion] && categoryQuestions[currentQuestion].title : allQuestions && allQuestions[currentQuestion].title}
                </div>
              </div>
              <div className="detail-icons">
                {/* <div className="icon-line1">
                  <BsFillCalculatorFill size={18} />
                  <AiOutlineMail size={23} />
                  <GrNote size={17} />
                  <AiOutlineLike size={23} color="green" />
                </div>
                <div className="icon-line2">
                  <DiJavascript1 size={20} />
                  <RiLightbulbFlashLine size={20} />
                  <RiWindowLine size={20} />
                  <AiOutlineDislike size={20} color="red" />
                </div> */}
              </div>
            </div>

            <div className="line-two">
              <p className="que-descr">
                {chooseCategory ? categoryQuestions[currentQuestion] && categoryQuestions[currentQuestion].question : allQuestions && allQuestions[currentQuestion].question}
              </p>
            </div>
            <p className="answer">Your Answer</p>
            {chooseCategory ?
              categoryQuestions[currentQuestion] && categoryQuestions[currentQuestion].answerType == "Text" ?
                <div className="answer">
                  <textarea
                    type="text"
                    value={answer}
                    className="ans-field"
                    onChange={(e) => {
                      setAnswer(e.target.value);
                      setShowAns(false);
                      setWrongAns(false);
                      setCorrectAns(false);
                    }}
                  />
                </div>
                :
                <div className="options">
                  {
                    categoryQuestions[currentQuestion].options.map(
                      (option, i) =>
                        option !== "" && (
                          <div className="disp-radio" key={i}>
                            <input
                              type="radio"
                              id="my-radio"
                              value={option}
                              name="option"
                              onChange={() => {
                                setAnswer(option);
                                setShowAns(false);
                                setWrongAns(false);
                                setCorrectAns(false);
                              }}
                            />
                            <p className="input-pin">{option}</p>
                          </div>
                        )
                    )}
                </div>
              :
              allQuestions &&
                allQuestions[currentQuestion].answerType === "Text" ? (
                <div className="answer">
                  <textarea
                    type="text"
                    value={answer}
                    className="ans-field"
                    onChange={(e) => {
                      setAnswer(e.target.value);
                      setShowAns(false);
                      setWrongAns(false);
                      setCorrectAns(false);
                    }}
                  />
                </div>
              ) : (
                <div className="options">
                  {allQuestions &&
                    allQuestions[currentQuestion].options.map(
                      (option, i) =>
                        option !== "" && (
                          <div className="disp-radio" key={i}>
                            <input
                              type="radio"
                              id="my-radio"
                              value={option}
                              name="option"
                              onChange={() => {
                                setAnswer(option);
                                setShowAns(false);
                                setWrongAns(false);
                                setCorrectAns(false);
                              }}
                            />
                            <p className="input-pin">{option}</p>
                          </div>
                        )
                    )}
                </div>
              )}

            <div className="align-btn">
              {/* <input type="submit" className="submit" value="Submit" id="submit" onClick={ansSubmitHandler}/> */}
              <button className="submit" id="submit" onClick={ansSubmitHandler}>
                Submit
              </button>
              {correctAns && (
                <p
                  style={{
                    color: "green",
                    fontSize: "18px",
                    position: "relative",
                    top: "8px",
                  }}
                >
                  Correct Answer
                </p>
              )}
              {wrongAns && (
                <>
                  <button className="show-ans-btn" onClick={showMyAnswer}>
                    {hide ? "Hide Answer" : "View Answer"}
                  </button>
                  <p
                    style={{
                      color: "red",
                      fontSize: "18px",
                      position: "relative",
                      top: "8px",
                    }}
                  >
                    Wrong Answer
                  </p>
                </>
              )}
            </div>

            <div className="show-my-ans">
              {showAns && (
                <div className="ans-show1">
                  <div className="show-ans">Correct Answer :</div>
                  <div className="correct-ans">
                    {chooseCategory ? categoryQuestions[currentQuestion] && categoryQuestions[currentQuestion].answer : allQuestions && allQuestions[currentQuestion].answer}
                  </div>
                </div>
              )}
            </div>

            <div>
              {showAns && (
                <div className="explain">
                  <div className="explain-head">Explanation:</div>
                  <div className="explain-cont" >
                    <ReactMarkdown id="explain-convert" style={{ justifyContent: "left" }}>{chooseCategory ? categoryQuestions[currentQuestion] && categoryQuestions[currentQuestion].explanation : allQuestions && allQuestions[currentQuestion].explanation}</ReactMarkdown>
                  </div>
                </div>
              )}
            </div>
          </div>


          <div id="mySidebar" className="sidebar">
            <div className="closebtn categoryonclick" onClick={closeNav}>×</div>
            <div className="all-side">
              <div className="all-categ">Categories</div>
              <div className={categoryCss == "All" ? "categoryonclick categoryClicked" : "categoryonclick"} onClick={() => fetchCategoryWiseQuestions("All")}><IoMdArrowDropright size="25" />All</div>
              {
                categories.length > 0 &&
                categories.map((data) => (
                  <div className={categoryCss == data ? "categoryonclick categoryClicked" : "categoryonclick"} onClick={() => fetchCategoryWiseQuestions(data)}><IoMdArrowDropright size="25" />{data}</div>
                ))
              }
            </div>

          </div>

          <div className="disp-sidebar">
            <div id="main">
              <button className="openbtn" onClick={openNav}><MdFormatListBulleted size="25" /> Questions</button>
            </div>

            <div className="buttons">
              <button
                className="prev"
                onClick={handlePreviousButtonClick}
                disabled={isPreviousDisabled}
              >
                <IoIosArrowBack fontSize={20} />
                Prev
              </button>
              <p className="nums">
                {currentQuestion + 1}/
                {chooseCategory ? categoryQuestions[currentQuestion] && categoryQuestions.length : allQuestions && allQuestions && allQuestions.length}
              </p>
              <button
                className="next"
                onClick={handleNextButtonClick}
                disabled={isNextDisabled}
              >
                Next
                <IoIosArrowForward fontSize={20} />
              </button>
            </div>
          </div>
        </div>

        <div className="detail-two">
          <div className="detail-box1">
            <div className="open-detail" onClick={() => setOpen1(!open1)}>
              <div className="gap-detail">
                <RiInformationFill size="18" className="info-icon" />
                General Info
              </div>
              <IoMdArrowDropdown className="drop-detail" size="20" />
            </div>
            {open1 && (
              <div className="detail-block">
                <div className="my-detail">
                  <div className="status-detail">Status:</div>
                  <div className="solving">
                    {userData && chooseCategory ?
                      userData.currentAttempted.some(
                        (data) =>
                          data.questionId === categoryQuestions[currentQuestion]._id
                      ) ? (
                        userData &&
                        userData.currentAttempted.map((data) => (
                          <>
                            {data.questionId ===
                              categoryQuestions[currentQuestion]._id &&
                              data.status === "correct" && (
                                <div>{data.status}</div>
                              )}
                            {data.questionId ===
                              categoryQuestions[currentQuestion]._id &&
                              data.status === "wrong" && <div>{data.status}</div>}
                          </>
                        ))
                      ) : (
                        <div>Unsolved</div>
                      ) :
                      userData.currentAttempted.some(
                        (data) =>
                          data.questionId === allQuestions[currentQuestion]._id
                      ) ? (
                        userData &&
                        userData.currentAttempted.map((data) => (
                          <>
                            {data.questionId ===
                              allQuestions[currentQuestion]._id &&
                              data.status === "correct" && (
                                <div>{data.status}</div>
                              )}
                            {data.questionId ===
                              allQuestions[currentQuestion]._id &&
                              data.status === "wrong" && <div>{data.status}</div>}
                          </>
                        ))
                      ) : (
                        <div>Unsolved</div>
                      )
                    }
                  </div>
                </div>
                <div className="my-detail">
                  <div className="status-detail">Difficulty:</div>
                  <div
                    className={chooseCategory ? categoryQuestions[currentQuestion].difficulty === "easy"
                      ? "success-de" : categoryQuestions[currentQuestion].difficulty === "hard" ? "danger-de" : "medium-de"
                      :
                      allQuestions[currentQuestion].difficulty === "easy"
                        ? "success-de"
                        : allQuestions[currentQuestion].difficulty === "hard"
                          ? "danger-de"
                          : "medium-de"
                    }
                  >
                    {chooseCategory ? categoryQuestions[currentQuestion].difficulty : allQuestions[currentQuestion].difficulty}
                  </div>
                </div>
                <div className="my-detail">
                  <div className="status-detail">Submitted:</div>
                  <div>{chooseCategory ? categoryQuestions[currentQuestion].submission : allQuestions[currentQuestion].submission}</div>
                </div>
                <div className="my-detail">
                  <div className="status-detail">Accepted:</div>
                  <div>{chooseCategory ? categoryQuestions[currentQuestion].accepted : allQuestions[currentQuestion].accepted}</div>
                </div>
              </div>
            )}
          </div>

          <div className="detail-box1">
            <div className="open-detail" onClick={() => setOpen2(!open2)}>
              <div className="gap-detail">
                <FaTags className="info-icon" />
                Category & Tags
              </div>
              <IoMdArrowDropdown className="drop-detail" size="20" />
            </div>
            {open2 && (
              <div className="main-tags">
                <div className="all-firms">
                  <div className="tag-item">
                    {chooseCategory ? categoryQuestions[currentQuestion].category : allQuestions[currentQuestion].category}
                  </div>
                </div>
                {
                  chooseCategory ?
                    categoryQuestions[currentQuestion].tags.map((item) => (
                      <div className="all-firms">
                        <div className="tag-item">{item}</div>
                      </div>
                    ))
                    :
                    allQuestions[currentQuestion].tags.map((item) => (
                      <div className="all-firms">
                        <div className="tag-item">{item}</div>
                      </div>
                    ))}
              </div>
            )}
          </div>
          <div className="detail-box1">
            <div className="open-detail" onClick={() => setOpen3(!open3)}>
              <div className="gap-detail">
                <GrNotes className="info-icon" size="15" />
                Firms
              </div>
              <IoMdArrowDropdown className="drop-detail" size="20" />
            </div>
            {open3 && (
              <div className="main-tags">
                {
                  chooseCategory ?
                    categoryQuestions[currentQuestion].firms.map((item) => (
                      <div className="all-firms">
                        <div className="tag-item">{item}</div>
                      </div>
                    ))
                    :
                    allQuestions[currentQuestion].firms.map((item) => (
                      <div className="all-firms">
                        <div className="tag-item">{item}</div>
                      </div>
                    ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default QueDetail;
