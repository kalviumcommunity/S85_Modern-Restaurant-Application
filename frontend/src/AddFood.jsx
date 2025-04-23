import { useState, useEffect } from "react";
import axios from "axios";
import './AddFood.css';

const AddFood = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [createdBy, setCreatedBy] = useState("");
  const [users, setUsers] = useState([]);

  // Fetch users for dropdown
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get("http://localhost:4000/api/users");
        setUsers(res.data);
      } catch (error) {
        console.error("Failed to fetch users:", error);
      }
    };
    fetchUsers();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:4000/api/foods", {
        name,
        description,
        price,
        created_by: createdBy,
      });
      alert("Food item added!");
      setName("");
      setDescription("");
      setPrice("");
      setCreatedBy("");
    } catch (error) {
      alert("Error adding food item.");
      console.error(error);
    }
  };

  return (
    <div className="add-food-container">
      <h2 className="add-food-title">Add New Food</h2>
      <form onSubmit={handleSubmit} className="add-food-form">
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <textarea
        style={{resize:"none"}}
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <select
          value={createdBy}
          onChange={(e) => setCreatedBy(e.target.value)}
          required
        >
          <option value="">Select User</option>
          {users.map((user) => (
            <option key={user._id} value={user._id}>
              {user.firstname} {user.lastname}
            </option>
          ))}
        </select>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default AddFood;