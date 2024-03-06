import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import axios from 'axios';

const EmailEditor = () => {
  const [editorHtml, setEditorHtml] = useState('');

  const handleChange = (html) => {
    setEditorHtml(html);
  };

  const handleSendEmail = async () => {
    try {
      // Make API request to backend
      const response = await axios.post('http://localhost:3001/emails/useremails', {
        content: editorHtml // Send email content to backend
      });

      console.log('Email sent:', response.data);
      // Handle success or display a message to the user
    } catch (error) {
      console.error('Error sending email:', error);
      // Handle error or display an error message to the user
    }
  };

  return (
    <div>
      <h1>Create Email</h1>
      <ReactQuill
        theme="snow"
        value={editorHtml}
        onChange={handleChange}
        modules={{
          toolbar: [
            [{ 'header': '1'}, {'header': '2'}, { 'font': [] }],
            [{size: []}],
            ['bold', 'italic', 'underline', 'strike', 'blockquote'],
            [{'list': 'ordered'}, {'list': 'bullet'}, 
             {'indent': '-1'}, {'indent': '+1'}],
            ['link', 'image', 'video'],
            ['clean']
          ],
        }}
      />
      <button onClick={handleSendEmail}>Send Email</button>
    </div>
  );
};

export default EmailEditor;
