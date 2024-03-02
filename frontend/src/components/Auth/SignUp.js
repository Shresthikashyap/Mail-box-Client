import React, { useState } from 'react';
import axios from 'axios';

const SignupPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

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
        const response = await axios.post('https://localhost:3001/users/signup', user,{
          headers: {
            'Content-Type': 'application/json',
          },
        });
        console.log('Signup successful:', response.data);
        // Handle successful signup, redirect user or show success message
      } catch (error) {
        console.error('Error signing up:', error);
        alert('check credentials again')
      }
  };

  return (
    <div
      className="container-fluid"
      style={{
        backgroundImage: `url('https://images.rawpixel.com/image_800/czNmcy1wcml2YXRlL3Jhd3BpeGVsX2ltYWdlcy93ZWJzaXRlX2NvbnRlbnQvbHIvdjU0NmJhdGNoMy1teW50LTM0LWJhZGdld2F0ZXJjb2xvcl8xLmpwZw.jpg')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minWidth:'200px',
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <div className="col-md-6">
        <h1 className="text-center mb-4">Signup</h1>
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

          <button type="submit" className="btn btn-primary btn-block">
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignupPage;
