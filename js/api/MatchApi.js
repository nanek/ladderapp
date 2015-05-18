var ref = new Firebase("https://ladderapp.firebaseio.com/mtg/match");
var ServerActions = require('../actions/ServerActions');

var create = function(attrs) {
  var item = ref.push();

  item.set({
    winner: attrs.winner,
    loser: attrs.loser,
    createdAt: Firebase.ServerValue.TIMESTAMP
  }, function(err) {
    if (err) {
      return ServerActions.receiveMatchCreateError(err);
    }
  });
}

var init = function() {
  ref.on('child_added', function(snapshot) {
    ServerActions.receiveMatchCreateSuccess(snapshot.key(), snapshot.val());
  });
}

module.exports = {
  create: create,
  init: init
}
