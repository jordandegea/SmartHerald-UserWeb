import React from "react";
import Router, { Link, RouteHandler } from "react-router";

import {Navbar, Nav, NavItem, NavDropdown, MenuItem, ProgressBar} from "react-bootstrap";
import $ from "jQuery";
import classNames from "classnames";
import Parse from "parse";
import ParseReact from "parse-react";
import cookie from 'react-cookie';



var HomePage = React.createClass({
   mixins: [Router.Navigation],
  
  componentWillMount: function() {
    this.setState({Height: $(window).height()});
  },

  componentDidMount: function() {
    var self = this;
    if ( this.state.company ){
      var canonicalName = this.state.company;
      var query = new Parse.Query('Service');
      query.equalTo("canonicalName", canonicalName);
      query.first({
        success: function(object) {
          Parse.Cloud.run(
            'subscribe', 
            { 
              serviceId: object.id
            }).then(
            function(result) {
              alert("Subscription success")
              self.forceUpdate();
            },
            function(error){
              alert("Subscription failed: server said '"+error.message+"'");
            }
          );
          cookie.remove('companyAutoSubscribe', { path: '/' });
        },
        error: function(error) {
          alert("Error: " + error.code + " " + error.message);
        }
      });
    }
  },

  componentWillUnmount: function(){
    
    $(window).unbind('resize',this.adjustResize);

  },

  getInitialState: function(){
    
    if ( Parse.User.current() == null ){
      this.transitionTo('login', {});
    }
      
    return {
      uiElementsCollapsed: true,
      chartsElementsCollapsed: true,
      multiLevelDropdownCollapsed: true,
      thirdLevelDropdownCollapsed: true,
      samplePagesCollapsed: true,
      company: cookie.load('companyAutoSubscribe')
    };

  },

  toggleMenu: function(){
    if($(".navbar-collapse").hasClass('collapse')){
      $(".navbar-collapse").removeClass('collapse');  
    }
    else{
      $(".navbar-collapse").addClass('collapse');
    }
  },


  render: function() {

    return (
        <div id="wrapper" className="content">
          <Navbar fluid={true}  style={ {margin: 0} }>
            <Navbar.Header>
              <Navbar.Brand>
                <span><img src={require('../../../common/img/logo.png')} alt="SharedNews" title="SharedNews" />
                <span>&nbsp;Shared News</span>
                <span className="hidden-xs"> - <Link to="dashboard.services">User Dashboard</Link></span>
                </span>
              </Navbar.Brand>
              <Navbar.Toggle/>
            </Navbar.Header>
            <Navbar.Collapse>
            <ul className="nav navbar-top-links navbar-right">
              <Nav style={ {margin: 0} }>
                <NavItem>
                  <span onClick={(event) => {event.preventDefault();window.open("https://itunes.apple.com/fr/app/shared-news/id1099585519?mt=8");}}>
                  <i className="fa fa-apple fa-fw"></i>AppStore</span>
                </NavItem>
                <NavItem>
                  <span onClick={(event) => {event.preventDefault();window.open("https://itunes.apple.com/fr/app/shared-news/id1099585519?mt=8");}}>
                  <i className="fa fa-android fa-fw"></i>GooglePlay</span>
                </NavItem>
                <NavItem>{Parse.User.current().attributes.username}</NavItem>
              </Nav>
            </ul> 
            <div className="navbar-default sidebar" style={ { 'marginLeft': '-30px' } } role="navigation">
              <div className="sidebar-nav navbar-collapse">
                <ul className="nav in" id="side-menu">
                  <li>
                    <Link to="dashboard.services"><i className="fa fa-dashboard fa-fw"></i> &nbsp;Services</Link>
                  </li>
                  <li>
                    <Link to="dashboard.serviceadd"><i className="fa fa-plus fa-fw"></i> &nbsp;Add a service</Link>
                  </li>
                  <li>
                    <Link to="logout"><i className="fa fa-sign-out fa-fw"></i> Logout</Link>
                  </li>
                </ul>
              </div>
            </div>
            </Navbar.Collapse>
          </Navbar>

          <div id="page-wrapper" className="page-wrapper" ref="pageWrapper" style={{minHeight: this.state.Height}}>
            <RouteHandler {...this.props} />
          </div>

        </div>

    );
  },

  statics: {
    fetchData: function(params) {
      }
  }
  
});

export default HomePage;
