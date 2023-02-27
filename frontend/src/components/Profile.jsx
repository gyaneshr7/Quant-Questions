import React from "react";
import Header from "./Header";
import { ImCross } from "react-icons/im";
import { GiProgression } from "react-icons/gi";
import "./Profile.css";
import progress from "../images/progress.png";
import {TiTick} from 'react-icons/ti';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

function Profile() {

  ChartJS.register(ArcElement, Tooltip, Legend);

const data2 = {
  // labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
  datasets: [
    {
      label: 'No.of Questions',
      data: [ 7, 1, 0],
      backgroundColor: [
        '#66c2a5',
        'rgb(81, 80, 80)',
        '#8da0cb',
      ],
      borderWidth: 1,
    },
  ],
};

  const data = [
    {
      que: "Fibonacci",
      correct: "correct",
      date: "1 day ago",
    },
    {
      que: "Fibonacci",
      correct: "wrong",
      date: "1 day ago",
    },
    
  ];
  return (
    <div>
      <Header />
      <div className="profile-box">
        <div className="last"></div>

        <div className="second-box">
          <div className="profile">
            <div className="pro">Profile</div>
            <div className="p-pro">
              <div>Name:</div>
              <div>Email:</div>
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
            <Pie data={data2}
            />
            <hr style={{height:"1px",borderwidth:"0",color:"gray",backgroundcolor:"gray",marginTop:"15px"}}/>
            <div className="defined">
              <div className="define-prog prog1">
                <p>Todo</p>
                <p style={{textAlign:"center"}}>83</p>
              </div>

              <div className="define-prog prog2">
                <p>Solved</p>
                <p style={{textAlign:"center"}}>1</p>
              </div>
              
              <div className="define-prog prog3">
                <p>Attempted</p>
                <p style={{textAlign:"center"}}>1</p>
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
                  {data.map((data)=>(
                    <tr>
                    <td className="que-co">{data.que}</td>
                    <td>
                    {
                      data.correct==='correct'?<TiTick color="green" size={25}/>:<ImCross size={15} color="red"/>
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
