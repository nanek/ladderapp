var config = require('../util/config');
var ref = new Firebase(config.firebaseRoot() + '/mtg/player');
var ServerActions = require('../actions/ServerActions');

var create = function(attrs) {
  attrs.wins = 0;
  attrs.losses = 0;
  attrs.points = 2000;
  attrs.createdAt = Firebase.ServerValue.TIMESTAMP;

  var item = ref.push();
  item.set(attrs, function(err) {
    if (err) {
      return ServerActions.receivePlayerCreateError(err);
    }
  });
}

var _incrementCounter = function(id, counterKey, points) {
  var playerRef = ref.child(id);
  playerRef.transaction(function (player) {
    player[counterKey] = (player[counterKey] || 0) + 1;
    player.points = (player.points || 0) + points;
    return player;
  }, function(error, committed, snapshot) {
    if (error) {
      console.log('Transaction failed abnormally!', error);
    } else if (!committed) {
      console.log('We aborted the transaction (because already exists).');
    } else {
    }
  });
}

var addWin = function(id, points) {
  _incrementCounter(id, 'wins', points);
}

var addLoss = function(id, points) {
  _incrementCounter(id, 'losses', points);
}

var init = function() {
  ref.on('child_added', function(snapshot) {
    ServerActions.receivePlayerCreateSuccess(snapshot.key(), snapshot.val());
  });

  ref.on('child_changed', function(snapshot) {
    ServerActions.receivePlayerUpdate(snapshot.key(), snapshot.val());
  });
}

var addDeck = function(playerId, deck) {
  var playerRef = ref.child(playerId);
  playerRef.child('decks').push(deck);
}

var removeDeck = function(playerId, deckId) {
  var deckRef = ref.child(playerId).child('decks').child(deckId);
  deckRef.remove();
}

module.exports = {
  create: create,
  addDeck: addDeck,
  removeDeck: removeDeck,
  addWin: addWin,
  addLoss: addLoss,
  init: init
}
