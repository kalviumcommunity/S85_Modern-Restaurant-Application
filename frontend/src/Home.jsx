import React from "react";
import './Home.css';

const Home = () => {
  const firstname = localStorage.getItem("firstname");

  const handleLogout = () => {
    localStorage.removeItem("firstname");
    window.location.reload();
  };

  return (
    <div>
      {firstname ? (
        <>
          <div className="logout-container">
            <button className="logout-button" onClick={handleLogout}>Logout</button>
          </div>
          <h1>Hi {firstname}... Happy to see you...</h1>
        </>
      ) : (
        <h1>Welcome to Our Website</h1>
      )}
    </div>
  );
};

export default Home;
