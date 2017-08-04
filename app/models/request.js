'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Request = new Schema({
  requesterId: String,
  ownerId: String,
  bookId: String,
  bookTitle: String,
  approved: {
    type: Boolean,
    default: false
  }
});

module.exports = mongoose.model('Request', Request);
