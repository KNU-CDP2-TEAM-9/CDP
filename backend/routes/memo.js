const express = require("express");
const mysql = require("../config/database");
const { v4: generateId } = require("uuid");
const { checkAuth } = require("../util/auth");
const router = express.Router();
const { decode } = require("jsonwebtoken");

module.exports = router;
