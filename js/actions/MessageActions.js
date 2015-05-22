var AppDispatcher = require('../dispatcher/AppDispatcher');

var MessageActions = {

  create: function(msg) {
    AppDispatcher.dispatch({
      actionType: 'MESSAGE_CREATE',
      msg: msg
    });
  }

};

module.exports = MessageActions;
