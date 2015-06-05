var config = require('../util/config');
var ref = new Firebase(config.firebaseRoot() + '/users');
var ServerActions = require('../actions/ServerActions');

var create = function(authData) {
  checkIfUserExists(authData, function (err, exists) {
    ref.child(authData.uid).set({
      provider: authData.provider,
      name: authData.github.displayName
    });
  });
}

var init = function() {
  ref.on('child_added', function(snapshot) {
    ServerActions.receiveUserCreateSuccess(snapshot.key(), snapshot.val());
  });
}

var checkIfUserExists = function(authData, cb) {
  ref.child(authData.uid).once('value', function(snapshot) {
    var exists = (snapshot.val() !== null);
    cb(null, exists);
  });
}

module.exports = {
  checkIfUserExists: checkIfUserExists,
  create: create,
  init: init
}
