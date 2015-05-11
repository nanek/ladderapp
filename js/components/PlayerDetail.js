var React = require('react');

var PlayerDetail = React.createClass({
  render: function() {
    return (
      <div>
        <h1>Player: {this.props.name}</h1>
        <ul>
        </ul>
      </div>
    )
  }
});

module.exports = PlayerDetail;
