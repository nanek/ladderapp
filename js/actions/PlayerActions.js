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

  addDeck: function(playerId, deck) {
    PlayerApi.addDeck(playerId, deck);
  },

  removeDeck: function(playerId, deckId) {
    PlayerApi.removeDeck(playerId, deckId);
  }

};

module.exports = PlayerActions;
