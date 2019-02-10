import React from "react";
import { hot } from "react-hot-loader/root";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Home from "./Home";
import AsyncPage from "./AsyncPage";
import NoPage from "./NoPage";

const App = () => (
  <Router>
    <div>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/async" component={AsyncPage} />
        <Route component={NoPage} />
      </Switch>
    </div>
  </Router>
);

export default hot(App);
