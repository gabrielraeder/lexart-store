import AddModal from "./AddModal";
import { useState } from 'react';
import PropTypes from 'prop-types';

export default function AddButton({ editData }) {
  const [showModal, setShowModal] = useState(false);

  const handleShow = () => {
    setShowModal((prev) => !prev);
  };

  return (
    <>
      <button className="add_btn" onClick={handleShow}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256"><rect width="256" height="256" fill="none"/><line x1="40" y1="128" x2="216" y2="128" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="24"/><line x1="128" y1="40" x2="128" y2="216" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="24"/></svg>
      </button>
      <AddModal handleShow={handleShow} showModal={showModal} editData={editData} />
    </>
  )
}

AddButton.propTypes = {
  editData: PropTypes.func.isRequired,
};
