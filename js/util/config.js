var firebaseRoot = function() {
  if (window.ENV === 'development') {
    return 'https://ladderdev.firebaseio.com';
  }
  return 'https://ladderapp.firebaseio.com';
}

module.exports = {
  firebaseRoot: firebaseRoot
}
