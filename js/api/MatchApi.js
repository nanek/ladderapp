var config = require('../util/config');
var ref = new Firebase(config.firebaseRoot() + '/mtg/match');
var ServerActions = require('../actions/ServerActions');

var create = function(attrs) {
  var item = ref.push();

  item.set({
    winner: attrs.winner,
    winnerPoints: attrs.winnerPoints,
    loser: attrs.loser,
    loserPoints: attrs.loserPoints,
    createdAt: Firebase.ServerValue.TIMESTAMP,
    createdByUserId: attrs.createdByUserId
  }, function(err) {
    if (err) {
      return ServerActions.receiveMatchCreateError(err);
    }
  });
}

var init = function() {
  ref.orderByChild('createdAt')
    .limitToLast(5)
    .on('child_added', function(snapshot) {
      ServerActions.receiveMatchCreateSuccess(snapshot.key(), snapshot.val());
  });
}

module.exports = {
  create: create,
  init: init
}
