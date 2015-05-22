var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var _ = require('lodash');

var CHANGE_EVENT = 'change';

var _messages = [];

function create(message) {
  _messages.push(message);
  setTimeout(remove, 3000);
}

function remove() {
  _messages.pop()
  MessageStore.emitChange();
}

var MessageStore = assign({}, EventEmitter.prototype, {

  getMessages: function() {
    return _messages;
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
    case 'MESSAGE_CREATE':
      create(action.msg);
      MessageStore.emitChange();
      break;

    default:
      // no op
  }
});

module.exports = MessageStore;
