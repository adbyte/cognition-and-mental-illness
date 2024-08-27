import React, { useState } from "react";
import "./App.css";
import AdminDashboard from "./AdminDashBoard/AdminDashboard";
const App = () => {
  const [age, setage] = useState("");
  const [gender, setgender] = useState("");
  const [job_industry, setjob_industry] = useState("");
  const [education, seteducation] = useState("");
  const [data, setdata] = useState([]);
  const handlesubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.get("/api/fetch-data", {
        params: { age, gender, job_industry, education },
      });
      setdata(response.data);
    } catch (error) {
      console.error("error fetching data ", error);
    }
  };
  return (
    <>
      <div className="adminhead"> ADMIN DASHBOARD </div>
      <form onSubmit={handlesubmit}>
        <div>
          <label>
            Age:
            <input
              type="number"
              value={age}
              onChange={(e) => setage(e.target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            Gender:
            <select value={gender} onChange={(e) => setgender(e.target.value)}>
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </label>
        </div>
        <div>
          <label>
            {" "}
            Education
            <select
              id="education"
              name="education"
              value={education}
              onChange={(e) => seteducation(e.target.value)}
            >
              <option value="below 10th">Did not complete 10th class</option>
              <option value="10th">10th</option>
              <option value="12th">12th</option>
              <option value="graduation">Graduation</option>
              <option value="post graduation">Post Grauation</option>
              <option value="doctoral">Doctoral/Post Doctoral</option>
              <option value="unknown">Unknown or not reported</option>
            </select>{" "}
          </label>
        </div>
        <div>
          <label>Job Industry </label>
          <select
            id="job-industry"
            name="job-industry"
            value={job_industry}
            onChange={(e) => setjob_industry(e.target.value)}
          >
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
          </select>
        </div>

        <button type="submit">Fetch Data</button>
      </form>

      <AdminDashboard />
    </>
  );
};
export default App;
