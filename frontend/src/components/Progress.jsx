import React from 'react'
import { Doughnut } from 'react-chartjs-2';
import Header from './Header'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import './Progress.css';
import {TiTick} from 'react-icons/ti';
import { ImCross } from "react-icons/im";


function Progress() {
    ChartJS.register(ArcElement, Tooltip, Legend);

    const data = {
        // labels: [
        //   'Red',
        //   'Blue',
        //   'Yellow'
        // ],
        datasets: [{
          label: 'Math',
          data: [5, 2, 1],
          backgroundColor: [
            '#e78ac3',
            '#fc8d62',
            '#8da0cb'
          ],
        //   hoverOffset: 4
        }],
        borderWidth: 0,
      };

      const recentData=[];
      const mydata = [
        {
          date: "1 day ago",  
          que: "Fibonacci",
          correct: "correct",
          difficulty:"easy",
          category:"Math"
        },
        {
            date: "1 day ago",  
            que: "Fibonacci",
            correct: "correct",
            difficulty:"easy",
            category:"Math"
        }
        
      ];

  return (
    <div>
      <Header/>
      <div className='prog-page'>
        <div className='categ-head'>Submissions by Category</div>

        <div className='row1-prog'>
            <div className='doughnut'>
                <Doughnut data={data}/> 
            </div>

            <div className='per-que'>
                <div className='all-solved'>
                <div className='col-sub'>
                    <div><span className='give-nums'>0</span>/83</div>
                    <div className='my-sub'>questions solved</div>
                </div>    
                    
                <div className='col-sub'>
                    <div><span className='give-nums'>4</span>/83</div>
                    <div className='my-sub'>attempted questions</div>
                </div> 

                </div>

                <div className='total-sub'>
                    <div className='col-sub'>
                        <div className='num-sub'>2</div>
                        <div className='my-sub'>total submissions</div>
                    </div>

                    <div className='col-sub'>
                        <div className='percent-sub'>33.33%</div>
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
                    recentData.length>0?
                    <tbody>
                    
                  {mydata.map((data)=>(
                    <tr>
                    <td className="que-co">{data.date}</td>
                    <td>{data.date}</td>
                    <td>
                    {
                      data.correct==='correct'?<TiTick color="green" size={25}/>:<ImCross size={15} color="red"/>
                    }
                    </td>
                    <td>{data.difficulty}</td>
                    <td>{data.category}</td>
                  </tr>   
                  ))}
                  
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
                  {mydata.map((data)=>(
                    <tr>
                    <td className="que-co">{data.date}</td>
                    <td>{data.date}</td>
                    <td>
                    {
                      data.correct==='correct'?<TiTick color="green" size={25}/>:<ImCross size={15} color="red"/>
                    }
                    </td>
                    <td>
                           <p
                               className={
                                   data.difficulty==="easy"?"success":data.difficulty==='hard'?"danger" :"medium"
                               }>
                               {data.difficulty}    
                           </p>
                       </td>
                    <td>{data.category}</td>
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
