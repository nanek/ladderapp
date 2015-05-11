var React = require('react');

var LeaderBoardRow = React.createClass({
  render: function() {
    var player = this.props.player;
    return (
      <tr>
        <td>
          {this.props.rank}
        </td>
        <td>
          {player.name}
        </td>
        <td>
          {player.wins}
        </td>
        <td>
          {player.losses}
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
      <div className="leaderboard">
        <h1>Leader Board</h1>
        <table>
          <tr>
            <td>Rank</td>
            <td>Name</td>
            <td>Wins</td>
            <td>Losses</td>
          </tr>
          {players}
        </table>
      </div>
    )
  }

});

module.exports = LeaderBoard;
