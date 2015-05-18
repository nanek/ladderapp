var AppDispatcher = require('../dispatcher/AppDispatcher');
var MatchApi = require('../api/MatchApi');
var PlayerApi = require('../api/PlayerApi');
var EloRating = require('../util/elo');

var MatchActions = {

  create: function(attrs) {
    AppDispatcher.dispatch({
      actionType: 'MATCH_CREATE_REQUEST',
      attrs: attrs
    });

    rating = EloRating.calculate(attrs.winner.points, attrs.loser.points);
    attrs.winnerPoints = rating[0];
    attrs.loserPoints = rating[1];
    MatchApi.create(attrs);

    PlayerApi.addWin(attrs.winner.id, rating[0]);
    PlayerApi.addLoss(attrs.loser.id, rating[1]);
  }

};

module.exports = MatchActions;
