'use strict';

module.exports = {
  'twitter': {
    'consumerKey': process.env.TWITTER_CONSUMER_KEY,
    'clientSecret': process.env.TWITTER_CONSUMER_SECRET,
    'callbackURL': process.env.APP_URL + 'auth/twitter/callback'
  }
};
