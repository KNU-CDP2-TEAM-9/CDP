const express = require("express");
const router = express.Router();

router.post("/", async (req, res, next) => {
  const data = req.body;
  const response = data.body;
  console.log(data);
  res.json(response);
});

module.exports = router;
