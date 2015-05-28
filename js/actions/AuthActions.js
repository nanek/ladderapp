var MatchApi = require('../api/MatchApi');
var PlayerApi = require('../api/PlayerApi');
var UserApi = require('../api/UserApi');

var AuthActions = {

  receiveAuthSuccess: function(authData) {
    // Fetch initial data.
    MatchApi.init();
    PlayerApi.init();

    UserApi.create(authData);
  },

}

module.exports = AuthActions;
