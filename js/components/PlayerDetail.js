var React = require('react');

var PlayerDetail = React.createClass({
  render: function() {
    return (
      <div className="ld-player-detail ld-panel">
        <ul className="ld-player-detail-info">
          <li>
            <label>Name:</label>{this.props.name}
          </li>
          <li>
            <label>Points:</label>{this.props.points}
          </li>
          <li>
            <label>Wins:</label>{this.props.wins}
          </li>
          <li>
            <label>Losses:</label>{this.props.losses}
          </li>
        </ul>
      </div>
    )
  }
});

module.exports = PlayerDetail;
