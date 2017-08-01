'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Book = new Schema({
  title: String,
  owner: String,
  cover: String,
  isRequested: {
    type: Boolean,
    default: false
  }
});

module.exports = mongoose.model('Book', Book);
