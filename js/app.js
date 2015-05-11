var React = require('react');
window.React = React; // export for http://fb.me/react-devtools

var MainPage = require('./pages/Main');
var MatchApi = require('./api/MatchApi');
var PlayerApi = require('./api/PlayerApi');

React.render(
  <MainPage />,
  document.getElementById('react')
);

// Fetch initial data.
MatchApi.list();
PlayerApi.list();
