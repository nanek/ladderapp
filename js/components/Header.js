var React = require('react');
var AuthApi = require('../api/AuthApi');

var Header = React.createClass({

  contextTypes: {
    router: React.PropTypes.func
  },

  render: function() {
    return (
      <div className="ld-header">
        <div className="ld-container">
          <div className="ld-header-title">Ladder</div>
          <div className="ld-header-right">
            <img width="30" height="30" src={this.props.user.github.cachedUserProfile.avatar_url} />
            <div className="ld-header-name">{this.props.user.github.username}</div>
            <a href="#" onClick={this.logout}>Logout</a>
          </div>
        </div>
      </div>
    );
  },

  logout: function(e) {
    e.preventDefault();
    AuthApi.logout();
    var router = this.context.router;
    router.transitionTo('/login');
  },

});

module.exports = Header;
