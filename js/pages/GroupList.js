var React = require('react');
var Header = require('../components/Header');
var GroupNew = require('../components/GroupNew');
var GroupList = require('../components/GroupList');
var GroupStore = require('../stores/GroupStore');
var AuthApi = require('../api/AuthApi');

var GroupListPage = React.createClass({

  statics: {
    willTransitionTo: function (transition) {
      if (!AuthApi.getAuth()) {
        transition.redirect('/login', {}, {'nextPath': transition.path});
      }
    }
  },

  getState: function() {
    return {
      auth: AuthApi.getAuth(),
      groups: GroupStore.getAll() || {}
    }
  },

  getInitialState: function() {
    return this.getState();
  },

  componentDidMount: function() {
    GroupStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    GroupStore.removeChangeListener(this._onChange);
  },

  render: function() {
    return (
      <div>
        <Header user={this.state.auth}/>
        <div className="ld-container">
          <GroupList groups={this.state.groups}/>
          <GroupNew/>
        </div>
      </div>
    );
  },

  _onChange: function() {
    this.setState(this.getState());
  },

});

module.exports = GroupListPage;
