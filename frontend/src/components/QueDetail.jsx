import React, { useEffect, useState } from "react";
import Header from "./Header";
import "./QueDetail.css";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
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
import { RiInformationFill } from "react-icons/ri";
import { FaTags } from "react-icons/fa";
import { GrNotes } from "react-icons/gr";

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
  const user = JSON.parse(localStorage.getItem("quantuser"));
  const today = new Date();
  const yyyy = today.getFullYear();
  let mm = today.getMonth() + 1; // Months start at 0!
  let dd = today.getDate();
  if (dd < 10) dd = '0' + dd;
  if (mm < 10) mm = '0' + mm;
  const todaysdate = dd + '/' + mm + '/' + yyyy;

  const handlePreviousButtonClick = () => {
    setShowAns(false)
    setCorrectAns(false);
    setWrongAns(false)
    const previousQuestion = currentQuestion - 1;
    if (previousQuestion >= 0) {
      setCurrentQuestion(previousQuestion);
    }
  };

  const handleNextButtonClick = () => {
    setShowAns(false)
    setCorrectAns(false);
    setWrongAns(false)
    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < allQuestions.length) {
      setCurrentQuestion(nextQuestion);
    }
    let allRadio = document.querySelectorAll("#my-radio");
    allRadio.forEach(value => value.checked = false);
  };
  let status;
  const isPreviousDisabled = currentQuestion === 0;
  const isNextDisabled =
    allQuestions && currentQuestion === allQuestions.length - 1;

  const fetchQuestions = async () => {
    const data = await fetch(`http://localhost:8000/question/getallquestions`);
    const res = await data.json();
    res &&
      res.map((ques, i) => {
        console.log(location.state.id, ques.uniqueId);
        if (ques.uniqueId == location.state.id) {
          console.log("khushi");
          setCurrentQuestion(i);
        }
      });
    setAllquestions(res);
  };

  const fetchUser = async () => {
    const data = await fetch(`http://localhost:8000/user/${user.id}`);
    const res = await data.json();
    setUserData(res);
  };

  useEffect(() => {
    fetchQuestions();
    fetchUser();
  }, [])

  const ansSubmitHandler = async () => {
    if (!user) {
      alert("Please Login!");
      window.location.href = '/login';
      return;
    }
    const a = await fetch(`http://localhost:8000/user/${user.id}`);
    const updateduser = await a.json();
    let score;
    if (allQuestions[currentQuestion].difficulty === "hard") {
      score = 5;
    } else if (allQuestions[currentQuestion].difficulty === "medium") {
      score = 3;
    } else {
      score = 2;
    }
    let quesSubmission = 0;
    let quesAcceptance = 0;
    let status;
    if (answer) {
      quesSubmission = 1;
      setShowAns(false)
      setAnswer("");
      let val;
      console.log(answer, allQuestions[currentQuestion].answer);
      if (answer == allQuestions[currentQuestion].answer) {
        setCorrectAns(true);
        setWrongAns(false)
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
            question: allQuestions[currentQuestion]._id,
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
        const res = await data.json();
      } else {
        setCorrectAns(false);
        setWrongAns(true)
        status = "wrong";
        val = {
          userId: updateduser._id,
          totalSubmissions: updateduser.totalSubmissions + 1,
          score: updateduser.score,
          correctAns: updateduser.correctAns,
          wrongAns: updateduser.wrongAns + 1,
          submittedQuestions: {
            question: allQuestions[currentQuestion]._id,
            correctAns: false,
            date: todaysdate,
          },
        };
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

      const quesValue = {
        submission: allQuestions[currentQuestion].submission + quesSubmission,
        accepted: allQuestions[currentQuestion].accepted + quesAcceptance
      }
      console.log(allQuestions[currentQuestion].submission, allQuestions[currentQuestion].accepted, quesValue, "lksjdhfjagwuf");
      // update question for submissions and acceptance
      const updateQues = await fetch(`http://localhost:8000/question/updateans/${allQuestions[currentQuestion]._id}`, {
        method: "PUT",
        body: JSON.stringify(quesValue),
        headers: {
          "Content-type": "application/json"
        }
      })
      const updatedResp = await updateQues.json();
      console.log(updatedResp, "updatedresp");

      // update current question status
      const userUpdation = {
        questionId: allQuestions[currentQuestion]._id,
        status: status,
      }
      const updateUser = await fetch(`http://localhost:8000/user/update/ans/status/${userData._id}/${allQuestions[currentQuestion]._id}`, {
        method: "PUT",
        body: JSON.stringify(userUpdation),
        headers: {
          "Content-type": "application/json"
        }
      })
      const updatedUserResp = await updateUser.json();
      console.log(updatedUserResp);
    }
  };


  const firms = [
    "Tower Research Capital",
    "Global Atlantic",
    "Nomura",
    "RBC",
    "Bank",
    "Tower Research Capital",
    "Global Atlantic",
    "Nomura",
    "RBC",
    "Bank",
    "Nomura",
    "RBC",
    "Bank",
  ];

  const tags = ["Maths", "Bayes Theorem", "C", "java", "Javascript"];

  return (
    <div>
      <Header />
      <div className="detail-side">
        <div className="que-side">
          <div className="detail-one">
            <div className="line-one">
              <div className="main-detail">
                <div className="detail-title">
                  {allQuestions && allQuestions[currentQuestion].uniqueId}.
                </div>
                <div className="detail-title">
                  {allQuestions && allQuestions[currentQuestion].title}
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
                {allQuestions && allQuestions[currentQuestion].question}
              </p>
            </div>
            <p className="answer">Your Answer</p>
            {
              allQuestions && allQuestions[currentQuestion].answerType === "Text"
                ?
                <div className="answer">
                  <textarea type="text" value={answer} className="ans-field" onChange={(e) => { setAnswer(e.target.value); setShowAns(false); setWrongAns(false); setCorrectAns(false) }} />
                </div>
                :
                <div className="options">
                  {allQuestions && allQuestions[currentQuestion].options.map((option, i) => (
                    option !== '' && <div className="disp-radio" key={i}>
                      <input type="radio" id="my-radio" value={option} name="option" onChange={() => { setAnswer(option); setShowAns(false); setWrongAns(false); setCorrectAns(false) }} />
                      <p className="input-pin">{option}</p>
                    </div>
                  ))}
                </div>
            }

            <div className="align-btn">
              {/* <input type="submit" className="submit" value="Submit" id="submit" onClick={ansSubmitHandler}/> */}
              <button className="submit" id="submit" onClick={ansSubmitHandler}>
                Submit
              </button>
              {correctAns && <p style={{ color: 'green', paddingTop: '10px', fontSize: '20px' }}>Correct Answer</p>}
              {wrongAns &&
                <>
                  <button className="show" onClick={() => setShowAns(true)}>Show Answer</button>
                  <p style={{ color: 'red', paddingTop: '10px', fontSize: '20px' }}>Wrong Answer</p>
                </>
              }
            </div>
            <div>
              {showAns &&
                <div className="show-my-ans"><span className="show-ans">Correct Answer:</span>{allQuestions[currentQuestion].answer}</div>}
            </div>
          </div>

          <div className="buttons">
            <button className="prev"
              onClick={handlePreviousButtonClick} disabled={isPreviousDisabled}>
              <IoIosArrowBack fontSize={20} />
              Prev
            </button>
            <p className="nums">
              {allQuestions && allQuestions[currentQuestion].uniqueId}/
              {allQuestions && allQuestions.length}
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
                  <div className="status-detail">Status:</div><div className="solving">
                    {
                      userData && userData.currentAttempted.some(data => data.questionId === allQuestions[currentQuestion]._id) ?
                        userData && userData.currentAttempted.map((data) => (
                          <>
                            {
                              data.questionId === allQuestions[currentQuestion]._id && data.status === 'correct' && <div>
                                {data.status}</div>
                            }
                            {
                              data.questionId === allQuestions[currentQuestion]._id && data.status === 'wrong' && <div>
                                {data.status}</div>
                            }
                          </>

                        ))
                        : <div>Unsolved</div>
                    }
                  </div>
                </div>
                <div className="my-detail">
                  <div className="status-detail">Difficulty:</div>
                  <div
                    className={
                      allQuestions[currentQuestion].difficulty === "easy"
                        ? "success-de"
                        : allQuestions[currentQuestion].difficulty === "hard"
                          ? "danger-de"
                          : "medium-de"
                    }
                  >
                    {allQuestions[currentQuestion].difficulty}
                  </div>
                </div>
                <div className="my-detail">
                  <div className="status-detail">Submitted:</div><div>{allQuestions[currentQuestion].submission}</div>
                </div>
                <div className="my-detail">
                  <div className="status-detail">Accepted:</div><div>{allQuestions[currentQuestion].accepted}</div>
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
                  <div className="tag-item">{allQuestions[currentQuestion].category}</div>
                </div>
                {allQuestions[currentQuestion].tags.map((item) => (
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
                {allQuestions[currentQuestion].firms.map((item) => (
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