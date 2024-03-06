import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import SignupPage from './components/Auth/SignUp';
import SigninPage from './components/Auth/Signin';
import EmailEditor from './components/EmailEditor/EmailEditor';
import Inbox from './components/Emails/Inbox';
import Sidebar from './Sidebar';
import './App.css'; // Import the CSS file for app styles

function App() {
  return (
    <BrowserRouter>
      <Sidebar />
      <div className="main-content"> {/* Apply main content styles */}
        <Switch>   
          <Route path="/signup">
            <SignupPage />
          </Route>
          <Route exact path="/">
            <SigninPage />
          </Route>
          <Route exact path="/compose">
            <EmailEditor />
          </Route>
          <Route exact path="/inbox">
            <Inbox />
          </Route>          
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
