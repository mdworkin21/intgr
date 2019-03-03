import React from 'react'
import '../public/styles/labelModal.css'

const LabelModal = ({label, modal}) => {
  console.log('MOD', label, modal)
  return (
    <div className="modal-container">
      <h1>Results</h1>
      <div className="modal-input">
        <textarea rows="3"></textarea>
      </div>
      <button type="button" className='btn-close'>Close</button>
      <button type="button" className='btn-accept'>Yup!</button>
    </div>
  )
}

export default LabelModal