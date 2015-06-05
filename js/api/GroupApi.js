var config = require('../util/config');
var ref = new Firebase(config.firebaseRoot() + '/groups');
var ServerActions = require('../actions/ServerActions');

var create = function(attrs) {
  var newGroupRef = ref.push();

  var newGroup = {
    id: newGroupRef.key(),
    name: attrs.name,
    type: 'private',
    createdByUserId: attrs.createdByUserId,
    createdAt: Firebase.ServerValue.TIMESTAMP
  };

  if (newGroup.type === 'private') {
    newGroup.authorizedUsers = {};
    newGroup.authorizedUsers[attrs.createdByUserId] = true;
  }

  newGroupRef.set(newGroup, function(err){
    if (err) {
      ServerActions.receiveGroupCreateError(err);
    }
  });
}

var init = function() {
  ref.orderByChild('createdAt')
    .on('child_added', function(snapshot) {
      ServerActions.receiveGroupCreateSuccess(snapshot.key(), snapshot.val());
  });
}

module.exports = {
  create: create,
  init: init
}
