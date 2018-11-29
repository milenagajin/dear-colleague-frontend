import React, { Component } from "react";
import { Link } from "react-router-dom";
import AuthService from "../services/AuthService";

const Auth = new AuthService();

class NavbarScreen extends Component {
  handleLogout() {
    Auth.logout();
    this.props.history.replace("/login");
  }
  render() {
    return (
      <div className="container-fluid">
        <nav className="navbar navbar-expand-lg navbar-light bg-warning">
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ml-auto topnav">
              <li className="nav-item active">
                <Link className="nav-link" to="/campaigns">
                  Campaigns <span className="sr-only">(current)</span>
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/campaigns/add">
                  Add campaign
                </Link>
              </li>
              <li className="nav-item">
                <button
                  type="button"
                  className="btn btn-light"
                  onClick={() => this.handleLogout()}
                >
                  Logout
                </button>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    );
  }
}
export default NavbarScreen;
