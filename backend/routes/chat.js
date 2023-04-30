const express = require("express");
const mysql = require("mysql");
const { v4: generateId } = require("uuid");
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
  const fieldId = data.fieldId;
  const sql = "insert into user_chat set ?";
  const date = new Date();
  const chat = {
    user_id: id,
    field_index: fieldId,
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
    fieldId: chat.field_index,
    message: chat.chat_message,
  });
});

// 두 번 출력. 수정해애됨
router.post("/field", (req, res, next) => {
  const data = req.body;
  const userId = data.id;
  const sql = "select * from chat_field where id = ?";
  connection.query(sql, userId, (error, results, fields) => {
    if (error) {
      res.status(422).json({
        message: "INVALID REQUEST",
      });
    } else {
      const resList = results.map((item) => {
        return { id: item.id, fieldId: item.fieldId };
      });
      res.status(201).json({
        list: resList,
      });
    }
  });
});

router.patch("/field", (req, res, next) => {
  const data = req.body;
  const userId = data.id;
  const fieldId = generateId();
  const sql = "insert into chat_field set ?";
  const field = { id: userId, fieldId: fieldId };
  connection.query(sql, [field], (error, results, fields) => {
    if (error) {
      console.log("INSERT CHAT_FIELD FAILED!");
    }
  });
  res.status(201).json({
    id: field.id,
    fieldId: field.fieldId,
  });
});

router.post("/:fieldId", (req, res, next) => {
  const data = req.body;
  const params = [data.id, data.fieldId];
  const sql = "select * from user_chat where user_id = ? and field_index = ?";
  connection.query(sql, params, (error, results, fields) => {
    if (error) {
      res.status(422).json({
        message: "INVALID REQUEST",
      });
    } else {
      const resList = results.map((data) => {
        return {
          isUser: data.isUser,
          message: data.chat_message,
        };
      });
      res.status(201).json({
        list: resList,
      });
    }
  });
});

module.exports = router;
