var React = require('react');
var moment = require('moment');
var PureRenderMixin = require('react/addons').addons.PureRenderMixin;

var MatchListRow = React.createClass({
  mixins: [PureRenderMixin],

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
  mixins: [PureRenderMixin],

  render: function() {
    var matches = this.props.allMatches;
    var matchRows = [];

    matches.forEach(function(match){
      matchRows.push(<MatchListRow key={match.hashCode()} match={match} />);
    });

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
