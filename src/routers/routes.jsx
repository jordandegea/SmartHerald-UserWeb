import React from "react";
import { Router, Route, DefaultRoute, RouteHandler, Redirect } from "react-router";

import BaseLayout from "../components/layouts/Base";
import DashboardLayout from "../components/layouts/Dashboard";

import DashboardServicesListPage from "../components/pages/dashboard/ServicesList";
import DashboardServiceAddPage from "../components/pages/dashboard/ServiceAdd";
import DashboardMessagesListPage from "../components/pages/dashboard/MessagesList";
import LoginPage from "../components/pages/Login";
import LogoutPage from "../components/pages/Logout";

var Routes = React.createClass({

  statics: {
    getRoutes: function() {
      return (
          <Route name="base" path="/" handler={BaseLayout}>
            <Route name="dashboard" path="/dashboard" handler={DashboardLayout}>
              <Route name="dashboard.services" path="/services" handler={DashboardServicesListPage} />
              <Route name="dashboard.serviceadd" path="/service_add" handler={DashboardServiceAddPage} />
              <Route name="dashboard.messages" path="/messages/:service" handler={DashboardMessagesListPage} />
              <DefaultRoute name="dashboard.default" handler={DashboardServicesListPage} />
            </Route>
            <Route name="login" path="/login" handler={LoginPage} />
            <Route name="logout" path="/logout" handler={LogoutPage} />
            <DefaultRoute name="default" handler={DashboardLayout} />
            <Redirect from="/" to="login" />
          </Route>
      );
    }
  },
  render: function() {
  
  }
  
});

export default Routes;