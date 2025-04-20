import React, { useState } from "react";
import axios from "axios";
import "./Form.css";

const Form = () => {
  const [formData, setFormData] = useState({
    firstname: "",
    lastName: "", // ✅ camelCase to match backend
    email: "",
    phone: "",
    time: "",
    date: "",
    password: "", 
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data: users } = await axios.get("http://localhost:4000/api/users");
      const userExists = users.some(user => user.email === formData.email);

      if (userExists) {
        alert("User already exists");
        setLoading(false);
        return;
      }

      const response = await axios.post("http://localhost:4000/api/users", formData);
      alert(response.data.message);

      // Reset form
      setFormData({
        firstname: "",
        lastName: "", // ✅ again here
        email: "",
        phone: "",
        time: "",
        date: "",
        password: "",
      });
    } catch (error) {
      console.log("❌ Backend error:", error.response?.data);
      if (error.response?.data?.errors) {
        alert("Validation error: " + error.response.data.errors[0].msg);
      } else {
        alert(error.response?.data?.error || "Something went wrong");
      }
    }
     finally {
      setLoading(false);
    }
  };

  return (
    <div className="container1">
      <h2 className="heading">Submit Your Details</h2>
      <form onSubmit={handleSubmit} className="form">
        <input
          type="text"
          name="firstname"
          placeholder="First Name"
          value={formData.firstname}
          onChange={handleChange}
          required
          className="input"
        />
        <input
          type="text"
          name="lastName" // ✅ camelCase here
          placeholder="Last Name"
          value={formData.lastName}
          onChange={handleChange}
          required
          className="input"
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
          className="input"
        />
        <input
          type="tel"
          name="phone"
          placeholder="Phone Number"
          value={formData.phone}
          onChange={handleChange}
          required
          className="input"
        />
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          required
          className="input"
        />
        <input
          type="time"
          name="time"
          value={formData.time}
          onChange={handleChange}
          required
          className="input"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
          className="input"
        />
        <button type="submit" className="button">
          {loading ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default Form;
