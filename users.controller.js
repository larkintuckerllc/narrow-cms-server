'use strict';
var User = require('./users.model');
exports = module.exports;
exports.add = add;
exports.findAll = findAll;
exports.findById = findById;
exports.update = update;
exports.remove = remove;
/**
* @name add
* @desc add user
* @param {Object} req Express HTTP request
* @param {Object} res Express HTTP response
*/
function add(req, res) {
  if (req.user !== 'admin') {
    return res.status(401).send('admin access');
  }
  if (!req.is('application/json')) {
    return res.status(415).send('');
  }
  var username = req.body.username;
  var password = req.body.password;
  if (!username) {
    return res.status(400).send('username required');
  }
  if (username === 'admin') {
    return res.status(400).send('admin username reserved');
  }
  if (!password) {
    return res.status(400).send('password required');
  }
  User.findOne({'username': username}, callback);
  /**
  * @name callback
  * @desc callback for findOne
  * @param {Object} err The error object.
  * @param {Object} user The user object.
  */
  function callback(err, user) {
    if (err) {
      return res.status(500).send(err);
    }
    if (user) {
      return res.status(409).send('');
    }
    user = new User();
    user.username = username;
    user.password = user.generateHash(password);
    user.save(callbackSave);
    /**
    * @name callbackSave
    * @desc callback for save
    * @param {Object} err The error object.
    */
    function callbackSave(err) {
      if (err) {
        return res.status(400).send(err);
      }
      res.send({});
    }
  }
}
/**
* @name findAll
* @desc find all users
* @param {Object} req Express HTTP request
* @param {Object} res Express HTTP response
*/
function findAll(req, res) {
  if (req.user !== 'admin') {
    return res.status(401).send('admin access');
  }
  User.find({}, callback);
  /**
  * @name callback
  * @desc callback for findAll
  * @param {Object} err error
  * @param {Object} editables editables
  */
  function callback(err, editables) {
    if (err)  {
      return res.status(500).send(err);
    }
    res.send(editables);
  }
}
/**
* @name findById
* @desc find user by id
* @param {Object} req Express HTTP request
* @param {Object} res Express HTTP response
*/
function findById(req, res) {
  if (req.user !== 'admin') {
    return res.status(401).send('admin access');
  }
  var _id = req.params._id;
  User.findById(_id, callback);
  /**
  * @name callback
  * @desc callback for findById
  * @param {Object} err error
  * @param {Object} editable editable
  */
  function callback(err, user) {
    if (err)  {
      return res.status(500).send(err);
    }
    if (!user) {
      return res.status(404).send('');
    }
    res.send(user);
  }
}
/**
* @name update
* @desc update user
* @param {Object} req Express HTTP request
* @param {Object} res Express HTTP response
*/
function update(req, res) {
  if (req.user !== 'admin') {
    return res.status(401).send('admin access');
  }
  if (!req.is('application/json')) {
    return res.status(415).send('');
  }
  var _id = req.params._id;
  User.findById(_id, callback);
  /**
  * @name callback
  * @desc callback for findById
  * @param {Object} err error
  * @param {Object} editable editable
  */
  function callback(err, user) {
    if (err) {
      return res.status(500).send(err);
    }
    if (!user) {
      return res.status(404).send('');
    }
    user.password = user.generateHash(req.body.password);
    user.save(callbackSave);
    /**
    * @name callbackSave
    * @desc callback for save
    * @param {Object} err error
    */
    function callbackSave(err) {
      if (err) {
        return res.status(400).send(err);
      }
      res.send(user);
    }
  }
}
/**
* @name remove
* @desc remove user
* @param {Object} req Express HTTP request
* @param {Object} res Express HTTP response
*/
function remove(req, res) {
  if (req.user !== 'admin') {
    return res.status(401).send('admin access');
  }
  var _id = req.params._id;
  User.findByIdAndRemove(_id, callback);
  /**
  * @name callback
  * @desc callback for findIdAndRemove
  * @param {Object} err error
  * @param {Object} user user
  */
  function callback(err, user) {
    if (err) {
      return res.status(500).send(err);
    }
    if (!user) {
      return res.status(404).send('');
    }
    res.send(user);
  }
}
