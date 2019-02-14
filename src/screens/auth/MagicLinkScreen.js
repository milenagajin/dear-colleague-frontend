import React, { Component } from "react";
import queryString from "query-string";
import AuthService from "../../services/AuthService";

class MagicLinkScreen extends Component {

  componentDidMount() {
    this.parseUrl();
  }

  parseUrl() {
    // get values from URL
    const values = queryString.parse(this.props.location.search);
    this.checkTokenExpiration(values.invatation_token);
  }

  async checkTokenExpiration(token) {
    if (!AuthService.isTokenExpired(token)) {
      await AuthService.validateMagicLinkToken(token)
      this.redirectLoggedInUser();
    }
  }

  redirectLoggedInUser() {
    let campaignId = this.props.match.params.campaignId;
    this.props.history.push(`/campaigns/$/{campaignId}/users`);
  }

  render() {
    return (
      <div>
        Invataiton link has been expired! Contact admin for another invatation
        link.
      </div>
    );
  }
}
export default MagicLinkScreen;
