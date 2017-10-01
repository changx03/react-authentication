import React from "react";
import ReactDom from "react-dom";
import HomePage from "./components/home-page.jsx";
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
// import { browserHistory, Router } from 'react-router';

ReactDom.render(
    <MuiThemeProvider muiTheme={getMuiTheme()}>
        <HomePage />
    </MuiThemeProvider>, document.getElementById("app")
);
