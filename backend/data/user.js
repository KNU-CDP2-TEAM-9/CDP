module.exports = {
  host: "localhost",
  user: "root",
  password: "1234",
  database: "my_db",
};

const express = require("express");
const mysql = require("mysql");
const dbconfig = require("./config/database.js");
const connection = mysql.createConnection(dbconfig);

const app = express();

// configuration =========================
app.set("port", process.env.PORT || 3000);

app.get("/", (req, res) => {
  connection.connect((error) => {
    if (error) {
      console.error("Error connecting to MySQL database: " + error.stack);
      return;
    }
    console.log("Connected to MySQL database as id " + connection.threadId);
  });
  res.send("Root");
});

app.get("/users", (req, res) => {
  connection.query("SELECT * from Users", (error, rows) => {
    if (error) throw error;
    console.log("User info is: ", rows);
    res.send(rows);
  });
  const userData = { id: "hello", password: "zaq" };
  connection.query("SELECT * FROM Users", (error, results, fields) => {
    if (error) throw error;
    console.log(results);
  });
});

app.listen(app.get("port"), () => {
  console.log("Express server listening on port " + app.get("port"));
});
