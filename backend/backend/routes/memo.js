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
  const writeDate = new Date();
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
  const newWriteDate = new Date();
  let sql = "update memo set memoText = ? where userId = ? and memoId = ?";
  await connection.query(sql, [newMemoText, userId, memoId]);
  connection.release();
  sql = "update memo set writeDate = ? where userId = ? and memoId = ?";
  await connection.query(sql, [newWriteDate, userId, memoId]);
  connection.release();
  return res
    .status(201)
    .json({ memoId: memoId, memoText: newMemoText, writeDate: newWriteDate });
});

module.exports = router;
