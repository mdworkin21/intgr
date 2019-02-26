import React from 'react'
import '../public/styles/labelModal.css'

const LabelModal = ({label, handleChange}) => {
  return (
    <form id="label-form">
      <input type="text" name='label' placeholder='What number is it?' value={label} onChange={handleChange}/>
    </form>
  )
}

export default LabelModal