'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Image = new Schema({
  link: String,
  description: String,
  author: String
});

module.exports = mongoose.model('Image', Image);
