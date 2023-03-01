import React ,{ useEffect, useState }from 'react'
import Header from './Header';
import './Submissions.css';
import {ImCross} from 'react-icons/im';
import {TiTick} from 'react-icons/ti';
function Submissions() {
const [submittedQuestions,setSubmittedQuestions]=useState();
const user = JSON.parse(localStorage.getItem("quantuser"));
  useEffect(() => {
    const fetchData = async () => {
      const data = await fetch(`http://localhost:8000/user/get/all/attempted/question/${user.id}`)
      const res = await data.json();
      setSubmittedQuestions(res.submittedQuestions.reverse());
    }
    fetchData();
  }, [])


const itemsPerPage=10;
const [currentPage, setCurrentPage] = useState(1);

const totalPages = Math.ceil(60 / itemsPerPage);

const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
};

const startIndex = (currentPage - 1) * itemsPerPage;
const endIndex = startIndex + itemsPerPage;

const tableData = submittedQuestions && submittedQuestions.slice(startIndex, endIndex);

  return (
    <div>
    <Header/>
    <div className='sub'>
    <div className="search-submit">
      <label style={{marginRight:"5px"}}>Search:</label><input type="text" />
    </div>
    <div className='whole-table'>
            <table className='mytable table-striped'>
                <thead className='table-head'>
                    <tr height="1%">
                    <th width="2%">Date Submitted</th>
                    <th  width="5%">Question</th>
                    <th  width="2%">Correct?</th>
                    <th  width="1%">Difficulty</th>
                    <th  width="1%">Category</th>
                    </tr>
                </thead>
                <tbody className='tablebody'>
                    {tableData && tableData.map((data) => (
                       <tr height="1%" >
                       <td className='set'>{data.date}</td>
                       <td className='quest set'>{data.question && data.question.title}</td>
                       <td>
                        {
                          data.correctAns ?<TiTick color="green" size={25} className="tick"/>:<ImCross size={15} color="red"/>
                        }
                       </td>
                       <td>
                           <p
                               className={
                                   data.question && data.question.difficulty==="easy"?"success":data.question && data.question.difficulty==='hard'?"danger" :"medium"
                               }>
                               {data.question && data.question.difficulty}    
                           </p>
                       </td>
                       <td className='quest set-categ'>{data.question && data.question.category}</td>
                   </tr>
                    ))}
                </tbody>
            </table>

            <nav className='d-flex justify-content-center'>
            <ul className='pagination'>
                {
                    [...Array(totalPages)].map((_, index) => (
                        <li className={
                            _===currentPage?"page-item active":"page-item"
                        }><button className='page-button'
                        onClick={()=>handlePageChange(index+1)}>{index+1}</button></li>
                    ))
                }
            </ul>
        </nav>
        </div>
        </div>
    </div>
  )
}

export default Submissions
