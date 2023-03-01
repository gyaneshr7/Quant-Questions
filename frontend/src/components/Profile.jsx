import React, { useEffect, useState } from "react";
import Header from "./Header";
import { ImCross } from "react-icons/im";
import { GiProgression } from "react-icons/gi";
import "./Profile.css";
import progress from "../images/progress.png";
import { TiTick } from 'react-icons/ti';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

function Profile() {
  const [userData,setUserData]=useState();
  const [questions,setQuestions]=useState();
  const [submittedQuestions,setSubmittedQuestions] = useState();
  const user = JSON.parse(localStorage.getItem("quantuser"));
  const uniqueAttemptedQuestions=[];
  const uniquesubmitttedQuestions=[];
  submittedQuestions && submittedQuestions.map((item) => {
    var findItem = uniqueAttemptedQuestions.find((x) => x.question._id === item.question._id);
    if (!findItem) uniqueAttemptedQuestions.push(item)
  })

  submittedQuestions && submittedQuestions.map((item) => {
    var findItem = uniquesubmitttedQuestions.find((x) => x.question._id === item.question._id);
    if (!findItem) uniquesubmitttedQuestions.push(item)
  })

  useEffect(() => {
    const fetchData = async () => {

      const data = await fetch(`http://localhost:8000/user/get/all/attempted/question/${user.id}`)
      const res = await data.json();
      console.log(res.submittedQuestions,"lkjhgfd");
      setUserData(res);
      setSubmittedQuestions(res.submittedQuestions.reverse());
    }
    const fetchQuestions = async () => {
      const data = await fetch(`http://localhost:8000/question/getallquestions`);
      const res = await data.json();
      setQuestions(res);
      console.log(res);
    }
    fetchData();
    fetchQuestions();
  }, [])

  ChartJS.register(ArcElement, Tooltip, Legend);

  const data = {
    labels: ['Todo','Solved','Attempted'],
    datasets: [
      {
        label: '',
        data: [questions && questions.length, userData && userData.correctAnswers.length, uniqueAttemptedQuestions && uniqueAttemptedQuestions.length],
        backgroundColor: [
          '#66c2a5',
          '#8da0cb',
          'rgb(81, 80, 80)'
        ],
        borderWidth: 1,
      },
    ],
  };

  // const data = [
  //   {
  //     que: "Fibonacci",
  //     correct: "correct",
  //     date: "1 day ago",
  //   },
  //   {
  //     que: "Fibonacci",
  //     correct: "wrong",
  //     date: "1 day ago",
  //   },

  // ];
  return (
    <div>
      <Header />
      <div className="profile-box">
        <div className="last"></div>

        <div className="second-box">
          <div className="profile">
            <div className="pro">Profile</div>
            <div className="p-pro">
              <div>Name: {userData && userData.name}</div>
              <div>Email: {userData && userData.email}</div>
              <div>Background:</div>
              <div>Degree:</div>
              <div>Certifications:</div>
              <div>Resume Keywords:</div>
            </div>
          </div>
          <div className="settings">
            <div className="pro">Settings</div>
            <div className="p-pro">
              <div>
                Allow firms/headhunters to contact me:
                <ImCross className="cross" size={13} color="red" />
              </div>
              <div className="free-disp">
                Subscription:<p className="free"> Free!</p>
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
            <div className="pie-size" >
              <Pie data={data}
              />
              <hr style={{ height: "1px", borderwidth: "0", color: "gray", backgroundcolor: "gray", marginTop: "15px" }} />
              <div className="defined">
                <div className="define-prog prog1">
                  <p>Todo</p>
                  <p style={{ textAlign: "center" }}>{questions && questions.length}</p>
                </div>

                <div className="define-prog prog2">
                  <p>Solved</p>
                  <p style={{ textAlign: "center" }}>{userData && userData.correctAnswers.length}</p>
                </div>

                <div className="define-prog prog3">
                  <p>Attempted</p>
                  <p style={{ textAlign: "center" }}>{uniqueAttemptedQuestions && uniqueAttemptedQuestions.length}</p>
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
                <thead className='table-head'>
                  <tr>
                    <th>Question</th>
                    <th>Correct?</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {submittedQuestions && submittedQuestions.slice(0,11).map((data) => (
                    <tr>
                      <td className="que-co">{data.question.title}</td>
                      <td>
                        {
                          data.correctAns ? <TiTick color="green" size={25} /> : <ImCross size={15} color="red" />
                        }
                      </td>
                      <td>{data.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
