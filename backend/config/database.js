const mysql = require("mysql2/promise");

module.exports = mysql.createPool({
  host: "",
  user: "",
  password: "",
  database: "",
  dateStrings: "date",
});
