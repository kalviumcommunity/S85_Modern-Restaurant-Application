import React from "react";
import './Home.css';

const Home = () => {
  const firstname = localStorage.getItem("firstname");

  const handleLogout = () => {
    localStorage.removeItem("firstname");
    window.location.reload();
  };

  return (
    <div className="home-hero">
      {firstname && (
        <div className="logout-container">
          <button className="logout-button" onClick={handleLogout}>Logout</button>
        </div>
      )}

      <div className="hero-overlay">
        {firstname ? (
          <>
            <h1>Welcome, {firstname}! 🍽️</h1>
            <p>Ready to explore mouthwatering dishes and reserve your favorite table?</p>
            <div className="hero-buttons">
              <button>Reserve Table</button>
              <button>View Menu</button>
            </div>
          </>
        ) : (
          <>
            <h1>Welcome to FlavorFusion</h1>
            <p>Login now to explore our delicious menu and reserve your spot!</p>
            <div className="hero-buttons">
              <button onClick={() => window.location.href='/login'}>Login</button>
              <button onClick={() => window.location.href='/form'}>Signup</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Home;
