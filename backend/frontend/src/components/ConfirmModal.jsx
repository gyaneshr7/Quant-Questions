import React from "react";
import Modal from "react-modal";
// import "./ConfirmModal.css";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    width: "40vw",
    height: "25vh",
    border: "1px solid #ccc",
    boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
    borderRadius: "6px",
    padding: "20px",
    backgroundColor: "#fff",
    display: "flex",
    flexDirection: "column",
    gap: "30px",
    position: "absolute",
    
    
  },
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
};

const btnStyle = {
  padding: "10px",
  borderRadius: "40px",
  color:"white"
};

const ConfirmModal = ({ isOpen, onClose, onConfirm, id, text }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Confirm Modal"
      style={customStyles}
    >
      <div className="title">
        <h2 style={{ height: "5vh" }}>{text}</h2>
        <hr />
      </div>

      <div
        className="buttons"
        style={{
          display: "flex",
          gap: "40px",
          justifyContent: "flex-end",
          gap: "10px",
          position: "relative",
          bottom: "20px",
          flexWrap: "wrap",
        }}
      >
        <button type="button" className="btn btn-danger" onClick={onClose}>
          Cancel
        </button>
        <button
          type="button" className="btn btn-primary"
          onClick={() => {
            onConfirm(id);
            onClose();
          }}
        >
          Confirm
        </button>
      </div>
    </Modal>
  );
};

export default ConfirmModal;
