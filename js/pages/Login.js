var React = require('react');
var AuthApi = require('../api/AuthApi');

var Login = React.createClass({

  contextTypes: {
    router: React.PropTypes.func
  },

  render: function() {
    return (
      <div className='ld-login-page'>
        <div className='ld-login-page-inner'>
          <div className='ld-step'>
            <div className='ld-step-image'>
              <img src='/img/ladder.png' width='200px' height='400px'/>
            </div>
            <div className='ld-step-banner'>
              <div className='ld-login-page-title'>Ladder</div>
              <div className='ld-login-page-title2'>Climb the ranks</div>
              <div className='ld-login-page-button-wrapper'>
                <button className='ld-login-page-button' onClick={this.login}>Login with Github</button>
              </div>
            </div>
          </div>
        </div>
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
