var React = require('react');
var Link = require('react-router').Link;

var LeaderBoardRow = React.createClass({
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
          {player.wins}
        </td>
        <td>
          {player.losses}
        </td>
        <td>
          {player.points}
        </td>
      </tr>
    )
  }
});

var LeaderBoard = React.createClass({

  render: function() {
    var players = [];
    var rank = 1;

    for (var key in this.props.allPlayers) {
      players.push(<LeaderBoardRow key={key} rank={rank} player={this.props.allPlayers[key]} />);
      rank++;
    }

    return (
      <div className="ld-leaderboard ld-panel">
        <div className="ld-panel-title">Leader Board</div>
        <table className="ld-table">
          <thead>
            <tr>
              <th>Rank</th>
              <th>Name</th>
              <th>Wins</th>
              <th>Losses</th>
              <th>Points</th>
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
