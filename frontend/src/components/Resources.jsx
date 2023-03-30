import React,{useState} from 'react'
import Header from './Header';
import './Resources.css';
import { BiSearchAlt2 } from 'react-icons/bi';
import { FaArrowCircleLeft } from 'react-icons/fa';
import { FaArrowCircleRight } from 'react-icons/fa';
function Resources() {
  const[search,setSearch]=useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const data=[
    {
      id:1,
      category:"Probability",
      link:"https://www.placementpreparation.io/blog/best-websites-to-learn-quantitative-aptitude/"
    },
    {
      id:2,
      category:"Profit & Loss",
      link:"https://www.placementpreparation.io/blog/best-websites-to-learn-quantitative-aptitude/"
    },
    {
      id:3,
      category:"Simple Interest and Compound Interest",
      link:"https://www.placementpreparation.io/blog/best-websites-to-learn-quantitative-aptitude/"
    },
    {
      id:4,
      category:"Ratio & Proportion",
      link:"https://www.placementpreparation.io/blog/best-websites-to-learn-quantitative-aptitude/"
    },
    {
      id:5,
      category:"Probability",
      link:"https://www.placementpreparation.io/blog/best-websites-to-learn-quantitative-aptitude/"
    },
    {
      id:6,
      category:"Mixture and Alligation",
      link:"https://www.placementpreparation.io/blog/best-websites-to-learn-quantitative-aptitude/"
    },
    {
      id:7,
      category:"Percentage",
      link:"https://www.placementpreparation.io/blog/best-websites-to-learn-quantitative-aptitude/"
    },
    {
      id:8,
      category:"Percentage",
      link:"https://www.placementpreparation.io/blog/best-websites-to-learn-quantitative-aptitude/"
    }
  ]

  const itemsPerPage = 5;
 

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const tableData =
    data && data.slice(startIndex, endIndex);

    console.log(tableData);

  function goToPrev() {
    setCurrentPage((page) => page - 1);
  }

  function goToNext() {
    setCurrentPage((page) => page + 1);
  }

  const totalPages = Math.ceil(data && data.length / itemsPerPage);

  return (
    <div>
      <Header/>
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
              onChange={(e)=>setSearch(e.target.value)}
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
              <th scope="col">
              <div className="table-categ">Categories</div>
              </th>
              <th scope="col">Files</th>
            </tr>
          </thead>
          <tbody>


          {
            tableData && 
            
              tableData.map((data)=>(
                <tr>
                <th scope="row">
                  <div  className="table-categ data-categ">
                    {data.category}
                  </div>
                
                </th>
                <td>
                  <div className="res-view">View</div>
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
                style={{border:"none",background:"transparent"}}
                disabled={currentPage === 1}
              >
                <FaArrowCircleLeft size="30" />
              </button>
              <p className="nums">
                {
                  data &&  data.length > 0 ? ` Page ${currentPage} of ${totalPages}`: "0/0"
                }
                
              </p>
              <button
                onClick={goToNext}
                style={{border:"none",background:"transparent"}}
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
