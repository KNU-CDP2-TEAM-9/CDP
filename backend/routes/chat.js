const express = require("express");
const mysql = require("mysql");
const { checkAuth } = require("../util/auth");
const router = express.Router();
const dbconfig = require("../config/database");
const connection = mysql.createConnection(dbconfig);

router.use(checkAuth);

router.post("/", async (req, res, next) => {
  const data = req.body;
  const sql = "insert into user_chat set ?";
  const chat = {
    user_id: "",
    field_index: "",
    chat_message: "",
    isUser: "",
    chatDate: "",
  };
});

module.exports = router;
