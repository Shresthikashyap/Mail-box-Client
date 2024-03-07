import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Card from '../UI/Card';
import { Link } from 'react-router-dom';
import {  useSelector } from 'react-redux';
import './Inbox.css';

function Inbox() {
  const [emails, setEmails] = useState([]);
  const token = useSelector(state => state.auth.token);

  useEffect(() => {
    const fetchEmails = async () => {
      try {
        const response = await axios.get('http://localhost:3001/emails/getemails', {
          headers: {
            Authorization: token
          }
        });

        setEmails(response.data.emails);

      } catch (error) {
        console.error('Error fetching emails:', error);
      }
    };
    fetchEmails();
  }, [token]);


  return (
    <Card>
      <div>
        <h1>Inbox</h1>
        <ul className="list-group">
          {emails.map((email) => (
            <Link to={`/email/${email._id}`} key={email._id} className="list-group-item">
              <li>
                {email.isRead ? (
                  <div> {email.content.replace(/<[^>]*>?/gm, '')}</div>
                ) : (
                  <div><span className="blue-dot"></span> { email.content.replace(/<[^>]*>?/gm, '')}</div>
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
