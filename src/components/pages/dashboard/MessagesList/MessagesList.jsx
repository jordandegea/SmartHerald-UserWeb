/* global CounterPart */

import React, { PropTypes, Component } from 'react';

import Router, { Link, RouteHandler } from "react-router";

import {Pagination, Panel, Well, Button, PageHeader} from "react-bootstrap";

import StatWidget from "../../../common/StatWidget.js";

import Parse from "parse";
import ParseReact from "parse-react";
import ReactDOM from 'react-dom';
import RawHtml from "react-raw-html"


import CounterPart from 'counterpart';
import Translate from 'react-translate-component';
//import {IntlMixin, FormattedRelative}  from 'react-intl';


var Frame = React.createClass({

  render: function() {
    return <iframe style={ { 'width':'100%', 'padding':'0', 'borderWidth':'1px', 'height':'400px'} }/>;
    //return <iframe />;
  },
  componentDidMount: function() {
    this.renderFrameContents();
    this.call = 0; 
  },
  renderFrameContents: function() {
    var doc = this.getDOMNode().contentDocument
    if(doc.readyState === 'complete') {
       ReactDOM.render(this.props.children, doc.body);
    } else {
       setTimeout(this.renderFrameContents, 0);
    }
  },
  componentDidUpdate: function() {
    this.renderFrameContents();
    if (this.call <3){
      this.call++ ; 
    }else{
      ReactDOM.findDOMNode(this).scrollIntoView();
    }
  },
  componentWillUnmount: function() {
    React.unmountComponentAtNode(this.getDOMNode().contentDocument.body);
  }
});

var MessagesListBlock = React.createClass({
  mixins: [/*ParseReact.Mixin,IntlMixin,*/Router.Navigation], // Enable query subscriptions


  componentDidMount(){
    var self = this;
    var query = new Parse.Query('Message');
    query.equalTo("service", {__type: "Pointer",className: "Service",objectId: this.state.serviceId})
    query.find({
      success: function(results) {
        self.state.messages = results;
        self.forceUpdate();
      },
      error: function(error) {
        alert("Error: " + error.code + " " + error.message);
      }
    });
  },


  getInitialState() {

    if (!this.props.params.hasOwnProperty("service")){
      this.transitionTo("dashboard.services")
    }


    return {
      messages : [],
      serviceId : this.props.params.service,
      currentPage : 1,
      maxPage : 0,
      nbResults : 0,
      nbResultsPerPage : 10,
      content: "Select a message to see it"
    };
  },
  
  
  
  pageChangedHandler: function(event, selectedEvent) {
    this.setState({
      currentPage: selectedEvent.eventKey
    });
  },

  resultPerPageChangedHandler: function(event){
         this.setState({
           nbResultsPerPage: event.target.value
         });
  },

      
  onDisplayMessage: function(object){
    var content = object.get("content");

    content = content.replace("{$js_jquery}","http://code.jquery.com/jquery-3.1.1.min.js");
    content = content.replace("{$bootswatch_cerulean}", "https://cdnjs.cloudflare.com/ajax/libs/bootswatch/3.3.7/cerulean/bootstrap.min.css");
    content = content.replace("{$js_jquery3.1.1}","http://code.jquery.com/jquery-3.1.1.min.js");
    content = content.replace("{$bootstrap}","https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css");
    content = content.replace("{$js_bootstrap}","https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js");
    
    this.setState({
      content: content
    });
    this._div.scrollTop = 0
  },
  
  render: function() {
    // Render the menu with all the messages available

    this.state.nbResults = this.state.messages.length; 
    this.state.maxPage = Math.ceil(this.state.nbResults/this.state.nbResultsPerPage);

    var showing = (this.state.currentPage*this.state.nbResultsPerPage)- (this.state.nbResultsPerPage-1);
    if ( showing < 1 ){
      showing = 1 ; 
    }
    
    var to = this.state.currentPage*this.state.nbResultsPerPage ;
    if ( to > this.state.nbResults){
      to = this.state.nbResults;
    }
    
    var of = this.state.nbResults;
                    
    var displayedMessages = [];
    
    var k = 0;
    for ( var i = (showing-1) ; i < to ; i ++){
      displayedMessages[k++] = this.state.messages[i];
    }

    var odd = true ;
    
    return (
      <div>
        <div className="col-xs-12 col-md-6 text-center"> 
            {
              displayedMessages.map(function(c) {
                console.log(c);
                var boundClick = this.onDisplayMessage.bind(this, c);
                
                return (<div onClick={boundClick} style={ {'marginTop':'10px', 'borderStyle': 'solid', 'borderColor':'#CCC', 'borderWidth':'1px 0px 0px 0px'} }>
                <div className="pull-right">
                  <h2><i className="fa fa-eye fa-fw"></i></h2>
                </div>
                <h4>{c.get("summary")}</h4>
                <small>{c.updatedAt.toUTCString()}</small>
                </div>);


              }, this)
            }
            <div className="row">
              <div className="col-sm-6">
                <div className="dataTables_info" id="dataTables-example_info" role="status" aria-live="polite">
                  Showing {showing} to {to} of {of} entries
                </div>
              </div>
              <div className="col-xs-12" >
              <center>
                <Pagination activePage={this.state.currentPage}
                  items={this.state.maxPage} perPage={this.state.nbResultsPerPage} 
                  first={true} last={true}
                  prev={true} next={true}
                  onSelect={ this.pageChangedHandler } /> 
                          </center>
              </div>
               
            </div>
        </div>
        <div ref={(ref) => this._frame = ref} className="col-xs-12 col-md-6 text-center">
          <Frame>
            <div>
               <RawHtml.div>{this.state.content}</RawHtml.div>
            </div>
          </Frame>
        </div>

      </div>
    );
  },
  
  onEditButton : function(objectId){
    //console.log(objectId);
  }
});

var MessagesList = React.createClass({

  render: function() {
    return (
      <div>

        <div className="row">
          <div className="col-lg-12">
            <PageHeader>Messages</PageHeader>
          </div>
        </div>

        <div className="row">    
          <MessagesListBlock {...this.props} />
        </div>

      </div>
    );
  }

});

export default MessagesList;