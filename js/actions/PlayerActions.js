var AppDispatcher = require('../dispatcher/AppDispatcher');
var PlayerApi = require('../api/PlayerApi');

var PlayerActions = {

  create: function(attrs) {
    AppDispatcher.dispatch({
      actionType: 'PLAYER_CREATE_REQUEST',
      attrs: attrs
    });

    PlayerApi.create(attrs);
  }

};

module.exports = PlayerActions;
