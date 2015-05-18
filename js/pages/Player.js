var React = require('react');
var Header = require('../components/Header');
var PlayerDetail = require('../components/PlayerDetail');
var PlayerStore = require('../stores/PlayerStore');
var AuthApi = require('../api/AuthApi');

var PlayerPage = React.createClass({

  statics: {
    willTransitionTo: function (transition) {
      if (!AuthApi.getAuth()) {
        transition.redirect('/login', {}, {'nextPath': transition.path});
      }
    }
  },

  getState: function() {
    var id = this.props.params.id;

    return {
      auth: AuthApi.getAuth(),
      player: PlayerStore.getById(id) || {}
    }
  },

  getInitialState: function() {
    return this.getState();
  },

  componentDidMount: function() {
    PlayerStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    PlayerStore.removeChangeListener(this._onChange);
  },

  render: function() {
    return (
      <div>
        <Header user={this.state.auth}/>
        <div className="ld-container">
          <PlayerDetail name={this.state.player.name}/>
        </div>
      </div>
    );
  },

  _onChange: function() {
    this.setState(this.getState());
  },

});

module.exports = PlayerPage;