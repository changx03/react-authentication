import React from 'react';
import ReactDom from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import injectTapEventPlugin from 'react-tap-event-plugin';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Base from './components/Base';
import HomePage from './components/HomePage';
import LogingPage from './containers/LoginPage';
import SignUpPage from './containers/SignUpPage';

injectTapEventPlugin();

ReactDom.render(
  <BrowserRouter>
    <MuiThemeProvider muiTheme={getMuiTheme()}>
      <Base>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/signup" component={SignUpPage} />
          <Route path="/login" component={LogingPage} />
        </Switch>
      </Base>
    </MuiThemeProvider>
  </BrowserRouter>,
  document.getElementById('app')
);
