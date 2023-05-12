// const express = require("express");
// const mysql = require("mysql");
// const dbconfig = require("./config/database.js");
// const connection = mysql.createConnection(dbconfig);

// const app = express();

// // configuration =========================
// app.set("port", process.env.PORT || 3000);

// app.get("/", (req, res) => {
//   connection.connect((error) => {
//     if (error) {
//       console.error("Error connecting to MySQL database: " + error.stack);
//       return;
//     }
//     console.log("Connected to MySQL database as id " + connection.threadId);
//   });
//   res.send("Root");
// });

// app.get("/users", (req, res) => {
//   connection.query("SELECT * from Users", (error, rows) => {
//     if (error) throw error;
//     console.log("User info is: ", rows);
//     res.send(rows);
//   });
//   connection.query("SELECT * FROM Users", (error, results, fields) => {
//     if (error) throw error;
//     console.log(results);
//   });
// });

// app.listen(app.get("port"), () => {
//   console.log("Express server listening on port " + app.get("port"));
// });

let str =
  "경북대학교 => 통합정보시스템 => 학사행정 => 수강 => 수강신청*경북대학교 => 통합정보시스템 => 학사행정 => 학적 => 다전공관리/수강신청신청과목조회>수강가능학점조회>수강정원변경원신청>수강꾸러미신청과목조회>수강정정신청>시간표조회>개설강좌수요조사>수강취소신청*복수전공이수포기신청>융합전공신청>연계융합전공이수포기신청>연계전공신청>복수전공신청>부전공신청";

let str1 = str.split("/")[0].split("*");
let str2 = str.split("/")[1].split("*");

console.log(str1);
console.log(str2);
