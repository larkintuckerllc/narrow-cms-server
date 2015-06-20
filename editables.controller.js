'use strict';
var Editable = require('./editables.model');
var User = require('./users.model');
exports = module.exports;
exports.add = add;
exports.findAll = findAll;
exports.findById = findById;
exports.update = update;
exports.remove = remove;
/**
* @name add
* @desc add editable
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
  var editable = new Editable({name: req.body.name, content: req.body.content});
  editable.save(callback);
  /**
  * @name callback
  * @desc callback for save
  * @param {Object} err error
  */
  function callback(err) {
    if (err) {
      return res.status(400).send(err);
    }
    res.send(editable);
  }
}
/**
* @name findAll
* @desc find all editables
* @param {Object} req Express HTTP request
* @param {Object} res Express HTTP response
*/
function findAll(req, res) {
  if (req.user !== 'admin') {
    return res.status(401).send('admin access');
  }
  Editable.find({}, callback);
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
* @desc find editable by id
* @param {Object} req Express HTTP request
* @param {Object} res Express HTTP response
*/
function findById(req, res) {
  var _id = req.params._id;
  Editable.findById(_id, callback);
  /**
  * @name callback
  * @desc callback for findById
  * @param {Object} err error
  * @param {Object} editable editable
  */
  function callback(err, editable) {
    if (err)  {
      return res.status(500).send(err);
    }
    if (!editable) {
      return res.status(404).send('');
    }
    res.send(editable);
  }
}
/**
* @name update
* @desc update editable
* @param {Object} req Express HTTP request
* @param {Object} res Express HTTP response
*/
function update(req, res) {
  if (req.user === 'admin') {
    callback(false, true);
  } else {
    User.findOne({'_id': req.user}, callback);
  }
  /**
  * @name callback
  * @desc callback for findOne
  * @param {Object} err error
  * @param {Object} user user
  */
  function callback(err, user) {
    if (err) {
      return res.status(500).send(err);
    }
    if (!user) {
      return res.status(401).send('invalid token');
    }
    if (!req.is('application/json')) {
      return res.status(415).send('');
    }
    var _id = req.params._id;
    Editable.findById(_id, callbackFindById);
    /**
    * @name callbackFindById
    * @desc callback for findById
    * @param {Object} err error
    * @param {Object} editable editable
    */
    function callbackFindById(err, editable) {
      if (err) {
        return res.status(500).send(err);
      }
      if (!editable) {
        return res.status(404).send('');
      }
      editable.name = req.body.name;
      editable.content = req.body.content;
      editable.save(callbackSave);
      /**
      * @name callbackSave
      * @desc callback for save
      * @param {Object} err error
      */
      function callbackSave(err) {
        if (err) {
          return res.status(400).send(err);
        }
        res.send(editable);
      }
    }
  }
}
/**
* @name remove
* @desc remove editable
* @param {Object} req Express HTTP request
* @param {Object} res Express HTTP response
*/
function remove(req, res) {
  if (req.user !== 'admin') {
    return res.status(401).send('admin access');
  }
  var _id = req.params._id;
  Editable.findByIdAndRemove(_id, callback);
  /**
  * @name callback
  * @desc callback for findIdAndRemove
  * @param {Object} err error
  * @param {Object} editable editable
  */
  function callback(err, editable) {
    if (err) {
      return res.status(500).send(err);
    }
    if (!editable) {
      return res.status(404).send('');
    }
    res.send(editable);
  }
}
