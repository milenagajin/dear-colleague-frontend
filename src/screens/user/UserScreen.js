import React, { Component } from "react";
import UserListComponent from "../../components/user/UserListComponent";
import UserService from "../../services/UserService";
import withAuthComponent from "../auth/withAuthComponent";
import NavbarScreen from "../NavbarScreen";
import AddEditUserScreen from "./AddEditUserScreen";
import AuthService from "../../services/AuthService";
import authService from "../../services/AuthService";
import noteService from "../../services/NoteService";
import Modal from "../../components/Modal";
import { connect } from 'react-redux';
import { setUsers } from "../../store/actions/UsersAction";
import { deleteUser } from "../../store/actions/UsersAction";

class UserScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      canVote: true,
      sentNotes: [],
      note: {
        text: "",
        to_user: "",
        from_user: "",
        campaign_id: this.props.match.params.campaignId
      }
    };

    this.handleDelete = this.handleDelete.bind(this);
    this.handleInvatation = this.handleInvatation.bind(this);
  }

  componentDidMount() {
    this.setUsers();
    this.getSentNotes();
    this.setFromUserId();
  }

  async setUsers() {
    const { data } = await UserService.getAll(
      this.props.match.params.campaignId
    );
     const users = data.filter(user => user.id !== this.props.user.id);
     this.props.setUsers(users);
  }

  async getSentNotes() {
    const { data } = await noteService.notesUserSent(
    this.props.match.params.campaignId, authService.getUser().id);
    await this.setState({ sentNotes: data });
  }

  async handleDelete(id) {
    try {
      await UserService.delete(id);
      this.props.deleteUser(id);
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

  setFromUserId = async () => {
    const { id } = authService.getUser();
    let note = { ...this.state.note, from_user: id };
    this.setState({ note });
  };

  isVotedForUser = userId => {
     return this.state.sentNotes.some(note => note.to_user === userId);
  };


  handleSubmit = async event => {
    event.preventDefault();
    const { data } = await noteService.saveOne(this.state.note);
    await this.setState({ sentNotes: [...this.state.sentNotes, data], note: ''})
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
          {authService.getUser().admin   &&
          <AddEditUserScreen
          history={this.props.history}
          match={this.props.match}
          addUser={this.addUser}
          />}
          &nbsp;
          <UserListComponent
            isAdmin={authService.getUser().admin}
            numOfVotes={this.state.sentNotes.length}
            campaignId={this.props.match.params.campaignId}
            users= {this.props.users}
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



const mapDispatchToProps = dispatch => ({
  setUsers: users => dispatch(setUsers(users)),
  deleteUser: id => dispatch(deleteUser(id))
});

const mapStateToProps = state => {
 return { users: state.users }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withAuthComponent(UserScreen));


