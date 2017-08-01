'use strict';

const path = process.cwd();
const ImageHandler = require(path + '/app/controllers/imageHandler.server.js');

module.exports = function (app, passport) {
  function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    } else {
      res.redirect('/login');
    }
  }

  const imageHadler = new ImageHandler();

  app.route('/login')
    .get(function (req, res) {
      res.render('login');
    });

  app.route('/logout')
    .get(function (req, res) {
      req.logout();
      res.redirect('/login');
    });

  app.route('/api/:id')
    .get(isLoggedIn, function (req, res) {
      res.json(req.user.twitter);
    });

  app.route('/auth/twitter')
    .get(passport.authenticate('twitter'));

  app.route('/auth/twitter/callback')
    .get(passport.authenticate('twitter', {
      successRedirect: '/',
      failureRedirect: '/login'
    }));

  app.route('/')
    .get(imageHadler.allImages);

  app.route('/profile')
    .get(isLoggedIn, function (req, res) {
      res.render('profile');
    });

  app.route('/my-images')
    .get(isLoggedIn, imageHadler.myImages);

  app.route('/my-images')
    .post(isLoggedIn, imageHadler.newImage);

  app.route('/delete/:id')
    .get(isLoggedIn, imageHadler.deleteImage);
};
