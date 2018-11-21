import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { BrowserRouter as Router, Route } from "react-router-dom";
import LoginComponent from "./components/LoginComponent";
import Nav from "./components/Nav";
import "bootstrap/dist/css/bootstrap.min.css";
import RegisterComponent from "./components/RegisterComponent";
ReactDOM.render(
  <Router>
    <div>
      <Nav />
      <Route exact path="/" component={App} />
      <Route exact path="/login" component={LoginComponent} />
      <Route exact path="/register" component={RegisterComponent} />
      <Route exact path="/campaigns/:id" component={AddEditCampaignScreen} />
    </div>
  </Router>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
