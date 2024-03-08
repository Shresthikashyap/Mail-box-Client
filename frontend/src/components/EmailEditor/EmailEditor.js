import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { fetchEmailCount } from '../../store/UnreadEmailSlice';
import Card from '../UI/Card';
import './EmailEditor.css'

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
      
    } catch (error) {
      console.error('Error sending email:', error);
    }
  };

  return (
    <Card>
      <h1 className="text-center mb-5">Create Email</h1>
      <div className="container" >
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
          <div className="col-md-9" >
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
       
        
            <button className="btn btn-primary" onClick={handleSendEmail}>
            Send Email
            </button>
          
      
      </div>
    </Card>
  );
};

export default EmailEditor;
