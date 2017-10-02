import React from 'react';
import ReactDom from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import SignUpPage from './containers/signup-page.jsx';
import HomePage from './components/home-page.jsx';
import Base from './components/base.jsx';

ReactDom.render(
  <MuiThemeProvider muiTheme={getMuiTheme()}>
    <BrowserRouter>
      <Base>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/signup" component={SignUpPage} />
        </Switch>
      </Base>
    </BrowserRouter>
  </MuiThemeProvider>,
  document.getElementById('app'),
);
