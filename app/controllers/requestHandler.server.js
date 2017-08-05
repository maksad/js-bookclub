'use strict';

const Request = require('../models/request');
const User = require('../models/users');
const Book = require('../models/book');

function RequestHandler() {
  this.makeRequest = (req, res) => {
    const bookId = req.params.bookId;
    const requesterId = req.params.requesterId;

    if (!bookId || !requesterId) {
      return res.status(400).json({error: 'BookId and requesterId are required!'});
    }

    Book
      .findOne({id: bookId})
      .exec((err, book) => {
        if (err) { return err }

        const request = new Request({
          requesterId: requesterId,
          ownerId: book.owner,
          bookId: book.id,
          bookTitle: book.title
        });

        const message = 'You just requested "' + book.title + '"';
        return res.redirect('/?message=' + message);
      })
  }
}

module.exports = RequestHandler;
