const User = require("../models/UserSchema");

const UserController = {
  createAndSave: function (username, done) {
    const newUser = new User({ username: username });
    newUser.save((err, user) => {
      if (err) return console.error(err);
      done(null, user);
    });
  },
};

module.exports = UserController;
