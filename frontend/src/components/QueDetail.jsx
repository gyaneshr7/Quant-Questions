import React, { useEffect, useState } from "react";
import Header from "./Header";
import "./QueDetail.css";
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import { AiOutlineMail } from 'react-icons/ai';
import { GrNote } from 'react-icons/gr';
import { AiOutlineLike } from 'react-icons/ai';
import { BsFillCalculatorFill } from 'react-icons/bs';
import { DiJavascript1 } from 'react-icons/di';
import { RiWindowLine } from 'react-icons/ri';
import { RiLightbulbFlashLine } from 'react-icons/ri';
import { AiOutlineDislike } from 'react-icons/ai';
import { useLocation } from "react-router-dom";


function QueDetail() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const location = useLocation();
  const [userData, setUserData] = useState();
  const [currentQuestion, setCurrentQuestion] = useState();
  const [allQuestions, setAllquestions] = useState();
  const [showAns, setShowAns] = useState(false);
  const [score, setScore] = useState(0);
  const [answer, setAnswer] = useState();
  const [submit, setSubmit] = useState();
  const user = JSON.parse(localStorage.getItem("quantuser"));
  const today = new Date();
  const yyyy = today.getFullYear();
  let mm = today.getMonth() + 1; // Months start at 0!
  let dd = today.getDate();

  if (dd < 10) dd = '0' + dd;
  if (mm < 10) mm = '0' + mm;

  const todaysdate = dd + '/' + mm + '/' + yyyy;

  const handleNext = () => {
    setCurrentQuestionIndex(currentQuestionIndex + 1);
  };

  const handlePrevious = () => {
    setCurrentQuestionIndex(currentQuestionIndex - 1);
  };

  const fetchQuestions = async () => {
    const data = await fetch(`http://localhost:8000/question/getallquestions`);
    const res = await data.json();
    res && res.map((ques, i) => {
      if (ques.uniqueId == location.state.id) {
        setCurrentQuestion(i)
      }
    })
    setAllquestions(res);
  }

  const fetchUser = async () => {
    const data = await fetch(`http://localhost:8000/user/${user.id}`);
    const res = await data.json();
    setUserData(res);
  }

  useEffect(() => {
    fetchQuestions();
    fetchUser();
  }, [submit])

  const ansSubmitHandler = async () => {
    const a = await fetch(`http://localhost:8000/user/${user.id}`);
    const updateduser = await a.json();
    let score;
    if (allQuestions[currentQuestion].difficulty == 'hard') {
      score = 5;
    } else if (allQuestions[currentQuestion].difficulty == 'medium') {
      score = 3;
    } else {
      score = 2
    }
    if (answer) {
      setShowAns(true)
      let val;
      if (answer == allQuestions[currentQuestion].answer) {
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
            date: todaysdate
          }
        }
        // update user with submission and correct answers data
        const data = await fetch(`http://localhost:8000/user/submittedans/${userData._id}`, {
          method: "PUT",
          body: JSON.stringify(val),
          headers: {
            "Content-type": "application/json"
          }
        })
        const res = await data.json();
        console.log(res);

        const value = {
          question: allQuestions[currentQuestion]._id
        }

        // Update correct answers array
        const matched = updateduser.correctAnswers.some((element) => {
          return element.question == allQuestions[currentQuestion]._id;
        })
        if (!matched) {
          const dataa = await fetch(`http://localhost:8000/user/correct/answers/${userData._id}`, {
            method: "PUT",
            body: JSON.stringify(value),
            headers: {
              "Content-type": "application/json"
            }
          })
          const resp = await dataa.json();
          console.log(resp);
        }
      } else {
        val = {
          userId: updateduser._id,
          totalSubmissions: updateduser.totalSubmissions + 1,
          score: updateduser.score,
          correctAns: updateduser.correctAns,
          wrongAns: updateduser.wrongAns + 1,
          submittedQuestions: {
            question: allQuestions[currentQuestion]._id,
            correctAns: false,
            date: todaysdate
          }
        }
        const data = await fetch(`http://localhost:8000/user/submittedans/${userData._id}`, {
          method: "PUT",
          body: JSON.stringify(val),
          headers: {
            "Content-type": "application/json"
          }
        })
        const res = await data.json();
        console.log(res);
      }
    }
  };

  return (
    <div>
      <Header />
      <div className="detail-side">
        <div className="que-side">
          <div className="detail-one">
            <div className="line-one">
              <div className="main-detail">
                <div className="detail-title">{allQuestions && allQuestions[currentQuestion].uniqueId}</div>
                <div className="detail-title">{allQuestions && allQuestions[currentQuestion].title}</div>
              </div>
              <div className="detail-icons">
                <div className="icon-line1">
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
                </div>
              </div>
            </div>

            <div className="line-two">
              <p className="que-descr">{allQuestions && allQuestions[currentQuestion].question}</p>
            </div>
            <p className="answer">Your Answer</p>
            {
              allQuestions && allQuestions[currentQuestion].answerType === "text"
                ?
                <div className="answer">
                  <input type="text" className="ans-field" onChange={(e) => setAnswer(e.target.value)} />
                </div>
                :
                <div className="options">
                  {allQuestions && allQuestions[currentQuestion].options.map((option, i) => (
                    <div className="disp-radio" key={i}>
                      <input type="radio" value={option} name="option" onChange={() => setAnswer(option)} />
                      <p className="input-pin">{option}</p>
                    </div>
                  ))}
                </div>
            }

            <div className="align-btn">
              <button className="submit" onClick={ansSubmitHandler}>Submit</button>
              {
                showAns && <button className="show">Show Answer</button>
              }
            </div>
          </div>

          <div className="buttons">
            <button className="prev" onClick={handlePrevious}>
              <IoIosArrowBack fontSize={20} />
              Prev</button>
            <p className="nums">1/120</p>
            <button className="next" onClick={handleNext}>Next
              <IoIosArrowForward fontSize={20} />
            </button>
          </div>
        </div>

        <div className="detail-two"></div>
      </div >
    </div >
  );
}

export default QueDetail;
