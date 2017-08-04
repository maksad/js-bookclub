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

  this.updateUserInfo = (req, res) => {
    const city = req.body.city;
    const state = req.body.state;
    const name = req.body.name;

    if (!city) {
      return res.status(400).json({error: 'City field cannot be empty.'})
    }

    if (!state) {
      return res.status(400).json({error: 'State field cannot be empty.'})
    }

    if (!name) {
      return res.status(400).json({error: 'Name field cannot be empty.'})
    }

    User
      .findOne({'twitter.id': req.user.twitter.id})
      .exec((error, user) => {
        if (error) { return error }

        user.city = city;
        user.state = state;
        user.name = name;

        return user
          .save()
          .then(() => {
            res.redirect('profile');
          });
      })
  }
}

module.exports = UserHandler;
