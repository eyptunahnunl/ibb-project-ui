import React from "react";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import MyNavbar from "../Navbar";
import Dashboard from "../Dashboard";
import Signin from "../../pages/Auth/Signin";
import SignUp from "../../pages/Auth/Signup";

export default function App() {
  return (
    <Router>
      <div>
        <MyNavbar />
        <div>
          <Switch>
              <Route path="/" exact component={Dashboard}/>
              <Route path="/signin" component={Signin}/>
              <Route path="/signup" component={SignUp}/>
          </Switch>
        </div>
      </div>
    </Router>
  );
}
