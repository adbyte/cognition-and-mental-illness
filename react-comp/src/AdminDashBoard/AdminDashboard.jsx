import React, { useEffect, useState } from "react";
const AdminDashboard = () => {
  const [users, setusers] = useState([]);
  useEffect(() => {
    fetch("http://localhost:3001/users")
      .then((response) => response.json())
      .then((data) => setusers(data))
      .catch((error) => console.error("Error:", error));
  }, []);
  return (
    <div>
      <h1>Admin Dashboard</h1>
      <h2>Users</h2>
      <ul>
        {users.map((user) => (
          <li key={user.id}>{user.username}</li>
        ))}
      </ul>
    </div>
  );
};
export default AdminDashboard;
