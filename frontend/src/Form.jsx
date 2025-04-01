import React, { useState } from "react";
import axios from "axios";
import "./Form.css"; // Import CSS for styling

const Form = () => {
    const [formData, setFormData] = useState({
        firstname: "",
        lastName: "",
        email: "",
        phone: "",
        time: "",
        date: "",
    });

    const [loading, setLoading] = useState(false); // Loading state for better UX

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true); // Show loading state

        try {
            // Fetch all users to check if email already exists
            const { data: users } = await axios.get("http://localhost:4000/api/users");
            const userExists = users.some(user => user.email === formData.email);

            if (userExists) {
                alert("User already exists");
                setLoading(false);
                return;
            }

            // Proceed with form submission if user does not exist
            const response = await axios.post("http://localhost:4000/api/users", formData);
            alert(response.data.message);

            // Clear form fields
            setFormData({
                firstname: "",
                lastName: "",
                email: "",
                phone: "",
                time: "",
                date: "",
            });
        } catch (error) {
            alert(error.response?.data?.message || "Error submitting form");
        } finally {
            setLoading(false); // Reset loading state
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
                    name="lastName" 
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
                <button type="submit" className="button">Submit</button>
            </form>
        </div>
    );
};

export default Form;
