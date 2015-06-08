var React = require('react');
var PureRenderMixin = require('react/addons').addons.PureRenderMixin;

var GroupListRow = React.createClass({
  mixins: [PureRenderMixin],

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
  mixins: [PureRenderMixin],

  render: function() {
    var groups = this.props.groups;
    var groupRows = [];

    groups.forEach(function(group){
      groupRows.push(<GroupListRow key={group.id} group={group} />);
    });

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
