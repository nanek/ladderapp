var ref = new Firebase("https://ladderapp.firebaseio.com");

var login = function(cb) {
  ref.authWithOAuthPopup("github", cb);
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
