import React from 'react';
import ReactDom from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import injectTapEventPlugin from 'react-tap-event-plugin';
import { BrowserRouter, Switch, Route, BrowserRouter as Router, Redirect } from 'react-router-dom';
import Base from './components/Base';
import HomePage from './components/HomePage';
import LoginPage from './containers/LoginPage';
import SignUpPage from './containers/SignUpPage';
import Auth from './modules/Auth';
import DashboardPage from './containers/DashboardPage';

injectTapEventPlugin();

ReactDom.render(
  <BrowserRouter>
    <MuiThemeProvider muiTheme={getMuiTheme()}>
      <Base>
        <Switch>
          <Route exact path="/" component={Auth.isUserAuthenticated() ? DashboardPage : HomePage} />
          <Route path="/signup" component={SignUpPage} />
          <Route path="/login" component={LoginPage} />
          <Route
            path="/logout"
            component={() => {
              Auth.deauthenticateUser();
              return (
                <Redirect
                  to={{
                    pathname: '/'
                  }}
                />
              );
            }}
          />
        </Switch>
      </Base>
    </MuiThemeProvider>
  </BrowserRouter>,
  document.getElementById('app')
);
