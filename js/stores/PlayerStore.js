var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var _ = require('lodash');

var CHANGE_EVENT = 'change';

var _players = {};

function create(id, attrs) {
  _players[id] = assign({}, attrs, {id:id});
}

function update(id, attrs) {
  assign(_players[id], attrs, {id:id});
}

function resetList(list) {
  Object.keys(list).forEach(function(playerId) {
    _players[playerId] = assign({}, list[playerId], {id:playerId});
  });
}

var PlayerStore = assign({}, EventEmitter.prototype, {

  getAll: function() {
    return _players;
  },

  getAllSortedByWins: function() {
    return _.sortBy(_players, function(p) {
      return -p.wins;
    });
  },

  getById: function(id) {
    return _players[id];
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
    case 'PLAYER_CREATED':
      create(action.key, action.value);
      PlayerStore.emitChange();
      break;

    case 'PLAYER_UPDATED':
      update(action.key, action.value);
      PlayerStore.emitChange();
      break;

    case 'PLAYER_LIST_RESPONSE':
      resetList(action.list);
      PlayerStore.emitChange();
      break;

    default:
      // no op
  }
});

module.exports = PlayerStore;
