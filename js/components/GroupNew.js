var React = require('react');
var GroupActions = require('../actions/GroupActions');
var MessageActions = require('../actions/MessageActions');

var GroupNew = React.createClass({
  render: function() {
    return (
      <div className="ld-group-new ld-panel">
        <div className="ld-panel-title">Create new group</div>
        <input ref="name" />
        <button className="ld-button" type="button" onClick={this.handleSubmit}>Create</button>
      </div>
    )
  },

  handleSubmit: function(e) {
    e.preventDefault()

    var attrs = {
      name: this.refs.name.getDOMNode().value
    };

    if (attrs.name === '') {
      return MessageActions.create('Group name cannot be blank.');
    };

    GroupActions.create(attrs);
  }
});

module.exports = GroupNew;
