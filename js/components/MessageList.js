var React = require('react');
var MessageStore = require('../stores/MessageStore');

var MessageList = React.createClass({

  getInitialState: function() {
    return this.getState();
  },

  getState: function() {
    return {
      messages: MessageStore.getMessages()
    };
  },

  componentDidMount: function() {
    MessageStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    MessageStore.removeChangeListener(this._onChange);
  },

  render: function() {
    var messages = this.state.messages;
    var messageRows = [];

    for (var key in messages) {
      messageRows.push(<div key={key} className="ld-alert">{messages[key]}</div>);
    }
    return (<div>
      {messageRows}
      </div>);
  },

  _onChange: function() {
    this.setState(this.getState());
  },

});

module.exports = MessageList;
