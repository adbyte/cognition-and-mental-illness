import React from "react";
import "./AdminDashboard.css";

const AdminDashboard = ({ users }) => {
  return (
    <div>
      <h2>Users Data</h2>
      {users.length > 0 ? ( // Check if users array is not empty
        <table>
          <thead>
            <tr>
              <th>id</th>
              <th>name</th>
              <th>age</th>
              <th>gender</th>
              <th>education</th>
              <th>job_industry</th>
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
                <td>{user.job_industry}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No users available</p> // Show this message if there are no users
      )}
    </div>
  );
};

export default AdminDashboard;
