import React, { useEffect, useState } from "react";
import Header from "./Header";
import "./QueDetail.css";
import katex from "katex";
import remarkMath from "remark-math";
import "katex/dist/katex.min.css";
import { InlineMath, BlockMath } from "react-katex";
import gfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import rehypeKatex from "rehype-katex";
import ReactMarkdown from "react-markdown";
import {
  IoIosArrowBack,
  IoIosArrowForward,
  IoMdArrowDropright,
} from "react-icons/io";
import { AiOutlineMail } from "react-icons/ai";
import { GrNote } from "react-icons/gr";
import { BiCategory } from "react-icons/bi";
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
import { RiShieldStarLine } from "react-icons/ri";
import Modal from "react-bootstrap/Modal";
import { AiFillStar } from "react-icons/ai";
import { log } from "util";

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
  const [open4, setOpen4] = useState(false);
  const [correctAns, setCorrectAns] = useState();
  const [wrongAns, setWrongAns] = useState();
  const [hide, setHide] = useState(false);
  const [checkBadge, setCheckBadge] = useState(false);
  const [categories, setCategories] = useState([]);
  const [categoryQuestions, setCategoryQuestions] = useState();
  const [chooseCategory, setChooseCategory] = useState(false);
  const [categoryCss, setCategoryCss] = useState();
  const [showModal, setShowModal] = useState(false);

  const [badge, setBadge] = useState();
  const [star1, setStar1] = useState(false);
  const [star2, setStar2] = useState(false);
  const [star3, setStar3] = useState(false);
  const [star4, setStar4] = useState(false);
  const [star5, setStar5] = useState(false);
  const [loading, setLoading] = useState(false);

  const user = JSON.parse(localStorage.getItem("quantuser"));

  const today = new Date();
  const yyyy = today.getFullYear();
  let mm = today.getMonth() + 1; // Months start at 0!
  let dd = today.getDate();
  if (dd < 10) dd = "0" + dd;
  if (mm < 10) mm = "0" + mm;
  const todaysdate = dd + "/" + mm + "/" + yyyy;

  const deselectRadio = () => {
    let allRadio = document.querySelectorAll("#my-radio");
    allRadio.forEach((value) => (value.checked = false));
  };

  const handlePreviousButtonClick = () => {
    setAnswer("");
    setShowAns(false);
    setCorrectAns(false);
    setWrongAns(false);
    const previousQuestion = currentQuestion - 1;
    if (previousQuestion >= 0) {
      setCurrentQuestion(previousQuestion);
    }
    setHide(false);
    deselectRadio();
    setHide(false);
  };

  const handleNextButtonClick = () => {
    setAnswer("");
    setShowAns(false);
    setCorrectAns(false);
    setWrongAns(false);
    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < allQuestions.length) {
      setCurrentQuestion(nextQuestion);
    }
    deselectRadio();
    setHide(false);
  };

  const isPreviousDisabled = currentQuestion === 0;
  const isNextDisabled = chooseCategory
    ? categoryQuestions && currentQuestion === categoryQuestions.length - 1
    : allQuestions && currentQuestion === allQuestions.length - 1;

  const fetchQuestions = async () => {
    const data = await fetch(`http://localhost:8000/question/getallquestions`);
    const res = await data.json();
    // console.log(location.state.id,"jhhjhjjhj");
    res &&
      res.map((ques, i) => {
        if (ques._id == location.state.id) {
          setCurrentQuestion(i);
        }
      });
    setAllquestions(res);
    let category = [];
    res.map((data) => {
      if (!category.includes(data.category)) {
        category.push(data.category);
      }
    });
    setCategories(category);
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
      const data = await fetch(
        `http://localhost:8000/question/getquestions/category/${category}`
      );
      const res = await data.json();
      setCategoryQuestions(res);
      setCurrentQuestion(0);
      setChooseCategory(true);
    }
  };

  useEffect(() => {
    fetchQuestions();
    fetchUser();
    // fetchCategories();
  }, []);

  const ansSubmitHandler = async () => {
    setLoading(true);
    if (!user) {
      alert("Please login to practice!");
      window.location.href = "/login";
      return;
    }

    const a = await fetch(`http://localhost:8000/user/${user.id}`);
    const updateduser = await a.json();
    // console.log(updateduser, "updateduser1");
    let score;

    if (
      chooseCategory
        ? categoryQuestions[currentQuestion].difficulty === "hard"
        : allQuestions[currentQuestion].difficulty === "hard"
    ) {
      score = 5;
    } else if (
      chooseCategory
        ? categoryQuestions[currentQuestion].difficulty === "medium"
        : allQuestions[currentQuestion].difficulty === "medium"
    ) {
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
      setLoading(false);
      let val;
      let ans = answer.replace(/ /g, "");
      let correctanswer = chooseCategory
        ? categoryQuestions[currentQuestion].answer.replace(/ /g, "")
        : allQuestions[currentQuestion].answer.replace(/ /g, "");
      // console.log(ans.toLowerCase(),correctanswer.toLowerCase());
      if (ans.toLowerCase() == correctanswer.toLowerCase()) {
        setCorrectAns(true);
        setWrongAns(false);
        status = "correct";
        quesAcceptance = 1;
        // console.log("correctanswer");

        val = {
          userId: updateduser._id,
          score: updateduser.score + score,
          totalSubmissions: updateduser.totalSubmissions + 1,
          correctAns: updateduser.correctAns + 1,
          wrongAns: updateduser.wrongAns,
          submittedQuestions: {
            question: chooseCategory
              ? categoryQuestions[currentQuestion]._id
              : allQuestions[currentQuestion]._id,
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
        // console.log(updateUser, "updateduser2");
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
            question: chooseCategory
              ? categoryQuestions[currentQuestion]._id
              : allQuestions[currentQuestion]._id,
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
        // console.log(res, "wrong");
      }

      // set questions submission and accepted value
      const quesValue = {
        submission: chooseCategory
          ? categoryQuestions[currentQuestion].submission + quesSubmission
          : allQuestions[currentQuestion].submission + quesSubmission,
        accepted: chooseCategory
          ? categoryQuestions[currentQuestion].accepted + quesAcceptance
          : allQuestions[currentQuestion].accepted + quesAcceptance,
      };

      // update question for submissions and acceptance
      const updateQues = await fetch(
        `http://localhost:8000/question/updateans/${
          chooseCategory
            ? categoryQuestions[currentQuestion]._id
            : allQuestions[currentQuestion]._id
        }`,
        {
          method: "PUT",
          body: JSON.stringify(quesValue),
          headers: {
            "Content-type": "application/json",
          },
        }
      );
      const updatedResp = await updateQues.json();
      // console.log(updatedResp, "3")

      // update current question status
      const userUpdation = {
        questionId: chooseCategory
          ? categoryQuestions[currentQuestion]._id
          : allQuestions[currentQuestion]._id,
        category: chooseCategory
          ? categoryQuestions[currentQuestion].category
          : allQuestions[currentQuestion].category,
        status: status,
      };
      const updateUser = await fetch(
        `http://localhost:8000/user/update/ans/status/${userData._id}/${
          chooseCategory
            ? categoryQuestions[currentQuestion]._id
            : allQuestions[currentQuestion]._id
        }`,
        {
          method: "PUT",
          body: JSON.stringify(userUpdation),
          headers: {
            "Content-type": "application/json",
          },
        }
      );
      const updatedUserResp = await updateUser.json();
      // console.log(updatedUserResp, "kmjbvtfcrdt");

      // update badge status
      let count = 0;
      updatedUserResp.currentAttempted.map((ques) => {
        if (ques.status == "correct") {
          count++;
        }
      });
      // console.log(count, "countttttt");
      let badgeval = {};
      let highestCount = updatedUserResp.highestCount;
      if (count >= 0 && count <= 100) {
        if (count == 2) {
          setBadge("Bronze");
          setStar1(true);
          if (count > highestCount) {
            setShowModal(true);
          }
          badgeval = { name: "bone", status: true };
        } else if (count == 1) {
          badgeval = { name: "bone", status: false };
        }
        if (count == 4) {
          setBadge("Bronze");
          setStar2(true);
          if (count > highestCount) {
            setShowModal(true);
          }
          badgeval = { name: "btwo", status: true };
        } else if (count == 3) {
          badgeval = { name: "btwo", status: false };
        }
        if (count == 6) {
          setBadge("Bronze");
          setStar3(true);
          if (count > highestCount) {
            setShowModal(true);
          }
          badgeval = { name: "bthree", status: true };
        } else if (count == 5) {
          badgeval = { name: "bthree", status: false };
        }
        if (count == 8) {
          setBadge("Bronze");
          setStar4(true);
          if (count > highestCount) {
            setShowModal(true);
          }
          badgeval = { name: "bfour", status: true };
        } else if (count == 7) {
          badgeval = { name: "bfour", status: false };
        }
        if (count == 10) {
          setBadge("Bronze");
          setStar5(true);
          if (count > highestCount) {
            setShowModal(true);
          }
          badgeval = { name: "bfive", status: true };
        } else if (count == 9) {
          badgeval = { name: "bfive", status: false };
        }
        if (count == 11) {
          setBadge("Silver");
          setStar1(true);
          if (count > highestCount) {
            setShowModal(true);
          }
          badgeval = { name: "sone", status: true };
        } else if (count == 9) {
          badgeval = { name: "sone", status: false };
        }
        // if (count == 10) {
        //     setBadge("Bronze"); setStar1(true);
        //     if(count>highestCount){
        //       setShowModal(true);
        //     }
        //     badgeval = { name: "bone", status: true }
        //   } else if (count >=0 && count<10) {
        //     badgeval = { name: "bone", status: false }
        //   }else if (count == 20) {
        //     setBadge("Bronze"); setStar2(true);
        //     if(count>highestCount){
        //       setShowModal(true);
        //     }
        //     badgeval = { name: "btwo", status: true }
        //   } else if (count <20 && count>10) {
        //     badgeval = { name: "btwo", status: false }
        //   }else if (count == 30) {
        //     setBadge("Bronze"); setStar3(true);
        //     if(count>highestCount){
        //       setShowModal(true);
        //     }
        //     badgeval = { name: "bthree", status: true }
        //   } else if (count >20 && count<30) {
        //     badgeval = { name: "bthree", status: false }
        //   }else if (count == 40) {
        //     setBadge("Bronze"); setStar4(true);
        //     if(count>highestCount){
        //       setShowModal(true);
        //     }
        //     badgeval = { name: "bfour", status: true }
        //   } else if (count >30 && count<40) {
        //     badgeval = { name: "bfour", status: false }
        //   }else if (count == 50) {
        //     setBadge("Bronze"); setStar5(true);
        //     if(count>highestCount){
        //       setShowModal(true);
        //     }
        //     badgeval = { name: "bfive", status: true }
        //   } else if (count >40 && count<50) {
        //     badgeval = { name: "bfive", status: false }
        //   }else if (count == 80) {
        //     setBadge("Silver"); setStar1(true);
        //     if(count>highestCount){
        //       setShowModal(true);
        //     }
        //     badgeval = { name: "sone", status: true }
        //   } else if (count >40 && count<50) {
        //     badgeval = { name: "sone", status: false }
        //   }else if (count == 100) {
        //     setBadge("Silver"); setStar2(true);
        //     if(count>highestCount){
        //       setShowModal(true);
        //     }
        //     badgeval = { name: "stwo", status: true }
        //   } else if (count >40 && count<50) {
        //     badgeval = { name: "sthree", status: false }
        //   }
      }
      if (count > 100 && count <= 250) {
        if (count == 120) {
          setBadge("Silver");
          setStar3(true);
          setShowModal(true);
          badgeval = { name: "sthree", status: true };
        } else if (count > 100 && count < 120) {
          badgeval = { name: "sthree", status: false };
        } else if (count == 140) {
          setBadge("Silver");
          setStar4(true);
          setShowModal(true);
          badgeval = { name: "sfour", status: true };
        } else if (count > 120 && count < 140) {
          badgeval = { name: "sfour", status: false };
        } else if (count == 160) {
          setBadge("Silver");
          setStar5(true);
          setShowModal(true);
          badgeval = { name: "sfive", status: true };
        } else if (count > 140 && count < 160) {
          badgeval = { name: "sfive", status: false };
        } else if (count == 220) {
          setBadge("Gold");
          setStar1(true);
          badgeval = { name: "gone", status: true };
        } else if (count > 160 && count < 220) {
          badgeval = { name: "gone", status: false };
        } else if (count == 250) {
          setBadge("Gold");
          setStar2(true);
          badgeval = { name: "gtwo", status: true };
        } else if (count > 220 && count < 250) {
          badgeval = { name: "gtwo", status: false };
        }
      }
      if (count > 250 && count <= 420) {
        if (count == 280) {
          setBadge("Gold");
          setStar3(true);
          badgeval = { name: "gthree", status: true };
        } else if (count > 250 && count < 280) {
          badgeval = { name: "gthree", status: false };
        }
        if (count == 310) {
          setBadge("Gold");
          setStar4(true);
          badgeval = { name: "gfour", status: true };
        } else if (count > 280 && count < 310) {
          badgeval = { name: "gfour", status: false };
        }
        if (count == 340) {
          setBadge("Gold");
          setStar5(true);
          badgeval = { name: "gfive", status: true };
        } else if (count > 310 && count < 340) {
          badgeval = { name: "gfive", status: false };
        }
        if (count == 420) {
          setBadge("Platinum");
          setStar1(true);
          badgeval = { name: "pone", status: true };
        } else if (count > 340 && count < 420) {
          badgeval = { name: "pone", status: false };
        }
      }
      if (count > 420 && count <= 600) {
        if (count == 465) {
          setBadge("Platinum");
          setStar2(true);
          badgeval = { name: "ptwo", status: true };
        } else if (count > 420 && count < 465) {
          badgeval = { name: "ptwo", status: false };
        }
        if (count == 510) {
          setBadge("Platinum");
          setStar3(true);
          badgeval = { name: "pthree", status: true };
        } else if (count > 465 && count < 510) {
          badgeval = { name: "pthree", status: false };
        }
        if (count == 555) {
          setBadge("Platinum");
          setStar4(true);
          badgeval = { name: "pfour", status: true };
        } else if (count > 510 && count < 555) {
          badgeval = { name: "pfour", status: false };
        }
        if (count == 600) {
          setBadge("Platinum");
          setStar5(true);
          badgeval = { name: "pfive", status: true };
        } else if (count > 555 && count < 600) {
          badgeval = { name: "pfive", status: false };
        }
      }
      let badgeCountVal = {};
      if (count > highestCount) {
        badgeCountVal = {
          count: count,
          badgeval,
        };
      } else if (Object.keys(badgeval).length !== 0) {
        badgeCountVal = {
          badgeval,
        };
      }
      // console.log(badgeval,count,highestCount);

      const updatebadge = await fetch(
        `http://localhost:8000/user/update/badge/status/${userData._id}`,
        {
          method: "PUT",
          body: JSON.stringify(badgeCountVal),
          headers: {
            "Content-type": "application/json",
          },
        }
      );
      const badgeres = await updatebadge.json();
      // console.log(badgeres)
    }
    
  };

  const showMyAnswer = () => {
    setShowAns(!showAns);
    setHide(!hide);
  };

  // window.onload('DOMContentLoaded',()=>{
  //   let mathOutput=document.querySelector('#explain-convert');
  //   mathOutput.innerHtml=katex.renderToString(`${allQuestions && allQuestions[currentQuestion].explanation}`)
  //   console.log("hghfghb");
  // })

  // const formatted=katex.renderToString(`${allQuestions && allQuestions[currentQuestion].explanation}`);

  const formatted = chooseCategory
    ? categoryQuestions[currentQuestion] &&
      categoryQuestions[currentQuestion].explanation
    : allQuestions && allQuestions[currentQuestion].explanation;

  const equ =
    "This is a Markdown paragraph with an inline equation: $x = y^2$, and a block equation:\n\n$$\n\\int_0^\\infty x^2 dx\n$$";

  const customRenderers = {
    html: ({ value }) => {
      return <div dangerouslySetInnerHTML={{ __html: value }} />;
    },
    inlineMath: ({ value }) => {
      return <InlineMath math={value} />;
    },
    math: ({ value }) => {
      return <BlockMath math={value} />;
    },
  };

  const Crenderers = {
    inlineMath: ({ value }) => {
      const html = katex.renderToString(value);
      return <span dangerouslySetInnerHTML={{ __html: html }} />;
    },
    math: ({ value }) => {
      const html = katex.renderToString(value);
      return <div dangerouslySetInnerHTML={{ __html: html }} />;
    },
  };

  const openNav = () => {
    document.getElementById("mySidebar").style.width = "300px";
    document.getElementById("main").style.marginLeft = "300px";
  };

  const openMobNav = () => {
    document.getElementById("myMobSidebar").style.width = "100vw";
    document.getElementById("main").style.marginLeft = "0px";
  };

  const closeMobNav = () => {
    document.getElementById("myMobSidebar").style.width = "0";
    document.getElementById("main").style.marginLeft = "0";
  };
  const closeNav = () => {
    document.getElementById("mySidebar").style.width = "0";
    document.getElementById("main").style.marginLeft = "0";
  };

  return (
    <div>
      <Header />
      <div id="main" className="detail-side">
        <div className="que-side">
          <div id="main">
            <button className="openbtn mob-btn" onClick={openMobNav}>
              <MdFormatListBulleted style={{ marginTop: "4px" }} size="20" />{" "}
              Categories
            </button>
          </div>
          <div id="main">
            <button className="openbtn web-btn" onClick={openNav}>
              <MdFormatListBulleted style={{ marginTop: "4px" }} size="20" />{" "}
              Categories
            </button>
          </div>
          <div className="detail-one">
            <div className="line-one">
              <div className="main-detail">
                <div className="detail-title">
                  {chooseCategory
                    ? categoryQuestions[currentQuestion] && currentQuestion + 1
                    : allQuestions && currentQuestion + 1}
                  .
                </div>
                <div className="detail-title quest-title">
                  {chooseCategory
                    ? categoryQuestions[currentQuestion] &&
                      categoryQuestions[currentQuestion].title
                    : allQuestions && allQuestions[currentQuestion].title}
                </div>
              </div>
              <div className="detail-icons">
                <div className="catopenbtn">
                  <BiCategory size="20" style={{ marginTop: "3px" }} />
                  {chooseCategory
                    ? categoryQuestions &&
                      categoryQuestions[currentQuestion].category
                    : allQuestions && allQuestions[currentQuestion].category}
                </div>
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
                {chooseCategory
                  ? categoryQuestions[currentQuestion] &&
                    categoryQuestions[currentQuestion].question
                  : allQuestions && allQuestions[currentQuestion].question}
              </p>
            </div>
            <p className="answer">Your Answer</p>
            {chooseCategory ? (
              categoryQuestions[currentQuestion] &&
              categoryQuestions[currentQuestion].answerType == "Text" ? (
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
                      setHide(false);
                    }}
                  />
                </div>
              ) : (
                <div className="options">
                  {categoryQuestions[currentQuestion].options.map(
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
                              setHide(false);
                            }}
                          />
                          <p className="input-pin">{option}</p>
                        </div>
                      )
                  )}
                </div>
              )
            ) : allQuestions &&
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
                    setHide(false);
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
                              setHide(false);
                            }}
                          />
                          <p className="input-pin">{option}</p>
                        </div>
                      )
                  )}
              </div>
            )}

            <div className="align-btn">
              <button className="submit">
                {loading ? (
                  <div
                    className="spinner-border text-white"
                    role="status"
                    style={{ height: "15px", width: "15px" }}
                  >
                    <span className="visually-hidden">Loading...</span>
                  </div>
                ) : (
                  <div id="submit" onClick={ansSubmitHandler}>
                    Submit
                  </div>
                )}
              </button>
              
              {correctAns && (
                <p className="correct-ans-style">Correct Answer</p>
              )}
              {wrongAns && (
                <>
                  <button className="show-ans-btn" onClick={showMyAnswer}>
                    {hide ? "Hide Answer" : "View Answer"}
                  </button>
                  <p className="wrong-ans-style">Wrong Answer</p>
                </>
              )}
            </div>

            <div className="show-my-ans">
              {showAns && (
                <div className="ans-show1">
                  <div className="show-ans">Correct Answer :</div>
                  <div className="correct-ans">
                    {chooseCategory
                      ? categoryQuestions[currentQuestion] &&
                        categoryQuestions[currentQuestion].answer
                      : allQuestions && allQuestions[currentQuestion].answer}
                  </div>
                </div>
              )}
            </div>

            <div>
              {showAns && (
                <div className="explain">
                  <div className="explain-head">Explanation:</div>
                  <div className="explain-cont">
                    {/* <ReactMarkdown id="explain-convert" style={{ justifyContent: "left" }}>{chooseCategory ? categoryQuestions[currentQuestion] && categoryQuestions[currentQuestion].explanation : allQuestions && allQuestions[currentQuestion].explanation}</ReactMarkdown> */}
                    {/* <div style={{fontStyle:"normal"}} dangerouslySetInnerHTML={{__html: formatted}}></div> */}

                    {/* <ReactMarkdown
                   children= {chooseCategory ? categoryQuestions[currentQuestion] && katex.renderToString(categoryQuestions[currentQuestion].explanation) : allQuestions && katex.renderToString(allQuestions[currentQuestion].explanation)}
                  //  children= {chooseCategory ? categoryQuestions[currentQuestion] && !String ? katex.renderToString(categoryQuestions[currentQuestion].explanation):categoryQuestions[currentQuestion].explanation : allQuestions && !String ? katex.renderToString(allQuestions[currentQuestion].explanation):allQuestions[currentQuestion].explanation}
                  //  dangerouslySetInnerHTML={{__html: `${chooseCategory ? categoryQuestions[currentQuestion] && katex.renderToString(categoryQuestions[currentQuestion].explanation) : allQuestions && katex.renderToString(allQuestions[currentQuestion].explanation)}`}}
                   plugins={[remarkMath]}
                  //  renderers={renderers}           
                   remarkPlugins={[gfm]}
                   rehypePlugins={[rehypeRaw]} 
                   style={{justifyContent:"left"}} >
                  </ReactMarkdown> */}

                    <ReactMarkdown
                      plugins={[remarkMath]}
                      remarkPlugins={[gfm]}
                      rehypePlugins={[rehypeRaw]}
                      children={formatted}
                      skipHtml={false}
                      renderers={customRenderers}
                    />

                    {/* <ReactMarkdown plugins={[remarkMath]} renderers={Crenderers} escapeHtml={false}>
              {equ}
            </ReactMarkdown> */}

                    {/* <ReactMarkdown
                      children= {chooseCategory ? categoryQuestions[currentQuestion] && categoryQuestions[currentQuestion].explanation : allQuestions[currentQuestion] && allQuestions[currentQuestion].explanation}
                      // dangerouslySetInnerHTML={{__html: `${chooseCategory ? categoryQuestions[currentQuestion] && categoryQuestions[currentQuestion].explanation : allQuestions[currentQuestion] && allQuestions[currentQuestion].explanation}`}}
                      plugins={[gfm,remarkMath,rehypeKatex,rehypeRaw]}
                      style={{ justifyContent: "left" }}
                      renderers={{
                        math: ({ value }) => {
                            console.log("math equation");
                            return {value} 
                        },
                        inlineMath: ({ value }) =>{
                            console.log("inlineMath equation");
                            return {value}
                        }
                    }}
                      // renderers={{
                      //   renderers,
                      //   math: ({ value }) => <BlockMath>{value}</BlockMath>,
                      //   inlineMath: ({ value }) => <InlineMath>{value}</InlineMath>
                      // }} 
                    /> */}
                  </div>
                </div>
              )}
            </div>
          </div>

          <div id="mySidebar" className="web-sidebar">
            <div className="closebtn " onClick={closeNav}>
              ×
            </div>
            <div className="all-side">
              <div className="all-categ">Categories</div>
              <div
                className={
                  categoryCss == "All"
                    ? "categoryonclick categoryClicked"
                    : "categoryonclick"
                }
                onClick={() => {
                  fetchCategoryWiseQuestions("All");
                  setShowAns(false);
                  setCorrectAns(false);
                  setAnswer("");
                  setWrongAns(false);
                  deselectRadio();
                  setHide(false);
                }}
              >
                <IoMdArrowDropright size="25" />
                All
              </div>
              {categories.length > 0 &&
                categories.map((data) => (
                  <div
                    className={
                      categoryCss == data
                        ? "categoryonclick categoryClicked"
                        : "categoryonclick"
                    }
                    onClick={() => {
                      fetchCategoryWiseQuestions(data);
                      setShowAns(false);
                      setCorrectAns(false);
                      setAnswer("");
                      setWrongAns(false);
                      deselectRadio();
                      setHide(false);
                    }}
                  >
                    <IoMdArrowDropright size="25" />
                    {data}
                  </div>
                ))}
            </div>
          </div>

          <div id="myMobSidebar" className="mob-sidebar">
            <div className="closebtn" onClick={closeMobNav}>
              ×
            </div>
            <div className="all-side">
              <div className="all-categ">Categories</div>
              <div
                className={
                  categoryCss === "All"
                    ? "categoryonclick categoryClicked"
                    : "categoryonclick"
                }
                onClick={() => {
                  fetchCategoryWiseQuestions("All");
                  closeMobNav();
                }}
              >
                <IoMdArrowDropright size="25" />
                All
              </div>
              {categories.length > 0 &&
                categories.map((data) => (
                  <div
                    className={
                      categoryCss === data
                        ? "categoryonclick categoryClicked"
                        : "categoryonclick"
                    }
                    onClick={() => {
                      fetchCategoryWiseQuestions(data);
                      closeMobNav();
                    }}
                  >
                    <IoMdArrowDropright size="25" />
                    {data}
                  </div>
                ))}
            </div>
          </div>

          <div className="disp-sidebar">
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
                {chooseCategory
                  ? categoryQuestions[currentQuestion] &&
                    categoryQuestions.length
                  : allQuestions && allQuestions && allQuestions.length}
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
                    {userData && chooseCategory ? (
                      userData &&
                      userData.currentAttempted.some(
                        (data) =>
                          data.questionId ===
                          categoryQuestions[currentQuestion]._id
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
                              data.status === "wrong" && (
                                <div>{data.status}</div>
                              )}
                          </>
                        ))
                      ) : (
                        <div>Unsolved</div>
                      )
                    ) : userData &&
                      userData.currentAttempted.some(
                        (data) =>
                          data.questionId === allQuestions[currentQuestion]._id
                      ) ? (
                      userData &&
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
                    )}
                  </div>
                </div>
                <div className="my-detail">
                  <div className="status-detail">Difficulty:</div>
                  <div
                    className={
                      chooseCategory
                        ? categoryQuestions[currentQuestion].difficulty ===
                          "easy"
                          ? "success-de"
                          : categoryQuestions[currentQuestion].difficulty ===
                            "hard"
                          ? "danger-de"
                          : "medium-de"
                        : allQuestions[currentQuestion].difficulty === "easy"
                        ? "success-de"
                        : allQuestions[currentQuestion].difficulty === "hard"
                        ? "danger-de"
                        : "medium-de"
                    }
                  >
                    {chooseCategory
                      ? categoryQuestions[currentQuestion].difficulty
                      : allQuestions[currentQuestion].difficulty}
                  </div>
                </div>
                <div className="my-detail">
                  <div className="status-detail">Submitted:</div>
                  <div>
                    {chooseCategory
                      ? categoryQuestions[currentQuestion].submission
                      : allQuestions[currentQuestion].submission}
                  </div>
                </div>
                <div className="my-detail">
                  <div className="status-detail">Accepted:</div>
                  <div>
                    {chooseCategory
                      ? categoryQuestions[currentQuestion].accepted
                      : allQuestions[currentQuestion].accepted}
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="detail-box1">
            <div className="open-detail" onClick={() => setOpen2(!open2)}>
              <div className="gap-detail">
                <BiCategory className="info-icon" />
                Category
              </div>
              <IoMdArrowDropdown className="drop-detail" size="20" />
            </div>
            {open2 && (
              <div className="main-tags">
                <div className="all-firms">
                  <div className="tag-item">
                    {chooseCategory
                      ? categoryQuestions[currentQuestion].category
                      : allQuestions[currentQuestion].category}
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="detail-box1">
            <div className="open-detail" onClick={() => setOpen4(!open4)}>
              <div className="gap-detail">
                <FaTags className="info-icon" />
                Tags
              </div>
              <IoMdArrowDropdown className="drop-detail" size="20" />
            </div>
            {open4 && (
              <div className="main-tags">
                <div className="all-firms"></div>
                {chooseCategory
                  ? categoryQuestions[currentQuestion].tags.map((item) => (
                      <div className="all-firms">
                        <div className="tag-item">{item}</div>
                      </div>
                    ))
                  : allQuestions[currentQuestion].tags.map((item) => (
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
                {chooseCategory
                  ? categoryQuestions[currentQuestion].firms.map((item) => (
                      <div className="all-firms">
                        <div className="tag-item">{item}</div>
                      </div>
                    ))
                  : allQuestions[currentQuestion].firms.map((item) => (
                      <div className="all-firms">
                        <div className="tag-item">{item}</div>
                      </div>
                    ))}
              </div>
            )}
          </div>
        </div>
      </div>
      <Modal
        backdrop="static"
        // style={{borderRadius:"20px"}}
        show={showModal}
        className="congo-modal"
        onHide={() => setShowModal(false)}
      >
        <Modal.Body>
          <div className="congo-box">
            <div className="closemod" onClick={() => setShowModal(false)}>
              x
            </div>
            <div className="congrats">Congratulations!</div>
            <div className="show-badge">
              <div
                className={
                  badge == "Bronze"
                    ? "hex bronze"
                    : badge == "Silver"
                    ? "hex silver"
                    : badge == "Gold"
                    ? "hex gold"
                    : "hex platinum"
                }
              >
                <div className="gold-tag">{badge}</div>
                <div className="shield">
                  <RiShieldStarLine />
                </div>
                <div class="ribbon">
                  <AiFillStar
                    className={
                      star1 || star2 || star3 || star4 || star5
                        ? "star"
                        : "star star-class"
                    }
                  />
                  <AiFillStar
                    className={
                      star2 || star3 || star4 || star5
                        ? "star"
                        : "star star-class"
                    }
                  />
                  <AiFillStar
                    className={
                      star3 || star4 || star5 ? "star" : "star star-class"
                    }
                  />
                  <AiFillStar
                    className={star4 || star5 ? "star" : "star star-class"}
                  />
                  <AiFillStar className={star5 ? "star" : "star star-class"} />
                </div>
              </div>
            </div>
            <div className="first-star">
              {`You have received ${
                star1
                  ? "1st"
                  : star2
                  ? "2nd"
                  : star3
                  ? "3rd"
                  : star4
                  ? "4th"
                  : "5th"
              } star of ${badge} Badge 🏅`}
            </div>
            <button
              className="thanks"
              onClick={() => {
                setShowModal(false);
                setBadge("");
                setStar1(false);
                setStar2(false);
                setStar3(false);
                setStar4(false);
                setStar5(false);
              }}
            >
              Ok Thanks!
            </button>
          </div>
        </Modal.Body>
      </Modal>

      <svg
        style={{ position: "absolute", width: 0, height: 0 }}
        xmlns="http://www.w3.org/2000/svg"
        version="1.1"
      >
        <defs>
          <filter id="goo">
            <feGaussianBlur in="SourceGraphic" stdDeviation="8" result="blur" />
            {/* <feDropShadow dx="0.2" dy="0.4" stdDeviation="0.2"/> */}
            {/* <feDropShadow dx="0.2" dy="0.4" stdDeviation="0.2" flood-opacity="0.3" /> */}
            <feColorMatrix
              // in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9"
              result="goo"
            />
            <feComposite in="SourceGraphic" in2="goo" operator="atop" />
          </filter>
        </defs>
      </svg>
    </div>
  );
}

export default QueDetail;
