var React = require('react');
window.React = React; // export for http://fb.me/react-devtools

var LadderApp = require('./components/LadderApp');
var MatchApi = require('./api/MatchApi');
var PlayerApi = require('./api/PlayerApi');

React.render(
  <LadderApp />,
  document.getElementById('react')
);

// Fetch initial data.
MatchApi.list();
PlayerApi.list();
