var React = require('react');
var MatchActions = require('../actions/MatchActions');
var MessageActions = require('../actions/MessageActions');
var PlayerStore = require('../stores/PlayerStore');

var MatchNew = React.createClass({
  render: function() {
    var players = this.props.allPlayers;
    var options = [];

    for (var key in players) {
      options.push(<option key={players[key].id} value={players[key].id}>{players[key].name}</option>);
    }

    return (
      <div className="ld-match-new ld-panel">
        <div className="ld-panel-title">Add Match</div>
        <label>Winner</label>
        <select ref="winner">
          {options}
        </select>

        <label>Loser</label>
        <select ref="loser">
          {options}
        </select>

        <button className="ld-button" type="button" onClick={this.handleSubmit}>Add Match</button>
      </div>
    )
  },

  handleSubmit: function(e) {
    e.preventDefault()
    var players = this.props.allPlayers;

    var ids = {
      winner: this.refs.winner.getDOMNode().value,
      loser: this.refs.loser.getDOMNode().value
    };

    if (ids.winner === ids.loser) {
      return MessageActions.create("Match cannot be same person.");
    }

    var attrs = {
      winner: PlayerStore.getById(ids.winner),
      loser: PlayerStore.getById(ids.loser)
    }

    MatchActions.create(attrs);
  }
});

module.exports = MatchNew;
