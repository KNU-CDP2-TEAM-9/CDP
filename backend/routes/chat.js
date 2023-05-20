const express = require("express");
const mysql = require("../config/database");
const { v4: generateId } = require("uuid");
const { checkAuth } = require("../util/auth");
const router = express.Router();
const { decode } = require("jsonwebtoken");
const { findAllNode } = require("../data/neo4j");
const { findResultNode } = require("../data/neo4j");
const { MakeSentence } = require("../data/util");

router.use(checkAuth);

router.post("/msg", async (req, res, next) => {
  const connection = await mysql.getConnection(async (conn) => conn);
  const data = req.body;
  const userId = decode(data.token).userId;
  const text = data.text;
  const chatId = data.chatId;
  const sendDate = new Date();
  let sql = "insert into message set ?";
  const msg = {
    userId: userId,
    chatId: chatId,
    text: text,
    isUser: true,
    sendDate: sendDate,
  };
  await connection.query(sql, [msg]);
  connection.release();

  const neo4jList = await findAllNode();
  neo4jList.sort((x, y) => x.length - y.length);
  let WordList = [];
  neo4jList.forEach((item) => {
    if (text.includes(item)) {
      WordList.push(item);
    }
  });

  let BotText = "";

  if (WordList.length === 0) {
    BotText = "죄송합니다.";
  } else {
    for (let i = 0; i < WordList.length; i++) {
      for (let j = i + 1; j < WordList.length; j++) {
        if (WordList[j].includes(WordList[i])) {
          WordList[i] = "";
        }
      }
    }

    WordList = WordList.filter((item) => item !== "");
    BotText = await MakeSentence(WordList);
    console.log(BotText);
  }

  sql = "insert into message set ?";
  const msg_bot = {
    userId: userId,
    chatId: chatId,
    text: BotText,
    isUser: false,
    sendDate: sendDate,
  };
  await connection.query(sql, [msg_bot]);
  connection.release();

  return res.status(201).json({
    BotText: {
      isUser: msg_bot.isUser,
      text: msg_bot.text,
    },
    UserText: {
      isUser: msg.isUser,
      text: msg.text,
    },
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
  let sql = "select userId from chat where chatId = ?";
  const [users] = await connection.query(sql, [data.chatId]);
  connection.release();
  const checkId = users.find((item) => item.userId === userId);
  if (checkId === undefined) {
    return res.status(422).json({
      message: "unvalid routing",
    });
  }
  sql = "select * from message where userId = ? and chatId = ?";
  const [results] = await connection.query(sql, params);
  connection.release();
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

router.post("/bot", (req, res, next) => {});

module.exports = router;
