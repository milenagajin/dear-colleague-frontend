import React, { Component } from "react";
import withAuthComponent from "../components/withAuthComponent";
import UserService from "../services/UserService";
import NavbarScreen from "./NavbarScreen";

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
      email: ""
    }
  };

  componentDidMount() {
    const userId = this.props.match.params.user_id;
    if (userId) {
      this.getUser(userId);
    }
  }

  getUser(userId) {
    UserService.getOne(userId)
      .then(res => {
        console.log("response", res.data);
        this.setState({ user: res.data }, () =>
          console.log("dddd", this.state.user)
        );
      })
      .catch(error => {
        console.log(error);
      });
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleFormSubmit(event) {
    event.preventDefault();
    this.state.id ? this.editUser() : this.createUser();
  }

  createUser() {
    UserService.saveOne(this.state.user)
      .then(() => {
        this.redirect();
      })
      .catch(error => console.log(error));
  }

  editUser() {
    UserService.saveOne(this.state.user)
      .then(() => {
        this.redirect();
      })
      .catch(error => console.log(error));
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
                name="user.name"
                type="text"
                value={this.state.user.name}
                onChange={this.handleChange}
              />
            </div>
            <div className="form-group">
              <input
                className="form-control"
                placeholder="Email..."
                name="user.email"
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

export default withAuthComponent(AddEditUserScreen);
