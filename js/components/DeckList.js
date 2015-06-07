var React = require('react');
var moment = require('moment');
var mtg = require('../util/mtg');

var DeckListRow = React.createClass({
  render: function() {
    var deck = this.props.deck;

    var colors = [];
    mtg.COLORS.forEach(function(color) {
      if (deck.colors[color] === true) {
        var className = 'ld-mana-' + color;
        colors.push(<div key={color} className={className}/>)
      }
    });

    return (
      <li>
        {deck.name} {colors}
      </li>
    )
  }
});

var DeckList = React.createClass({

  render: function() {
    var decks = this.props.player.decks;
    var deckRows = [];

    for (var key in decks) {
      deckRows.push(<DeckListRow key={key} deck={decks[key]} />);
    }

    return (
      <div className="ld-deck-list ld-panel">
        <div className="ld-panel-title">Decks</div>
        <ul>
          {deckRows}
        </ul>
      </div>
    )
  }

});

module.exports = DeckList;
