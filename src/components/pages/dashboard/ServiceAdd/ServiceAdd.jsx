/* global CounterPart */

import React, { PropTypes, Component } from 'react';

import Router, { Link, RouteHandler } from "react-router";

import {Pagination, FormGroup, FormControl, Panel, Well, Button, PageHeader} from "react-bootstrap";

import StatWidget from "../../../common/StatWidget.js";

import Parse from "parse";
import ParseReact from "parse-react";

import CounterPart from 'counterpart';
import Translate from 'react-translate-component';
import {IntlMixin, FormattedRelative}  from 'react-intl';


var ServiceAddBlock = React.createClass({
  mixins: [IntlMixin], // Enable query subscriptions
  
  getInitialState() {
    return {
      nbResults : 0,
      results: []
    };
  },
      
  

  onChangedText: function(e){

    var self = this ; 
    var canonicalName = e.target.value;
    canonicalName = canonicalName.toLowerCase();
    canonicalName = canonicalName.replace(" ","+");
    if (canonicalName.length > 2){
      var query = new Parse.Query('Service');
      query.contains("canonicalName", canonicalName);
      query.find({
        success: function(results) {
          self.state.results = results;
          self.forceUpdate();
        },
        error: function(error) {
          alert("Error: " + error.code + " " + error.message);
        }
      });
    }
  },
  
  onAdd : function(object){
    Parse.Cloud.run(
      'subscribe', 
      { 
        serviceId: object.id
      }).then(
      function(result) {
        alert("Subscription success")
      },
      function(error){
        alert("Subscription failed: server said '"+error.message+"'");
      }
    );

  },
  
  render: function() {
    // Render the menu with all the services available
    this.state.nbResults = this.state.results.length; 
    
    var odd = true ;
    
    return (
        <div className="col-lg-12 text-center"> 
        <input onChange={this.onChangedText} type="text" className="form-control" placeholder="Search..." />
                      
          {
            this.state.results.map(function(c) {
            
              var boundClick = this.onAdd.bind(this, c);
              console.log(c);
              return (<div style={ {'marginTop':'10px', 'borderStyle': 'solid', 'borderColor':'#CCC', 'borderWidth':'1px 0px 0px 0px'} }>
                <div className="pull-right">
                  <a onClick={boundClick}><h1><i className="fa fa-plus fa-fw"></i></h1></a>
                </div>
                
                <h1>{c.get("name")}</h1>
                <small>{c.get("description")}</small>
                
                </div>);
            }, this)
          }
        </div>

      
    );
  }
});

var ServiceAdd = React.createClass({

  render: function() {
    return (
      <div>

        <div className="row">
            <PageHeader>
            Add a service
            </PageHeader>
        </div>
        <div className="row">    
          <ServiceAddBlock {...this.props} />
        </div>
      </div>
    );
  }

});

export default ServiceAdd;