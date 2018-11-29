import React, { Component } from "react";
import "./App.css";
import { Route, Switch, Redirect } from "react-router-dom";
import AddEditCampaignScreen from "./screens/AddEditCampaignScreen";
import LoginComponent from "./components/LoginComponent";
import CampaignScreen from "./screens/CampaignScreen";
import UserScreen from "./screens/UserScreen";
import AddEditUserScreen from "./screens/AddEditUserScreen";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Switch>
          <Route exact path="/login" component={LoginComponent} />
          <Route
            exact
            path="/campaigns/add"
            component={AddEditCampaignScreen}
          />
          <Route
            exact
            path="/campaigns/edit/:id"
            component={AddEditCampaignScreen}
          />
          <Route exact path="/campaigns" component={CampaignScreen} />
          <Route exact path="/campaigns/:id/users" component={UserScreen} />
          <Route
            exact
            path="/campaigns/:id/users/:user_id"
            component={AddEditUserScreen}
          />
          <Redirect from="/" to="/campaigns" />
        </Switch>

        {/* <div>
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome {this.props.user.email}</h2>
          </div>
          <p className="App-intro">
          <button
          type="button"
          className="form-submit"
          onClick={this.handleLogout.bind(this)}
          >
          Logout
          </button>
        </p> */}
      </div>
    );
  }
}

// App.propTypes = {
//   location: PropTypes.shape({
//     pathname: PropTypes.string.isRequired
//   }).isRequired
// };
export default App;
