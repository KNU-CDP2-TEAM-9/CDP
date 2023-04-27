const express = require("express");
const { hash } = require("bcryptjs");
const mysql = require("mysql");
const { v4: generateId } = require("uuid");
const { createJSONToken, isValidPassword } = require("../util/auth");
const { isValidEmail, isValidText } = require("../util/validation");
const dbconfig = require("../config/database");
const connection = mysql.createConnection(dbconfig);

const router = express.Router();

router.post("/signup", async (req, res, next) => {
  const data = req.body;
  console.log(data);
  let errors = {};

  if (!isValidEmail(data.email)) {
    console.log(data.email);
    errors.email = "INVALID EMAIL.";
  } else {
    const inputEmail = data.email;
    const sql = "select * from users where email = ?";
    connection.query(sql, [inputEmail], (error, results, fields) => {
      if (results.length > 0) {
        errors.email = "Email exists already";
      }
    });
    try {
    } catch (error) {
      console.log("MAYBE SQL ERROR");
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
    const newUser = { email: data.email, password: hashedPw, id: gid };
    const sql = "insert into users set ?";
    connection.query(sql, [newUser], (error, results, fields) => {
      console.log("INSERT SUCCESS!");
    });
    const authToken = createJSONToken(newUser.email);
    res
      .status(201)
      .json({ message: "USER CREATED", user: newUser, token: authToken });
  } catch (error) {
    next(error);
  }
});

router.post("/login", async (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;

  const sql = "select * from users where email = ?";
  connection.query(sql, [email], async (error, results, fields) => {
    if (error || results.length != 1) {
      return res.status(401).json({ message: "Authentication Failed" });
    }
    const user = {
      email: results[0].email,
      password: results[0].password,
      id: results[0].id,
    };
    const pwIsValid = await isValidPassword(password, user.password);
    if (!pwIsValid) {
      return res.status(422).json({
        message: "Invalid credentials.",
        errors: { credentials: "Invalid email or password entered." },
      });
    }
    const token = createJSONToken(email);
    res.json({ token });
  });
});

module.exports = router;
