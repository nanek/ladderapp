var React = require('react');
var LeaderBoard = require('./LeaderBoard');
var MatchNew = require('./MatchNew');
var MatchList = require('./MatchList');
var PlayerNew = require('./PlayerNew');
var PlayerStore = require('../stores/PlayerStore');
var MatchStore = require('../stores/MatchStore');

function getAppState() {
  return {
    allPlayers: PlayerStore.getAll(),
    allMatches: MatchStore.getAll()
  };
}

var LadderApp = React.createClass({

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
      <div className="ladderapp">
        <LeaderBoard allPlayers={this.state.allPlayers}/>
        <MatchNew allPlayers={this.state.allPlayers}/>
        <PlayerNew/>
        <MatchList allMatches={this.state.allMatches}/>
      </div>
    );
  },

  _onChange: function() {
    this.setState(getAppState());
  },

});

module.exports = LadderApp;
