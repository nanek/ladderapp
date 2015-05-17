var React = require('react');
var AuthApi = require('../api/AuthApi');

var Header = React.createClass({

  contextTypes: {
    router: React.PropTypes.func
  },

  render: function() {
    return (
      <div>
        <h1>Ladder App</h1>
        {this.props.user.github.username}
        <img width="30" height="30" src={this.props.user.github.cachedUserProfile.avatar_url} />
        <button onClick={this.logout}>Logout</button>
      </div>
    );
  },

  logout: function(e) {
    AuthApi.logout();
    var router = this.context.router;
    router.transitionTo('/login');
  },

});

module.exports = Header;
