import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchEmailCount } from '../../store/UnreadEmailSlice';

const EmailDetails = () => {
  const { id } = useParams();
  const [email, setEmail] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const token = useSelector(state => state.auth.token);
  const dispatch = useDispatch();
  const navigate = useNavigate()

  useEffect(() => {
    const fetchEmailContent = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/emails/fetchemail/${id}`, {
          headers: {
            "Authorization": token
          }
        });
        const emailContent = response.data.email;
        console.log('fetch email ',response.data.email)
        setEmail(emailContent);
        dispatch(fetchEmailCount(token));

      } catch (error) {
        setError(error); // Set error state with the entire error object
      } finally {
        setLoading(false); // Set loading state to false regardless of success or failure
      }
    };

    fetchEmailContent();
  }, [id, token,dispatch]);

  if (loading) {
    return <div className="text-info">Loading...</div>;
  }

  if (error) {
    return <div className="text-danger">Error: {error.message}</div>;
  }

  const handleDeleteMail = async (emailId) => {
    try {
      console.log('jjjjjj ',email._id)
      const id = email._id;
      await axios.delete(`http://localhost:3001/emails/deleteemail/${id}`, {
        headers: {
          "Authorization": token
        }
      });
         
      
      navigate('/inbox')
     
    } catch (error) {
      console.error('Error deleting email:', error);
      // Handle error (e.g., show error message to the user)
    }
  };

  return (
    <div>
      <div dangerouslySetInnerHTML={{ __html: email.content }} />
      <div className='delete-mail'>
          <button type='submit' onClick={() => handleDeleteMail(email._id)}>Delete</button>
    </div>
    </div>
  );
};

export default EmailDetails;
