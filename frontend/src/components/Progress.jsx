import React, { useEffect, useState } from 'react'
import { Doughnut } from 'react-chartjs-2';
import Header from './Header'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import './Progress.css';
import { TiTick } from 'react-icons/ti';
import { ImCross } from "react-icons/im";
import { Link } from 'react-router-dom';

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
  const [categories,setCategories]=useState();
  let correctSubmissions = [];
  let uniqueCorrectSubmissions = [];
  let uniqueAttemptedQuestions = [];
  let categoryLabels=[];
  let categoryData=[];
  let categoryColor=[];

  categories && categories.map((category)=>{
    categoryLabels.push(category.name);
  })

  categories && categories.map((category)=>{
    categoryColor.push(category.color);
  })

  categoryLabels.length>0 && 
  categoryLabels.map((label)=>{
    let count=0;
    userdata && userdata.submittedQuestions.map((data,i)=>{
      // console.log(data,i);
      if(data.question && data.question.category===label){
        count++;
      }
    })
    categoryData.push(count);
  })

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
    if(item.question){
      var findItem = uniqueAttemptedQuestions.find((x) => x.question._id === item.question._id);
      if (!findItem) {
        uniqueAttemptedQuestions.push(item)
      };
    }
  })

  const correct = [], wrong = [];
  userdata && userdata.currentAttempted.map((data) => {
    if (data.status === 'correct') {
      correct.push(data);
    } else {
      wrong.push(data);
    }
  })
  
  useEffect(() => {
    const fetchData = async () => {
      const data = await fetch(`http://localhost:8000/user/get/all/attempted/question/${user.id}`)
      const res = await data.json();
      setUserData(res);
      // console.log(res,"sldai");
      setSubmittedQuestions(res.submittedQuestions.reverse());
      res.submittedQuestions.map((category) => {
        if (category.question.category === 'Brainteasers') {
          setBrainTeasers(arr => [...new Set(arr), category]);
        } else if (category.question.category === 'Derivatives') {
          setDerivatives(arr => [...new Set(arr), category]);
        } else if (category.question.category === 'Finance') {
          setFinance(arr => [...new Set(arr), category]);
        } else if (category.question.category === 'Math') {
          setMath(arr => [...new Set(arr), category]);
        } else if (category.question.category === 'NonQuant') {
          setNonQuant(arr => [...new Set(arr), category]);
        }
        else if (category.question.category === 'Marketing') {
          // setMarketing(arr => [...new Set(arr), category]);
        }
      })
    }
    const fetchCategory = async () => {
      const data = await fetch(`http://localhost:8000/category/getcategories`);
      const res = await data.json();
      setCategories(res.category);
    };
  
    const fetchQuestions = async () => {
      const data = await fetch(`http://localhost:8000/question/getallquestions`);
      const res = await data.json();
      setQuestions(res);
    }
    fetchData();
    fetchQuestions();
    fetchCategory();
  }, [])

  ChartJS.register(ArcElement, Tooltip, Legend);
  const data = {
    labels: categoryLabels,
    datasets: [{
      data: categoryData,
      backgroundColor: categoryColor,
    }],
    borderWidth: 0,
  };

  const data1 = {
    labels: [
      'No Submissions',
    ],
    datasets: [{
      data:[1],
      backgroundColor: ['#8da0cb'],
    }],
    borderWidth: 0,
  };


  return (
    <div>
      <Header />
      <div className='prog-page'>
        <div className='row4-prog'>
        <div className='categ-head'>Submissions by Category</div>
        <div className='row1-prog'>
          <div className='doughnut'>
         <Doughnut data={submittedQuestions && submittedQuestions.length>0?data:data1} /> 
          </div>

          <div className='per-que'>
            <div className='all-solved'>
              <div className='col-sub'>
                <div><span className='give-nums'>{correct.length>0 ? correct.length:0}</span>/{questions && questions.length}</div>
                <div className='my-sub'>Solved Questions</div>
              </div>

              <div className='col-sub'>
                <div><span className='give-nums'>{wrong.length>0 ? wrong.length:0}</span>/{questions && questions.length}</div>
                <div className='my-sub'>Attempted Questions</div>
              </div>

            </div>

            <div className='total-sub'>
              <div className='col-sub'>
                <div className='num-sub'>{userdata && userdata.totalSubmissions}</div>
                <div className='my-sub'>Total Submissions</div>
              </div>

              <div className='col-sub'>
                <div className='percent-sub'>{userdata && ((correct.length>0 && correct.length/userdata.totalSubmissions)*100).toFixed(2)}%</div>
                <div className='my-sub'>Acceptance Rate</div>
              </div>
            </div>
          </div>
        </div>
        </div>

        <div className='row2-prog'>
          <div className='recent'>Most Recent 10 Correct Submissions</div>

          <table className="table-sub table-striped web-table">
            <thead className='table-head'>
              <tr>
                <th>Date Submitted</th>
                <th>Questions</th>
                <th>Correct</th>
                <th>Difficulty</th>
                <th>Category</th>
              </tr>
            </thead>

            {
              uniqueCorrectSubmissions.length > 0 ?
                <tbody>
                  {uniqueCorrectSubmissions.slice(0, 11).map((data) => (
                    <tr>
                      <td>{data.date}</td>
                      <Link to="/quedetail" style={{textDecoration:"none",color:"black"}} state={{ id: data.question._id }}><td className="que-co">{data.question.title}</td></Link>
                      <td>
                        {
                          data.correctAns ? <TiTick color="green" size={25} /> : <ImCross size={15}  color="red" />
                        }
                      </td>
                      <td>
                      <p
                      className={
                        data.question.difficulty === "easy" ? "success" : data.question.difficulty === 'hard' ? "danger" : "medium"
                      }>
                        {data.question.difficulty}</p></td>
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


          <table className="table-sub table-striped phone-table">
            <thead className='table-head'>
              <tr>
                <th>Question</th>
                <th>Correct?</th>
                <th>Difficulty</th>
              </tr>
            </thead>

            {
              uniqueCorrectSubmissions.length > 0 ?
                <tbody>
                  {uniqueCorrectSubmissions.slice(0, 11).map((data) => (
                    <tr>
                      {/* <td>{data.date}</td> */}
                      <Link to="/quedetail" style={{textDecoration:"none",color:"black"}} state={{ id: data.question._id }}><td className="que-com">{data.question.title}</td></Link>
                      <td>
                        {
                          data.correctAns ? <TiTick color="green" size={25} /> : <ImCross size={15}  color="red" />
                        }
                      </td>
                      <td>
                      <p
                      className={
                        data.question.difficulty === "easy" ? "success" : data.question.difficulty === 'hard' ? "danger" : "medium"
                      }>
                        {data.question.difficulty}</p></td>
                      {/* <td>{data.question.category}</td> */}
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
          <div className='recent recent-web'>Most Recent 30 Submissions</div>
          <div className='recent recent-ph'>Most Recent 10 Submissions</div>

          <table className="table-sub table-striped web-table">
            <thead className='table-head'>
              <tr>
                <th>Date Submitted</th>
                <th>Questions</th>
                <th>Correct</th>
                <th>Difficulty</th>
                <th>Category</th>
              </tr>
            </thead>
            {
              submittedQuestions && submittedQuestions.length>0 ?
              <tbody>
              {submittedQuestions && submittedQuestions.slice(0, 31).map((data) => (
                <tr>
                  <td>{data.date}</td>
                  <Link to="/quedetail" style={{textDecoration:"none",color:"black"}} state={{ id: data.question._id }}> <td className="que-co">{data.question.title}</td></Link>
                  <td>
                    {
                      data.correctAns ? <TiTick color="green" size={25} /> : <ImCross size={15} className="imcross" color="red" />
                    }
                  </td>
                  <td>
                    <p
                      className={
                        data.question.difficulty === "easy" ? "success" : data.question.difficulty === 'hard' ? "danger" : "medium"
                      }>
                      {data.question.difficulty}
                    </p>
                  </td>
                  <td>{data.question.category}</td>
                </tr>
              ))}

            </tbody>:
            <tbody>
            <tr>
              <td className='no-data' colspan='5'>No recent submissions</td>
            </tr>
          </tbody>
            }
            
          </table>

          <table className="table-sub table-striped phone-table">
            <thead className='table-head'>
              <tr>
                <th>Question</th>
                <th>Correct?</th>
                <th>Difficulty</th>
              </tr>
            </thead>
            {
              submittedQuestions && submittedQuestions.length>0 ?
              <tbody>
              {submittedQuestions && submittedQuestions.slice(0, 11).map((data) => (
                <tr>
                  {/* <td>{data.date}</td> */}
                  <Link to="/quedetail" style={{textDecoration:"none",color:"black"}} state={{ id: data.question._id }}> <td className="que-com">{data.question.title}</td></Link>
                  <td>
                    {
                      data.correctAns ? <TiTick color="green" size={25} /> : <ImCross size={15} className="imcross" color="red" />
                    }
                  </td>
                  <td>
                    <p
                      className={
                        data.question.difficulty === "easy" ? "success" : data.question.difficulty === 'hard' ? "danger" : "medium"
                      }>
                      {data.question.difficulty}
                    </p>
                  </td>
                  {/* <td>{data.question.category}</td> */}
                </tr>
              ))}

            </tbody>:
            <tbody>
            <tr>
              <td className='no-data' colspan='5'>No recent submissions</td>
            </tr>
          </tbody>
            }
            
          </table>
        </div>
      </div>
    </div>
  )
}

export default Progress
