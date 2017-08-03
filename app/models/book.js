'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Book = new Schema({
  id: String,
  title: String,
  owner: String,
  thumbnail: String,
  description: String,
  link: String,
  isRequested: {
    type: Boolean,
    default: false
  }
});

module.exports = mongoose.model('Book', Book);
