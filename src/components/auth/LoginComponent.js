import React, { Component } from "react";
import "../css/Login.css";
import AuthService from "../../services/AuthService";

class Login extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }
  //if we are already logged in we want to redirect user to homepage
  componentWillMount() {
    if (AuthService.loggedIn()) this.props.history.replace("/");
  }

  async handleChange(e) {
    await this.setState({
      [e.target.name]: e.target.value
    });
    console.log(this.state);
  }

  handleFormSubmit = async e => {
    e.preventDefault();
    await AuthService.login(this.state.email, this.state.password);
    this.props.history.push("/");
  };

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
