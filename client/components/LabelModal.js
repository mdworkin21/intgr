import React from 'react'
import '../public/styles/labelModal.css'

//Not hooked up yet
const LabelModal = ({label, modal}) => {
  return (
    <div className="modal-container">
      <h1>Results</h1>
      <div className="modal-input">
      {label}
      </div>
      <button type="button" className='btn-close'>Nope, sad face</button>
      <button type="button" className='btn-accept'>Yup!</button>
    </div>
  )
}

export default LabelModal