'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var User = new Schema({
  twitter: {
    id: String,
    displayName: String,
    userName: String,
    photoUrl: String,
  },
  state: {
    type: String,
    default: '',
  },
  city: {
    type: String,
    default: '',
  },
});

module.exports = mongoose.model('User', User);
