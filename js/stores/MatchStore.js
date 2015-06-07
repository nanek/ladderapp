var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var Immutable = require('immutable');

var CHANGE_EVENT = 'change';

var _matches = Immutable.Map();

var Match = Immutable.Record({
  winner: undefined,
  winnerPoints: undefined,
  loser: undefined,
  loserPoints: undefined,
  createdAt: undefined,
  createdByUserId: undefined
});

function create(id, attrs) {
  attrs = assign({}, attrs, {id:id});
  var newMatch = new Match(attrs);
  _matches = _matches.set(id, newMatch);
}

var MatchStore = assign({}, EventEmitter.prototype, {

  getAll: function() {
    return _matches;
  },

  getLast: function(number) {
    var matches = _matches.sortBy(function(match) {
      return -match.createdAt;
    });

    return matches.take(number);
  },

  getByPlayerId: function(playerId) {
    var matches = _matches.filter(function(match) {
      return match.winner.id === playerId || match.loser.id === playerId;
    });

    return matches;
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
