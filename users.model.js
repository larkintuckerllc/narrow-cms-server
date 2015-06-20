'use strict';
var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
var Schema = mongoose.Schema;
var schema = new Schema({
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
});
schema.methods.generateHash = generateHash;
schema.methods.validPassword = validPassword;
exports = module.exports = mongoose.model('narrow-cms.User', schema);
/**
* @name generateHash
* @desc Encrypt password
* @param {String} The password
* @return {String} The encrypted password.
*/
function generateHash(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
}
/**
* @name validPassword
* @desc Compare password to encrypted password.
* @param {String} The password
* @return {Boolean} Whether or not the same.
*/
function validPassword(password) {
  /*jshint validthis: true */
  return bcrypt.compareSync(password, this.password);
}
