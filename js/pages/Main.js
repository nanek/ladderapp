var React = require('react');
var Header = require('../components/Header');
var LeaderBoard = require('../components/LeaderBoard');
var MatchNew = require('../components/MatchNew');
var MatchList = require('../components/MatchList');
var PlayerNew = require('../components/PlayerNew');
var PlayerStore = require('../stores/PlayerStore');
var MatchStore = require('../stores/MatchStore');
var AuthApi = require('../api/AuthApi');

function getAppState() {
  return {
    allPlayers: PlayerStore.getAllSortedByWins(),
    allMatches: MatchStore.getLast(5),
    auth: AuthApi.getAuth()
  };
}

var LadderApp = React.createClass({

  statics: {
    willTransitionTo: function (transition) {
      if (!AuthApi.getAuth()) {
        transition.redirect('/login', {}, {'nextPath': transition.path});
      }
    }
  },

  getInitialState: function() {
    return getAppState();
  },

  componentDidMount: function() {
    PlayerStore.addChangeListener(this._onChange);
    MatchStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    PlayerStore.removeChangeListener(this._onChange);
    MatchStore.removeChangeListener(this._onChange);
  },

  render: function() {
    return (
      <div>
        <Header user={this.state.auth}/>
        <div className="ld-container">
          <LeaderBoard allPlayers={this.state.allPlayers}/>
          <MatchNew allPlayers={this.state.allPlayers}/>
          <PlayerNew/>
          <MatchList allMatches={this.state.allMatches}/>
        </div>
      </div>
    );
  },

  _onChange: function() {
    this.setState(getAppState());
  },

});

module.exports = LadderApp;
