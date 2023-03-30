import React,{useState,useEffect} from 'react'
import Modal from "react-bootstrap/Modal";


function ModalResource(props) {
    const [categories,setCategories]=useState([]);
    const [category,setCategory]=useState("");


    useEffect(()=>{
      fetchCategory();
    })

    const fetchCategory = async () => {
        const data = await fetch(`http://localhost:8000/category/getcategories`);
        const res = await data.json();
        setCategories(res.category);
      };

    
  return (
                <Modal
                    show={props.show}
                    backdrop="static"
                    onHide={props.close}
                    className="my-modal">

                    <Modal.Header closeButton>
                        <Modal.Title>Upload Resources</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      <div className="up-modal">
                      <div style={{color:"red"}}>*Note-Please upload pdf only</div>
                      <div className="show-pdf">

                      <div className="inline-categ">
                      <div style={{fontWeight:"600",marginTop:"4px"}}>Choose Category</div>  
                      <select
                        name="category"
                        className="opt-font"
                        style={{
                          width: "130px",
                          padding: "5px",
                          borderRadius: "4px",
                          border: "1px solid rgb(199, 198, 198)",
                        }}
                        required
                        onChange={(e) => setCategory(e.target.value)}
                      >
                        <option value="Category" selected disabled hidden>
                          Category
                        </option>
                        {categories.length > 0 &&
                          categories.map((category, i) => (
                            <option key={i} value={category.name}>{category.name}</option>
                          ))}
                      </select>
                      </div>

                      <input type="file"/>
                      </div>
                      <button className="uploadb">Upload</button>
                      </div>
                    </Modal.Body>
                </Modal>
  )
}

export default ModalResource
