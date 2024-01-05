import React, { useState } from 'react'
import {Spinner} from '../components/Spinner'
import {BackButton} from '../components/BackButton'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import {useSnackbar} from 'notistack'


export const DeleteBook = () => {
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();
  const {enqueueSnackbar} = useSnackbar();

  const handleDeleteBook = () => {
    setLoading(true);
    axios
      .delete(`http://localhost:5555/books/${id}`)
      .then(() => {
        setLoading(false);
        enqueueSnackbar('Book deleted successfully!', {variant: 'success'});
        navigate('/')
      })
      .catch((error) => {
        console.log(error)
        setLoading(false);
        enqueueSnackbar('Error!', {variant: 'error'});
      })
  }
  return (
    <div className='p-4'>
      <BackButton />
      <h1 className='text-3xl my-4'>Delete Book</h1>
      {loading ? <Spinner /> : ''}
      <div className='flex flex-col border-2 border-sky-400 items-center rounded-xl w-[600px] p-8 mx-auto'>
        <h3 className='text-2xl'>Are you sure?</h3>
        <button className='bg-red-600 text-white px-8 py-2 w-full my-2 rounded-lg' onClick={handleDeleteBook}>Delete It</button>
      </div>
    </div>
  )
}

export default DeleteBook