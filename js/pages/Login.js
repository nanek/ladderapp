var React = require('react');
var AuthApi = require('../api/AuthApi');

var Login = React.createClass({

  contextTypes: {
    router: React.PropTypes.func
  },

  render: function() {
    return (
      <div>
        <h1>Ladder App</h1>
        <button onClick={this.login}>Login</button>
      </div>
    );
  },

  login: function(e) {
    var router = this.context.router;

    AuthApi.login(function(){
      var nextPath = router.getCurrentQuery().nextPath;
      if (nextPath) {
        router.transitionTo(nextPath);
      } else {
        router.transitionTo('/');
      }
    });
  },

});

module.exports = Login;
