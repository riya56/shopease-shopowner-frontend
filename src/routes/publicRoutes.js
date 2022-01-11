import React, { Suspense, lazy } from "react";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import PrivateRoute from "./privateRoutes";
import Login from "../components/Login/Login";
import Register from "../components/Register/Register.jsx";
import Dashboard from "../components/Dashboard/Dashboard"

import VerifyEmail from "../components/VerifyEmail/VerifyEmail";
import EnterEmail from "../components/ResetPassword/EnterEmail";
import ResetPassword from "../components/ResetPassword/ResetPassword";

const Routes = (props) => (
  <Router>
    <Switch>
      {/* <Route path="/resetpassword/:token" exact component={ResetPassword} /> */}
      
      <Route path="/register" exact component={Register} />
      <Route path="/login" exact component={Login} />
      <Route path="/api/password-reset/:uidb64/:token" exact component={ResetPassword} />
      <Route path="/password-reset-email" exact component={EnterEmail} />
      <Route path="/email-verify/:token" exact component={VerifyEmail} />
      <Route path="/" exact component={Login} />
      <PrivateRoute
        path="/"
        component={Dashboard}
      />


    </Switch>
  </Router>
);

export default Routes;
