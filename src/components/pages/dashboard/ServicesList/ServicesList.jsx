/* global CounterPart */

import React, { PropTypes, Component } from 'react';

import Router, { Link, RouteHandler } from "react-router";

import {Pagination, Panel, Well, Button, PageHeader} from "react-bootstrap";

import StatWidget from "../../../common/StatWidget.js";

import Parse from "parse";
import ParseReact from "parse-react";

import CounterPart from 'counterpart';
import Translate from 'react-translate-component';
//import {IntlMixin, FormattedRelative}  from 'react-intl';


var ServicesListBlock = React.createClass({
  //mixins: [IntlMixin], // Enable query subscriptions
  
  componentDidMount(){
    var self = this;
    var query = new Parse.Query('Subscription');
    query.equalTo("user", Parse.User.current());
    query.include("service");
    query.find({
      success: function(results) {
        self.state.services = results;
        self.forceUpdate();
      },
      error: function(error) {
        alert("Error: " + error.code + " " + error.message);
      }
    });

  },

  getInitialState() {
    
    return {
      nbResults : 0,
      services : []
    };
  },
  
  render: function() {
    // Render the menu with all the services available
    this.state.nbResults = this.state.services.length; 
    
    var odd = true ;
    
    return (
        <div className="col-lg-12 text-center"> 
          {
            this.state.services.map(function(c) {
            
              var service = c.get("service");
              //var boundClick = this.onEditButton.bind(this, c.objectId);
              
              return (<div style={ {'marginTop':'10px', 'borderStyle': 'solid', 'borderColor':'#CCC', 'borderWidth':'1px 0px 0px 0px'} }>
                <div className="pull-right">
                  <Link to="dashboard.messages" params={{ "service": service.id }}  >
                    <h1><i className="fa fa-arrow-right fa-fw"></i></h1>
                  </Link>
                </div>
                <h1>{service.get("name")}</h1>
                <small>{service.get("description")}</small>
                </div>);
            }, this)
          }
        </div>

      
    );
  },
  
  onEditButton : function(objectId){
    //console.log(objectId);
  }
});

var ServicesList = React.createClass({

  render: function() {
    return (
      <div>

        <div className="row">
            <PageHeader>
            Services
            <div className="pull-right">
              <Link to="dashboard.serviceadd"><i className="fa fa-plus fa-fw"></i></Link>
            </div>
            </PageHeader>
        </div>
        <div className="row">    
          <ServicesListBlock {...this.props} />
        </div>
      </div>
    );
  }

});

export default ServicesList;