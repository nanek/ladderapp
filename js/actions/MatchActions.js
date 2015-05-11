var AppDispatcher = require('../dispatcher/AppDispatcher');
var MatchApi = require('../api/MatchApi');
var PlayerApi = require('../api/PlayerApi');

var MatchActions = {

  create: function(attrs) {
    AppDispatcher.dispatch({
      actionType: 'MATCH_CREATE_REQUEST',
      attrs: attrs
    });

    MatchApi.create(attrs);

    PlayerApi.addWin(attrs.winner.id);
    PlayerApi.addLoss(attrs.loser.id);
  }

};

module.exports = MatchActions;
