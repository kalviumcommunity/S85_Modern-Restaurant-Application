import { useEffect, useState } from "react";
import "./App.css"; // Ensure correct path if styles are in App.css

const Info = () => {
  const [reservations, setReservations] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/api/users") // Ensure this endpoint is correct
      .then((res) => res.json())
      .then((data) => setReservations(data))
      .catch((error) => console.error("Error fetching reservations:", error));
  }, []);

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
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Info;
