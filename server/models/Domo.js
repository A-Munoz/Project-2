const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const _ = require('underscore');

let DomoModel = {};

const convertId = mongoose.Types.ObjectId;
const setName = (name) => _.escape(name).trim();
const setClass = (cClass) => _.escape(cClass).trim();

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
    trim: true,
    set: setClass,
    default: 'fighter',
  },
  health: {
    type: Number,
    default: 10,
  },
  str: {
    type: Number,
    default: 10,
  },
  dex: {
    type: Number,
    default: 10,
  },
  int: {
    type: Number,
    default: 10,
  },
  wis: {
    type: Number,
    default: 10,
  },
  con: {
    type: Number,
    default: 10,
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

  return DomoModel.find(search).select('name age').exec(callback);
};
DomoSchema.statics.removeCharacter = (ownerId, cName, callback) => {

    return DomoModel.deleteOne({name: cName}, function(error){
        return handleError(error);
    });
};
DomoSchema.statics.update = (ownerId, cName, callback) => {
 //https://mongoosejs.com/docs/models.html
    return DomoModel.updateone({name: cName}, function(error){
        return handleError(error);
    });
};

DomoModel = mongoose.model('Domo', DomoSchema);

module.exports.DomoModel = DomoModel;
module.exports.DomoSchema = DomoSchema;
