import React, { Component } from "react";
import AuthService from "../../services/AuthService";

class RegisterComponent extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  componentDidMount() {
    if (AuthService.loggedIn()) this.props.history.replace("/");
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  async handleFormSubmit(e) {
    e.preventDefault();
    await AuthService.register(this.state.name, this.state.email, this.state.password);
    this.props.history.replace("/campaigns");
  }

  render() {
    return (
      <div className="center">
        <div className="card">
          <h1>Register</h1>
          <form>
            <input
              className="form-item"
              placeholder="Name goes here..."
              name="name"
              type="text"
              onChange={this.handleChange}
            />
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

export default RegisterComponent;
