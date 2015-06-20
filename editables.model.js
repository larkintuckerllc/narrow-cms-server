'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var editableSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  content: {
    type: String
  }
});
var Editable = mongoose.model('narrow-cms.Editable', editableSchema);
exports = module.exports = Editable;
