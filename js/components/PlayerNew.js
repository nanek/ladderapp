var React = require('react');
var PlayerActions = require('../actions/PlayerActions');

var PlayerNew = React.createClass({
  render: function() {
    return (
      <div>
        <h2>Add Player</h2>
        <input ref="name" />
        <button type="button" onClick={this.handleSubmit}>Add Player</button>
      </div>
    )
  },

  handleSubmit: function(e) {
    e.preventDefault()

    var attrs = {
      name: this.refs.name.getDOMNode().value
    };

    PlayerActions.create(attrs);
  }
});

module.exports = PlayerNew;
