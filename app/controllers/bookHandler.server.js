'use strict';

const gBooks = require('google-books-search');
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

  this.addNewBook = (req, res) => {
    const bookName = req.body.bookName;

    if (!bookName) {
      const errorMessage = 'The name of a book is required and cannot be empty.';
      res.redirect('/my-books?error=' + errorMessage);
    }

    gBooks
      .search(bookName, (error, results) => {
        if (!error) {
          checkExistingAndAddNewBook(results);
        } else {
          const errorMessage = 'We can\'t find the book that you are looking for';
          res.redirect('/my-books?error=' + errorMessage);
        }
      })

    function checkExistingAndAddNewBook(newBooks) {
      Book
        .find({owner: req.user.twitter.id})
        .exec((error, usersCollection) => {
          const usersCollectionIds = usersCollection.map(book => book.id);

          for (var book of newBooks) {
            if (!usersCollectionIds.includes(book.id)) {
              return addNewBook(book);
            }
          }

          const errorMessage = 'Seems that all the books with your search title "' + bookName + '" are already in your collection';
          res.redirect('/my-books?error=' + errorMessage);
        })
    }

    function addNewBook(data) {
      const description = data.description ? data.description.slice(0, 90) + '...' : ''
      const book = new Book({
        id: data.id,
        title: data.title,
        owner: req.user.twitter.id,
        thumbnail: data.thumbnail,
        description: description,
        link: data.link
      });

      return book
        .save()
        .then(redirectToMyBooks);

      function redirectToMyBooks() {
        const message = 'The book "' + book.title + '" is added to your collections.';
        return res.redirect('/my-books?message=' + message);
      }
    }
  }

  this.allBooks = (req, res) => {
    Book
      .find()
      .exec((error, result) => {
        let errorMessage = req.query.error;

        if (error) {
          errorMessage = 'Something went wrong or perhaps the library does not have any book.';
        }

        res.render('home', {
          error: errorMessage,
          books: JSON.stringify(result)
        });
      });
  }

  this.deleteBook = function(req, res) {
    const bookId = req.params.id;

    if (!bookId) {
      return res
        .status(400)
        .json({'error': 'Book id is missing'});
    }

    Book
      .findOneAndRemove({
        'id': bookId,
        'owner': req.user.twitter.id
      })
      .catch((err) => {
        const error = 'Something went wrong. We can\'t remove this book from your collection';
        return res.redirect('/my-book?error=' + error);
      })
      .then(() => {
        const message = 'The book was removed from your collection';
        return res.redirect('/my-books?message=' + message);
      });
  }
}

module.exports = BookHandler;
