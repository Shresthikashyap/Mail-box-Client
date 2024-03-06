import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import SignupPage from './components/Auth/SignUp';
import SigninPage from './components/Auth/Signin';
import EmailEditor from './components/EmailEditor/EmailEditor';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/signup">
        <SignupPage />
        </Route>
        <Route exact path="/"  >
        <SigninPage />
        </Route>
        <Route exact path="/emaileditor"  >
        < EmailEditor/>
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
