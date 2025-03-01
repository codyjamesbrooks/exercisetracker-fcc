const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();

const db = require("./db");
const UserController = require("./controllers/UserController");

app.use(cors());
app.use(express.urlencoded({ extended: true })); // Express body parser
app.use(express.static("public"));
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/index.html");
});

app.post("/api/users", (req, res) => {
  UserController.createAndSave(req.body.username, res);
});

app.get("/api/users", (req, res) => {
  UserController.getAllUsers(res);
});

app.post("/api/users/:_id/exercises", (req, res) => {
  let date =
    req.body.date === "" || typeof req.body.date === "undefined"
      ? new Date()
      : new Date(req.body.date);
  const exercise = {
    description: req.body.description,
    duration: +req.body.duration,
    date: date.toDateString(),
  };
  UserController.addExercise(req.params["_id"], exercise, res);
});

app.get("/api/users/:_id/logs", (req, res) => {
  let searchParameters = {};
  if (req.query.from) searchParameters.from = Date.parse(req.query.from);
  if (req.query.to) searchParameters.to = Date.parse(req.query.to);
  if (req.query.limit) searchParameters.limit = req.query.limit;
  UserController.getUserLogs(req.params._id, searchParameters, res);
});

// app.get("/api/users/deleteAllUser", (req, res) => {
//   UserController.deleteAllUser(res);
// });

const listener = app.listen(process.env.PORT || 3000, () => {
  console.log("Your app is listening on port " + listener.address().port);
});
