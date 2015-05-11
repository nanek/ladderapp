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
    ServerActions.receiveMatchCreateSuccess(item.key(), attrs);
  });
}

var list = function() {
  ref.once('value', function(snapshot) {
    ServerActions.receiveMatchList(snapshot.val());
  }, function (errorObject) {
    console.log("The read failed: " + errorObject.code);
  });
}

module.exports = {
  create: create,
  list: list
}
