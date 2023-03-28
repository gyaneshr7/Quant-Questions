import React, { useEffect, useState } from "react";
import Header from "./Header";
import { ImCross } from "react-icons/im";
import { FaLock } from "react-icons/fa";
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

      console.log(category.name, wrongquescount, categorycount);
      if (wrongquescount >= (60 * categorycount) / 100 && wrongquescount > 0) {
        console.log(wrongquescount, (60 * categorycount) / 100 );
        weaknessarray.push({
          category: category.name,
          count: wrongquescount,
          color: category.color
        })
      }
    })

  weaknessarray.push({
    category: "Aptitude",
    count: 8,
    color: "color"
  })
  weaknessarray.push({
    category: "reasoning",
    count: 5,
    color: "color"
  })
  weaknessarray.push({
    category: "1",
    count: 7,
    color: "color"
  })
  weaknessarray.push({
    category: "2",
    count: 7,
    color: "color"
  })

  if (weaknessarray.length > 0) {
    if (weaknessarray.length > 2) {
      let sorted = weaknessarray.sort((p1, p2) => (p1.count < p2.count) ? 1 : (p1.count > p2.count) ? -1 : 0);
      // let i;
      // for (i = 0; i < sorted.length - 1; i++) {
      //   if (sorted[i].count != sorted[i + 1].count) {
      //     weakness.push(sorted[i]);
      //   }
      // }
      console.log(sorted, "sorted")
      sorted.slice(2,5).map(data=>{
        weakness.push(data)
      })
      console.log(weakness, "weakness");
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
      console.log(res);
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

  const handleClose = () => {
    setShow(false)
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
                          <td className="que-co">{data.question.title}</td>
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
              <Bar data={data2} />
            </div>
          </div>
        </div>

        <div className="second-box">
          <div className="bar-profile">
            <div className="pro">Badges & Achievements</div>

            <div className="bar">

              <div>
              <div className="locking"><FaLock size="20"/></div>
              <div className="hex bronze">
                <div className="gold-tag">Bronze</div>
                <div className="shield">
                  <RiShieldStarLine />
                </div>
                <div className="ribbon">
                  <AiFillStar className="star" />
                  <AiFillStar className="star" style={{ opacity: 0.3 }} />
                  <AiFillStar className="star" style={{ opacity: 0.3 }} />
                  <AiFillStar className="star" style={{ opacity: 0.3 }} />
                  <AiFillStar className="star" style={{ opacity: 0.3 }} />
                </div>
              </div>
              </div>
              

            <div>
            <div className="locking"><FaLock size="20"/></div>
            <div className="hex silver">
                
                <div className="gold-tag">Silver</div>
                <div className="shield">
                  <RiShieldStarLine />
                </div>
                <div className="ribbon">
                  <AiFillStar className="star" />
                  <AiFillStar className="star" />
                  <AiFillStar className="star" style={{ opacity: 0.3 }}/>
                  <AiFillStar className="star" style={{ opacity: 0.3 }}/>
                  <AiFillStar className="star" style={{ opacity: 0.3 }}/>
                </div>
              </div>
            </div>
              
              <div>
              <div className="locking"><FaLock size="20"/></div>
              <div className="hex gold">
                <div className="gold-tag">Gold</div>
                <div className="shield">
                  <RiShieldStarLine />
                </div>
                <div className="ribbon">
                  <AiFillStar className="star" />
                  <AiFillStar className="star" />
                  <AiFillStar className="star" />
                  <AiFillStar className="star" />
                  <AiFillStar className="star" style={{ opacity: 0.3 }}/>
                </div>
              </div>
              </div>

              <div>
              <div className="locking"><FaLock size="20"/></div>
              <div className="hex platinum">
                <div className="gold-tag">Platinum</div>
                <div className="shield">
                  <RiShieldStarLine />
                </div>
                <div className="ribbon">
                  <AiFillStar className="star" />
                  <AiFillStar className="star" />
                  <AiFillStar className="star" />
                  <AiFillStar className="star" />
                  <AiFillStar className="star" />
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
