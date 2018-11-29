import React, { Component } from "react";
import UserListComponent from "../components/UserListComponent";
import UserService from "../services/UserService";
import withAuthComponent from "../components/withAuthComponent";
import NavbarScreen from "./NavbarScreen";
import AddEditUserScreen from "./AddEditUserScreen";

class UserScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      campaign_id: null,
      users: []
    };
  }

  componentDidMount() {
    const route_id = this.props.match.params.id;
    this.setState({ campaign_id: route_id });
    UserService.getAll(route_id)
      .then(response => {
        console.log(response);
        this.setState({ users: response.data });
      })
      .catch(error => console.log(error));
  }

  render() {
    return (
      <div>
        <NavbarScreen history={this.props.history} />
        <div>
          {/* <AddEditUserScreen match={this.props.match} /> */}
          <UserListComponent
            campaign_id={this.state.campaign_id}
            users={this.state.users}
          />
        </div>
      </div>
    );
  }
}

export default withAuthComponent(UserScreen);
