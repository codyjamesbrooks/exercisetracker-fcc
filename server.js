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
  let date = req.body.date ? Date.parse(req.body.date) : Date.now();
  const exercise = {
    description: req.body.description,
    duration: req.body.duration,
    date: date,
  };
  UserController.addExercise(req.body[":_id"], exercise, res);
});

app.get("/api/users/:_id/logs", (req, res) => {
  let searchModifiers = {
    from: req.query.from,
    to: req.query.to,
    limit: req.query.limit,
  };
  console.log(searchModifiers);
  UserController.getUserLogs(req.params._id, res);
});

app.get("/api/users/:_id/logs/");

const listener = app.listen(process.env.PORT || 3000, () => {
  console.log("Your app is listening on port " + listener.address().port);
});
