import axios from 'axios';
import React, { useState } from 'react'
import { LuTrash2 } from 'react-icons/lu';
import { RiLoader5Fill } from 'react-icons/ri';
import { useNavigate } from 'react-router-dom';
function DeleteContent(userEmail, id, handleTrashProject) {
    const apiUrl = import.meta.env.VITE_REACT_APP_BACKEND_API;
    const [deleting, setDeleting] = useState(false)
    const navigate = useNavigate()
    return (
        <>
        </>
    )
}
export default DeleteContent