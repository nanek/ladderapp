var React = require('react');
var MatchActions = require('../actions/MatchActions');
var MessageActions = require('../actions/MessageActions');
var PlayerStore = require('../stores/PlayerStore');
var PureRenderMixin = require('react/addons').addons.PureRenderMixin;

var MatchNew = React.createClass({
  mixins: [PureRenderMixin],

  render: function() {
    var players = this.props.allPlayers;
    var options = [];

    players.forEach(function(player) {
      options.push(<option key={player.id} value={player.id}>{player.name}</option>);
    });

    return (
      <div className="ld-match-new ld-panel">
        <div className="ld-panel-title">Add Match</div>

        <select ref="winner">
          <option value="">Select Winner</option>
          {options}
        </select>

        <select ref="loser">
          <option value="">Select Loser</option>
          {options}
        </select>

        <button className="ld-button" type="button" onClick={this.handleSubmit}>Add Match</button>
      </div>
    )
  },

  handleSubmit: function(e) {
    e.preventDefault()

    var ids = {
      winner: this.refs.winner.getDOMNode().value,
      loser: this.refs.loser.getDOMNode().value
    };

    if (ids.winner === "" || ids.loser === "" ) {
      return MessageActions.create("You must select a winner and a loser.");
    }

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
