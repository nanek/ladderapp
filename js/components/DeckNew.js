var React = require('react');
var PlayerActions = require('../actions/PlayerActions');
var MessageActions = require('../actions/MessageActions');
var mtg = require('../util/mtg');

var DeckNew = React.createClass({
  render: function() {
    var colorInputs = [];

    mtg.COLORS.forEach(function(color) {
      var className = 'ld-mana-' + color;
      colorInputs.push(
        <div className="ld-deck-color-input" key={color}>
          <input ref={color} type="checkbox"/>
          <label htmlFor={color}><div className={className}/></label>
        </div>
      );
    });

    return (
      <div className="ld-deck-new ld-panel">
        <div className="ld-panel-title">Add Deck</div>
        <input ref="name" />
        {colorInputs}
        <button className="ld-button" type="button" onClick={this.handleSubmit}>Add Deck</button>
      </div>
    )
  },

  handleSubmit: function(e) {
    e.preventDefault()

    var attrs = {
      name: this.refs.name.getDOMNode().value,
      colors: {
        black: this.refs.black.getDOMNode().checked,
        blue: this.refs.blue.getDOMNode().checked,
        green: this.refs.green.getDOMNode().checked,
        red: this.refs.red.getDOMNode().checked,
        white: this.refs.white.getDOMNode().checked
      }
    };

    if (attrs.name === '') {
      return MessageActions.create("Deck name cannot be blank.");
    };

    PlayerActions.addDeck(this.props.player.id, attrs);
  }
});

module.exports = DeckNew;
