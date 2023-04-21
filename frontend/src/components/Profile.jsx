import React, { useEffect, useState } from "react";
import Header from "./Header";
import { Link } from "react-router-dom";
import { ImCross } from "react-icons/im";
import { FaLock } from "react-icons/fa";
import { FaLockOpen } from "react-icons/fa";
import { GiProgression } from "react-icons/gi";
import "./Profile.css";
import progress from "../images/progress.png";
import { TiTick } from "react-icons/ti";
import { RiShieldStarLine } from "react-icons/ri";
import { AiFillStar } from "react-icons/ai";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

import { CategoryScale, LinearScale, BarElement, Title } from "chart.js";
import { Bar } from "react-chartjs-2";

function Profile() {
  const [userData, setUserData] = useState();
  const [questions, setQuestions] = useState();
  const [submittedQuestions, setSubmittedQuestions] = useState();
  const [rank, setRank] = useState([]);
  const [categories, setCategories] = useState([]);
  const user = JSON.parse(localStorage.getItem("quantuser"));
  const [show, setShow] = useState(false);

  // correct and wrong answers
  const correct = [],
    wrong = [];
  userData &&
    userData.currentAttempted.map((data) => {
      if (data.status == "correct") {
        correct.push(data);
      } else {
        wrong.push(data);
      }
    });

  // find weakness of a user
  let weaknessarray = [], weakness = [];
  categories.length > 0 && userData &&
    categories.map((category) => {
      let wrongquescount = 0;
      let categorycount = 0;
      let val;
      userData.currentAttempted.map((current) => {
        if (category.name == current.category) {
          categorycount = categorycount + 1
        }
        if (category.name == current.category && current.status == 'wrong') {
          wrongquescount = wrongquescount + 1
        }
      })

      // console.log(category.name, wrongquescount, categorycount);
      if (wrongquescount >= (60 * categorycount) / 100 && wrongquescount > 0) {
        // console.log(wrongquescount, (60 * categorycount) / 100);
        weaknessarray.push({
          category: category.name,
          count: wrongquescount,
          color: category.color
        })
      }
    })

  // weaknessarray.push({
  //   category: "Aptitude",
  //   count: 8,
  //   color: "color"
  // })
  // weaknessarray.push({
  //   category: "reasoning",
  //   count: 5,
  //   color: "color"
  // })
  // weaknessarray.push({
  //   category: "1",
  //   count: 7,
  //   color: "color"
  // })
  // weaknessarray.push({
  //   category: "2",
  //   count: 7,
  //   color: "color"
  // })

  if (weaknessarray.length > 0) {
    if (weaknessarray.length > 2) {
      let sorted = weaknessarray.sort((p1, p2) => (p1.count < p2.count) ? 1 : (p1.count > p2.count) ? -1 : 0);
      // let i;
      // for (i = 0; i < sorted.length - 1; i++) {
      //   if (sorted[i].count != sorted[i + 1].count) {
      //     weakness.push(sorted[i]);
      //   }
      // }
      // console.log(sorted, "sorted")
      // sorted.slice(2, 5).map(data => {
      sorted.map(data => {
        weakness.push(data)
      })
      // console.log(weakness, "weakness");
    } else {
      weakness = weaknessarray;
    }
  }
  // console.log(weakness,"weakness")


  // fetch categories
  const fetchCategories = async () => {
    const data = await fetch(`http://localhost:8000/category/getcategories`);
    const res = await data.json();
    setCategories(res.category);
  }

  useEffect(() => {
    let score = [];
    const fetchData = async () => {
      const data = await fetch(
        `http://localhost:8000/user/get/all/attempted/question/${user.id}`
      );
      const res = await data.json();
      // console.log(res.badges.filter(obj=>obj.name=='bfour' && obj.status==true))
      setUserData(res);
      setSubmittedQuestions(res.submittedQuestions.reverse());
    };
    const fetchQuestions = async () => {
      const data = await fetch(
        `http://localhost:8000/question/getallquestions`
      );
      const res = await data.json();
      setQuestions(res);
    };
    const fetchScore = async () => {
      const data = await fetch(`http://localhost:8000/user/get/scores`);
      const res = await data.json();
      res &&
        res.map((data) => {
          score.push(data.score);
        });
      setRank(score.sort());
    };
    fetchData();
    fetchQuestions();
    fetchCategories()
    fetchScore();
  }, []);

  ChartJS.register(ArcElement, Tooltip, Legend);
  const data = {
    labels: ["Todo", "Solved", "Attempted"],
    datasets: [
      {
        label: "",
        data: [
          questions && questions.length,
          correct.length > 0 && correct.length,
          wrong && wrong.length,
        ],
        backgroundColor: ["#3f497f", "#539165", "#f7C04A"],
        // backgroundColor: ["#8da0cb", "#66c2a5", "rgb(81, 80, 80)"],
        borderWidth: 1,
      },
    ],
  };

  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip
    // Legend
  );

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
        position: 'right',
        label: {
          fullSize: true
        }
      },
      title: {
        display: false,
        text: 'Progress in Categories',
      },
      scales: {
        y: {
          beginAtZero: true
        }
      }
    },
  };

  let labels = [];
  weakness.length > 0 &&
    weakness.map((data) => {
      labels.push(data.category)
    })

  const data2 = {
    labels,
    datasets: [
      {
        // label: weakness.length>0 && weakness.map((data,i)=>data.category),
        data: labels.map((data, i) => weakness[i].count),
        backgroundColor: weakness.map((data, i) => weakness[i].color),
      }
    ],
  };

  function checkStatus(name){
    if(userData && userData.badges.filter(obj=>obj.name===name && obj.status===true).length>0){
      return true;
    }else{
      return false; 
    }
  }

  return (
    <div>
      <Header />
      <div className="profile-box">
        {/* <div className="last"></div> */}

        <div className="second-box">
          <div className="profile">
            <div className="pro">Profile</div>
            <div className="p-pro">
              <div className="pro-give">
                <p style={{ fontWeight: 600 }}>Name:</p>
                {userData && userData.name}{" "}
              </div>
              <div className="pro-give">
                <p style={{ fontWeight: 600 }}>Email:</p>{" "}
                {userData && userData.email}
              </div>
              <div className="pro-give">
                <p style={{ fontWeight: 600 }}>Contact:</p>{" "}
                {userData && userData.phoneNo}
              </div>
              {/* <div><p style={{ fontWeight: 600 }}>Background:</p></div>
              <div><p style={{ fontWeight: 600 }}>Degree:</p></div>
              <div><p style={{ fontWeight: 600 }}>Certifications:</p></div>
              <div><p style={{ fontWeight: 600 }}>Resume Keywords:</p></div> */}
            </div>
          </div>

          <div className="settings">
            <div className="pro">Performance</div>
            <div className="p-pro">
              <div className="pro-give">
                <p style={{ fontWeight: 600 }}> Score :</p>{" "}
                {userData && userData.score}
              </div>
              <div className="pro-give">
                {/* <p style={{ fontWeight: 600 }}> Highest Score : </p>{rank.length > 0 && rank[0]} */}
              </div>
            </div>
          </div>
        </div>

        <div className="second-box">
          <div className="profile">
            <div className="pro">
              <GiProgression className="prog" />
              Progress
            </div>
            <div className="pie-size">
              <Pie data={data} />
              <hr
                style={{
                  height: "1px",
                  borderwidth: "0",
                  color: "gray",
                  backgroundcolor: "gray",
                  marginTop: "15px",
                }}
              />
              <div className="defined">
                <div className="define-prog prog1">
                  <p>Todo</p>
                  <p style={{ textAlign: "center" }}>
                    {questions && questions.length}
                  </p>
                </div>

                <div className="define-prog prog2">
                  <p>Solved</p>
                  <p style={{ textAlign: "center" }}>
                    {correct && correct.length}
                  </p>
                </div>

                <div className="define-prog prog3">
                  <p>Attempted</p>
                  <p style={{ textAlign: "center" }}>{wrong && wrong.length}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="settings">
            <div className="pro">
              <img className="prog" src={progress} alt="" />
              Last 10 Questions
            </div>
            <div className="p-pro">
              <table className="table-size table-striped">
                <thead className="table-head">
                  <tr>
                    <th>Question</th>
                    <th>Correct</th>
                    <th>Date</th>
                  </tr>
                </thead>
                {submittedQuestions && submittedQuestions.length > 0 ? (
                  <tbody>
                    {submittedQuestions &&
                      submittedQuestions.slice(0, 10).map((data, i) => (
                        <tr key={i}>
                          {data.question &&
                          <Link to="/quedetail" style={{textDecoration:"none",color:"black"}} state={{ id: data.question._id }}><td className="que-co">{data.question.title}</td></Link>}
                          <td>
                            {data.correctAns ? (
                              <TiTick color="green" size={25} />
                            ) : (
                              <ImCross
                                className="imcross"
                                size={15}
                                color="red"
                              />
                            )}
                          </td>
                          <td>{data.date}</td>
                        </tr>
                      ))}
                  </tbody>
                ) : (
                  <tbody>
                    <tr>
                      <td className="no-data" colSpan="5">
                        No recent submissions
                      </td>
                    </tr>
                  </tbody>
                )}
              </table>
            </div>
          </div>
        </div>

        <div className="second-box">
          <div className="bar-profile">
            <div className="pro">Weakness</div>

            <div className="bar">
             { weakness.length>0 ?
              <Bar data={data2} options={options} style={{padding:"40px",fontSize:"18px"}} />
             :
             <div className="d-flex justify-content-center pb-5" style={{fontSize:"20px"}}>Attempt more questions to know your weak area.</div>
          } 
            </div>
          </div>
        </div>

        <div className="second-box">
          <div className="bar-profile">
            <div className="pro">Badges & Achievements</div>

            <div className="bar bar-web">
              <div>
                <div className="locking">
                  {
                    (checkStatus("bone") || checkStatus("btwo")  || checkStatus("bthree")  || checkStatus("bfour") ) && !checkStatus("bfive") ? <FaLockOpen size="25"/> : checkStatus("bfive") ? <FaLock className="notshow" /> : <FaLock size="25"/>
                  }
                </div>

                <div className={checkStatus("bone") ? "hex bronze": "hex bronze star-class"}>
                  <div className="gold-tag">Bronze</div>
                  <div className="shield">
                    <RiShieldStarLine />
                  </div>
                  <div className="ribbon">
                    <AiFillStar className={checkStatus("bone") ?'star active' :'star star-class'}  />
                    <AiFillStar className={checkStatus("btwo") ?'star active' :'star star-class'} />
                    <AiFillStar className={checkStatus("bthree") ?'star active' :'star star-class'} />
                    <AiFillStar className={checkStatus("bfour") ?'star active' :'star star-class'} />
                    <AiFillStar className={checkStatus("bfive") ?'star active' :'star star-class'} />
                  </div>
                </div>
              </div>


              <div>
                <div className="locking">{
                    (checkStatus("sone") || checkStatus("stwo")  || checkStatus("sthree")  || checkStatus("sfour") ) && !checkStatus("sfive")? <FaLockOpen size="25"/> : checkStatus("sfive") ? <FaLock className="notshow"/> : <FaLock size="25"/>
                  }</div>
                <div className={checkStatus("sone") ? "hex silver": "hex silver star-class"}>

                  <div className="gold-tag">Silver</div>
                  <div className="shield">
                    <RiShieldStarLine />
                  </div>
                  <div className="ribbon">
                    <AiFillStar className={checkStatus("sone") ?'star active' :'star star-class'} />
                    <AiFillStar className={checkStatus("stwo") ?'star active' :'star star-class'} />
                    <AiFillStar className={checkStatus("sthree") ?'star active' :'star star-class'} />
                    <AiFillStar className={checkStatus("sfour") ?'star active' :'star star-class'} />
                    <AiFillStar className={checkStatus("sfive") ?'star active' :'star star-class'} />
                  </div>
                </div>
              </div>

              <div>
                <div className="locking">{
                    (checkStatus("gone") || checkStatus("gtwo")  || checkStatus("gthree")  || checkStatus("gfour") ) && !checkStatus("gfive")? <FaLockOpen size="25"/> : checkStatus("gfive") ? <FaLock className="notshow"/> : <FaLock size="25"/>
                  }</div>
                <div className={checkStatus("gone") ? "hex gold": "hex gold star-class"}>
                  <div className="gold-tag">Gold</div>
                  <div className="shield">
                    <RiShieldStarLine />
                  </div>
                  <div className="ribbon">
                    <AiFillStar className={checkStatus("gone") ?'star active' :'star star-class'} />
                    <AiFillStar className={checkStatus("gtwo") ?'star active' :'star star-class'} />
                    <AiFillStar className={checkStatus("gthree") ?'star active' :'star star-class'} />
                    <AiFillStar className={checkStatus("gfour") ?'star active' :'star star-class'} />
                    <AiFillStar className={checkStatus("gfive") ?'star active' :'star star-class'} />
                  </div>
                </div>
              </div>

              <div>
                <div className="locking">{
                    (checkStatus("pone") || checkStatus("ptwo")  || checkStatus("pthree")  || checkStatus("pfour") ) && !checkStatus("pfive") ? <FaLockOpen size="25"/> : checkStatus("pfive") ? <FaLock className="notshow"/> : <FaLock size="25"/>
                  }</div>
                <div className={checkStatus("pone") ? "hex platinum": "hex platinum star-class"}>
                  <div className="gold-tag">Platinum</div>
                  <div className="shield">
                    <RiShieldStarLine />
                  </div>
                  <div className="ribbon">
                    <AiFillStar className={checkStatus("pone") ?'star active' :'star star-class'} />
                    <AiFillStar className={checkStatus("ptwo") ?'star active' :'star star-class'} />
                    <AiFillStar className={checkStatus("pthree") ?'star active' :'star star-class'} />
                    <AiFillStar className={checkStatus("pfour") ?'star active' :'star star-class'} />
                    <AiFillStar className={checkStatus("pfive") ?'star active' :'star star-class'} />
                  </div>
                </div>
              </div>

              <svg
                style={{ position: "absolute", width: 0, height: 0 }}
                xmlns="http://www.w3.org/2000/svg"
                version="1.1"
              >
                <defs>
                  <filter id="goo">
                    <feGaussianBlur
                      in="SourceGraphic"
                      stdDeviation="8"
                      result="blur"
                    />
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

            <div className="bar bar-ph">
              
              <div className="line1-badge">
              <div>
                <div className="locking">
                  {
                    (checkStatus("bone") || checkStatus("btwo")  || checkStatus("bthree")  || checkStatus("bfour") ) && !checkStatus("bfive") ? <FaLockOpen size="25"/> : checkStatus("bfive") ? <FaLock className="notshow" /> : <FaLock size="25"/>
                  }
                </div>

                <div className={checkStatus("bone") ? "hex bronze": "hex bronze star-class"}>
                  <div className="gold-tag">Bronze</div>
                  <div className="shield">
                    <RiShieldStarLine />
                  </div>
                  <div className="ribbon">
                    <AiFillStar className={checkStatus("bone") ?'star active' :'star star-class'}  />
                    <AiFillStar className={checkStatus("btwo") ?'star active' :'star star-class'} />
                    <AiFillStar className={checkStatus("bthree") ?'star active' :'star star-class'} />
                    <AiFillStar className={checkStatus("bfour") ?'star active' :'star star-class'} />
                    <AiFillStar className={checkStatus("bfive") ?'star active' :'star star-class'} />
                  </div>
                </div>
              </div>


              <div>
                <div className="locking">{
                    (checkStatus("sone") || checkStatus("stwo")  || checkStatus("sthree")  || checkStatus("sfour") ) && !checkStatus("sfive")? <FaLockOpen size="25"/> : checkStatus("sfive") ? <FaLock className="notshow"/> : <FaLock size="25"/>
                  }</div>
                <div className={checkStatus("sone") ? "hex silver": "hex silver star-class"}>

                  <div className="gold-tag">Silver</div>
                  <div className="shield">
                    <RiShieldStarLine />
                  </div>
                  <div className="ribbon">
                    <AiFillStar className={checkStatus("sone") ?'star active' :'star star-class'} />
                    <AiFillStar className={checkStatus("stwo") ?'star active' :'star star-class'} />
                    <AiFillStar className={checkStatus("sthree") ?'star active' :'star star-class'} />
                    <AiFillStar className={checkStatus("sfour") ?'star active' :'star star-class'} />
                    <AiFillStar className={checkStatus("sfive") ?'star active' :'star star-class'} />
                  </div>
                </div>
              </div>
              </div>
              

              <div className="line1-badge">
              <div>
                <div className="locking">{
                    (checkStatus("gone") || checkStatus("gtwo")  || checkStatus("gthree")  || checkStatus("gfour") ) && !checkStatus("gfive")? <FaLockOpen size="25"/> : checkStatus("gfive") ? <FaLock className="notshow"/> : <FaLock size="25"/>
                  }</div>
                <div className={checkStatus("gone") ? "hex gold": "hex gold star-class"}>
                  <div className="gold-tag">Gold</div>
                  <div className="shield">
                    <RiShieldStarLine />
                  </div>
                  <div className="ribbon">
                    <AiFillStar className={checkStatus("gone") ?'star active' :'star star-class'} />
                    <AiFillStar className={checkStatus("gtwo") ?'star active' :'star star-class'} />
                    <AiFillStar className={checkStatus("gthree") ?'star active' :'star star-class'} />
                    <AiFillStar className={checkStatus("gfour") ?'star active' :'star star-class'} />
                    <AiFillStar className={checkStatus("gfive") ?'star active' :'star star-class'} />
                  </div>
                </div>
              </div>

              <div>
                <div className="locking">{
                    (checkStatus("pone") || checkStatus("ptwo")  || checkStatus("pthree")  || checkStatus("pfour") ) && !checkStatus("pfive") ? <FaLockOpen size="25"/> : checkStatus("pfive") ? <FaLock className="notshow"/> : <FaLock size="25"/>
                  }</div>
                <div className={checkStatus("pone") ? "hex platinum": "hex platinum star-class"}>
                  <div className="gold-tag">Platinum</div>
                  <div className="shield">
                    <RiShieldStarLine />
                  </div>
                  <div className="ribbon">
                    <AiFillStar className={checkStatus("pone") ?'star active' :'star star-class'} />
                    <AiFillStar className={checkStatus("ptwo") ?'star active' :'star star-class'} />
                    <AiFillStar className={checkStatus("pthree") ?'star active' :'star star-class'} />
                    <AiFillStar className={checkStatus("pfour") ?'star active' :'star star-class'} />
                    <AiFillStar className={checkStatus("pfive") ?'star active' :'star star-class'} />
                  </div>
                </div>
              </div>
              </div>
              
              <svg
                style={{ position: "absolute", width: 0, height: 0 }}
                xmlns="http://www.w3.org/2000/svg"
                version="1.1"
              >
                <defs>
                  <filter id="goo">
                    <feGaussianBlur
                      in="SourceGraphic"
                      stdDeviation="8"
                      result="blur"
                    />
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
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
