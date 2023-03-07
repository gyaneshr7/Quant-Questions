import React, { useEffect, useState } from "react";
import './Dashboard.css';
import Multiselect from 'multiselect-react-dropdown';

function Dashboard() {
  const [title, setTitle] = useState("");
  const [question, setQuestion] = useState("");
  const [difficulty, setDifficulty] = useState('');
  const [category, setCategory] = useState('');
  const [anstype, setAnsType] = useState("");
  const [opt1, setOpt1] = useState('');
  const [opt2, setOpt2] = useState('');
  const [opt3, setOpt3] = useState('');
  const [opt4, setOpt4] = useState('');
  const [answer, setAnswer] = useState([]);
  const [allCategories, setallCategories] = useState();

  const [firms, setFirms] = useState([]);
  const [divisions, setDivisions] = useState([]);
  const [positions, setPositions] = useState([]);
  const [tags, setTags] = useState([]);
  const [categories, setCategories] = useState([]);
  const [answerTypes, setAnswerTypes] = useState([]);

  const [firmEdit, setFirmEdit] = useState(false);
  const [divisionEdit, setDivisionEdit] = useState(false);
  const [positionEdit, setPositionEdit] = useState(false);
  const [tagEdit, setTagEdit] = useState(false);
  const [answerTypeEdit, setAnswerTypeEdit] = useState(false);
  const [categoryEdit, setCategoryEdit] = useState(false);

  const [firmVal, setFirmVal] = useState();
  const [divisionVal, setDivisionVal] = useState();
  const [positionVal, setPositionVal] = useState();
  const [tagVal, setTagVal] = useState();
  const [answerTypeVal, setAnswerTypeVal] = useState();
  const [categoryVal, setCategoryVal] = useState();

  const [firmsArray, setFirmsArray] = useState();
  const [divisionsArray, setDivisionsArray] = useState();
  const [positionsArray, setPositionsArray] = useState();
  const [tagsArray, setTagsArray] = useState();

  let firmNames = [], divisionNames = [], positionNames = [], tagNames = [], categoryNames = [], answerTypeNames = [];
  firms.length > 0 && firms.map((data) => {
    firmNames.push(data.name);
  })
  divisions && divisions.map((data) => {
    divisionNames.push(data.name)
  })
  positions && positions.map((data) => {
    positionNames.push(data.name)
  })
  tags && tags.map((data) => {
    tagNames.push(data.name)
  })
  categories && categories.map((data) => {
    categoryNames.push(data.name)
  })
  answerTypes && answerTypes.map((data) => {
    answerTypeNames.push(data.name)
  })

  // add questions to db
  const submitHandler = async () => {
    let val = '';
    if(title!='' && question!='' && answer!=''&& difficulty!=''&& category!=''&& anstype!=''&& firms!=''&& divisions!='' && positions!='' && tags!=='')
    {
      if (anstype === 'Mcq') {
        val = {
          title: title,
          question: question,
          answer: answer,
          difficulty: difficulty,
          category: category,
          answerType: anstype,
          options: [opt1, opt2, opt3, opt4],
          firms: firmsArray,
          divisions: divisionsArray,
          position: positionsArray,
          tags: tagsArray
        }
      } else {
        val = {
          title: title,
          question: question,
          answer: answer,
          difficulty: difficulty,
          category: category,
          answerType: anstype,
          firms: firmsArray,
          divisions: divisionsArray,
          position: positionsArray,
          tags: tagsArray
        }
      }
      console.log(val);
      const data = await fetch("http://localhost:8000/question/add", {
        method: "POST",
        body: JSON.stringify(val),
        headers: {
          "Content-type": "application/json; charset=UTF-8"
        }
      })
      const res = await data.json();
      console.log(res);
      setAnsType("");
      setAnswer("");
      setTitle("");
      setQuestion("");
      setCategory("");
      setDifficulty("");
    }else{
      alert("Enter value in all fields...")
    }

    const dataa = await fetch('http://localhost:8000/category/getcategories');
    const resp = await dataa.json();
    let firmscount = [], divisionscount = [], positionscount = [], tagscount = [];
    resp.firms.map((data) => {
      if (firmsArray.includes(data.name)) {
        let val = {
          name: data.name,
          count: data.count + 1
        }
        firmscount.push(val);
      }
    })
    resp.divisions.map((data) => {
      if (divisionsArray.includes(data.name)) {
        let val = {
          name: data.name,
          count: data.count + 1
        }
        divisionscount.push(val);
      }
    })
    resp.positions.map((data) => {
      if (positionsArray.includes(data.name)) {
        let val = {
          name: data.name,
          count: data.count + 1
        }
        positionscount.push(val);
      }
    })
    resp.tags.map((data) => {
      if (tagsArray.includes(data.name)) {
        console.log(data);
        let val = {
          name: data.name,
          count: data.count + 1
        }
        tagscount.push(val);
      }
    })
    // console.log(firmscount,divisionscount,tagscount,positionscount);
    const value = {
      firmscount, divisionscount, tagscount, positionscount
    }
    console.log(value);
    const data = await fetch("http://localhost:8000/category/updatecategory/firms", {
      method: "PUT",
      body: JSON.stringify(value),
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    })
    const res = await data.json();
    // window.location.href = '/dashboard'
  }

  useEffect(() => {
    const fetchcategories = async () => {
      const data = await fetch('http://localhost:8000/category/getcategories');
      const res = await data.json();
      setallCategories(res);
      setFirms(res.firms);
      setDivisions(res.divisions)
      setPositions(res.positions)
      setTags(res.tags)
      setCategories(res.category)
      setAnswerTypes(res.answerType)
    }
    fetchcategories();
  }, [firmEdit, divisionEdit, positionEdit, tagEdit])

  const selectedFirms = (name) => {
    setFirmsArray(name)
  }
  const selectedDivisions = (name) => {
    setDivisionsArray(name)
  }
  const selectedPositions = (name) => {
    setPositionsArray(name)
  }
  const selectedTags = (name) => {
    setTagsArray(name)
  }

  const handleLogout = () => {
    localStorage.setItem("quantuser", null)
    window.location.href = '/'
  }

  // send data to backend 
  const addcategory = async (name, val) => {
    console.log(name, val);
    const data = await fetch(`http://localhost:8000/category/addcategory/${name}`, {
      method: "PUT",
      body: JSON.stringify(val),
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    })
    const res = await data.json();
    console.log(res);
  }

  const submitCategory = async (name) => {
    let val;
    if (name == 'firms') {
      if (firmVal) {
        val = {
          value: firmVal
        }
        addcategory(name, val)
        setFirmEdit(false);
        setFirmVal('');
      }
    } else if (name == 'divisions') {
      if (divisionVal) {
        val = {
          value: divisionVal
        }
        addcategory(name, val)
        setDivisionEdit(false);
        setDivisionVal('');
      }
    }
    else if (name == 'positions') {
      if (positionVal) {
        val = {
          value: positionVal
        }
        addcategory(name, val)
        setPositionEdit(false);
        setPositionVal('');
      }
    } else if (name == 'tags') {
      if (tagVal) {
        val = {
          value: tagVal
        }
        addcategory(name, val)
        setTagEdit(false);
        setTagVal('');
      }
    } else if (name == 'category') {
      if (categoryVal) {
        console.log(name, categoryVal);
        val = {
          value: categoryVal
        }
        addcategory(name, val)
        setCategoryEdit(false);
        setCategoryVal('');
      }
    } else if (name == 'answerType') {
      if (answerTypeVal) {
        val = {
          value: answerTypeVal
        }
        addcategory(name, val)
        setAnswerTypeEdit(false);
        setAnswerTypeVal('');
      }
    }
  }

  return (
    <div>
      <div className="dash">
        <div className="dash-left">
          <div className="dash-head">Dashboard</div>
          <div className="add-que">Add Questions</div> <br />
          <div className="add-que" onClick={handleLogout}>Logout</div>
        </div>
        <div className="dash-right">
          <div className="first-row">
            {
              !categoryEdit &&
              <select name="category" className="opt-font" required onChange={(e) => setCategory(e.target.value)}>
                <option value="none" selected disabled hidden >
                  Category
                </option>
                {
                  categoryNames.length > 0 &&
                  categoryNames.map((category) => (
                    <option value={category}>{category}</option>
                  ))
                }

              </select>
            }
            {
              categoryEdit &&
              <input type="text" placeholder="Add Category" onChange={(e) => setCategoryVal(e.target.value)} />
            }
            {!categoryEdit && <img src="/addicon.png" alt="" className="add-icon-img" onClick={() => { setCategoryEdit(true) }} />}
            {categoryEdit && <button className="add" onClick={() => submitCategory('category')}>Add</button>}
            {categoryEdit && <img src="/cross.png" alt="" className="cross-icon-img" onClick={() => { setCategoryEdit(false) }} />}

            <select name="difficulty" className="opt-font" required onChange={(e) => setDifficulty(e.target.value)}>
              <option value="none" selected disabled hidden>
                Difficulty
              </option>
              <option value="medium">Medium</option>
              <option value="easy">Easy</option>
              <option value="hard">Hard</option>
            </select>
            <img src="/addicon.png" alt="" className="add-icon-img" />

            {
              !answerTypeEdit &&
              <select name="anstype" className="opt-font" required onChange={(e) => setAnsType(e.target.value)}>
                <option value="none" selected disabled hidden >
                  Answer Type
                </option>
                {
                  answerTypeNames.length > 0 &&
                  answerTypeNames.map((ans) => (
                    <option value={ans}>{ans}</option>
                  ))
                }

              </select>
            }
            {
              answerTypeEdit &&
              <input type="text" placeholder="Add Category" onChange={(e) => setAnswerTypeVal(e.target.value)} />
            }
            {!answerTypeEdit && <img src="/addicon.png" alt="" className="add-icon-img" onClick={() => { setAnswerTypeEdit(true) }} />}
            {answerTypeEdit && <button className="add" onClick={() => submitCategory('answerType')}>Add</button>}
            {answerTypeEdit && <img src="/cross.png" alt="" className="cross-icon-img" onClick={() => { setAnswerTypeEdit(false) }} />}

          </div>

          <div className="second-row">
            <div className="wrapper">
              <div class="d-flex flex-row align-items-center mb-4 multi-placeholder">
                {!firmEdit && <div class="form-outline flex-fill mb-0">
                  <Multiselect
                    placeholder="Firms"
                    displayValue=""
                    isObject={false}
                    onKeyPressFn={function noRefCheck() { }}
                    onRemove={function noRefCheck() { }}
                    onSearch={function noRefCheck() { }}
                    onSelect={selectedFirms}
                    options={firmNames}
                    selectedValues={{}}
                  />
                </div>}
                {
                  firmEdit &&
                  <input type="text" placeholder="Add Firm" onChange={(e) => setFirmVal(e.target.value)} />
                }
              </div>
              {!firmEdit && <img src="/addicon.png" alt="" className="add-icon-img" onClick={() => { setFirmEdit(true) }} />}
              {firmEdit && <button className="add" onClick={() => submitCategory('firms')}>Add</button>}
              {firmEdit && <img src="/cross.png" alt="" className="cross-icon-img" onClick={() => { setFirmEdit(false) }} />}
            </div>

            <div className="wrapper">
              <div class="d-flex flex-row align-items-center mb-4 multi-placeholder">
                {!divisionEdit && <div class="form-outline flex-fill mb-0">
                  <Multiselect
                    placeholder="Divisions"
                    displayValue=""
                    isObject={false}
                    onKeyPressFn={function noRefCheck() { }}
                    onRemove={function noRefCheck() { }}
                    onSearch={function noRefCheck() { }}
                    onSelect={selectedDivisions}
                    options={divisionNames}
                    selectedValues={{}}
                  />
                </div>}
                {
                  divisionEdit &&
                  <input type="text" placeholder="Add Division" onChange={(e) => setDivisionVal(e.target.value)} />
                }
              </div>
              {!divisionEdit && <img src="/addicon.png" alt="" className="add-icon-img" onClick={() => { setDivisionEdit(true) }} />}
              {divisionEdit && <button className="add" onClick={() => submitCategory('divisions')}>Add</button>}
              {divisionEdit && <img src="/cross.png" alt="" className="cross-icon-img" onClick={() => { setDivisionEdit(false) }} />}

            </div>

            <div className="wrapper">
              <div class="d-flex flex-row align-items-center mb-4 multi-placeholder">
                {!positionEdit && <div class="form-outline flex-fill mb-0">
                  <Multiselect
                    placeholder="Position"
                    displayValue=""
                    isObject={false}
                    onKeyPressFn={function noRefCheck() { }}
                    onRemove={function noRefCheck() { }}
                    onSearch={function noRefCheck() { }}
                    onSelect={selectedPositions}
                    options={positionNames}
                    selectedValues={{}}
                  />
                </div>}
                {
                  positionEdit &&
                  <input type="text" placeholder="Add Position" onChange={(e) => setPositionVal(e.target.value)} />
                }
              </div>
              {!positionEdit && <img src="/addicon.png" alt="" className="add-icon-img" onClick={() => { setPositionEdit(true) }} />}
              {positionEdit && <button className="add" onClick={() => submitCategory('positions')}>Add</button>}
              {positionEdit && <img src="/cross.png" alt="" className="cross-icon-img" onClick={() => { setPositionEdit(false) }} />}

            </div>

            <div className="wrapper">
              <div class="d-flex flex-row align-items-center mb-4 multi-placeholder">
                {!tagEdit && <div class="form-outline flex-fill mb-0">
                  <Multiselect
                    placeholder="Tags"
                    displayValue=""
                    isObject={false}
                    onKeyPressFn={function noRefCheck() { }}
                    onRemove={function noRefCheck() { }}
                    onSearch={function noRefCheck() { }}
                    onSelect={selectedTags}
                    options={tagNames}
                    selectedValues={{}}
                  />
                </div>}
                {
                  tagEdit &&
                  <input type="text" placeholder="Add Tag" onChange={(e) => setTagVal(e.target.value)} />
                }
              </div>
              {!tagEdit && <img src="/addicon.png" alt="" className="add-icon-img" onClick={() => { setTagEdit(true) }} />}
              {tagEdit && <button className="add" onClick={() => submitCategory('tags')}>Add</button>}
              {tagEdit && <img src="/cross.png" alt="" className="cross-icon-img" onClick={() => { setTagEdit(false) }} />}

            </div>
          </div>


          <div className="second-row">
            <div className="title">
              <label className="disp-title">
                Question Title
              </label>
              <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Add Title..." />
            </div>

            <div className="title">
              <label className="disp-title">Add Question</label>
              <input type="text" placeholder="Enter Question" value={question} onChange={(e) => setQuestion(e.target.value)} />
            </div>

            <div className="que">
              {
                anstype === 'Text' &&
                <div className="title">
                  <label className="disp-title">Answer</label>
                  <input type="text" placeholder="Enter Question" value={answer} onChange={(e) => setAnswer(e.target.value)} />
                </div>
              }

              {
                anstype === 'Mcq' &&
                <div className="radio-type">
                  <input type="text" placeholder="Option1" value={opt1} onChange={(e) => setOpt1(e.target.value)} />

                  <input type="text" placeholder="Option2" value={opt2} onChange={(e) => setOpt2(e.target.value)} />

                  <input type="text" placeholder="Option3" value={opt3} onChange={(e) => setOpt3(e.target.value)} />

                  <input type="text" placeholder="Option4" value={opt4} onChange={(e) => setOpt4(e.target.value)} />

                  <input type="text" placeholder="Correct Answer" value={answer} onChange={(e) => setAnswer(e.target.value)} />

                </div>
              }
              <button className="add-btn" onClick={submitHandler}>Add</button>
            </div>
          </div>
        </div>
      </div>
    </div >
  );
}

export default Dashboard;
