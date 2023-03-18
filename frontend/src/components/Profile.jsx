import React, { useEffect, useState } from "react";
import Header from "./Header";
import { ImCross } from "react-icons/im";
import { GiProgression } from "react-icons/gi";
import "./Profile.css";
import progress from "../images/progress.png";
import { TiTick } from "react-icons/ti";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import {
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
// import faker from 'faker';
import { faker } from '@faker-js/faker';

function Profile() {
  const [userData, setUserData] = useState();
  const [questions, setQuestions] = useState();
  const [submittedQuestions, setSubmittedQuestions] = useState();
  const [rank, setRank] = useState([]);
  const user = JSON.parse(localStorage.getItem("quantuser"));

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
        backgroundColor: ["#8da0cb", "#66c2a5", "rgb(81, 80, 80)"],
        borderWidth: 1,
      },
    ],
  };

  
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  // Legend
);

// const options = {
//   responsive: true,
//   plugins: {
//     legend: {
//       position: 'top',
//       label:{
//         fullSize:true
//       }
//     },
//     title: {
//       display: false,
//       text: 'Progress in Categories',
//     },
//   },
// };


const labels = ['Probability', 'Profit & Loss', 'Percentage', 'Ages', 'Geometry', 'Area', 'Partnership','Progression','Clocks & Calendar','Chain Rule','Logarithm'];

const data2 = {
  labels,
  datasets: [
    {
      label:labels,
      data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
      backgroundColor: ['#d4b7f7','#b7dbf7','#bfb7f7','#f7b7f7','#f5d7c4','#f7b7c8','#c6f7b7','#f3f7b7','#fab1af','#bdaffa','#afedfa'],
    }
  ],
};

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
              <div>
                <p style={{ fontWeight: 600 }}>Background:</p>
              </div>
              <div>
                <p style={{ fontWeight: 600 }}>Degree:</p>
              </div>
              <div>
                <p style={{ fontWeight: 600 }}>Certifications:</p>
              </div>
              <div>
                <p style={{ fontWeight: 600 }}>Resume Keywords:</p>
              </div>
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
                      submittedQuestions.slice(0, 10).map((data) => (
                        <tr>
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
                      <td className="no-data" colspan="5">
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
      </div>
    </div>
  );
}

export default Profile;
