import React, { useEffect, useState } from 'react'
import { Doughnut } from 'react-chartjs-2';
import Header from './Header'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import './Progress.css';
import { TiTick } from 'react-icons/ti';
import { ImCross } from "react-icons/im";

function Progress() {
  const user = JSON.parse(localStorage.getItem('quantuser'));
  const [userdata, setUserData] = useState();
  const [questions, setQuestions] = useState();
  const [submittedQuestions, setSubmittedQuestions] = useState();
  const [brainteasers, setBrainTeasers] = useState([]);
  const [math, setMath] = useState([]);
  const [nonQuant, setNonQuant] = useState([]);
  const [finance, setFinance] = useState([]);
  const [derivatives, setDerivatives] = useState([]);
  let correctSubmissions = [];
  let uniqueCorrectSubmissions = [];
  let uniqueAttemptedQuestions = [];
  submittedQuestions && submittedQuestions.map((question) => {
    if (question.correctAns) {
      correctSubmissions.push(question)
    }
  })
  if (correctSubmissions.length > 0) {
    correctSubmissions.map((item) => {
      var findItem = uniqueCorrectSubmissions.find((x) => x._id === item._id);
      if (!findItem) uniqueCorrectSubmissions.push(item);
    });
  }
  submittedQuestions && submittedQuestions.map((item) => {
    var findItem = uniqueAttemptedQuestions.find((x) => x.question._id === item.question._id);
    if (!findItem) {
      console.log(item);
      uniqueAttemptedQuestions.push(item)
    };
  })

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetch(`http://localhost:8000/user/get/all/attempted/question/${user.id}`)
      const res = await data.json();
      console.log(res);
      setUserData(res);
      setSubmittedQuestions(res.submittedQuestions.reverse());
      res.submittedQuestions.map((category) => {
        if (category.question.category == 'Brainteasers') {
          setBrainTeasers(arr => [...new Set(arr), category]);
        } else if (category.question.category == 'Derivatives') {
          setDerivatives(arr => [...new Set(arr), category]);
        } else if (category.question.category == 'Finance') {
          setFinance(arr => [...new Set(arr), category]);
        } else if (category.question.category == 'Math') {
          setMath(arr => [...new Set(arr), category]);
        } else if (category.question.category == 'NonQuant') {
          setNonQuant(arr => [...new Set(arr), category]);
        }
      })
    }
    const fetchQuestions = async () => {
      const data = await fetch(`http://localhost:8000/question/getallquestions`);
      const res = await data.json();
      setQuestions(res);
    }
    fetchData();
    fetchQuestions();
  }, [])

  ChartJS.register(ArcElement, Tooltip, Legend);
  const data = {
    labels: [
      'BrainTeasers',
      'Derivatives',
      'Math', 'Finance', 'NonQuant'
    ],
    datasets: [{
      data: [brainteasers && brainteasers.length, derivatives && derivatives.length, math && math.length, finance && finance.length, nonQuant && nonQuant.length],
      backgroundColor: ['#e78ac3', '#fc8d62', '#8da0cb', '#66c2a5', '#eab676'],
    }],
    borderWidth: 0,
  };

  return (
    <div>
      <Header />
      <div className='prog-page'>
        <div className='categ-head'>Submissions by Category</div>
        <div className='row1-prog'>
          <div className='doughnut'>
            <Doughnut data={data} />
          </div>

          <div className='per-que'>
            <div className='all-solved'>
              <div className='col-sub'>
                <div><span className='give-nums'>{userdata && userdata.correctAnswers && userdata.correctAnswers.length}</span>/{questions && questions.length}</div>
                <div className='my-sub'>questions solved</div>
              </div>

              <div className='col-sub'>
                <div><span className='give-nums'>{uniqueAttemptedQuestions && uniqueAttemptedQuestions.length}</span>/{questions && questions.length}</div>
                <div className='my-sub'>attempted questions</div>
              </div>

            </div>

            <div className='total-sub'>
              <div className='col-sub'>
                <div className='num-sub'>{userdata && userdata.totalSubmissions}</div>
                <div className='my-sub'>total submissions</div>
              </div>

              <div className='col-sub'>
                <div className='percent-sub'>{userdata && ((userdata.correctAnswers.length/userdata.totalSubmissions)*100).toFixed(2)}%</div>
                <div className='my-sub'>acceptance rate</div>
              </div>
            </div>
          </div>
        </div>

        <div className='row2-prog'>
          <div className='recent'>Most Recent 10 Correct Submissions</div>

          <table className="table-sub table-striped">
            <thead className='table-head'>
              <tr>
                <th>Date Submitted</th>
                <th>Question</th>
                <th>Correct?</th>
                <th>Difficulty</th>
                <th>Category</th>
              </tr>
            </thead>

            {
              uniqueCorrectSubmissions.length > 0 ?
                <tbody>
                  {uniqueCorrectSubmissions.slice(0, 11).map((data) => (
                    <tr>
                      <td className="que-co">{data.date}</td>
                      <td>{data.question.title}</td>
                      <td>
                        {
                          data.correctAns ? <TiTick color="green" size={25} /> : <ImCross size={15} color="red" />
                        }
                      </td>
                      <td>{data.question.difficulty}</td>
                      <td>{data.question.category}</td>
                    </tr>
                  ))
                  }
                </tbody>
                :
                <tbody>
                  <tr>
                    <td className='no-data' colspan='5'>No recent submissions</td>
                  </tr>
                </tbody>
            }

          </table>
        </div>

        <div className='row3-prog'>
          <div className='recent'>Most Recent 30 Submissions</div>

          <table className="table-sub table-striped">
            <thead className='table-head'>
              <tr>
                <th>Date Submitted</th>
                <th>Question</th>
                <th>Correct?</th>
                <th>Difficulty</th>
                <th>Category</th>
              </tr>
            </thead>
            <tbody>
              {submittedQuestions && submittedQuestions.slice(0, 31).map((data) => (
                <tr>
                  <td className="que-co">{data.date}</td>
                  <td>{data.question.title}</td>
                  <td>
                    {
                      data.correctAns ? <TiTick color="green" size={25} /> : <ImCross size={15} color="red" />
                    }
                  </td>
                  <td>
                    <p
                      className={
                        data.question.difficulty === "easy" ? "success" : data.difficulty === 'hard' ? "danger" : "medium"
                      }>
                      {data.question.difficulty}
                    </p>
                  </td>
                  <td>{data.question.category}</td>
                </tr>
              ))}

            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default Progress
