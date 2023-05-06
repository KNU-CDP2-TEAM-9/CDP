const express = require("express");
const mysql = require("../config/database");
const { checkAuth } = require("../util/auth");
const router = express.Router();
const { decode } = require("jsonwebtoken");

router.use(checkAuth);

router.post("/", async (req, res, next) => {
  const connection = await mysql.getConnection(async (conn) => conn);
  const data = req.body;
  const token = data.token;
  const userId = decode(token).userId;
  const sql = "select * from user_info where userId = ?";
  const [result] = await connection.query(sql, [userId]);
  connection.release();
  if (result.length !== 1) {
    return res.status(422).json({
      message: "unvalid id",
    });
  }
  const user = result[0];
  const userinfo = {
    nickName: user.nickName,
    firstName: user.firstName,
    lastName: user.lastName,
    dept: user.dept,
    phoneNumber: user.phoneNumber,
    grade: user.grade,
    earned_credit: user.earned_credit,
    goal_credit: user.goal_credit,
  };
  res.status(201).json({ info: userinfo });
});

router.patch("/", async (req, res, next) => {
  const connection = await mysql.getConnection(async (conn) => conn);
  const data = req.body;
  const editId = data.editId;
  const editValue = data.editValue;
  const token = data.token;
  const userId = decode(token).userId;
  const params = [editValue, userId];
  console.log(editId);
  console.log(editValue);
  const sql = `update user_info set  ${editId} = ? where userId = ?`;
  await connection.query(sql, params);
  connection.release();
  res.status(201).json({ message: "Update Success" });
});

module.exports = router;
