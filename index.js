'use strict';
var dbPrefix = 'narrow-cms';
var adminPassword = 'CHANGEME';
var encodeSecret = 'CHANGEME';
exports = module.exports = {
  setDbPrefix: setDbPrefix,
  setAdminPassword: setAdminPassword,
  setEncodeSecret: setEncodeSecret,
  getRouter: getRouter
};
/**
* @name setDbPrefix
* @desc set db prefix
* @param {String} prefix
*/
function setDbPrefix(prefix) {
  dbPrefix = prefix;
}
/**
/**
* @name setAdminPassword
* @desc set admin password
* @param {String} password
*/
function setAdminPassword(password) {
  adminPassword = password;
}
/**
* @name setEncodeSecret
* @desc set encode secret
* @param {String} secret
*/
function setEncodeSecret(secret) {
  encodeSecret = secret;
}
/**
* @name getRouter
* @desc get router
*/
function getRouter() {
  var express = require('express');
  var router = express.Router();
  var passport = require('passport');
  var LocalStrategy = require('passport-local').Strategy;
  var BearerStrategy = require('passport-http-bearer').Strategy;
  var jwt = require('jwt-simple');
  var User = require('./users.model');
  router.use(express.static(__dirname + '/public'));
  router.use(require('body-parser').json());
  router.use(require('body-parser').urlencoded({extended: true}));
  passport.use(new LocalStrategy(localStrategyVerify));
  passport.use(new BearerStrategy(bearerStrategyVerify));
  router.use(passport.initialize());
  var editablesController = require('./editables.controller');
  var usersController = require('./users.controller');
  router.get('/editables/:_id', editablesController.findById);
  router.get('/editables/',
  passport.authenticate('bearer', {session: false}),
  editablesController.findAll);
  router.post('/editables/',
  passport.authenticate('bearer', {session: false}),
  editablesController.add);
  router.put('/editables/:_id',
  passport.authenticate('bearer', {session: false}),
  editablesController.update);
  router.delete('/editables/:_id',
  passport.authenticate('bearer', {session: false}),
  editablesController.remove);
  router.post('/users/', usersController.add);
  router.post('/login/',
  passport.authenticate('local', {session: false}),
  sendToken);
  return router;
  /**
  * @name localStrategyVerify
  * @desc Validation for local strategy
  * @param {String} username The username.
  * @param {String} password The password.
  * @param {Object} done If valid user identified by token.
  */
  function localStrategyVerify(username, password, done) {
    if (username === 'admin') {
      if (password === adminPassword) {
        return done(false, jwt.encode({_id: 'admin'}, encodeSecret));
      } else {
        return done(false, false);
      }
    } else {
      User.findOne({'username': username}, callback);
    }
    /**
    * @name callback
    * @desc callback for findOne
    * @param {Object} err error
    * @param {Object} user user
    */
    function callback(err, user) {
      if (err) {
        return done(err);
      }
      if (!user) {
        return done(false, false);
      }
      if (!user.validPassword(password)) {
        return done(false, false);
      }
      return done(false, jwt.encode({_id: user._id}, encodeSecret));
    }
  }
  /**
  * @name bearerStrategyVerify
  * @desc Validation for bearer strategy
  * @param {String} token The token.
  * @param {Object} done If valid user identified by _id.
  */
  function bearerStrategyVerify(token, done) {
    process.nextTick(function() {
      var _id;
      try {
        _id = jwt.decode(token, encodeSecret)._id;
      } catch (error) {
        return done(null, false);
      }
      return done(null, _id);
    });
  }
  /**
  * @name sendToken
  * @desc API sending back token.
  * @param {Object} req Express HTTP request.
  * @param {Object} res Express HTTP response.
  */
  function sendToken(req, res) {
    res.send({
      'token': req.user
    });
  }
}
