'use strict';

const Image = require('../models/image');

function ImageHandler() {
  this.deleteImage = function(req, res) {
    const imageId = req.params.id;

    if (!imageId) {
      return res
        .status(400)
        .json({'error': 'Image id is missing'});
    }

    Image
      .findOneAndRemove({
        '_id': imageId,
        'author': req.user.twitter.id
      })
      .catch((err) => {
        return err;
      })
      .then(() => {
        return res.redirect('/my-images');
      });
  }

  this.allImages = function(req, res) {
    return Image
      .find({}, (err, images) => {
        if (err) { return err }

        res.render('home', {
          images: JSON.stringify(images)
        });
      });
  }

  this.myImages = function(req, res) {
    let error = req.query.error;
    Image
      .find({'author': req.user.twitter.id})
      .exec((err, images) => {
        if (err) { return err }

        res.render('my-images', {
          images: JSON.stringify(images),
          error: error,
          deleteIsVisible: true
        });
      });
  }

  this.newImage = function(req, res) {
    const imageURL = req.body.imageUrl;
    const description = req.body.imageDescription;

    if (!imageURL) {
      const error = 'Image URL cannot be empty';
      return res.redirect('/my-images?error=' + error);
    }

    const image = new Image({
      link: imageURL,
      description: description,
      author: req.user.twitter.id
    });

    if (image.errors) {
      const error = 'Something went wrong :(';
      return res.redirect('/my-images?error=' + error);
    }

    return image
      .save()
      .then(() => {
        res.redirect('my-images');
      })
  }
}

module.exports = ImageHandler;
