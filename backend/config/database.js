const mysql = require("mysql2/promise");

module.exports = mysql.createPool({
  host: "cdp2db.cqngcvvrqot3.us-east-2.rds.amazonaws.com",
  user: "admin",
  password: "qwer1234",
  database: "cdp",
});
