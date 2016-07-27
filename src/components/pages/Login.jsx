/* global Parse */

import React from 'react';
import Router from 'react-router';
import {Panel, Input, Button} from 'react-bootstrap';
import Parse from "parse"
import cookie from 'react-cookie';


var LoginPage = React.createClass({

  getInitialState: function(){
    return {
      loginID: '',
      password: '',
      email: '',
      isSubmitted: false,
      register: false,
      company: cookie.load('companyAutoSubscribe')
    };
  },

  componentDidMount(){
    if (this.props.query.hasOwnProperty("company")){
      var company = this.props.query.company ;
      cookie.save('companyAutoSubscribe', company, { path: '/' });
      this.setState({ company: company });
    }
  },


  mixins: [Router.Navigation],

  render: function(){
  
    return <div className="col-md-4 col-md-offset-4">

        <div className="text-center">
          <h1 className="login-brand-text">Shared News: User Web Application</h1>
          <h3 className="text-muted">Created by <a href="http://sinenco.com">sinenco.com</a></h3>
        </div>

        <Panel header={<h3>Please Sign In</h3>} className="login-panel">

          <form role="form" onSubmit={this.handleLogin}>
            <fieldset>
              <div className="form-group">
                <Input 
                    onChange={this.setLoginID} className="form-control" 
                    autoComplete={"off"} autoCorrect={"off"} 
                    autoCapitalize={"off"} spellCheck={false} 
                    placeholder="Username" ref="loginID" 
                    type="text" autofocus="" 
                    name="username" step="true"  />
              </div>

              <div className="form-group">
                <Input onChange={this.setPassword} className="form-control" placeholder="Password" ref="password" type="password" name="password" />
              </div>

              <div className={this.state.register ? 'form-group' :'hidden' }>
                <Input onChange={this.setEmail} className="form-control" placeholder="Email" ref="email" type="email" name="email" />
              </div>

              <Input type="checkbox" label="Remember Me" />
              <Button type="submit" onClick={this.setLoginState} name="login" bsSize="large" bsStyle="success" block>Login</Button>
              <Button type="submit" onClick={this.setRegisterState} name="register" bsSize="large" bsStyle="primary" block>Register</Button>
              
            </fieldset>
          </form>

        </Panel>
        
      </div>
      

  },

  setRegisterState: function(e) {
    this.setState({
      register:true
    });
  },

  setLoginState: function(e) {
    this.setState({
      register:false
    });
  },

  setLoginID: function(e) {
    this.setState({
      loginID: e.target.value,
      loginError: ''
    });
  },

  setPassword: function(e) {
    this.setState({
      password: e.target.value,
      loginError: ''
    });
  },

  setEmail: function(e) {
    this.setState({
      email: e.target.value,
      loginError: ''
    });
  },

  formFillSucceed: function(e){
    this.transitionTo('dashboard');
  },

  handleLogin: function(e){
    
    e.stopPropagation();
    e.preventDefault();

    var self = this;
    console.log(this.state);
    if ( this.state.register ){
      if (this.state.email != ''){
        var user = new Parse.User();
        user.set("username", this.state.loginID);
        user.set("password", this.state.password);
        user.set("email", this.state.email);

        user.signUp(null, {
          success: function(user) {
            self.formFillSucceed();
          },
          error: function(user, error) {
            alert("Error: " + error.code + " " + error.message);
          }
        });
      }else{
        alert("email missing");
      }
    }else{
      Parse.User.logIn(this.state.loginID, this.state.password, {
        success: function(user) {
          self.formFillSucceed();
        },
        error: function(user, error) {
            console.log(error);
        }
      });
    }

  }

});

export default LoginPage;