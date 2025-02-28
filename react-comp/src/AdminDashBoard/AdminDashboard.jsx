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
              <th>attention</th>
              <th>pereception</th>
              <th>language</th>
              <th>memory</th>
              <th>reasoning</th>
              <th>executive</th>
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
                <td>{user.attention}</td>
                <td>{user.perception}</td>
                <td>{user.language}</td>
                <td>{user.memory}</td>
                <td>{user.reasoning}</td>
                <td>{user.executive}</td>
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
