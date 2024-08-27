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

//fetching data on criteria
app.get("/api/fetch-data", (req, res) => {
  const { age, gender, job_industry, education } = req.query;
  //now building sql query dynamically
  let sqlquery = "SELECT * FORM users WHERE 1=1";
  let queryparams = [];
  if (age) {
    sqlquery += " AND AGE = ? ";
    queryparams.push(age);
  }
  if (gender) {
    sqlquery += " AND gender = ?";
    queryparams.push(gender);
  }
  //execute the query
  db.query(sqlquery, queryparams, (err, results) => {
    if (err) {
      console.error("error executing query", err);
      res.status(500).send("error featching data");
      return;
    }
    res.json(results);
  });
});

app.listen(3001, () => {
  console.log("server is running");
});
