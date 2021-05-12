const User = require("../models/UserSchema");

const UserController = {
  createAndSave: function (username, res) {
    const newUser = new User({ username: username });
    newUser.save((err, user) => {
      if (err) return console.error(err);
      res.json({
        username: user.username,
        _id: user._id,
      });
    });
  },
  getAllUsers: function (res) {
    User.find((err, users) => {
      if (err) return console.error(err);
      console.log(users);
      users = users.map((user) => {
        return {
          username: user.username,
          _id: user._id,
        };
      });
      res.json(users);
    });
  },
  addExercise: function (_id, exercise, res) {
    User.findById({ _id: _id }, (err, user) => {
      if (err) return res.send(err);
      user.exercises.push(exercise);
      user.save((err, newUser) => {
        if (err) return res.send(err);
        res.json({
          _id: _id,
          username: newUser.username,
          date: exercise.date,
          duration: exercise.duration,
          description: exercise.description,
        });
      });
    });
  },
  getUserLogs: function (_id, searchParameters, res) {
    User.findById({ _id: _id }, (err, user) => {
      if (err) return console.error(err);

      let logsInQuestion = user.exercises.sort((a, b) => a.date - b.date);

      if (searchParameters.from) {
        logsInQuestion = logsInQuestion.filter(
          (exerciseLog) => exerciseLog.date >= searchParameters.from
        );
      }

      if (searchParameters.to) {
        logsInQuestion = logsInQuestion.filter(
          (exerciseLog) => exerciseLog.date <= searchParameters.to
        );
      }

      if (searchParameters.limit) {
        logsInQuestion = logsInQuestion.slice(0, searchParameters.limit);
      }

      res.json({
        username: user.username,
        log: logsInQuestion,
        count: logsInQuestion.length,
      });
    });
  },
  deleteAllUser: function (res) {
    User.deleteMany({}, (err) => {
      if (err) return console.error(err);
      res.json({ action: "delete all" });
    });
  },
};

module.exports = UserController;
