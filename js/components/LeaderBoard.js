var React = require('react');

var LeaderBoardRow = React.createClass({
  render: function() {
    var player = this.props.player;
    return (
      <tr>
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

    for (var key in this.props.allPlayers) {
      players.push(<LeaderBoardRow key={key} player={this.props.allPlayers[key]} />);
    }

    return (
      <div className="leaderboard">
        <h1>Leader Board</h1>
        <table>
          <tr>
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
