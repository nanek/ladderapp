var React = require('react');

var MatchListRow = React.createClass({
  render: function() {
    var match = this.props.match;
    return (
      <tr>
        <td>
          {match.createdAt}
        </td>
        <td>
          {match.winner.name}
        </td>
        <td>
          {match.loser.name}
        </td>
      </tr>
    )
  }
});

var MatchList = React.createClass({

  render: function() {
    var matches = this.props.allMatches;
    var matchRows = [];

    for (var key in this.props.allMatches) {
      matchRows.push(<MatchListRow key={key} match={matches[key]} />);
    }

    return (
      <div>
        <h1>Recent Matches</h1>
        <table>
          <tr>
            <td>Date</td>
            <td>Winner</td>
            <td>Loser</td>
          </tr>
          {matchRows}
        </table>
      </div>
    )
  }

});

module.exports = MatchList;
