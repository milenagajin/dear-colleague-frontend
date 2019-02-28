import React, { Component } from "react";
import "./App.css";
import { Route, Switch, Redirect } from "react-router-dom";
import AddEditCampaignScreen from "./screens/campaign/AddEditCampaignScreen";
import LoginComponent from "./screens/auth/LoginScreen";
import CampaignScreen from "./screens/campaign/CampaignScreen";
import UserScreen from "./screens/user/UserScreen";
import AddEditUserScreen from "./screens/user/AddEditUserScreen";
import RegisterComponent from "./screens/auth/RegisterScreen";
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
            key="new-campaign"
            component={AddEditCampaignScreen}
          />
          <Route
            exact
            path="/campaigns/edit/:campaignId"
            key="edit-campaign"            
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
