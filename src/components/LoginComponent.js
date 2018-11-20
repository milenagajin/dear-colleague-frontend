import React, { Component } from "react";
import "./css/Login.css";
import AuthService from "../services/AuthService";

class Login extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.auth = new AuthService();
  }
  //if we are already logged in we want to redirect user to homepage
  componentWillMount() {
    if (this.auth.loggedIn()) this.props.history.replace("/");
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleFormSubmit(e) {
    e.preventDefault();
    console.log("usla");
    this.auth
      .login(this.state.email, this.state.password)
      .then(res => {
        // console.log("usla");
        this.props.history.replace("/");
      })
      .catch(err => {
        alert(err);
      });
  }

  render() {
    return (
      <div className="center">
        <div className="card">
          <h1>Login</h1>
          <form>
            <input
              className="form-item"
              placeholder="Email goes here..."
              name="email"
              type="text"
              onChange={this.handleChange}
            />
            <input
              className="form-item"
              placeholder="Password goes here..."
              name="password"
              type="password"
              onChange={this.handleChange}
            />
            <input
              className="form-submit"
              value="SUBMIT"
              type="submit"
              onClick={this.handleFormSubmit}
            />
          </form>
        </div>
      </div>
    );
  }
}

export default Login;
