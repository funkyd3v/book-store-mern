import axios from 'axios';
import React, {useEffect, useState} from 'react';
import { BackButton } from '../components/BackButton';
import { Spinner } from '../components/Spinner';
import { useParams } from 'react-router-dom';

export const ShowBook = () => {
  const [book, setBook] = useState({});
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:5555/books/${id}`)
      .then((response) => {
        setBook(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      })
  }, []);
  return (
    <div className='p-4'>
      <BackButton />
      <h1 className='text-3xl my-4'>Show Book</h1>
      {loading ? (<Spinner />) : (
        <div className='flex flex-col border-2 border-sky-600 rounded-xl w-fit p-4'>
          <div className='py-4'>
            <span className='text-xl mr-4 text-grey-500'>Id</span>
            <span>{book._id}</span>
          </div>
          <div className='py-4'>
            <span className='text-xl mr-4 text-grey-500'>Title</span>
            <span>{book.title}</span>
          </div>
          <div className='py-4'>
            <span className='text-xl mr-4 text-grey-500'>Author</span>
            <span>{book.author}</span>
          </div>
          <div className='py-4'>
            <span className='text-xl mr-4 text-grey-500'>Publish Year</span>
            <span>{book.publishYear}</span>
          </div>
          <div className='py-4'>
            <span className='text-xl mr-4 text-grey-500'>Create Time</span>
            <span>{new Date(book.createdAt).toString()}</span>
          </div>
          <div className='py-4'>
            <span className='text-xl mr-4 text-grey-500'>Update Time</span>
            <span>{new Date(book.updatedAt).toString()}</span>
          </div>
        </div>
      )}
    </div>
  )
}
