import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchEmailCount } from '../../store/UnreadEmailSlice';
import Card from '../UI/Card';
import './Email.css';

const EmailDetails = () => {
  const { id } = useParams();
  const [email, setEmail] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const token = useSelector(state => state.auth.token);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEmailContent = async () => {
      try {
        const response = await axios.get(`https://mail-box-client-backend.onrender.com/emails/fetchemail/${id}`, {
          headers: {
            "Authorization": token
          }
        });
        const emailContent = response.data.email;
        console.log('fetch email ', response.data.email);
        setEmail(emailContent);
        dispatch(fetchEmailCount(token));
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchEmailContent();
  }, [id, token, dispatch]);

  const handleDeleteMail = async (emailId) => {
    if (window.confirm('Are you sure you want to delete this email?')) {
      try {
        await axios.delete(`https://mail-box-client-backend.onrender.com/emails/deleteemail/${emailId}`, {
          headers: {
            "Authorization": token
          }
        });
        navigate('/inbox');
      } catch (error) {
        console.error('Error deleting email:', error);
      }
    }
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (error) {
    return <div className="error">Error: {error.message}</div>;
  }

  return (
    <Card>
      <div className="email-details">
        <div className="email-header">
          <h6>From: </h6>
          <p>{email.sender || 'Unknown'}</p>
          <h6>To: </h6>
          <p>{email.receiver || 'Unknown'}</p>
        </div>
        <div className="email-content" dangerouslySetInnerHTML={{ __html: email.content }} />
        <div className="email-actions">
          <button type="button" className="btn-back" onClick={() => navigate('/inbox')}>Back to Inbox</button>
          <button type="button" className="btn-delete" onClick={() => handleDeleteMail(email._id)}>Delete Email</button>
        </div>
      </div>
    </Card>
  );
};

export default EmailDetails;
