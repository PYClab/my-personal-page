import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";

export default function Navbar({ token, setToken }) {
  const [visitorCount, setVisitorCount] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const currentCount = parseInt(localStorage.getItem("visitorCount") || "0");
    const newCount = currentCount + 1;
    setVisitorCount(newCount);
    localStorage.setItem("visitorCount", newCount);
  }, []);

  const handleLogout = () => {
    setToken(null);
    localStorage.removeItem("authToken");
    navigate("/login"); 
  };

  return (
    <header className="navbar">
      <div className="navbar-left">
        <span className="title">Brian's Blog</span>
        <nav className="nav-links">
          <Link to="/" className="link">About</Link>
          <Link to="/chat" className="link">Chat</Link>
          <Link to="/user" className="link">User</Link>
          {/*<Link to="/upload-test" className="link">UploadTest</Link>*/}
        </nav>
      </div>

      <div className="navbar-right">
        <span className="visitor">Visitor Count:{visitorCount}</span>

        {token ? (
          <btn onClick={handleLogout} className="btn link">Logout</btn>
        ) : (
          <>
            <Link to="/login" className="btn link">Login</Link>
            <Link to="/signup" className="btn link">Sign Up</Link>
          </>
        )}
      </div>
    </header>
  );
}
