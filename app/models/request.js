'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Request = new Schema({
  personId: String,
  ownerId: String,
  bookTitle: String,
  bookId: String,
  approved: {
    type: Boolean,
    default: false
  }
});

module.exports = mongoose.model('Request', Request);
