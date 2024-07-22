import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../../store/AuthSlice';
import axios from 'axios';
import './Signin.css';

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
<<<<<<< HEAD
    
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
=======
  
      try {
        const user = {
          email,
          password,
        };
        console.log(user)
        const response = await axios.post('https://mail-box-client-c2vn.onrender.com/users/login', user);
        console.log('Signin successful:', response.data);
        const token = response.data.token;
        dispatch(loginSuccess({ token }));
        navigate('/inbox')
        
      } catch (error) {
        console.error('Error signing up:', error);
        // alert('check credentials again')
        setSigninFailed(true);
      }
>>>>>>> fd5db59d5468fd3ec0957957b883e7f79956eda6
  };

  return (
    <div className="container-fluid">
      <div className="col-md-4 bg-dark text-white p-4 rounded">
        <h1 className='text-center mb-5'>Login</h1>
        <form onSubmit={handleSubmit}>
          <div className='form-group '>
            <label>Email:</label>
            <input 
              type="email"
              className='form-control'
              placeholder="Enter Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          
          <div className='form-group '>
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
            <a href="/forgot-password">Forgot Password</a>
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