import React, { useState } from 'react';
import axios from 'axios';
import './Signin.css'; 

const SigninPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [signinFailed, setSigninFailed] = useState(false);

  const handleSubmit = async(e) => {
    e.preventDefault();
  
      try {
        const user = {
          email,
          password,
        };
        console.log(user)
        const response = await axios.post('http://localhost:3001/users/login', user);
        console.log('Signin successful:', response.data);
        
      } catch (error) {
        console.error('Error signing up:', error);
        // alert('check credentials again')
        setSigninFailed(true);
      }
  };

  return (
    <div className="container-fluid">
      <div className="col-md-4 bg-dark text-white p-4 rounded">
        <h1 className='text-center mb-5'>Login</h1>
        <form onSubmit={handleSubmit}>
          <div className='form-group '>
            <label>Email:</label>
            <input type="email"
            className='form-control'
            placeholder="Enter Email"
            onChange={(e)=> setEmail(e.target.value)}/>
          </div>

          <div className='form-group '>
            <label>Password:</label>
            <input type="password"
            className='form-control'
            placeholder="Enter Password"
            onChange={(e)=> setPassword(e.target.value)}/>
          </div>  

          <div className='text-center mb-3'>
            <button type='submit' className='btn btn-light'> Sign In</button>
          </div> 

          <div className='text-center mb-3'>
            <a href="/forgot-password">Forgot Password</a>
          </div>    

          <div className='text-center mb-3'>
           Create a <a href="/signup">new </a> Account
          </div>      

          {signinFailed && (
            <div className='alert alert-danger' role='alert'>
              Something went wrong
            </div>
          )}     
        </form>
      </div>
    </div>
  );
};

export default SigninPage;
