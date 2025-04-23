import { useEffect, useState } from "react";
import "./App.css";


const Info = () => {
  const [reservations, setReservations] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [formData, setFormData] = useState({ firstname: "", lastName: "", email: "", phone: "", date: "", time: "" });

  useEffect(() => {
    fetch("http://localhost:4000/api/users")
      .then((res) => res.json())
      .then((data) => setReservations(data))
      .catch((error) => console.error("Error fetching reservations:", error));
  }, []);

  // **Handle Delete User**
  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:4000/api/users/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete user");
      }

      setReservations(reservations.filter((reservation) => reservation._id !== id));
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  // **Handle Edit User**
  const handleEdit = (user) => {
    setEditingUser(user._id);
    setFormData({ firstname: user.firstname, lastName: user.lastName, email: user.email, phone: user.phone, date: user.date, time: user.time });
  };

  // **Handle Update User**
  const handleUpdate = async () => {
    try {
      const response = await fetch(`http://localhost:4000/api/users/${editingUser}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to update user");
      }

      const data = await response.json();
      setReservations(reservations.map((res) => (res._id === editingUser ? data.user : res)));
      setEditingUser(null);
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  return (
    <div className="container">
      <table border="1">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Date</th>
            <th>Time</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {reservations.map((reservation) => (
            <tr key={reservation._id}>
              <td>{reservation.firstname} {reservation.lastName}</td>
              <td>{reservation.email}</td>
              <td>{reservation.phone}</td>
              <td>{reservation.date}</td>
              <td>{reservation.time}</td>
              <td>
                <button className="edit-btn" onClick={() => handleEdit(reservation)}>Edit</button>
                <button className="delete-btn" onClick={() => handleDelete(reservation._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Editing Form */}
      {editingUser && (
        <div className="edit-form">
          <h3>Edit User</h3>
          <input type="text" value={formData.firstname} onChange={(e) => setFormData({ ...formData, firstname: e.target.value })} placeholder="First Name" />
          <input type="text" value={formData.lastName} onChange={(e) => setFormData({ ...formData, lastName: e.target.value })} placeholder="Last Name" />
          <input type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} placeholder="Email" />
          <input type="text" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} placeholder="Phone" />
          <input type="date" value={formData.date} onChange={(e) => setFormData({ ...formData, date: e.target.value })} />
          <input type="time" value={formData.time} onChange={(e) => setFormData({ ...formData, time: e.target.value })} />
          <button onClick={handleUpdate}>Update</button>
          <button onClick={() => setEditingUser(null)}>Cancel</button>
        </div>
      )}
    </div>
  );
};

export default Info;