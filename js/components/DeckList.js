var React = require('react');
var moment = require('moment');
var mtg = require('../util/mtg');
var PlayerActions = require('../actions/PlayerActions');

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
      <li className="ld-deck-list-item">
        {deck.name} {colors}
        <div className="ld-deck-list-item-destroy" onClick={this.props.onDestroy} />
      </li>
    )
  }
});

var DeckList = React.createClass({

  render: function() {
    var decks = this.props.player.decks;
    var deckRows = [];

    for (var key in decks) {
      deckRows.push(<DeckListRow key={key} deck={decks[key]} onDestroy={this.destroy.bind(this, key)}/>);
    }

    return (
      <div className="ld-deck-list ld-panel">
        <div className="ld-panel-title">Decks</div>
        <ul>
          {deckRows}
        </ul>
      </div>
    )
  },

  destroy: function(deckId) {
    PlayerActions.removeDeck(this.props.player.id, deckId);
  }

});

module.exports = DeckList;
