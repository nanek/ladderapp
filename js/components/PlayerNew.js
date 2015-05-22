var React = require('react');
var PlayerActions = require('../actions/PlayerActions');
var MessageActions = require('../actions/MessageActions');

var PlayerNew = React.createClass({
  render: function() {
    return (
      <div className="ld-player-new ld-panel">
        <div className="ld-panel-title">Add Player</div>
        <input ref="name" />
        <button className="ld-button" type="button" onClick={this.handleSubmit}>Add Player</button>
      </div>
    )
  },

  handleSubmit: function(e) {
    e.preventDefault()

    var attrs = {
      name: this.refs.name.getDOMNode().value
    };

    if (attrs.name === '') {
      return MessageActions.create("Player name cannot be blank.");
    };

    PlayerActions.create(attrs);
  }
});

module.exports = PlayerNew;
