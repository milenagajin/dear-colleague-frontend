import React, { Component } from "react";
import withAuthComponent from "../auth/withAuthComponent";
import UserService from "../../services/UserService";
import { connect } from 'react-redux';
import { addUser } from "../../store/actions/UsersAction";

class AddEditUserScreen extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  state = {
    user: {
      id: "",
      name: "",
      email: "",
      campaignId: this.props.match.params.campaignId
    }
  };

  componentDidMount() {
    const userId = this.props.match.params.userId;
    if (userId) {
      this.getUser(userId);
    }
  }

  async getUser(userId) {
    try {
      const { data } = await UserService.getOne(userId);
      data.campaignId = this.props.match.params.campaignId;
      await this.setState({ user: data });
    } catch (error) {
      console.log(error);
    }
  }

  handleChange(event) {
    const { name, value } = event.target;
    let user = { ...this.state.user, [name]: value };
    this.setState({ user });
  }

  handleFormSubmit(event) {
    event.preventDefault();
    this.state.user.id ? this.editUser() : this.createUser();
  }

  async createUser() {
    try {
      const { data } = await UserService.saveOne(this.state.user);
      this.props.addUser(data);
    } catch (error) {
      console.log(error);
    }
  }
  
  async editUser() {
    try {
      await UserService.saveOne(this.state.user);
      this.redirect();
    } catch (error) {
      console.log(error);
    }
  }

  redirect() {
    this.props.history.replace(
      `/campaigns/${this.props.match.params.campaignId}/users`
    );
  }

  render() {
    return (
      <div>
        <form>
          <div className="form-group">
            <div className="col-xs-2">
              <input
                className="form-control"
                placeholder="First and last name..."
                name="name"
                type="text"
                value={this.state.user.name}
                onChange={this.handleChange}
              />
            </div>
            <div className="form-group">
              <input
                className="form-control"
                placeholder="Email..."
                name="email"
                type="text"
                value={this.state.user.email}
                onChange={this.handleChange}
              />
            </div>
            <div className="form-group">
              <input
                className="form-control"
                value="SUBMIT"
                type="submit"
                onClick={this.handleFormSubmit}
              />
            </div>
          </div>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  addUser: user => dispatch(addUser(user))
});

export default connect(
  null,
  mapDispatchToProps
)(withAuthComponent(AddEditUserScreen));
