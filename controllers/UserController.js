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
      if (err) return console.error(err);
      user.exercises.push(exercise);
      user.save((err, newUser) => {
        if (err) return console.error(err);
        res.json(newUser);
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
