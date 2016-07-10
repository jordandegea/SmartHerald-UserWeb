/**
 * App entry point
 */

// Polyfill

import "babel-core/polyfill";

// Libraries
import React from "react";
import Router from "react-router";
import Parse from "parse";
import ParseReact from "parse-react";
import ReactDOM from "react-dom";


// Base styling
import "./common/styles/app.less";

// Routers
import Routes from "./routers/Routes";


// ID of the DOM element to mount app on
const DOM_APP_EL_ID = "app";

// Initialize routes depending on session
let routes;

routes = Routes.getRoutes();

/**
 * Given a set of routes and params associated with the current active state,
 * call #fetchData(params) on all Route Handlers that define that static method.
 *
 * This is the main mechanism by which a route handler (page)
 * requests its data.
 *
 * @example Defining a route handler that requests data
 *
 *  var SomePage = React.createClass({
 *    statics: {
 *      fetchData(params) {
 *        return getData({
 *          data: {...}
 *        })
 *      }
 *    }
 *  })
 *
 *  Given a Route handler:
 *    <Route name="some-page" handler={SomePage} />
 *
 *  when it becomes activated, it will be passed a {data} prop containing the response:
 *    <SomePage data="..." />
 *
 *
 * @param  {[Route]} routes list of activated routes
 * @param  {[Param]} params route params
 *
 * @return {Promise}        data containing responses mapped by route name
 */
/*
let fetchData = function(routes, params) {
  let data = {};

  return Promise.all(routes
    .filter(route => route.handler.fetchData)
    .map(route => {
      return route.handler.fetchData(params).then(resp => {
        data[route.name] = resp;
        data.tag = route.name;
      })
    })
  ).then(() => data);
}*/



Parse.initialize("com.sinenco.sharednews", "com.sinenco.sharednews");
//Parse.serverURL = "http://localhost/parse";
Parse.serverURL = "http://dev.shared-news.com/parse";
Parse.User.current();

//Parse.initialize("com.sinenco.sharednews", "Q4RYKBphoPHRSM6ZKRztYFjpvAMte563cyx88xtb");
//Parse.serverURL = "http://parseserver-8vd82-env.us-west-2.elasticbeanstalk.com/parse"
//
// Start the router
Router.run(routes, Router.HashLocation, function(Handler) {
  ReactDOM.render(<Handler />, document.getElementById(DOM_APP_EL_ID));
});
