const express = require("express");
const mysql = require("../config/database");
const { v4: generateId } = require("uuid");
const { checkAuth } = require("../util/auth");
const router = express.Router();
const { decode } = require("jsonwebtoken");

router.use(checkAuth);

router.post("/", async (req, res, next) => {
  const connection = await mysql.getConnection(async (conn) => conn);
  const data = req.body;
  console.log(data);
  const id = decode(data.token).id;
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
  await connection.query(sql, [chat]);
  connection.release();
  return res.status(201).json({
    id: chat.user_id,
    fieldId: chat.field_index,
    message: chat.chat_message,
  });
});

// 두 번 출력. 수정해야됨
router.post("/field", async (req, res, next) => {
  const connection = await mysql.getConnection(async (conn) => conn);
  const data = req.body;
  const userId = decode(data.token).id;
  const sql = "select * from chat_field where id = ?";
  const [results] = connection.query(sql, [userId]);
  const resList = results.map((item) => {
    return { id: item.id, fieldId: item.fieldId };
  });
  connection.release();
  res.status(201).json({
    list: resList,
  });
});

router.patch("/field", async (req, res, next) => {
  const connection = await mysql.getConnection(async (conn) => conn);
  const data = req.body;
  const userId = decode(data.token).id;
  const fieldId = generateId();
  const sql = "insert into chat_field set ?";
  const field = { id: userId, fieldId: fieldId };
  await connection.query(sql, [field]);
  connection.release();

  return res.status(201).json({
    id: field.id,
    fieldId: field.fieldId,
  });
});

router.post("/:fieldId", async (req, res, next) => {
  const connection = await mysql.getConnection(async (conn) => conn);
  const data = req.body;
  const id = decode(data.token).id;
  const params = [id, data.fieldId];
  const sql = "select * from user_chat where user_id = ? and field_index = ?";
  const [results] = await connection.query(sql, params);
  const resList = results.map((data) => {
    return {
      isUser: data.isUser,
      message: data.chat_message,
    };
  });
  return res.status(201).json({
    list: resList,
  });
});

module.exports = router;
