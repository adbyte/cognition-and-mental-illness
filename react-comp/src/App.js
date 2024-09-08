import React, { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";
import AdminDashboard from "./AdminDashBoard/AdminDashboard";

const App = () => {
  const [age, setage] = useState("");
  const [gender, setgender] = useState("");
  const [job_industry, setjob_industry] = useState("");
  const [education, seteducation] = useState("");
  const [fromage, setfromage] = useState("");
  const [toage, settoage] = useState("");
  const [aboveage, setaboveage] = useState("");
  const [belowage, setbelowage] = useState("");
  const [data, setdata] = useState([]); // Initialize as an empty array

  // Fetch all data on component mount (for initial load)
  useEffect(() => {
    const fetchAllUsers = async () => {
      try {
        const response = await axios.get("http://localhost:3001/users");
        if (Array.isArray(response.data)) {
          setdata(response.data); // Ensure response data is an array
        } else {
          setdata([]); // Fallback to empty array if response is not an array
        }
      } catch (error) {
        console.error("Error fetching full data", error);
      }
    };
    fetchAllUsers();
  }, []);

  // Handle filter form submission
  const handlesubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.get("http://localhost:3001/api/fetch-data", {
        params: {
          age,
          gender,
          job_industry,
          education,
          fromage,
          toage,
          aboveage,
          belowage,
        },
      });
      console.log("Full response:", response);
      console.log("Response data:", response.data);

      if (Array.isArray(response.data)) {
        setdata(response.data);
        console.log(data); // Ensure response data is an array
      } else {
        setdata([]);
        console.log("dikkat"); // Fallback to empty array if response is not an array
      }
    } catch (error) {
      console.error("Error fetching filtered data", error);
    }
  };

  return (
    <>
      <div className="adminhead"> ADMIN DASHBOARD </div>
      <form onSubmit={handlesubmit} className="mainfield">
        <div className="even">
          <label>
            Only specific Age:
            <input
              className="age"
              type="number"
              placeholder="age "
              value={age}
              onChange={(e) => setage(e.target.value)}
            />
          </label>
        </div>
        <div className="odd">
          <label>
            from age
            <input
              type="number"
              placeholder="from"
              value={fromage}
              onChange={(e) => setfromage(e.target.value)}
            />
          </label>
        </div>
        <div className="even">
          <label>
            To age
            <input
              type="number"
              placeholder="to-"
              value={toage}
              onChange={(e) => settoage(e.target.value)}
            />
          </label>
        </div>
        <div className="odd">
          <label>
            Age Above:
            <input
              type="number"
              placeholder="age above-"
              value={aboveage}
              onChange={(e) => setaboveage(e.target.value)}
            />
          </label>
        </div>
        <div className="even">
          <label>
            Age Below:
            <input
              type="number"
              placeholder="age below-"
              value={belowage}
              onChange={(e) => setbelowage(e.target.value)}
            />
          </label>
        </div>
        <div className="odd">
          <label>
            Gender:
            <select
              className="gender"
              value={gender}
              onChange={(e) => setgender(e.target.value)}
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </label>
        </div>
        <div className="even">
          <label>
            Education
            <select
              id="education"
              name="education"
              value={education}
              onChange={(e) => seteducation(e.target.value)}
            >
              <option value="">Select Education</option>
              <option value="below 10th">Did not complete 10th class</option>
              <option value="10th">10th</option>
              <option value="12th">12th</option>
              <option value="graduation">Graduation</option>
              <option value="post graduation">Post Graduation</option>
              <option value="doctoral">Doctoral/Post Doctoral</option>
            </select>
          </label>
        </div>
        <div className="odd">
          <label>Job Industry </label>
          <select
            id="job-industry"
            name="job-industry"
            value={job_industry}
            onChange={(e) => setjob_industry(e.target.value)}
          >
            <option value="">Select Job Industry</option>
            <option value="technology">Technology</option>
            <option value="healthcare">Healthcare</option>
            <option value="finance">Finance</option>
            <option value="education">Education</option>
            <option value="engineering">Engineering</option>
            <option value="manufacturing">Manufacturing</option>
            <option value="retail">Retail</option>
            <option value="entertainment">Entertainment</option>
            <option value="construction">Construction</option>
            <option value="hospitality">Hospitality</option>
            <option value="transportation">Transportation</option>
            <option value="real-estate">Real Estate</option>
            <option value="legal">Legal</option>
            <option value="marketing">Marketing</option>
            <option value="non-profit">Non-Profit</option>
            <option value="government">Government</option>
            <option value="telecommunications">Telecommunications</option>
            <option value="agriculture">Agriculture</option>
            {/* Add more options as needed */}
          </select>
        </div>
        <br></br>
        <button type="submit">Fetch Data</button>
      </form>

      {/* Pass the full or filtered data to AdminDashboard */}
      <AdminDashboard users={data} />
    </>
  );
};

export default App;
