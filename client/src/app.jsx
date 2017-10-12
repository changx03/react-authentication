import React from 'react';

import ReactDom from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import injectTapEventPlugin from 'react-tap-event-plugin';
import { BrowserRouter } from 'react-router-dom';
import Base from './components/Base.jsx';
import AppRoute from './route/AppRoute.jsx';

injectTapEventPlugin();

ReactDom.render(
  <BrowserRouter>
    <MuiThemeProvider muiTheme={getMuiTheme()}>
      <Base>
        <AppRoute />
      </Base>
    </MuiThemeProvider>
  </BrowserRouter>,
  document.getElementById('app')
);
