import React, { useEffect, useState } from "react";
import "./AdminDashboard.css";
const AdminDashboard = () => {
  const [users, setusers] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3001/users")
      .then((response) => response.json())
      .then((data) => {
        console.log("Data received:", data);
        setusers(data);
      })
      .catch((error) => console.error("Error:", error));
  }, []);

  useEffect(() => {
    console.log("Users state updated:", users); // Log users state when it's updated
  }, [users]); // Watch for changes to the users state
  const link = "(link unavailable)";
  return (
    <div>
      <h1>Admin Dashboard</h1>
      <h2>Users</h2>
      <table>
        <thead>
          <tr>
            <th>id</th>
            <th>name</th>
            <th>age</th>
            <th>gender</th>
            <th>education</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.username}</td>
              <td>{user.age}</td>
              <td>{user.gender}</td>
              <td>{user.education}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminDashboard;
