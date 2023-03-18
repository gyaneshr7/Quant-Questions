import React, { useEffect, useState } from "react";
import Header from "./Header";
import "./Submissions.css";
import { ImCross } from "react-icons/im";
import { TiTick } from "react-icons/ti";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

function Submissions() {
  const [submittedQuestions, setSubmittedQuestions] = useState();
  const user = JSON.parse(localStorage.getItem("quantuser"));
  useEffect(() => {
    const fetchData = async () => {
      const data = await fetch(
        `http://localhost:8000/user/get/all/attempted/question/${user.id}`
      );
      const res = await data.json();
      setSubmittedQuestions(res.submittedQuestions.reverse());
    };
    fetchData();
  }, []);

  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const tableData =
    submittedQuestions && submittedQuestions.slice(startIndex, endIndex);

  function goToPrev() {
    setCurrentPage((page) => page - 1);
  }

  function goToNext() {
    setCurrentPage((page) => page + 1);
  }

  const totalPages = Math.ceil(submittedQuestions && submittedQuestions.length / itemsPerPage);

  return (
    <div>
      <Header />
      <div className="sub">
        <div className="search-submit">
          {/* <label style={{ marginRight: "5px" }}>Search:</label> */}
          {/* <input type="text" /> */}
        </div>
        <div className="whole-table">
          <table className="mytable table-striped web-table">
            <thead className="table-head">
              <tr height="1%">
                <th width="2%">Date Submitted</th>
                <th width="5%">Question</th>
                <th width="2%">Correct</th>
                <th width="1%">Difficulty</th>
                <th width="1%">Category</th>
              </tr>
            </thead>
            {
              submittedQuestions && submittedQuestions.length>0 ? 
              <tbody className="tablebody">
              {tableData &&
                tableData.map((data) => (
                  <tr height="1%">
                    <td className="set">{data.date}</td>
                    <td className="quest set que-co">
                      {data.question && data.question.title}
                    </td>
                    <td>
                      {data.correctAns ? (
                        <TiTick color="green" size={25} className="tick" />
                      ) : (
                        <ImCross size={15} color="red" />
                      )}
                    </td>
                    <td>
                      <p
                        className={
                          data.question && data.question.difficulty === "easy"
                            ? "success"
                            : data.question &&
                              data.question.difficulty === "hard"
                            ? "danger"
                            : "medium"
                        }
                      >
                        {data.question && data.question.difficulty}
                      </p>
                    </td>
                    <td className="quest set-categ">
                      {data.question && data.question.category}
                    </td>
                  </tr>
                ))}
            </tbody>
              :
              
           <tbody>
            <tr>
              <td className="no-col-data" colspan="5">
                No recent submissions
              </td>
            </tr>
          </tbody>
              
            } 
            
          </table>

          <table className="mytable table-striped phone-table">
            <thead className="table-head">
              <tr height="1%">
                {/* <th width="2%">Date Submitted</th> */}
                <th>Question</th>
                <th>Correct</th>
                <th>Difficulty</th>
                {/* <th width="1%">Category</th> */}
              </tr>
            </thead>
            {
              submittedQuestions && submittedQuestions.length>0 ?
              <tbody className="tablebody">
              {tableData &&
                tableData.map((data) => (
                  <tr height="1%">
                    {/* <td className="set">{data.date}</td> */}
                    <td className="quest set que-co">
                      {data.question && data.question.title}
                    </td>
                    <td>
                      {data.correctAns ? (
                        <TiTick color="green" size={25} className="tick" />
                      ) : (
                        <ImCross size={15} color="red" />
                      )}
                    </td>
                    <td>
                      <p
                        className={
                          data.question && data.question.difficulty === "easy"
                            ? "success"
                            : data.question &&
                              data.question.difficulty === "hard"
                            ? "danger"
                            : "medium"
                        }
                      >
                        {data.question && data.question.difficulty}
                      </p>
                    </td>
                    <td className="quest set-categ">
                      {/* {data.question && data.question.category} */}
                    </td>
                  </tr>
                ))}
            </tbody>
            :
            <tbody>
                    <tr>
                      <td className="no-data" colspan="5">
                        No recent submissions
                      </td>
                    </tr>
                  </tbody>
            }
            
          </table>

          <nav className="d-flex justify-content-center">
            <ul className="pagination">

              <button
                onClick={goToPrev}
                className="prev"
                disabled={currentPage === 1}
              >
                <IoIosArrowBack fontSize={20} />
                Prev
              </button>
              <p className="nums">
                {
                  submittedQuestions &&  submittedQuestions.length > 0 ? `${currentPage}/${totalPages}`: "0/0"
                }
                
              </p>
              <button
                onClick={goToNext}
                className="next"
                disabled={
                  currentPage >= totalPages}
              >
                Next
                <IoIosArrowForward fontSize={20} />
              </button>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
}

export default Submissions;
