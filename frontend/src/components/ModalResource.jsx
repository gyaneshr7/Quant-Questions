import React, { useState, useEffect } from 'react'
import Modal from "react-bootstrap/Modal";
import axios from "axios"
import { injectStyle } from "react-toastify/dist/inject-style";
import { ToastContainer, toast } from "react-toastify";

function ModalResource(props) {
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState("");
  const [file, setFile] = useState("");
  const [formsubmit, setFormSubmit] = useState(false);
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    fetchCategory();
    fetchResources();
    setFormSubmit(false)
  }, [formsubmit])

  if (typeof window !== "undefined") {
    injectStyle();
  }

  const fetchResources = async () => {
    const data = await fetch(`http://localhost:8000/resources/`);
    const res = await data.json();
    // localStorage.setItem("res",res)
    setResources(res);
  }

  const fetchCategory = async () => {
    const data = await fetch(`http://localhost:8000/category/getcategories`);
    const res = await data.json();
    setCategories(res.category);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (category != "") {
      const formData = new FormData();
      formData.append("pdf", file);
      formData.append("name", category);

      let exist = false;
      resources && resources.map((data) => {
        if (data.name == category) {
          exist = true;
        }
      })

      if (exist) {
        const result = window.confirm("Do you want to override existing file ?");
        // console.log(result, "askjhgdvtfsdy");
        if (result) {
          setLoading(true);
          axios
            .put(`http://localhost:8000/resources/update`, formData)
            .then(async (res) => {
              // console.log(res);
              toast.success("File Updated Successfully");
              setFile("");
              setCategory("");
              setFormSubmit(true);
              setLoading(false);
              setTimeout(()=>{
                window.location.href = '/all-ques'
              },5000)
            })
        }
      } else {
        setLoading(true);
        axios
          .post(`http://localhost:8000/resources/add/pdf`, formData)
          .then(async (res) => {
            toast.success("File Uploaded Successfully");
            setFile("");
            setCategory("");
            setFormSubmit(true);
            setLoading(false);
            setTimeout(()=>{
              window.location.href = '/all-ques'
            },5000)
          })
      }
    } else {
      toast.warning("Please select category...")
    }

  }


  return (

    <Modal
      show={props.show}
      backdrop="static"
      onHide={props.close}
      className="my-modal">

      <Modal.Header closeButton onClick={() => { setCategory(""); setFile("") }}>
        <Modal.Title>Upload Resources</Modal.Title>
      </Modal.Header>
      <Modal.Body onHide={props.close}>
        <form className="up-modal" onSubmit={submitHandler}>
          <div style={{ color: "red" }}>*Note-Please upload pdf only</div>
          <div className="show-pdf">

            <div className="inline-categ">
              <div style={{ fontWeight: "600", marginTop: "4px" }}>Choose Category</div>
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

            <input type="file" accept='.pdf' name={file} onChange={(e) => setFile(e.target.files[0])} required />
          </div>

          {loading ? (
            <button type='submit' className="uploadb">
              Wait  <i class="fa fa-spinner fa-spin"></i>
            </button>

          ) : (
            <button type='submit' className="uploadb">Upload</button>
          )
          }

        </form>
        <ToastContainer/>
      </Modal.Body>
    </Modal>
   

  )
}

export default ModalResource
