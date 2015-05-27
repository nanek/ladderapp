var AppDispatcher = require('../dispatcher/AppDispatcher');

var ServerActions = {

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

  receiveUserCreateSuccess: function(key, value) {
    AppDispatcher.dispatch({
      actionType: 'USER_CREATED',
      key: key,
      value: value
    });
  },

}

module.exports = ServerActions;
