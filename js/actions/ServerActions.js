var AppDispatcher = require('../dispatcher/AppDispatcher');

var ServerActions = {

  receiveMatchList: function(list) {
    AppDispatcher.dispatch({
      actionType: 'MATCH_LIST_RESPONSE',
      list: list
    });
  },

  receiveMatchCreateSuccess: function(key, value) {
    AppDispatcher.dispatch({
      actionType: 'MATCH_CREATED',
      key: key,
      value: value
    });
  },

  receiveMatchCreateError: function(error) {
    AppDispatcher.dispatch({
      actionType: 'MATCH_CREATE_FAILED',
      error: error
    });
  },

  receivePlayerList: function(list) {
    AppDispatcher.dispatch({
      actionType: 'PLAYER_LIST_RESPONSE',
      list: list
    });
  },

  receivePlayerCreateSuccess: function(key, value) {
    AppDispatcher.dispatch({
      actionType: 'PLAYER_CREATED',
      key: key,
      value: value
    });
  },

  receivePlayerCreateError: function(error) {
    AppDispatcher.dispatch({
      actionType: 'PLAYER_CREATE_FAILED',
      error: error
    });
  },

  receivePlayerUpdate: function(key, value) {
    AppDispatcher.dispatch({
      actionType: 'PLAYER_UPDATED',
      key: key,
      value: value
    });
  },
}

module.exports = ServerActions;
