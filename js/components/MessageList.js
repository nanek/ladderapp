var React = require('react');
var MessageStore = require('../stores/MessageStore');
var PureRenderMixin = require('react/addons').addons.PureRenderMixin;

var MessageList = React.createClass({
  mixins: [PureRenderMixin],

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

    messages.forEach(function(message) {
      messageRows.push(<div key={message.hashCode()} className="ld-alert">{message.text}</div>);
    });

    return (
      <div>
        {messageRows}
      </div>
    );
  },

  _onChange: function() {
    this.setState(this.getState());
  },

});

module.exports = MessageList;
