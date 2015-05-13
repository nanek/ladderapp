var ref = new Firebase("https://ladderapp.firebaseio.com/mtg/player");
var ServerActions = require('../actions/ServerActions');

var create = function(attrs) {
  attrs.wins = 0;
  attrs.losses = 0;

  var item = ref.push();
  item.set(attrs, function(err) {
    if (err) {
      return ServerActions.receivePlayerCreateError(err);
    }
    ServerActions.receivePlayerCreateSuccess(item.key(), attrs);
  });
}

var list = function() {
  ref.once('value', function(snapshot) {
    ServerActions.receivePlayerList(snapshot.val());
  }, function (errorObject) {
    console.log("The read failed: " + errorObject.code);
  });
};

var _incrementCounter = function(id, counterKey) {
  var counterRef = ref.child(id).child(counterKey);
  counterRef.transaction(function (current_value) {
    return (current_value || 0) + 1;
  }, function(error, committed, snapshot) {
    if (error) {
      console.log('Transaction failed abnormally!', error);
    } else if (!committed) {
      console.log('We aborted the transaction (because already exists).');
    } else {
      var update = {};
      update[counterKey] = snapshot.val();
      ServerActions.receivePlayerUpdate(id, update);
    }
  });
}

var addWin = function(id) {
  _incrementCounter(id, 'wins');
}

var addLoss = function(id) {
  _incrementCounter(id, 'losses');
}

module.exports = {
  create: create,
  list: list,
  addWin: addWin,
  addLoss: addLoss
}
