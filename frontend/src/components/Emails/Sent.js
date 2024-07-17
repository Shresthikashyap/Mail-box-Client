import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Card from '../UI/Card';
import { Link } from 'react-router-dom';
import {  useSelector } from 'react-redux';
import './Sent.css';

function Sent() {
  const [emails, setEmails] = useState([]);
  const token = useSelector(state => state.auth.token);

  useEffect(() => {
    const fetchEmails = async () => {
      try {
        const response = await axios.get('https://mail-box-client-c2vn.onrender.com/emails/sentemails', {
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
        <h1 className="text-center mb-5">Sent</h1>
        <ul className="list-group">
          {emails.map((email) => (
            <Link to={`/email/${email._id}`} key={email._id} className="list-group-item">
              <li>
            
                  <div> {email.content.replace(/<[^>]*>?/gm, '')}</div>
                
              </li>
            </Link>
          ))}
        </ul>
      </div>
    </Card>
  );
}

export default Sent;
