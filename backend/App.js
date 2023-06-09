const bodyParser = require("body-parser");
const express = require("express");

const chattingRoutes = require("./routes/chat");
const authRoutes = require("./routes/auth");
const userInfoRoutes = require("./routes/userInfo");
const memoRoutes = require("./routes/memo");
const showGraphRoutes = require("./routes/showGraph");
const App = express();
App.use(bodyParser.json());

App.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PATCH,DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type,Authorization");
  next();
});

App.use("/auth", authRoutes);
App.use("/chat", chattingRoutes);
App.use("/userInfo", userInfoRoutes);
App.use("/memo", memoRoutes);
App.use("/showGraph", showGraphRoutes);

App.use((error, req, res, next) => {
  const status = error.status || 500;
  const message = error.message || "Something went wrong.";
  res.status(status).json({ message: message, status: status });
});

App.listen(8080);
