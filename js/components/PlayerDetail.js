var React = require('react');

var PlayerDetail = React.createClass({
  render: function() {
    return (
      <div className="ld-player-detail ld-panel">
        <ul className="ld-player-detail-info">
          <li>
            <label>Name:</label>{this.props.name}
          </li>
        </ul>
      </div>
    )
  }
});

module.exports = PlayerDetail;
