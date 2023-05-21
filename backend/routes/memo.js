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
  const token = data.token;
  const userId = decode(token).userId;
  const sql = "select * from memo where userId = ?";
  const [result] = await connection.query(sql, [userId]);
  connection.release();

  const resList = result.map((item) => {
    return {
      memoId: item.memoId,
      memoText: item.memoText,
      writeDate: item.writeDate,
    };
  });
  return res.status(201).json({ list: resList });
});

router.post("/item", async (req, res, next) => {
  console.log("asdfd");
  const connection = await mysql.getConnection(async (conn) => conn);
  const data = req.body;
  const token = data.token;
  const userId = decode(token).userId;
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const date = String(now.getDate()).padStart(2, "0");
  const hour = String(now.getHours()).padStart(2, "0");
  const min = String(now.getMinutes()).padStart(2, "0");
  const sec = String(now.getSeconds()).padStart(2, "0");

  const writeDate = `${year}-${month}-${date} ${hour}:${min}:${sec}`;
  const memoId = generateId();
  const memoInfo = {
    userId: userId,
    memoId: memoId,
    memoText: data.memoText,
    writeDate: writeDate,
  };
  const sql = "insert into memo set ?";
  await connection.query(sql, [memoInfo]);
  connection.release();
  return res
    .status(201)
    .json({ memoId: memoId, memoText: data.memoText, writeDate: writeDate });
});

router.patch("/item", async (req, res, next) => {
  const connection = await mysql.getConnection(async (conn) => conn);
  const data = req.body;
  const token = data.token;
  const userId = decode(token).userId;
  const memoId = data.memoId;
  const newMemoText = data.memoText;
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const date = String(now.getDate()).padStart(2, "0");
  const hour = String(now.getHours()).padStart(2, "0");
  const min = String(now.getMinutes()).padStart(2, "0");
  const sec = String(now.getSeconds()).padStart(2, "0");
  const writeDate = `${year}-${month}-${date} ${hour}:${min}:${sec}`;
  let sql = "update memo set memoText = ? where userId = ? and memoId = ?";
  await connection.query(sql, [newMemoText, userId, memoId]);
  connection.release();
  sql = "update memo set writeDate = ? where userId = ? and memoId = ?";
  await connection.query(sql, [writeDate, userId, memoId]);
  connection.release();
  return res
    .status(201)
    .json({ memoId: memoId, memoText: newMemoText, writeDate: writeDate });
});

module.exports = router;
