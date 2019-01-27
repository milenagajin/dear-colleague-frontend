import React, { Component } from "react";
import AuthService from "../../services/AuthService";
import authService from "../../services/AuthService";

export default function withAuthComponent(AuthComponent) {
  return class AuthWrapped extends Component {
    constructor(props) {
      super(props);
      this.state = {
        user: null
      };
    }
    componentWillMount() {
      if (!AuthService.loggedIn()) {
        this.props.history.replace("/login");
      } else {
        try {
          const user = authService.getUser();
          this.setState({
            user: user
          });
        } catch (err) {
          AuthService.logout();
          this.props.history.replace("/login");
        }
      }
    }

    render() {
      if (this.state.user) {
        return (
          <AuthComponent
            history={this.props.history}
            match={this.props.match}
            user={this.state.user}
            {...this.props}
          />
        );
      } else {
        return null;
      }
    }
  };
}
