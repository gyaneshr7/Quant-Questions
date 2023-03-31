import React, { useEffect, useState } from 'react'
import Header from './Header';
import './Resources.css';
import { BiSearchAlt2 } from 'react-icons/bi';
import { FaArrowCircleLeft } from 'react-icons/fa';
import { FaArrowCircleRight } from 'react-icons/fa';
function Resources() {
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [categories, setCategories] = useState([]);
  const [resources, setresources] = useState([]);
  const [selected, setSelected] = useState([]);

  useEffect(() => {
    const fetchResources = async () => {
      const data = await fetch(`http://localhost:8000/resources/`);
      const res = await data.json();
      console.log(res);
      setresources(res);
      setSelected(res);
      // let resources=[];
      // res.map((data) => {
      //   if (!resources.includes(data.name)) {
      //     resources.push(data.name)
      //   }
      // })
      // setCategories(resources);
    }
    fetchResources();
  }, [])

  const itemsPerPage = 5;

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const tableData =
    selected && selected.slice(startIndex, endIndex);

  console.log(tableData);

  function goToPrev() {
    setCurrentPage((page) => page - 1);
  }

  function goToNext() {
    setCurrentPage((page) => page + 1);
  }

  const totalPages = Math.ceil(selected && selected.length / itemsPerPage);

  let matched = [];
  const searchHandler = (e) => {
    setSearch(e.target.value)
    if (e.target.value != "") {
      console.log(e.target.value);
      let val = e.target.value;
      resources.forEach((ques) => {
        const value = ques.name.toLowerCase().includes(val.toLowerCase());
        if (value) {
          matched.push(ques);
        }
      });
      let uniquematched = [];
      matched.map((item) => {
        var findItem = uniquematched.find((x) => x._id === item._id);
        if (!findItem) uniquematched.push(item);
      });
      setSelected(uniquematched);
      setCurrentPage(1)
    } else {
      setSelected(resources);
    }
  };

  return (
    <div>
      <Header />
      <div className='res-page'>

        <div className="Res-table-display">
          <div className="RescourcesTable">
            <div className="res-table-heading">
              <div className="res-heading-left">Resources </div>
              <div className="res-heading-right">

                <form className="res-table-search">
                  <input
                    className="srch-input"
                    type="text"
                    placeholder="Search"
                    aria-label="Search"
                    value={search}
                    onChange={searchHandler}
                  />
                  <button className="srch-btn" type="submit">
                    <BiSearchAlt2 size="20" />
                  </button>
                </form>

              </div>
            </div>

            <div className="res-table-div">
              <table class="table table-hover">
                <thead class="">

                  <tr className="res-table-head">
                    <th scope="col" className='first-col'>
                      <div className="table-categ">Categories</div>
                    </th>
                    <th scope="col" className='sec-col'>
                    <div className="table-files">Files</div>
                    </th>
                  </tr>
                </thead>
                <tbody>


                  {
                    tableData &&
                    tableData.map((data) => (
                      <tr>
                        <th scope="row">
                          <div className="table-categ data-categ">
                            {data.name}
                          </div>

                        </th>
                        <td>
                          <a href={data.pdf} target="_blank" className="res-view" >View</a>
                        </td>
                      </tr>
                    ))
                  }

                </tbody>
              </table>
            </div>

            <div className='res-pagination'>
              <button
                onClick={goToPrev}
                style={{ border: "none", background: "transparent" }}
                disabled={currentPage === 1}
              >
                <FaArrowCircleLeft size="30" />
              </button>
              <p className="nums">
                {
                  selected && selected.length > 0 ? ` Page ${currentPage} of ${totalPages}` : "0/0"
                }

              </p>
              <button
                onClick={goToNext}
                style={{ border: "none", background: "transparent" }}
                disabled={
                  currentPage >= totalPages}
              >
                <FaArrowCircleRight size="30" />
              </button>
            </div>

          </div>
        </div>

      </div>
    </div>

  )
}

export default Resources
