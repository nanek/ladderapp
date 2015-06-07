var AppDispatcher = require('../dispatcher/AppDispatcher');
var PlayerApi = require('../api/PlayerApi');
var AuthApi = require('../api/AuthApi');

var PlayerActions = {

  create: function(attrs) {
    AppDispatcher.dispatch({
      actionType: 'PLAYER_CREATE_REQUEST',
      attrs: attrs
    });

    attrs.createdByUserId = AuthApi.getAuth().uid;

    PlayerApi.create(attrs);
  },

  addDeck: function(id, deck) {
    PlayerApi.addDeck(id, deck);
  }

};

module.exports = PlayerActions;
