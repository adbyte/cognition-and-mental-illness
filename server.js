const express = require("express");
const mysql = require("mysql");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(bodyParser.json());
app.use(cors());
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "test",
  database: "cognition_db",
});

db.connect((err) => {
  if (err) throw err;
  console.log("mysql connected....");
});

app.post("/store-data", (req, res) => {
  const { username, password, emailid, age, gender, education, job_industry } =
    req.body;
  const useQuery =
    "INSERT INTO users (username , password , emailid ,age , gender , education , job_industry ) VALUES (? , ? ,? ,? ,?,?,?)";
  db.query(
    useQuery,
    [username, password, emailid, age, gender, education, job_industry],
    (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).send({ message: "Error storing data" });
      } else {
        const userId = result.insertId;
        res.send("Data stored in SQL");
      }
    }
  );
});

app.get("/users", (req, res) => {
  console.log("Executing /users endpoint");
  const query = "SELECT * FROM users";
  db.query(query, (err, result) => {
    if (err) {
      console.error("Error retrieving data:", err);
      res.status(500).send({ message: "Error retrieving data" });
    } else {
      console.log("Data retrieved:", result); // Add this log
      res.json(result);
    }
  });
});
app.get("*", (req, res) => {
  console.log("Received request:", req.url);
  res.send("Request received");
});

app.listen(3001, () => {
  console.log("server is running");
});
