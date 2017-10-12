import React from 'react';
import PropTypes from 'prop-types';
import { Switch, Route, Redirect } from 'react-router-dom';
import Auth from '../modules/Auth';
import DashboardPage from '../containers/DashboardPage.jsx';
import HomePage from '../components/HomePage.jsx';
import LoginPage from '../containers/LoginPage.jsx';
import NotFoundPage from '../components/NotFoundPage.jsx';
import SignUpPage from '../containers/SignUpPage.jsx';

function AppRoute() {
  return (
    <Switch>
      <Route exact path="/" component={HomePage} />
      <Route path="/signup" component={SignUpPage} />
      <Route path="/login" component={LoginPage} />
      <Route
        path="/logout"
        component={() => {
          Auth.deauthenticateUser();
          return <Redirect to={{ pathname: '/' }} />;
        }}
      />
      <PrivateRoute path="/dashboard" />
      <Route component={NotFoundPage} />
    </Switch>
  );
}

function PrivateRoute({ path }) {
  return (
    <Route
      {...path}
      render={props =>
        (Auth.isUserAuthenticated() ? (
          <DashboardPage {...props} />
        ) : (
          <Redirect to={{ pathname: '/login' }} />
        ))}
    />
  );
}

PrivateRoute.propTypes = {
  path: PropTypes.string.isRequired
};

export default AppRoute;
