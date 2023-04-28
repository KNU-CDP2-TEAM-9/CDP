const express = require("express");
const mysql = require("mysql");
const { checkAuth } = require("../util/auth");
const router = express.Router();
const dbconfig = require("../config/database");
const connection = mysql.createConnection(dbconfig);

router.use(checkAuth);

router.post("/", async (req, res, next) => {
  const data = req.body;
  console.log(data);
  const id = data.id;
  const message = data.message;
  const field = data.field;
  const sql = "insert into user_chat set ?";
  const date = new Date();
  const chat = {
    user_id: id,
    field_index: field,
    chat_message: message,
    isUser: true,
    chatDate: date,
  };
  connection.query(sql, [chat], (error, results, fields) => {
    if (error) {
      console.log("INSERT USER_CHAT FAILED!");
    }
  });
  res.status(201).json({
    id: chat.user_id,
    field: chat.field_index,
    msg: chat.chat_message,
  });
});

module.exports = router;
