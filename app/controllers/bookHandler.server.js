'use strict';

const Book = require('../models/book');

function BookHandler() {
  this.myBooks = (req, res) => {
    Book
      .find({owner: req.user.twitter.id})
      .exec((error, result) => {
        let errorMessage = req.query.error;

        if (error) {
          errorMessage = 'Something went wrong or perhaps you don\'t have any book';
        }

        res.render('my-books', {
          error: errorMessage,
          message: req.query.message,
          books: JSON.stringify(result),
          deleteIsVisible: true
        });
      });
  }
  }
}

module.exports = BookHandler;
