var React = require('react');
var Router = require('react-router');
var Reflux = require('reflux');
import Parse from "parse";
import ParseReact from "parse-react";

var LogoutPage = React.createClass({
    
  mixins: [Router.Navigation],

  componentWillMount: function(){

    Parse.User.logOut();
    this.transitionTo('login', {});
  },
  

  render: function(){
  		return <div></div>;
  }

});

export default LogoutPage;