import React, { Component } from "react";
import "../../components/css/Login.css";
import AuthService from "../../services/AuthService";
import { connect } from 'react-redux';
import { setActiveUser } from "../../store/actions/UserActions";

class LoginScreen extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }
  //if we are already logged in we want to redirect user to homepage
  componentDidMount() {
    // console.log(await AuthService.loggedIn(), 'login screen');
    if (AuthService.loggedIn()) this.props.history.replace("/");
  }
  
  async handleChange(e) {
    await this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleFormSubmit = async e => {
    e.preventDefault();
    const user = await AuthService.login(this.state.email, this.state.password);
    this.props.setActiveUser(user);
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
            <a href="/register">Or register?</a>
          </form>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  setActiveUser: user => dispatch(setActiveUser(user))
});


export default connect(
  null,
  mapDispatchToProps
)(LoginScreen);
