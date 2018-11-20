import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import AuthService from "./services/AuthService";
import withAuthComponent from "./components/withAuthComponent";
const Auth = new AuthService();

class App extends Component {
  handleLogout() {
    Auth.logout();
    this.props.history.replace("/login");
  }
  render() {
    return (
      <div className="App">
        <div>
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
        </p>
      </div>
    );
  }
}
export default withAuthComponent(App);
