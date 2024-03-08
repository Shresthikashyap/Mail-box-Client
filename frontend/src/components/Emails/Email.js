import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchEmailCount } from '../../store/UnreadEmailSlice';
import Card from '../UI/Card';

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
        setError(error); 
      } finally {
        setLoading(false); 
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
    }
  };

  return (
    <Card>
      <div dangerouslySetInnerHTML={{ __html: email.content }} />
      <div className='delete-mail'>
          <button type='submit' className="btn btn-primary" onClick={() => handleDeleteMail(email._id)}>Delete Mail</button>
    </div>
    </Card>
  );
};

export default EmailDetails;
