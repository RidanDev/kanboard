import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Dashboard from "./dashboard/dashboard";
import Signup from "./signup/signup";
import Login from "./login/login";

const App = () => (
  <BrowserRouter>
    <Switch>
      <Route path="/login" component={Login} />
      <Route path="/signup" component={Signup} />
      <Route path="/" component={Dashboard} />
    </Switch>
  </BrowserRouter>
);

export default App;
