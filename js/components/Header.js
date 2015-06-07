var React = require('react');
var Link = require('react-router').Link;
var AuthApi = require('../api/AuthApi');

var Header = React.createClass({

  contextTypes: {
    router: React.PropTypes.func
  },

  render: function() {
    var profile = this.props.user.github;
    var image = null;
    var username = null;

    if (profile) {
      var image = profile.cachedUserProfile.avatar_url;
      var username = profile.username;
    }

    return (
      <div className="ld-header">
        <div className="ld-container">
          <div className="ld-header-title">
            <Link to="/">Ladder</Link>
          </div>
          <div className="ld-header-right">
            <img width="30" height="30" src={image} />
            <div className="ld-header-name">{username}</div>
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
