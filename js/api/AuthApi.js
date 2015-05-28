var ref = new Firebase("https://ladderapp.firebaseio.com");
var AuthActions = require('../actions/AuthActions');

var login = function(cb) {
  ref.authWithOAuthPopup("github", function(err, authData){
    if (err === null) {
      AuthActions.receiveAuthSuccess(authData);
    }
    cb(err, authData);
  });
};

var logout = function() {
  ref.unauth();
}

var getAuth = function() {
  return ref.getAuth() || false;
}

module.exports = {
  getAuth: getAuth,
  login: login,
  logout: logout
}
