const mysql = require("mysql2/promise");

module.exports = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "1234",
  database: "my_db",
});
