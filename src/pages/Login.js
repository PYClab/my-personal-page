import React, { useState } from 'react';
import { login } from '../api/api';
import { useNavigate } from 'react-router-dom';
import './SignUp.css';

function Login({ setToken }) {
  const [form, setForm] = useState({ username: '', password: '' });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await login(form);
      const token = res.data.token;
      setToken(token); 
      localStorage.setItem('authToken', token); 
      navigate('/chat'); 
    } catch {
      setMessage('Login Failed. Please check your account or password!');
    }
  };

  return (
    <div className="register-container">
    <div className="register-box">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input
          placeholder="Username"
          value={form.username}
          onChange={(e) => setForm({ ...form, username: e.target.value })}
        />
        <input
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />
        <button type="submit">Login</button>
        {message && <p>{message}</p>}
      </form>
      </div>
    </div>
  );
}

export default Login;
