import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Card from '../UI/Card';
import { Link } from 'react-router-dom';
import {  useDispatch, useSelector } from 'react-redux';
import { fetchEmailCount } from '../../store/UnreadEmailSlice';
import './Inbox.css';

function parseJwt (token) {
  var base64Url = token.split('.')[1];
  var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));

  return JSON.parse(jsonPayload);
}

function Inbox() {
  const [emails, setEmails] = useState([]);
  const dispatch = useDispatch();
  const token = useSelector(state => state.auth.token);
  const decodedToken = parseJwt(token)
  console.log(decodedToken);

  useEffect(() => {
    const fetchEmails = async () => {
      try {
        const response = await axios.get('https://mail-box-client-c2vn.onrender.com/emails/getemails', {
          headers: {
            Authorization: token
          }
        });
        
        console.log(response.data.emails)
        setEmails(response.data.emails);
        dispatch(fetchEmailCount(token));

      } catch (error) {
        console.error('Error fetching emails:', error);
      }
    };
    fetchEmails();
    //const intervalId = setInterval(fetchEmails, 2000);

    // Cleanup function to clear the interval when component unmounts
    //return () => clearInterval(intervalId);
  }, [token,dispatch]);


  return (
    <Card>
      <div className='icontainer-inbox'>
        <h1 className="text-center mb-5">Inbox</h1>
        <ul className="list-group">
          {emails.map((email) => (
            <Link to={`/email/${email._id}`} key={email._id} className="list-group-item">
              <li>
                
              {(decodedToken._id !== email.userId && email.isRead === false) ? (
                  <div><span className="blue-dot"></span> {email.content.replace(/<[^>]*>?/gm, '')}</div> 
               ) : (
                  <div> {email.content.replace(/<[^>]*>?/gm, '')}</div>
               )}
          
              </li>
            </Link>
          ))}
        </ul>
      </div>
    </Card>
  );
}

export default Inbox;
