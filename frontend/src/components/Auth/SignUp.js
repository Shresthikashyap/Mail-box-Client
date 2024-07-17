import React, { useState } from 'react';
import axios from 'axios';
import './SignUp.css'; // Import the CSS file

const SignupPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [signupSuccess, setSignupSuccess] = useState(false);
  const [signupFailed, setSignupFailed] = useState(false);

  const handleSubmit = async(e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
        alert("Passwords don't match");
        return;
      }
  
      try {
        const user = {
          email,
          password,
        };
        console.log(user)
        const response = await axios.post('https://mail-box-client-c2vn.onrender.com/users/signup', user,{
          headers: {
            'Content-Type': 'application/json',
          },
        });
        console.log('Signup successful:', response.data);
        setSignupSuccess(true);
        // Handle successful signup, redirect user or show success message
      } catch (error) {
        console.error('Error signing up:', error);
        // alert('check credentials again')
        setSignupFailed(true);
      }
  };

  return (
    <div className="container-fluid">
      <div className="col-md-4 bg-dark text-white p-4 rounded ">
        <h1 className="text-center mb-5">Signup</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email address</label>
            <input
              type="email"
              className="form-control"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Confirm Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>

          <div className="text-center mb-3"> {/* Center the button */}
              <button type="submit" className="btn btn-light">
                Sign Up
              </button>
          </div>

          <div className='text-center mb-3'>
          Login to <a href="/">existing </a> Account
          </div> 

          {signupSuccess && ( // Display success message if signupSuccess is true
          <div className="alert alert-success" role="alert">
            You have signed up successfully!
          </div>
        )}

        {signupFailed && ( // Display success message if signupSuccess is true
          <div className="alert alert-danger" role="alert">
            Something went wrong!
          </div>
        )}
        </form>
      </div>
    </div>
  );
};

export default SignupPage;
