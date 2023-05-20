const express = require("express");
const router = express.Router();
const { GraphData } = require("../data/neo4j");

router.get("/", async (req, res, next) => {
  const data = await GraphData();
  return res.status(201).json({ data: data });
});

module.exports = router;
