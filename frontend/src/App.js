import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import SignupPage from './components/Auth/SignUp';
import SigninPage from './components/Auth/Signin';

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
      </Switch>
    </BrowserRouter>
  );
}

export default App;
