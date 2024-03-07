import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { fetchEmailCount } from '../../store/UnreadEmailSlice';
import Card from '../UI/Card';

const EmailEditor = () => {
  const [editorHtml, setEditorHtml] = useState('');
  const [to, setTo] = useState('');
  const token = useSelector(state => state.auth.token);
  const dispatch = useDispatch();
  
  const handleChange = html => {
    setEditorHtml(html);
  };

  const handleSendEmail = async () => {
    try {
      // Make API request to backend
      const response = await axios.post(
        'http://localhost:3001/emails/useremails',
        { to, content: editorHtml },
        {
          headers: {
            Authorization: token
          }
        }
      );

      console.log('Email sent:', response.data);
      dispatch(fetchEmailCount(token));
      alert('Email sent successfully');
      // Handle success or display a message to the user
    } catch (error) {
      console.error('Error sending email:', error);
      // Handle error or display an error message to the user
    }
  };

  return (
    <Card>
      <h1 className="text-center mb-5">Create Email</h1>
      <div className="container" style={{ marginLeft: '170px' }}>
        <div className="row">
          <div className="col-md-7 mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="To"
              value={to}
              onChange={e => setTo(e.target.value)}
            />
          </div>
        </div>
  
        <div className="row">
          <div className="col-md-9">
          <div className="col-md-9" style={{ height: '400px' }}>
            <ReactQuill
              theme="snow"
              value={editorHtml}
              onChange={handleChange}
              modules={{
                toolbar: [
                  [{ header: '1' }, { header: '2' }, { font: [] }],
                  [{ size: [] }],
                  ['bold', 'italic', 'underline', 'strike', 'blockquote'],
                  [
                    { list: 'ordered' },
                    { list: 'bullet' },
                    { indent: '-1' },
                    { indent: '+1' }
                  ],
                  ['link', 'image', 'video'],
                  ['clean']
                ]
              }}
            />
          </div>
          </div>
        </div>
       
        <div className="row">
          <div className="col-md-12">
            <button className="btn btn-primary btn-block" onClick={handleSendEmail} >
              Send Email
            </button>
          </div>
        </div>
      
      </div>
    </Card>
  );
};

export default EmailEditor;
