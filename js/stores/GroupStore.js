var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var Immutable = require('immutable');

var CHANGE_EVENT = 'change';

var _groups = Immutable.Map();

var Group = Immutable.Record({
  id: undefined,
  name: undefined,
  type: undefined,
  createdByUserId: undefined,
  createdAt: undefined,
  authorizedUsers: undefined
});

function create(id, attrs) {
  attrs = assign({}, attrs, {id:id});
  var newGroup = new Group(attrs);
  _groups = _groups.set(id, newGroup);
}

var GroupStore = assign({}, EventEmitter.prototype, {

  getAll: function() {
    return _groups;
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
    case 'GROUP_CREATED':
      create(action.key, action.value);
      GroupStore.emitChange();
      break;

    default:
      // no op
  }
});

module.exports = GroupStore;
