import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Info from "./Info";
import Form from "./Form"; // Import Form component

const App = () => {
  return (
    <Router>
      <nav>
        <Link to="/">Home</Link> | 
        <Link to="/info">Reservations</Link> | 
        <Link to="/form">Submit Details</Link> {/* Add link to Form */}
      </nav>
      
      <Routes>
        <Route path="/" element={<h1>Welcome to Our Website</h1>} />
        <Route path="/info" element={<Info />} />
        <Route path="/form" element={<Form />} /> {/* Set route for Form */}
      </Routes>
    </Router>
  );
};

export default App;
