import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import About from './pages/About';
import Chat from './pages/Chat';
import User from './pages/User';
import SignUp from './pages/SignUp';
import Login from './pages/Login';
//import UploadTest from './pages/UploadTest';

import './App.css';

function App() {
  const [token, setToken] = useState(null);

  useEffect(() => {
    const savedToken = localStorage.getItem('authToken');
    if (savedToken) {
      setToken(savedToken);
    }
  }, []);

  return (
    <Router>
      <Navbar token={token} setToken={setToken} />
      <Routes>
        <Route path="/" element={<About />} />
        <Route path="/chat" element={<Chat token={token} />} />
        <Route path="/user" element={<User />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login setToken={setToken} />} />
        {/*<Route path="/upload-test" element={<UploadTest />} />*/}
      </Routes>
    </Router>
  );
}

export default App;
