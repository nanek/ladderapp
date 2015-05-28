var AppDispatcher = require('../dispatcher/AppDispatcher');
var AuthApi = require('../api/AuthApi');
var GroupApi = require('../api/GroupApi');

var GroupActions = {

  create: function(attrs) {
    AppDispatcher.dispatch({
      actionType: 'GROUP_CREATE_REQUEST',
      attrs: attrs
    });

    attrs.createdByUserId = AuthApi.getAuth().uid;

    GroupApi.create(attrs);
  }

};

module.exports = GroupActions;
