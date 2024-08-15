const express = require("express");
const mysql = require("mysql");
const bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.json());
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
  const { username, password, email, age, gender, education, job_industry } =
    req.body;
  const useQuery =
    "INSERT INTO users (username , password , email ,age , gender , education , job_industry  ) VALUES (? , ? ,? ,? ,?,?,?)";
  db.query(
    useQuery,
    [username, password, email, age, gender, education, job_industry],
    (err, result) => {
      if (err) throw err;
      const userId = result.insertId;
      res.send("data stored in sql");
    }
  );
});

app.listen(3001, () => {
  console.log("server is running");
});
