const express = require("express");
const { hash } = require("bcryptjs");
const mysql = require("../config/database");
const { v4: generateId } = require("uuid");
const { createJSONToken, isValidPassword } = require("../util/auth");
const { isValidEmail, isValidText } = require("../util/validation");

const router = express.Router();

router.post("/signup", async (req, res, next) => {
  const connection = await mysql.getConnection(async (conn) => conn);
  const data = req.body;
  console.log(data);
  let errors = {};

  if (!isValidEmail(data.email)) {
    errors.email = "INVALID EMAIL.";
  } else {
    try {
      const sql = "select * from user where email = ?";
      const [rows] = await connection.query(sql, [data.email]);
      connection.release();
      if (rows.length > 0) {
        errors.email = "Email exists already";
      }
    } catch (error) {
      return res.status(422).json({
        message: "MYSQL ERROR",
      });
    }
  }

  if (!isValidText(data.password, 6)) {
    errors.password = "Invalid password. Must be at least 6 characters long.";
  }

  if (Object.keys(errors).length > 0) {
    return res.status(422).json({
      message: "User signup failed due to validation errors",
      errors,
    });
  }

  try {
    const gid = generateId();
    const hashedPw = await hash(data.password, 12);
    const newUser = { userId: gid, email: data.email, password: hashedPw };
    let sql = "insert into user set ?";
    await connection.query(sql, [newUser]);
    connection.release();
    const newUserInfo = {
      nickName: data.nickName,
      firstName: data.firstName,
      lastName: data.lastName,
      dept: null,
      phoneNumber: null,
      grade: null,
      earned_credit: null,
      goal_credit: null,
      userId: newUser.userId,
    };
    sql = "insert into user_info set ?";
    await connection.query(sql, [newUserInfo]);
    connection.release();
    return res.status(201).json({ message: "SIGNIN" });
  } catch (error) {
    next(error);
  }
});

router.post("/login", async (req, res, next) => {
  const connection = await mysql.getConnection(async (conn) => conn);
  const email = req.body.email;
  const password = req.body.password;
  let errors = {};

  const sql = "select * from user where email = ?";
  const [results] = await connection.query(sql, [email]);
  connection.release();
  console.log(results);
  if (results.length != 1) {
    errors.email = "Invalid Email";
  } else {
    const curUser = {
      userId: results[0].userId,
      email: results[0].email,
      password: results[0].password,
    };
    const pwIsValid = await isValidPassword(password, curUser.password);
    if (!pwIsValid) {
      errors.password = "Invalid Password";
    }
  }

  if (Object.keys(errors).length > 0) {
    return res.status(422).json({
      message: "User signup failed due to validation errors",
      errors,
    });
  } else {
    const authToken = createJSONToken(results[0].userId);
    return res.status(201).json({ message: "LOGIN", token: authToken });
  }
});

module.exports = router;
