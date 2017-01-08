var app = document.getElementById('app');

var React = require('react');
var ReactDOM = require('react-dom');

var HelloWorld = React.createClass({
  render: function() {
    return (
      <div> Hello World </div>
    );
  }
});

ReactDOM.render(
  <HelloWorld />,
  app
);
