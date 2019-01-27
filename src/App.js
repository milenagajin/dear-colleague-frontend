import React, { Component } from "react";
import "./App.css";
import { Route, Switch, Redirect } from "react-router-dom";
import AddEditCampaignScreen from "./screens/campaign/AddEditCampaignScreen";
import LoginComponent from "./components/auth/LoginComponent";
import CampaignScreen from "./screens/campaign/CampaignScreen";
import UserScreen from "./screens/user/UserScreen";
import AddEditUserScreen from "./screens/user/AddEditUserScreen";
import RegisterComponent from "./components/auth/RegisterComponent";
import MagicLinkScreen from "./screens/auth/MagicLinkScreen";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Switch>
          <Route exact path="/login" component={LoginComponent} />
          <Route exact path="/register" component={RegisterComponent} />
          <Route
            exact
            path="/campaigns/add"
            component={AddEditCampaignScreen}
          />
          <Route
            exact
            path="/campaigns/edit/:campaignId"
            component={AddEditCampaignScreen}
          />
          <Route exact path="/campaigns" component={CampaignScreen} />
          <Route
            exact
            path="/campaigns/:campaignId/users"
            component={UserScreen}
          />
          <Route
            exact
            path="/campaigns/:campaignId/users/:userId"
            component={AddEditUserScreen}
          />
          <Route
            exact
            path="/campaigns/:campaignId/user"
            component={MagicLinkScreen}
          />
          <Redirect from="/" to="/campaigns" />
        </Switch>
      </div>
    );
  }
}

export default App;
