import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Inbox() {
  const [emails, setEmails] = useState([]);

  useEffect(() => {
    fetchEmails();
  }, []);

  const fetchEmails = async () => {
    try {
      const response = await axios.get('http://localhost:3001/emails/getemails');
      setEmails(response.data.emails);
    } catch (error) {
      console.error('Error fetching emails:', error);
    }
  };

  return (
    <div>
      <h1>Inbox</h1>
      <div className="email-list">
        {emails.map((email) => (
          <div key={email._id} className="email-item">
            <div dangerouslySetInnerHTML={{ __html: email.content }} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Inbox;
