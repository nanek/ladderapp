var React = require('react');
var moment = require('moment');

var MatchListRow = React.createClass({
  render: function() {
    var match = this.props.match;
    return (
      <li>
        {match.winner.name} ({match.winnerPoints}) beat {match.loser.name} ({match.loserPoints})
        <div className="ld-match-list-item-time">{moment(match.createdAt).fromNow()}</div>
      </li>
    )
  }
});

var MatchList = React.createClass({

  render: function() {
    var matches = this.props.allMatches;
    var matchRows = [];

    for (var key in matches) {
      matchRows.push(<MatchListRow key={key} match={matches[key]} />);
    }

    return (
      <div className="ld-match-list ld-panel">
        <div className="ld-panel-title">Recent Matches</div>
        <ul>
          {matchRows}
        </ul>
      </div>
    )
  }

});

module.exports = MatchList;
