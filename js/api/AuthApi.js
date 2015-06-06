var config = require('../util/config');
var ref = new Firebase(config.firebaseRoot());
var AuthActions = require('../actions/AuthActions');
var MessageActions = require('../actions/MessageActions');

var login = function(cb) {
  ref.authWithOAuthPopup('github', cb);
};

var logout = function() {
  ref.unauth();
}

var getAuth = function() {
  return ref.getAuth() || false;
}

var setupOnAuthHandler = function() {
  ref.onAuth(function(authData) {
    if (authData) {
      AuthActions.receiveAuthSuccess(authData);
    } else {
      AuthActions.receiveAuthUnauthenticated();
      MessageActions.create("Please refresh and login.");
    }
  });
}

setupOnAuthHandler();

module.exports = {
  getAuth: getAuth,
  login: login,
  logout: logout
}
