const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const _ = require('underscore');

let DomoModel = {};

const convertId = mongoose.Types.ObjectId;
const setName = (name) => _.escape(name).trim();

const DomoSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
    trim: true,
    set: setName,
  },
  age: {
    type: Number,
    min: 0,
    required: true,
  },
  level: {
    type: Number,
    min: 0,
    required: true,
  },
  class: {
    type: String,
    require: true,
    trim: true,
    set: setName,
  },
  health: {
    type: Number,
    default: 30,
    required: true,
  },
  str: {
    type: Number,
    default: 10,
    required: true,
  },
  dex: {
    type: Number,
    default: 10,
    required: true,
  },
  int: {
    type: Number,
    default: 10,
    required: true,
  },
  wis: {
    type: Number,
    default: 10,
    required: true,
  },
  con: {
    type: Number,
    default: 10,
    required: true,
  },
  owner: {
    type: mongoose.Schema.ObjectId,
    require: true,
    ref: 'Account',
  },
  createdData: {
    type: Date,
    default: Date.now,
  },
});

DomoSchema.statics.toAPI = (doc) => ({
  name: doc.name,
  age: doc.age,
  level: doc.level,
  class: doc.class,
  dex: doc.dex,
  wis: doc.wis,
  str: doc.str,
  int: doc.int,
  con: doc.con,
  health: doc.health,
});

DomoSchema.statics.findByOwner = (ownerId, callback) => {
  const search = {
    owner: convertId(ownerId),
  };

  return DomoModel.find(search).select('name age level').exec(callback);
};

DomoModel = mongoose.model('Domo', DomoSchema);

module.exports.DomoModel = DomoModel;
module.exports.DomoSchema = DomoSchema;
