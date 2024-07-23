import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../../store/AuthSlice';
import axios from 'axios';
import classes from './Signin.module.css';

const SigninPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [signinFailed, setSigninFailed] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (email === '' || password === '') {
      setSigninFailed(false);
    }
  }, [email, password]);

  const handleSubmit = async(e) => {
    e.preventDefault();
    
    try {
      const user = { email, password };
      console.log(user);
      const response = await axios.post('http://localhost:3001/users/login', user);
      console.log('Signin successful:', response.data);
      const token = response.data.token;
      dispatch(loginSuccess({ token }));
      navigate('/inbox');
    } catch (error) {
      console.error('Error signing up:', error);
      setSigninFailed(true);
    }
  
      try {
        const user = {
          email,
          password,
        };
        console.log(user)
        const response = await axios.post('http://localhost:3001/users/login', user);
        console.log('Signin successful:', response.data);
        const token = response.data.token;
        dispatch(loginSuccess({ token }));
        navigate('/inbox')
        
      } catch (error) {
        console.error('Error signing up:', error);
        // alert('check credentials again')
        setSigninFailed(true);
      }

  };

  // const forgetPasswordHandler = () => {
  //   navigate('/forgetpassword');
  // }

  return (
    <div className={classes.container_fluid}>
      <div className="col-md-4 bg-dark text-white p-4 rounded">
        <h1 className={classes.heading}>Login</h1>
        <form onSubmit={handleSubmit}>
          <div className={classes.form_group}>
            <label>Email:</label>
            <input 
              type="email"
              className='form-control'
              placeholder="Enter Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          
          <div className={classes.form_group}>
            <label>Password:</label>
            <input 
              type="password"
              className='form-control'
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          
          <div className='text-center mb-3'>
            <button type='submit' className='btn btn-light'>Sign In</button>
          </div>
          
          <div className='text-center mb-3'>
            <a href="/forgetpassword" >Forgot Password</a>
          </div>
          
          <div className='text-center mb-3'>
            Create a <a href="/signup">new</a> Account
          </div>
          
          {signinFailed && email && password && (
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