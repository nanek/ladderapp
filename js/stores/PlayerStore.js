var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var Immutable = require('immutable');

var CHANGE_EVENT = 'change';

var _players = Immutable.Map();

var Player = Immutable.Record({
  id: undefined,
  name: undefined,
  wins: undefined,
  losses: undefined,
  points: undefined,
  createdAt: undefined
});

function create(id, attrs) {
  attrs = assign({}, attrs, {id:id});
  var player = new Player(attrs);
  _players = _players.set(id, player);
}

function update(id, attrs) {
  attrs = assign({}, attrs, {id:id});
  var player = new Player(attrs);
  _players = _players.set(id, player);
}

var PlayerStore = assign({}, EventEmitter.prototype, {

  getAll: function() {
    return _players;
  },

  getAllSortedByPoints: function() {
    return _players.sortBy(function(p) {
      return -p.points;
    });
  },

  getAllSortedByName: function() {
    return _players.sortBy(function(p) {
      return p.name;
    });
  },

  getById: function(id) {
    var player = _players.get(id);
    if (player) {
      return player.toObject();
    } else {
      return null;
    }
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

    default:
      // no op
  }
});

module.exports = PlayerStore;
