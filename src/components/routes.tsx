import * as React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from "react-router-dom";

import App from "./App";
import GamepadPlayground from "./GamepadPlayground";

export default () => (
  <Router>
    <div>
      <Route exact path="/" component={App} />
      <Route path="/gamepad" component={GamepadPlayground} />
    </div>
  </Router>
);
