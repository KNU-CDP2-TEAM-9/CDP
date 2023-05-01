const express = require("express");
const mysql = require("../config/database");
const { v4: generateId } = require("uuid");
const { checkAuth } = require("../util/auth");
const router = express.Router();
const { decode } = require("jsonwebtoken");

router.use(checkAuth);

router.post("/msg", async (req, res, next) => {
  const connection = await mysql.getConnection(async (conn) => conn);
  const data = req.body;
  const userId = decode(data.token).userId;
  const text = data.text;
  const chatId = data.chatId;
  const sendDate = new Date();
  const sql = "insert into message set ?";
  const msg = {
    userId: userId,
    chatId: chatId,
    text: text,
    isUser: true,
    sendDate: sendDate,
  };
  await connection.query(sql, [msg]);
  connection.release();
  return res.status(201).json({
    userId: msg.userId,
    chatId: msg.chatId,
    text: msg.text,
  });
});

// 두 번 출력. 수정해야됨
router.post("/chatList", async (req, res, next) => {
  const connection = await mysql.getConnection(async (conn) => conn);
  const data = req.body;
  const userId = decode(data.token).userId;
  const sql = "select * from chat where userId = ?";
  const [results] = await connection.query(sql, [userId]);
  const resList = results.map((item) => {
    return { userId: item.userId, chatId: item.chatId };
  });
  connection.release();
  res.status(201).json({
    list: resList,
  });
});

router.patch("/chatAdd", async (req, res, next) => {
  const connection = await mysql.getConnection(async (conn) => conn);
  const data = req.body;
  const userId = decode(data.token).userId;
  console.log(userId);
  const chatId = generateId();
  const sql = "insert into chat set ?";
  const chat = { userId: userId, chatId: chatId };
  await connection.query(sql, [chat]);
  connection.release();

  return res.status(201).json({
    userId: chat.userId,
    chatId: chat.chatId,
  });
});

router.post("/:chatId", async (req, res, next) => {
  const connection = await mysql.getConnection(async (conn) => conn);
  const data = req.body;
  const userId = decode(data.token).userId;
  const params = [userId, data.chatId];
  const sql = "select * from message where userId = ? and chatId = ?";
  const [results] = await connection.query(sql, params);
  const resList = results.map((data) => {
    return {
      isUser: data.isUser,
      text: data.text,
    };
  });
  return res.status(201).json({
    list: resList,
  });
});

module.exports = router;
