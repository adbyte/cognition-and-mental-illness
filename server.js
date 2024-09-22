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
let user;
app.post("/store-data", (req, res) => {
  const { username, password, emailid, age, gender, education, job_industry } =
    req.body;
  user = username;
  const useQuery =
    "INSERT INTO users (username , password , emailid ,age , gender , education , job_industry ) VALUES (? , ? ,? ,? ,?,?,?)";
  /*const usertable = `CREATE TABLE ? (test varchar (150), score int , date varchar (50) , time varchar (30))`;
  db.query(usertable, [username], (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send({ message: "Error storing data" });
    } else {
      const userId = result.insertId;
      res.send("Data stored in SQL");
    }
  });*/
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

app.post("/attention", (req, res) => {
  const { score } = req.body;

  // Log for debugging purposes
  console.log("User:", user, "Score:", score);

  if (!user) {
    console.log("User not found in request");
    return res.status(400).send({ message: "User not found" });
  }

  // Validate score
  if (isNaN(score) || score < 0 || score > 100) {
    console.log("Invalid score value:", score);
    return res.status(400).send({ message: "Invalid score value" });
  }

  const q = `UPDATE users SET attention = ? WHERE username = ?`;

  // Execute the SQL query
  db.query(q, [score, user], (err, result) => {
    if (err) {
      // Log the actual error message from MySQL
      console.error("Error storing data:", err.sqlMessage);
      res.status(500).send({ message: "Error storing data" });
    } else {
      console.log("Data stored successfully");
      res.send("Data in MySQL");
    }
  });
});

/*
app.post("/executive", (req, res) => {
  const { score } = req.body;
  const q = `UPDATE users SET executive = ? WHERE username = ?`;

  // Execute the SQL query
  db.query(q, [score, user], (err, result) => {
    if (err) {
      // Log the actual error message from MySQL
      console.error("Error storing data:", err.sqlMessage);
      res.status(500).send({ message: "error storing data" });
    } else {
      res.send("data in mysql");
    }
  });
});
app.post("/language", (req, res) => {
  const { score } = req.body;
  const q = `UPDATE users SET language = ? WHERE username = ?`;

  // Execute the SQL query
  db.query(q, [score, user], (err, result) => {
    if (err) {
      // Log the actual error message from MySQL
      console.error("Error storing data:", err.sqlMessage);
      res.status(500).send({ message: "error storing data" });
    } else {
      res.send("data in mysql");
    }
  });
});
app.post("/memory", (req, res) => {
  const { score } = req.body;
  const q = `UPDATE users SET memory = ? WHERE username = ?`;

  // Execute the SQL query
  db.query(q, [score, user], (err, result) => {
    if (err) {
      // Log the actual error message from MySQL
      console.error("Error storing data:", err.sqlMessage);
      res.status(500).send({ message: "error storing data" });
    } else {
      res.send("data in mysql");
    }
  });
});
app.post("/perception", (req, res) => {
  const { score } = req.body;
  const q = `UPDATE users SET perception = ? WHERE username = ?`;

  // Execute the SQL query
  db.query(q, [score, user], (err, result) => {
    if (err) {
      // Log the actual error message from MySQL
      console.error("Error storing data:", err.sqlMessage);
      res.status(500).send({ message: "error storing data" });
    } else {
      res.send("data in mysql");
    }
  });
});

app.post("/reasoning", (req, res) => {
  const { score } = req.body;
  const q = `UPDATE users SET reasoning = ? WHERE username = ?`;

  // Execute the SQL query
  db.query(q, [score, user], (err, result) => {
    if (err) {
      // Log the actual error message from MySQL
      console.error("Error storing data:", err.sqlMessage);
      res.status(500).send({ message: "error storing data" });
    } else {
      res.send("data in mysql");
    }
  });
});
/*
app.post(`${user}/store-score`, (req, res) => {
  console.log("scoreing is here");
  const { test, score, date, time } = req.body;
  const query = `INSERT INTO ${user} (test , score , date , time ) VALUES ( ?,?,?,?)`;
  db.query(query, [test, score, date, time], (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send({ message: "Error storing data" });
    } else {
      const userId = result.insertId;
      res.send("Data stored in SQL");
    }
  });
});*/

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

//fetching data on criteria
app.get("/api/fetch-data", (req, res) => {
  const {
    age,
    gender,
    job_industry,
    education,
    fromage,
    toage,
    aboveage,
    belowage,
  } = req.query;
  //now building sql query dynamically
  let sqlquery = "SELECT * FROM users WHERE 1=1";
  let queryparams = [];
  if (age) {
    sqlquery += " AND AGE = ? ";
    queryparams.push(age);
  }

  if (gender) {
    sqlquery += " AND gender = ?";
    queryparams.push(gender);
  }
  if (education) {
    sqlquery += " AND EDUCATION = ?";
    queryparams.push(education);
  }
  if (job_industry) {
    sqlquery += " AND JOB_INDUSTRY = ?";
    queryparams.push(job_industry);
  }
  if (fromage && toage) {
    sqlquery += " AND AGE BETWEEN ? AND ? ";
    queryparams.push(fromage, toage);
  }
  if (aboveage) {
    sqlquery += " AND AGE >= ? ";
    queryparams.push(aboveage);
  }
  if (belowage) {
    sqlquery += " AND AGE <= ";
    queryparams, push(belowage);
  }
  console.log("SQL Query:", sqlquery);
  console.log("Query Parameters:", queryparams);
  db.query(sqlquery, queryparams, (err, results) => {
    if (err) {
      console.error("error executing query", err);
      res.status(500).send("error featching data");
      return;
    }
    res.json(results);
  });
});
/*app.get("*", (req, res) => {
  console.log("Received request:", req.url);
  res.send("Request received");
});*/
app.listen(3001, () => {
  console.log("server is running");
});
