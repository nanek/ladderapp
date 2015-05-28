var React = require('react');

var GroupListRow = React.createClass({
  render: function() {
    var group = this.props.group;
    return (
      <li>
        {group.name}
      </li>
    )
  }
});

var GroupList = React.createClass({

  render: function() {
    var groups = this.props.groups;
    var groupRows = [];

    for (var key in groups) {
      groupRows.push(<GroupListRow key={key} group={groups[key]} />);
    }

    return (
      <div className="ld-group-list ld-panel">
        <div className="ld-panel-title">Groups</div>
        <ul>
          {groupRows}
        </ul>
      </div>
    )
  }

});

module.exports = GroupList;
