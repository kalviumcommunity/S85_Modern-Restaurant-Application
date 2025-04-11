import React, { useState, useEffect } from "react";
import axios from "axios";

const Members = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState("");
  const [foods, setFoods] = useState([]);

  // Fetch all users for the dropdown
  useEffect(() => {
    axios.get("http://localhost:4000/api/users")
      .then((res) => setUsers(res.data))
      .catch((err) => console.error("Error fetching users:", err));
  }, []);

  // Fetch food items when a user is selected
  useEffect(() => {
    if (selectedUser) {
      axios.get(`http://localhost:4000/api/foods/user/${selectedUser}`)
        .then((res) => setFoods(res.data))
        .catch((err) => console.error("Error fetching foods:", err));
    } else {
      setFoods([]); // Clear foods if no user is selected
    }
  }, [selectedUser]);

  return (
    <div style={{ margin: "80px auto", width: "90%", maxWidth: "800px", textAlign: "center" }}>
      <h1>Items - View Food Items by User</h1>
      <div style={{ margin: "20px 0" }}>
        <select
          value={selectedUser}
          onChange={(e) => setSelectedUser(e.target.value)}
          style={{ padding: "10px", fontSize: "16px" }}
        >
          <option value="">-- Select a User --</option>
          {users.map((user) => (

            <option key={user._id} value={user._id}>
              {user.firstname} 
            </option>
          ))}
        </select>
      </div>
      <div>
        {selectedUser && foods.length === 0 && (
          <p>No food items found for this user.</p>
        )}
        {foods.map((food) => (
          <div
            key={food._id}
            style={{
              border: "1px solid #ccc",
              borderRadius: "5px",
              margin: "10px",
              padding: "10px",
              textAlign: "left"
            }}
          >
            <h3>{food.name}</h3>
            <p>{food.description}</p>
            <p><strong>Price:</strong> ₹{food.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Members;
