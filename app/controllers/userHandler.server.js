'use strict';

const User = require('../models/users');

function UserHandler() {
  this.getProfile = (req, res) => {
    User
      .findOne({'twitter.id': req.user.twitter.id})
      .exec((error, result) => {
        if (error) { return error }
        res.render('profile', {userData: JSON.stringify(result)});
      })
  }
}

module.exports = UserHandler;
