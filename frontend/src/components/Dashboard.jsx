import React, { useState } from "react";
import './Dashboard.css';

function Dashboard() {
  const [type,setType]=useState("");
  const [title,setTitle]=useState("");
  const[que,setQue]=useState("");
  const[mcqque,setMcqQue]=useState("");

  return (
    <div>
      <div className="dash">
        <div className="dash-left">
            <div className="dash-head">Dashboard</div>
            <div className="add-que">Add Questions</div>
        </div>
        <div className="dash-right">
            <div className="first-row">
            <select name="category" className="opt-font"  required>
                      <option value="none" selected disabled hidden >
                        Category
                      </option>
                      <option value="Brainteasers">Brainteasers</option>
                      <option value="Derivatives">Derivatives</option>
                      <option value="Finance">Finance</option>
                      <option value="Math">Math</option>
                      <option value="NonQuant">NonQuant</option>
          </select>

            <select name="difficulty" className="opt-font"  required>
                      <option value="none" selected disabled hidden>
                        Difficulty
                      </option>
                      <option value="Medium">Medium</option>
                      <option value="Easy">Easy</option>
                      <option value="Hard">Hard</option>
          </select>

            <select name="anstype" className="opt-font" onChange={(e)=>setType(e.target.value)}>
                      <option value="none" selected disabled hidden>
                        Answer Type
                      </option>
                      <option value="mcq">Mcq</option>
                      <option value="text">Text</option>
          </select>
          </div>


            <div className="second-row">
                <div className="title">
                    <label className="disp-title">
                        Question Title
                    </label>
                    <input type="text" value={title} onChange={(e)=>setTitle(e.target.value)} placeholder="Add Title..."/>
                </div>

                <div className="que">
                 {
                    type==='text' && 
                    <div className="title">
                        <label className="disp-title">Add Question</label>
                        <input type="text" placeholder="Enter Question" value={que} onChange={(e)=>setQue(e.target.value)}/>
                    </div>   
                   
                 }

                 {
                    type==='mcq' && 
                    <div className="radio-type">
                        <label className="disp-title">Add Question</label>
                        <input type="text" placeholder="Enter Question" value={que} onChange={(e)=>setQue(e.target.value)}/>

                        <input type="text" placeholder="Option1" value={que} onChange={(e)=>setQue(e.target.value)}/>
                        
                        <input type="text" placeholder="Option2" value={que} onChange={(e)=>setQue(e.target.value)}/>

                        <input type="text" placeholder="Option3" value={que} onChange={(e)=>setQue(e.target.value)}/>

                        <input type="text" placeholder="Option4" value={que} onChange={(e)=>setQue(e.target.value)}/>
                        
                        <input type="text" placeholder="Correct Answer" value={que} onChange={(e)=>setQue(e.target.value)}/>
                        
                    </div>    
                 }
                 <button className="add-btn">Add</button> 
                </div>
            </div>    
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
