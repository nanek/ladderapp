var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var _ = require('lodash');

var CHANGE_EVENT = 'change';

var _matches = {};

function create(id, attrs) {
  _matches[id] = assign({}, attrs, {id:id});
}

var MatchStore = assign({}, EventEmitter.prototype, {

  getAll: function() {
    return _matches;
  },

  getLast: function(number) {
    var matches = _.sortBy(_matches, function(match) {
      return -match.createdAt;
    });

    return _.take(matches, number);
  },

  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },

  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }
});

// Register callback to handle all updates.
AppDispatcher.register(function(action) {

  switch(action.actionType) {
    case 'MATCH_CREATED':
      create(action.key, action.value);
      MatchStore.emitChange();
      break;

    default:
      // no op
  }
});

module.exports = MatchStore;
