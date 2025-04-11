import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Info from "./Info";
import Form from "./Form";
import Login from "./Login";
import Home from "./Home";
import Members from "./Members";
import AddFood from "./AddFood";
const App = () => {
  return (
    <Router>
      <nav>
        <Link to="/">Home</Link> | 
        <Link to="/info">Reservations</Link> | 
        <Link to="/form">Submit Details</Link> | 
        <Link to="/login">Login</Link>|
        <Link to="/members">Items</Link>|
        <Link to="/add-food">Add_Items</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} /> 
        <Route path="/info" element={<Info />} />
        <Route path="/form" element={<Form />} />
        <Route path="/login" element={<Login />} />
        <Route path="/members" element={<Members />} />
        <Route path="/add-food" element={<AddFood />} />
      </Routes>
    </Router>
  );
};

export default App;
