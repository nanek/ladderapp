var ref = new Firebase("https://ladderapp.firebaseio.com");
var AuthActions = require('../actions/AuthActions');

var login = function(cb) {
  ref.authWithOAuthPopup("github", cb);
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
      //console.log("Client unauthenticated.")
    }
  });
}

setupOnAuthHandler();

module.exports = {
  getAuth: getAuth,
  login: login,
  logout: logout
}
