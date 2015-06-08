var React = require('react');
var Link = require('react-router').Link;
var PureRenderMixin = require('react/addons').addons.PureRenderMixin;

var LeaderBoardRow = React.createClass({
  mixins: [PureRenderMixin],

  render: function() {
    var player = this.props.player;

    return (
      <tr>
        <td>
          {this.props.rank}
        </td>
        <td>
          <Link to="player" params={player}>{player.name}</Link>
        </td>
        <td>
          {player.points}
        </td>
        <td>
          {player.wins} - {player.losses}
        </td>
      </tr>
    )
  }
});

var LeaderBoard = React.createClass({
  mixins: [PureRenderMixin],

  render: function() {
    var players = [];
    var rank = 1;

    this.props.allPlayers.forEach(function(player) {
      players.push(<LeaderBoardRow key={player.id} rank={rank} player={player} />);
      rank++;
    });

    return (
      <div className="ld-leaderboard ld-panel">
        <div className="ld-panel-title">Leader Board</div>
        <table className="ld-table">
          <thead>
            <tr>
              <th>Rank</th>
              <th>Name</th>
              <th>Points</th>
              <th>Record</th>
            </tr>
          </thead>
          <tbody>
            {players}
          </tbody>
        </table>
      </div>
    )
  }

});

module.exports = LeaderBoard;
