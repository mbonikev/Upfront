import React from 'react'
import addnotes from '../assets/add_notes.svg'

function AddNotes({ width }) {
  return (
    <img src={addnotes} className={`${width} max-w-[250px] opacity-90`} alt="Add Notes" />
)
}

export default AddNotes