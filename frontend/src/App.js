import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import SignupPage from './components/Auth/SignUp';
import SigninPage from './components/Auth/Signin';
import EmailEditor from './components/EmailEditor/EmailEditor';
import Inbox from './components/Emails/Inbox';
import Email from './components/Emails/Email';
import SentEmails from './components/Emails/Sent'
import Sidebar from './Sidebar';
import { useSelector } from 'react-redux';
import './App.css'; // Import the CSS file

function App() {
  const isAuth = useSelector(state => state.auth.isAuthenticated);

  return (
    <Router>
      <div className="flex-container"> 
        {isAuth && <Sidebar />}
        <div className="main-content"> 
          <Routes>
            {!isAuth && (
              <>
                <Route path="/signup" element={<SignupPage />} />
                <Route exact path="/" element={<SigninPage />} />
              </>
            )}
            <Route path="/compose" element={<EmailEditor/>} />
            <Route path="/inbox" element={<Inbox/>} />
            <Route exact path="/email/:id" element={<Email/>} />
            <Route exact path="/sent" element={<SentEmails/>} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
