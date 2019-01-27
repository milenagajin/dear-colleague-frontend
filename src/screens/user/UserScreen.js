import React, { Component } from "react";
import UserListComponent from "../../components/user/UserListComponent";
import UserService from "../../services/UserService";
import withAuthComponent from "../../components/auth/withAuthComponent";
import NavbarScreen from "../NavbarScreen";
import AddEditUserScreen from "./AddEditUserScreen";
import AuthService from "../../services/AuthService";
import authService from "../../services/AuthService";
import noteService from "../../services/NoteService";
import Modal from "../../components/Modal";

class UserScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      changed: false,
      sentNotes: [],
      note: {
        text: "",
        to_user: "",
        from_user: ""
      }
    };

    this.handleDelete = this.handleDelete.bind(this);
    this.handleInvatation = this.handleInvatation.bind(this);
  }

  componentDidMount() {
    this.getUsers();
    this.getSentNotes();
    this.setFromUserId();
  }

  async getUsers() {
    const { data } = await UserService.getAll(
      this.props.match.params.campaignId
    );
    this.setState({
      users: data.filter(user => user.id !== this.props.user.id)
    });
  }

  async getSentNotes() {
    const { data } = await noteService.notesUserSent(authService.getUser().id);
    console.log(data);
    this.setState({ sentNotes: data });
  }

  async handleDelete(id) {
    try {
      await UserService.delete(id);
      let users = this.state.users.filter(user => user.id !== id);
      this.setState({ users });
    } catch (error) {
      console.log(error);
    }
  }

  handleInvatation = async (userEmail, campaignId) => {
    AuthService.loginMagicLink(userEmail, campaignId);
  };

  addUser = user => {
    this.setState({ users: [...this.state.users, user] });
  };

  handleChange = async event => {
    const { name, value } = event.target;
    let note = { ...this.state.note, [name]: value };
    await this.setState({ note });
  };

  setToUserId = async toUserId => {
    let note = { ...this.state.note, to_user: toUserId };
    this.setState({ note });
  };

  setFromUserId = () => {
    const { id } = authService.getUser();
    let note = { ...this.state.note, from_user: id };
    this.setState({ note });
  };

  isVotedForUser = userId => {
    let isVoted = false;
    // const sentNotes = ;
    this.state.sentNotes.forEach(note => {
      if (note.to_user === userId) {
        isVoted = true;
      }
    });
    return isVoted;
  };

  handleSubmit = async event => {
    event.preventDefault();
    await noteService.saveOne(this.state.note);
    this.getSentNotes();
  };

  render() {
    return (
      <div>
        <NavbarScreen history={this.props.history} />
        <div>
          <Modal
            inputName="text"
            inputValue={this.state.note.text}
            handleChange={e => this.handleChange(e)}
            handleSubmit={e => this.handleSubmit(e)}
          />
          <AddEditUserScreen
            history={this.props.history}
            match={this.props.match}
            addUser={this.addUser}
          />
          <UserListComponent
            campaignId={this.props.match.params.campaignId}
            users={this.state.users}
            onDeletePress={this.handleDelete}
            onInvatationPress={this.handleInvatation}
            setToUserId={this.setToUserId}
            isVotedForUser={this.isVotedForUser}
          />
        </div>
      </div>
    );
  }
}

export default withAuthComponent(UserScreen);
