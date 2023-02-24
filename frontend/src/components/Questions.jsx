import React, { useState } from "react";
import "./Questions.css";
import 'react-dropdown/style.css';
import DataTable from 'react-data-table-component';
import Header from "./Header";
function Questions() {
  const [search, setSearch] = useState("");

  const columns = [
    {
      name: <div style={{fontSize: 15,fontWeight:800,color:'#212529'}}>#</div>,
      selector: row => row.id,
      cell: row => <div style={{fontSize: 14}}>{row.id}</div>,
      sortable:true
    },
    {
        name: <div style={{fontSize: 15,fontWeight:800,color:"#212529"}}>Question Name</div>,
        selector: row => row.que,
        cell: row => <div style={{fontSize: 14,color:"#007bff",cursor:"pointer"}}>{row.que}</div>,
        width:"300px",
        sortable:true
    },
    {
        name: <div style={{fontSize: 15,fontWeight:800,color:"#212529"}}>Difficulty</div>,
        selector: row => row.difficulty,
        cell: row => <div style={{fontSize: 14,backgroundColor:"#04b521",borderRadius:11,padding:3,color:"white"}}>{row.difficulty}</div>,
        sortable:true
    },
    {
      name:<div style={{fontSize: 15,fontWeight:800,color:'#212529'}}>Accept</div>,
      selector: row => row.accept,
      cell: row => <div style={{fontSize: 14}}>{row.accept}</div>,
      sortable:true
    },
    {
      name:<div style={{fontSize: 15,fontWeight:800,color:'#212529'}}>Status</div>,
      selector: row => row.score,
      cell: row =><div style={{fontSize: 14,backgroundColor:"#021775",borderRadius:11,padding:3,color:"white"}}>{row.score}</div>,
      sortable:true
    }
];


const data = [
    {
        id: 1,
        que: 'Fibonacci',
        difficulty: 'easy',
        accept:'71%',
        score:"solved"
    },
    {
      id: 2,
      que: 'Fibonacci',
      difficulty: 'easy',
      accept:'71%',
      score:"unsolved"
    },
    {
      id: 3,
        que: 'Fibonacci',
        difficulty: 'hard',
        accept:'71%',
        score:"unsolved"
    },
    {
      id: 4,
        que: 'Fibonacci',
        difficulty: 'easy',
        accept:'71%',
        score:"solved"
    }
    ,
    {
      id: 5,
        que: 'Fibonacci',
        difficulty: 'easy',
        accept:'71%',
        score:"unsolved"
    }
    ,
    {
      id: 6,
        que: 'Fibonacci',
        difficulty: 'easy',
        accept:'71%',
        score:"solved"
    }
    ,
    {
      id: 7,
        que: 'Fibonacci',
        difficulty: 'easy',
        accept:'71%',
        score:"unsolved"
    }
    ,
    {
      id: 8,
        que: 'Fibonacci',
        difficulty: 'easy',
        accept:'71%',
        score:"solved"
    }
    ,
    {
      id: 9,
        que: 'Fibonacci',
        difficulty: 'easy',
        accept:'71%',
        score:"unsolved"
    }
    ,
    {
      id: 10,
        que: 'Fibonacci',
        difficulty: 'easy',
        accept:'71%',
        score:"unsolved"
    }
    ,
    {
      id:11,
        que: 'Fibonacci',
        difficulty: 'easy',
        accept:'71%',
        score:"solved"
    }
    ,
    {
      id: 12,
        que: 'Fibonacci',
        difficulty: 'easy',
        accept:'71%',
        score:"unsolved"
    }
    ,
    {
      id: 13,
        que: 'Fibonacci',
        difficulty: 'easy',
        accept:'71%',
        score:"solved"
    }
    ,
    {
      id: 14,
        que: 'Fibonacci',
        difficulty: 'easy',
        accept:'71%',
        score:"solved"
    }
    ,
    {
      id: 15,
        que: 'Fibonacci',
        difficulty: 'easy',
        accept:'71%',
        score:"unsolved"
    }
]


  return (
    <>
    <Header/>
    <div>
      <div className="quest-block">
        <div className="div1">
          <div className="first-left">
            <div className="solved">0/83 Solved</div>
            <div className="easy">Easy 0</div>
            <div className="medium">Medium 0</div>
            <div className="hard">Hard 0</div>
          </div>
          <div className="random-side">
            <button className="random">Random Q</button>
          </div>
        </div>

        <div className="border1"></div>

        <div className="div2">
          <div className="find">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search questions..."
              className="search"
            />
          </div>
          <div className="any">
          <select name="gender"  required style={{border:'none'}}>
                      <option value="none" selected disabled hidden>
                        Type
                      </option>
                      <option value="free">Free</option>
                      <option value="paying">Paying</option>
          </select>

          <select name="gender"  required style={{border:'none'}}>
                      <option value="none" selected disabled hidden>
                        Category
                      </option>
                      <option value="Brainteasers">Brainteasers</option>
                      <option value="Derivatives">Derivatives</option>
                      <option value="Finance">Finance</option>
                      <option value="Math">Math</option>
                      <option value="NonQuant">NonQuant</option>
          </select>

          <select name="gender"  required style={{border:'none'}}>
                      <option value="none" selected disabled hidden>
                        Difficulty
                      </option>
                      <option value="Medium">Medium</option>
                      <option value="Easy">Easy</option>
                      <option value="Hard">Hard</option>
          </select>

          <select name="gender"  required style={{border:'none'}}>
                      <option value="none" selected disabled hidden>
                        Scoring
                      </option>
                      <option value="auto">Auto</option>
                      <option value="self">Self</option>
          </select>
          </div>
        </div>
        <div className="border1"></div>
        <div className="div3">
        <DataTable
            columns={columns}
            data={data}
            striped={true}
            highlightOnHover={true}
            responsive={true}
            pagination={true}
            paginationDefaultPage={1}
            paginationPerPage={10}
        />
        </div>
      </div>
    </div>
    </>
  )
}

export default Questions;
