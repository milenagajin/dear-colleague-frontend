import React, { Component } from "react";
import queryString from "query-string";
import AuthService from "../../services/AuthService";

class MagicLinkScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tokenExpired: false
    };
  }

  componentDidMount() {
    this.parseUrl();
  }

  parseUrl() {
    // get values from URL
    const values = queryString.parse(this.props.location.search);
    this.checkTokenExpiration(values.invatation_token, values.email);
  }

  checkTokenExpiration(token, userEmail) {
    AuthService.isTokenExpired(token)
      ? this.setState({ tokenExpired: true })
      : AuthService.validateMagicLinkToken(token, userEmail);
  }

  tokenIsExpired() {
    return (
      <div>
        Invataiton link has been expired! Contact admin for another invatation
        link.
      </div>
    );
  }

  redirectLoggedInUser() {
    let campaignId = this.props.match.params.campaignId;
    this.props.history.push(`/campaigns/${campaignId}/users`);
  }

  render() {
    return (
      <div>
        {this.state.tokenExpired
          ? this.tokenIsExpired()
          : this.redirectLoggedInUser()}
      </div>
    );
  }
}
export default MagicLinkScreen;
