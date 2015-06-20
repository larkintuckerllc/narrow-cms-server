'use strict';
var User = require('./users.model');
exports = module.exports;
exports.add = add;
/**
* @name add
* @desc add user
* @param {Object} req Express HTTP request
* @param {Object} res Express HTTP response
*/
function add(req, res) {
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
